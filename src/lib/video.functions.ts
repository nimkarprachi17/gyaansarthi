import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { extractYouTubeId } from "@/lib/youtube";

// ---------------- Process a new video ----------------
export const processVideo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({
      url: z.string().min(1).max(500),
      language: z.enum(["hi", "en"]),
      manualTranscript: z.string().max(200000).optional(),
    }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const youtubeId = extractYouTubeId(data.url);
    if (!youtubeId) throw new Error("INVALID_URL");

    const { fetchYouTubeTranscript, fetchYouTubeTitle } = await import("@/lib/transcript.server");
    const { generateNotes, generateQuiz } = await import("@/lib/ai.server");

    // Get transcript
    let transcript = data.manualTranscript?.trim() || "";
    let title: string | undefined;

    if (!transcript) {
      const fetched = await fetchYouTubeTranscript(youtubeId);
      if (fetched) {
        transcript = fetched.text;
        title = fetched.title;
      }
    }

    if (!title) {
      title = (await fetchYouTubeTitle(youtubeId)) ?? undefined;
    }

    if (!transcript || transcript.length < 100) {
      throw new Error("NO_TRANSCRIPT");
    }

    // Insert video row
    const { data: videoRow, error: vErr } = await supabase
      .from("videos")
      .insert({
        user_id: userId,
        youtube_id: youtubeId,
        url: data.url,
        title: title ?? "Untitled video",
        language: data.language,
        transcript,
        status: "processing",
      })
      .select("*")
      .single();
    if (vErr || !videoRow) throw new Error(vErr?.message ?? "Failed to save video");

    // Generate notes + quiz in parallel
    try {
      const [notes, questions] = await Promise.all([
        generateNotes(transcript, data.language, title),
        generateQuiz(transcript, data.language, title),
      ]);

      await Promise.all([
        supabase.from("notes").insert({ video_id: videoRow.id, user_id: userId, content: notes }),
        supabase.from("quizzes").insert({ video_id: videoRow.id, user_id: userId, questions }),
      ]);

      await supabase.from("videos").update({ status: "ready" }).eq("id", videoRow.id);
    } catch (e) {
      await supabase.from("videos").update({ status: "failed" }).eq("id", videoRow.id);
      const msg = e instanceof Error ? e.message : "AI generation failed";
      throw new Error(msg);
    }

    return { id: videoRow.id };
  });

// ---------------- Get video + notes + quiz ----------------
export const getVideoBundle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const [{ data: video }, { data: notes }, { data: quiz }] = await Promise.all([
      supabase.from("videos").select("*").eq("id", data.id).maybeSingle(),
      supabase.from("notes").select("*").eq("video_id", data.id).order("created_at", { ascending: false }).limit(1).maybeSingle(),
      supabase.from("quizzes").select("*").eq("video_id", data.id).order("created_at", { ascending: false }).limit(1).maybeSingle(),
    ]);
    if (!video) throw new Error("NOT_FOUND");
    return { video, notes, quiz };
  });

// ---------------- Dashboard ----------------
export const getDashboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [{ data: videos }, { data: attempts }, { data: profile }] = await Promise.all([
      supabase.from("videos").select("id, title, youtube_id, language, status, created_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(12),
      supabase.from("attempts").select("score, total, completed_at, weak_concepts, strong_concepts").eq("user_id", userId).order("completed_at", { ascending: false }).limit(50),
      supabase.from("profiles").select("display_name").eq("id", userId).maybeSingle(),
    ]);

    const totalAttempts = attempts?.length ?? 0;
    const avgScore = totalAttempts
      ? Math.round((attempts!.reduce((s, a) => s + (a.score / Math.max(a.total, 1)) * 100, 0) / totalAttempts))
      : 0;

    // Streak: count distinct consecutive days (most recent backwards)
    const dayKey = (d: string) => new Date(d).toISOString().slice(0, 10);
    const days = new Set((attempts ?? []).map((a) => dayKey(a.completed_at as unknown as string)));
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 60; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      if (days.has(d.toISOString().slice(0, 10))) streak++;
      else if (i > 0) break;
    }

    // Weak / strong concept aggregation
    const conceptCounts: Record<string, { weak: number; strong: number }> = {};
    for (const a of attempts ?? []) {
      for (const c of (a.weak_concepts as string[] | null) ?? []) {
        conceptCounts[c] = conceptCounts[c] || { weak: 0, strong: 0 };
        conceptCounts[c].weak++;
      }
      for (const c of (a.strong_concepts as string[] | null) ?? []) {
        conceptCounts[c] = conceptCounts[c] || { weak: 0, strong: 0 };
        conceptCounts[c].strong++;
      }
    }
    const weakAreas = Object.entries(conceptCounts)
      .filter(([, v]) => v.weak > v.strong)
      .sort((a, b) => b[1].weak - a[1].weak)
      .slice(0, 5)
      .map(([k]) => k);
    const strongAreas = Object.entries(conceptCounts)
      .filter(([, v]) => v.strong >= v.weak)
      .sort((a, b) => b[1].strong - a[1].strong)
      .slice(0, 5)
      .map(([k]) => k);

    // Best score (highest %) and accuracy + trend across last 10 attempts (oldest→newest)
    const pcts = (attempts ?? []).map((a) => Math.round((a.score / Math.max(a.total, 1)) * 100));
    const bestScore = pcts.length ? Math.max(...pcts) : 0;
    const trend = [...(attempts ?? [])]
      .slice(0, 10)
      .reverse()
      .map((a) => ({
        date: a.completed_at as unknown as string,
        pct: Math.round((a.score / Math.max(a.total, 1)) * 100),
      }));

    return {
      profile: profile ?? null,
      videos: videos ?? [],
      stats: {
        totalVideos: videos?.length ?? 0,
        totalAttempts,
        avgScore,
        bestScore,
        streak,
      },
      trend,
      weakAreas,
      strongAreas,
    };
  });

// ---------------- Save quiz attempt ----------------
export const saveAttempt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({
      quizId: z.string().uuid(),
      videoId: z.string().uuid(),
      answers: z.array(z.number().int().min(-1).max(3)),
      timeTakenSeconds: z.number().int().min(0).max(60 * 60 * 6).optional(),
    }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: quiz } = await supabase.from("quizzes").select("questions").eq("id", data.quizId).maybeSingle();
    if (!quiz) throw new Error("NOT_FOUND");
    const questions = quiz.questions as Array<{ correct_index: number; concept: string }>;
    let score = 0;
    const conceptStats: Record<string, { correct: number; total: number }> = {};
    questions.forEach((q, i) => {
      const ans = data.answers[i] ?? -1;
      const ok = ans === q.correct_index;
      if (ok) score++;
      const c = q.concept || "General";
      conceptStats[c] = conceptStats[c] || { correct: 0, total: 0 };
      conceptStats[c].total++;
      if (ok) conceptStats[c].correct++;
    });
    const weak = Object.entries(conceptStats).filter(([, v]) => v.correct / v.total < 0.5).map(([k]) => k);
    const strong = Object.entries(conceptStats).filter(([, v]) => v.correct / v.total >= 0.75).map(([k]) => k);

    const { data: attempt, error } = await supabase.from("attempts").insert({
      user_id: userId,
      quiz_id: data.quizId,
      video_id: data.videoId,
      score,
      total: questions.length,
      answers: data.answers,
      weak_concepts: weak,
      strong_concepts: strong,
      time_taken_seconds: data.timeTakenSeconds ?? 0,
    }).select("id").single();
    if (error || !attempt) throw new Error(error?.message ?? "Failed to save attempt");
    return { id: attempt.id, score, total: questions.length, weak, strong };
  });

// ---------------- Get a single attempt for review ----------------
export const getAttempt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const { data: attempt } = await supabase.from("attempts").select("*").eq("id", data.id).maybeSingle();
    if (!attempt) throw new Error("NOT_FOUND");
    const { data: quiz } = await supabase.from("quizzes").select("questions").eq("id", attempt.quiz_id).maybeSingle();
    const { data: video } = await supabase.from("videos").select("id, title, youtube_id, language").eq("id", attempt.video_id).maybeSingle();
    return { attempt, questions: (quiz?.questions ?? []) as Array<{ question: string; options: string[]; correct_index: number; explanation: string; difficulty: string; concept: string }>, video };
  });

// ---------------- Attempt history for a video ----------------
export const getAttemptHistory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ videoId: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: attempts } = await supabase
      .from("attempts")
      .select("id, quiz_id, score, total, time_taken_seconds, completed_at")
      .eq("user_id", userId)
      .eq("video_id", data.videoId)
      .order("completed_at", { ascending: false })
      .limit(50);
    const list = attempts ?? [];
    const pcts = list.map((a) => Math.round((a.score / Math.max(a.total, 1)) * 100));
    const best = pcts.length ? Math.max(...pcts) : 0;
    const latest = pcts[0] ?? 0;
    const previous = pcts[1];
    const avg = pcts.length ? Math.round(pcts.reduce((s, p) => s + p, 0) / pcts.length) : 0;
    const improvement = previous !== undefined ? latest - previous : 0;
    // assign quiz version labels: oldest quiz_id is v1
    const quizIds = Array.from(new Set([...list].reverse().map((a) => a.quiz_id)));
    const versionMap: Record<string, number> = {};
    quizIds.forEach((qid, i) => { versionMap[qid] = i + 1; });
    const enriched = list.map((a) => ({ ...a, quiz_version: versionMap[a.quiz_id] ?? 1 }));
    return { attempts: enriched, stats: { best, latest, avg, improvement, totalAttempts: list.length } };
  });

// ---------------- Regenerate quiz (fresh questions) ----------------
export const regenerateQuiz = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ videoId: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: video } = await supabase.from("videos").select("id, transcript, language, title").eq("id", data.videoId).maybeSingle();
    if (!video || !video.transcript) throw new Error("NOT_FOUND");

    // Collect all previous question texts to avoid repetition
    const { data: prevQuizzes } = await supabase
      .from("quizzes")
      .select("questions")
      .eq("video_id", data.videoId)
      .eq("user_id", userId);
    const avoid: string[] = [];
    for (const q of prevQuizzes ?? []) {
      const qs = (q.questions as Array<{ question: string }> | null) ?? [];
      for (const item of qs) if (item?.question) avoid.push(item.question);
    }

    const { generateQuiz } = await import("@/lib/ai.server");
    const questions = await generateQuiz(video.transcript, video.language as "hi" | "en", video.title ?? undefined, avoid);

    const { data: inserted, error } = await supabase
      .from("quizzes")
      .insert({ video_id: video.id, user_id: userId, questions })
      .select("id")
      .single();
    if (error || !inserted) throw new Error(error?.message ?? "Failed to save quiz");
    return { id: inserted.id, count: questions.length };
  });
