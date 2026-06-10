import { T as TSS_SERVER_FUNCTION, a as createServerFn } from "./server-Bod7FD6f.js";
import { z } from "zod";
import { r as requireSupabaseAuth } from "./auth-middleware-CJs7VfH6.js";
import { e as extractYouTubeId } from "./youtube-Cc2Ep5JX.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@supabase/supabase-js";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const processVideo_createServerFn_handler = createServerRpc({
  id: "140620bf5d58dd4abcbc154e6897ae01ed13993d7c12d4c6ecd786ca00015dea",
  name: "processVideo",
  filename: "src/lib/video.functions.ts"
}, (opts) => processVideo.__executeServer(opts));
const processVideo = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => z.object({
  url: z.string().min(1).max(500),
  language: z.enum(["hi", "en"]),
  manualTranscript: z.string().max(2e5).optional()
}).parse(input)).handler(processVideo_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const youtubeId = extractYouTubeId(data.url);
  if (!youtubeId) throw new Error("INVALID_URL");
  const {
    fetchYouTubeTranscript,
    fetchYouTubeTitle
  } = await import("./transcript.server-jubaeDOK.js");
  const {
    generateNotes,
    generateQuiz
  } = await import("./ai.server-Bb7sf5e2.js");
  let transcript = data.manualTranscript?.trim() || "";
  let title;
  if (!transcript) {
    const fetched = await fetchYouTubeTranscript(youtubeId);
    if (fetched) {
      transcript = fetched.text;
      title = fetched.title;
    }
  }
  if (!title) {
    title = await fetchYouTubeTitle(youtubeId) ?? void 0;
  }
  if (!transcript || transcript.length < 100) {
    throw new Error("NO_TRANSCRIPT");
  }
  const {
    data: videoRow,
    error: vErr
  } = await supabase.from("videos").insert({
    user_id: userId,
    youtube_id: youtubeId,
    url: data.url,
    title: title ?? "Untitled video",
    language: data.language,
    transcript,
    status: "processing"
  }).select("*").single();
  if (vErr || !videoRow) throw new Error(vErr?.message ?? "Failed to save video");
  try {
    const [notes, questions] = await Promise.all([generateNotes(transcript, data.language, title), generateQuiz(transcript, data.language, title)]);
    await Promise.all([supabase.from("notes").insert({
      video_id: videoRow.id,
      user_id: userId,
      content: notes
    }), supabase.from("quizzes").insert({
      video_id: videoRow.id,
      user_id: userId,
      questions
    })]);
    await supabase.from("videos").update({
      status: "ready"
    }).eq("id", videoRow.id);
  } catch (e) {
    await supabase.from("videos").update({
      status: "failed"
    }).eq("id", videoRow.id);
    const msg = e instanceof Error ? e.message : "AI generation failed";
    throw new Error(msg);
  }
  return {
    id: videoRow.id
  };
});
const getVideoBundle_createServerFn_handler = createServerRpc({
  id: "3e0036cb7e9376651aea8c2820a5cd1a9a70247236d017b2a951bd636034edeb",
  name: "getVideoBundle",
  filename: "src/lib/video.functions.ts"
}, (opts) => getVideoBundle.__executeServer(opts));
const getVideoBundle = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => z.object({
  id: z.string().uuid()
}).parse(input)).handler(getVideoBundle_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase
  } = context;
  const [{
    data: video
  }, {
    data: notes
  }, {
    data: quiz
  }] = await Promise.all([supabase.from("videos").select("*").eq("id", data.id).maybeSingle(), supabase.from("notes").select("*").eq("video_id", data.id).order("created_at", {
    ascending: false
  }).limit(1).maybeSingle(), supabase.from("quizzes").select("*").eq("video_id", data.id).order("created_at", {
    ascending: false
  }).limit(1).maybeSingle()]);
  if (!video) throw new Error("NOT_FOUND");
  return {
    video,
    notes,
    quiz
  };
});
const getDashboard_createServerFn_handler = createServerRpc({
  id: "1e9a8aea7e7a43ef03a16e6def9f3756789d957defa1188a1716c1758d33a4ed",
  name: "getDashboard",
  filename: "src/lib/video.functions.ts"
}, (opts) => getDashboard.__executeServer(opts));
const getDashboard = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getDashboard_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const [{
    data: videos
  }, {
    data: attempts
  }, {
    data: profile
  }] = await Promise.all([supabase.from("videos").select("id, title, youtube_id, language, status, created_at").eq("user_id", userId).order("created_at", {
    ascending: false
  }).limit(12), supabase.from("attempts").select("score, total, completed_at, weak_concepts, strong_concepts").eq("user_id", userId).order("completed_at", {
    ascending: false
  }).limit(50), supabase.from("profiles").select("display_name").eq("id", userId).maybeSingle()]);
  const totalAttempts = attempts?.length ?? 0;
  const avgScore = totalAttempts ? Math.round(attempts.reduce((s, a) => s + a.score / Math.max(a.total, 1) * 100, 0) / totalAttempts) : 0;
  const dayKey = (d) => new Date(d).toISOString().slice(0, 10);
  const days = new Set((attempts ?? []).map((a) => dayKey(a.completed_at)));
  let streak = 0;
  const today = /* @__PURE__ */ new Date();
  for (let i = 0; i < 60; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    if (days.has(d.toISOString().slice(0, 10))) streak++;
    else if (i > 0) break;
  }
  const conceptCounts = {};
  for (const a of attempts ?? []) {
    for (const c of a.weak_concepts ?? []) {
      conceptCounts[c] = conceptCounts[c] || {
        weak: 0,
        strong: 0
      };
      conceptCounts[c].weak++;
    }
    for (const c of a.strong_concepts ?? []) {
      conceptCounts[c] = conceptCounts[c] || {
        weak: 0,
        strong: 0
      };
      conceptCounts[c].strong++;
    }
  }
  const weakAreas = Object.entries(conceptCounts).filter(([, v]) => v.weak > v.strong).sort((a, b) => b[1].weak - a[1].weak).slice(0, 5).map(([k]) => k);
  const strongAreas = Object.entries(conceptCounts).filter(([, v]) => v.strong >= v.weak).sort((a, b) => b[1].strong - a[1].strong).slice(0, 5).map(([k]) => k);
  const pcts = (attempts ?? []).map((a) => Math.round(a.score / Math.max(a.total, 1) * 100));
  const bestScore = pcts.length ? Math.max(...pcts) : 0;
  const trend = [...attempts ?? []].slice(0, 10).reverse().map((a) => ({
    date: a.completed_at,
    pct: Math.round(a.score / Math.max(a.total, 1) * 100)
  }));
  return {
    profile: profile ?? null,
    videos: videos ?? [],
    stats: {
      totalVideos: videos?.length ?? 0,
      totalAttempts,
      avgScore,
      bestScore,
      streak
    },
    trend,
    weakAreas,
    strongAreas
  };
});
const saveAttempt_createServerFn_handler = createServerRpc({
  id: "3ab80bd672b54c4a2e9086163bb3d5041abee4a8ab30ec4c15637700c43c069f",
  name: "saveAttempt",
  filename: "src/lib/video.functions.ts"
}, (opts) => saveAttempt.__executeServer(opts));
const saveAttempt = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => z.object({
  quizId: z.string().uuid(),
  videoId: z.string().uuid(),
  answers: z.array(z.number().int().min(-1).max(3)),
  timeTakenSeconds: z.number().int().min(0).max(60 * 60 * 6).optional()
}).parse(input)).handler(saveAttempt_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: quiz
  } = await supabase.from("quizzes").select("questions").eq("id", data.quizId).maybeSingle();
  if (!quiz) throw new Error("NOT_FOUND");
  const questions = quiz.questions;
  let score = 0;
  const conceptStats = {};
  questions.forEach((q, i) => {
    const ans = data.answers[i] ?? -1;
    const ok = ans === q.correct_index;
    if (ok) score++;
    const c = q.concept || "General";
    conceptStats[c] = conceptStats[c] || {
      correct: 0,
      total: 0
    };
    conceptStats[c].total++;
    if (ok) conceptStats[c].correct++;
  });
  const weak = Object.entries(conceptStats).filter(([, v]) => v.correct / v.total < 0.5).map(([k]) => k);
  const strong = Object.entries(conceptStats).filter(([, v]) => v.correct / v.total >= 0.75).map(([k]) => k);
  const {
    data: attempt,
    error
  } = await supabase.from("attempts").insert({
    user_id: userId,
    quiz_id: data.quizId,
    video_id: data.videoId,
    score,
    total: questions.length,
    answers: data.answers,
    weak_concepts: weak,
    strong_concepts: strong,
    time_taken_seconds: data.timeTakenSeconds ?? 0
  }).select("id").single();
  if (error || !attempt) throw new Error(error?.message ?? "Failed to save attempt");
  return {
    id: attempt.id,
    score,
    total: questions.length,
    weak,
    strong
  };
});
const getAttempt_createServerFn_handler = createServerRpc({
  id: "b21eb7d0459e6541b31abfa2b8df10687af39ca83a649c63237a3d114837fe41",
  name: "getAttempt",
  filename: "src/lib/video.functions.ts"
}, (opts) => getAttempt.__executeServer(opts));
const getAttempt = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => z.object({
  id: z.string().uuid()
}).parse(input)).handler(getAttempt_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase
  } = context;
  const {
    data: attempt
  } = await supabase.from("attempts").select("*").eq("id", data.id).maybeSingle();
  if (!attempt) throw new Error("NOT_FOUND");
  const {
    data: quiz
  } = await supabase.from("quizzes").select("questions").eq("id", attempt.quiz_id).maybeSingle();
  const {
    data: video
  } = await supabase.from("videos").select("id, title, youtube_id, language").eq("id", attempt.video_id).maybeSingle();
  return {
    attempt,
    questions: quiz?.questions ?? [],
    video
  };
});
const getAttemptHistory_createServerFn_handler = createServerRpc({
  id: "6c53e05e1c21125a5a248e2a500a5175e0b9c1079b5e7aceae9991f12e4c7d47",
  name: "getAttemptHistory",
  filename: "src/lib/video.functions.ts"
}, (opts) => getAttemptHistory.__executeServer(opts));
const getAttemptHistory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => z.object({
  videoId: z.string().uuid()
}).parse(input)).handler(getAttemptHistory_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: attempts
  } = await supabase.from("attempts").select("id, quiz_id, score, total, time_taken_seconds, completed_at").eq("user_id", userId).eq("video_id", data.videoId).order("completed_at", {
    ascending: false
  }).limit(50);
  const list = attempts ?? [];
  const pcts = list.map((a) => Math.round(a.score / Math.max(a.total, 1) * 100));
  const best = pcts.length ? Math.max(...pcts) : 0;
  const latest = pcts[0] ?? 0;
  const previous = pcts[1];
  const avg = pcts.length ? Math.round(pcts.reduce((s, p) => s + p, 0) / pcts.length) : 0;
  const improvement = previous !== void 0 ? latest - previous : 0;
  const quizIds = Array.from(new Set([...list].reverse().map((a) => a.quiz_id)));
  const versionMap = {};
  quizIds.forEach((qid, i) => {
    versionMap[qid] = i + 1;
  });
  const enriched = list.map((a) => ({
    ...a,
    quiz_version: versionMap[a.quiz_id] ?? 1
  }));
  return {
    attempts: enriched,
    stats: {
      best,
      latest,
      avg,
      improvement,
      totalAttempts: list.length
    }
  };
});
const regenerateQuiz_createServerFn_handler = createServerRpc({
  id: "648e3a98c39e14d42160c41856491c4cc7c5647856bb7cff851f3d67491b6d75",
  name: "regenerateQuiz",
  filename: "src/lib/video.functions.ts"
}, (opts) => regenerateQuiz.__executeServer(opts));
const regenerateQuiz = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => z.object({
  videoId: z.string().uuid()
}).parse(input)).handler(regenerateQuiz_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: video
  } = await supabase.from("videos").select("id, transcript, language, title").eq("id", data.videoId).maybeSingle();
  if (!video || !video.transcript) throw new Error("NOT_FOUND");
  const {
    data: prevQuizzes
  } = await supabase.from("quizzes").select("questions").eq("video_id", data.videoId).eq("user_id", userId);
  const avoid = [];
  for (const q of prevQuizzes ?? []) {
    const qs = q.questions ?? [];
    for (const item of qs) if (item?.question) avoid.push(item.question);
  }
  const {
    generateQuiz
  } = await import("./ai.server-Bb7sf5e2.js");
  const questions = await generateQuiz(video.transcript, video.language, video.title ?? void 0, avoid);
  const {
    data: inserted,
    error
  } = await supabase.from("quizzes").insert({
    video_id: video.id,
    user_id: userId,
    questions
  }).select("id").single();
  if (error || !inserted) throw new Error(error?.message ?? "Failed to save quiz");
  return {
    id: inserted.id,
    count: questions.length
  };
});
export {
  getAttemptHistory_createServerFn_handler,
  getAttempt_createServerFn_handler,
  getDashboard_createServerFn_handler,
  getVideoBundle_createServerFn_handler,
  processVideo_createServerFn_handler,
  regenerateQuiz_createServerFn_handler,
  saveAttempt_createServerFn_handler
};
