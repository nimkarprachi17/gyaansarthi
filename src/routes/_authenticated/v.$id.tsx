import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { getVideoBundle, saveAttempt } from "@/lib/video.functions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { BookOpen, ListChecks, Loader2, ChevronLeft, ChevronRight, ArrowLeft, Sparkles, CheckCircle2, Clock, Flag } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/v/$id")({
  head: () => ({ meta: [{ title: "वीडियो — स्मार्टस्टडी AI" }] }),
  validateSearch: (s: Record<string, unknown>) => ({ retake: s.retake === 1 || s.retake === "1" ? 1 : undefined }),
  component: VideoWorkspace,
});

type CheatSheet = {
  formulas?: { name: string; expression: string; when_to_use?: string; trap?: string; note?: string }[];
  most_important?: string[];
  frequently_asked?: string[];
  common_mistakes?: string[];
  memory_tricks?: string[];
  last_minute_points?: string[];
  // legacy
  quick_concepts?: string[];
  exam_must_remember?: string[];
  quick_tricks?: string[];
};

type NotesContent = {
  summary: string;
  key_concepts: { title: string; description: string }[];
  detailed_notes: { heading: string; body: string }[];
  definitions: { term: string; meaning: string }[];
  examples: string[];
  common_mistakes: string[];
  exam_points: string[];
  revision_notes: string[];
  cheat_sheet: CheatSheet | string;
};


type QuizQuestion = {
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  concept: string;
};

function VideoWorkspace() {
  const { id } = Route.useParams();
  const search = Route.useSearch() as { retake?: 1 };
  const retake = search.retake === 1;
  const isResultsRoute = useRouterState({
    select: (state) => state.location.pathname.includes(`/v/${id}/results/`),
  });

  if (isResultsRoute) {
    return <Outlet />;
  }

  const fetcher = useServerFn(getVideoBundle);
  const { data, isLoading } = useQuery({
    queryKey: ["video", id],
    queryFn: () => fetcher({ data: { id } }),
  });

  if (isLoading) {
    return <div className="flex items-center justify-center py-20 text-muted-foreground"><Loader2 className="size-5 animate-spin mr-2" />लोड हो रहा है...</div>;
  }
  if (!data) return null;

  const { video, notes, quiz } = data;
  const notesContent = notes?.content as NotesContent | undefined;
  const questions = (quiz?.questions ?? []) as QuizQuestion[];

  return (
    <div className="space-y-6">
      <Link to="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground gap-1">
        <ArrowLeft className="size-4" /> डैशबोर्ड पर वापस
      </Link>

      {/* Video player */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
        <div className="aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtube_id}`}
            title={video.title ?? ""}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <div className="p-5">
          <h1 className="text-xl sm:text-2xl font-bold leading-tight">{video.title}</h1>
          <div className="mt-2 flex gap-2">
            <Badge variant="secondary">{video.language === "hi" ? "हिंदी" : "English"}</Badge>
          </div>
        </div>
      </div>

      {video.status === "failed" ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center">
          <p className="font-semibold text-destructive mb-2">AI जनरेशन विफल</p>
          <p className="text-sm text-muted-foreground">कृपया फिर से कोशिश करें।</p>
        </div>
      ) : !notesContent || questions.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <Loader2 className="size-5 animate-spin mx-auto mb-2 text-primary" />
          <p className="text-sm text-muted-foreground">सामग्री तैयार हो रही है...</p>
        </div>
      ) : (
        <Tabs defaultValue={retake ? "quiz" : "notes"} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12">
            <TabsTrigger value="notes" className="gap-2 text-base"><BookOpen className="size-4" /> नोट्स</TabsTrigger>
            <TabsTrigger value="quiz" className="gap-2 text-base"><ListChecks className="size-4" /> क्विज़</TabsTrigger>
          </TabsList>
          <TabsContent value="notes" className="mt-6">
            <NotesView notes={notesContent} />
          </TabsContent>
          <TabsContent value="quiz" className="mt-6">
            <QuizView key={quiz!.id + (retake ? "-retake" : "")} quizId={quiz!.id} videoId={video.id} questions={questions} autoStart={retake} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

function Section({ title, children, accent }: { title: string; children: React.ReactNode; accent?: string }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${accent ?? ""}`}>
        <span className="size-2 rounded-full bg-saffron" /> {title}
      </h3>
      {children}
    </section>
  );
}

function NotesView({ notes }: { notes: NotesContent }) {
  return (
    <div className="space-y-5">
      <Section title="सारांश">
        <p className="text-base leading-relaxed text-foreground/90">{notes.summary}</p>
      </Section>

      {notes.key_concepts?.length > 0 && (
        <Section title="मुख्य अवधारणाएँ">
          <div className="grid sm:grid-cols-2 gap-3">
            {notes.key_concepts.map((c, i) => (
              <div key={i} className="rounded-xl border border-border bg-secondary/40 p-4">
                <h4 className="font-semibold text-primary mb-1">{c.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {notes.detailed_notes?.length > 0 && (
        <Section title="विस्तृत नोट्स">
          <div className="space-y-5">
            {notes.detailed_notes.map((n, i) => (
              <article key={i}>
                <h4 className="font-semibold text-lg mb-2 text-ink">{n.heading}</h4>
                <p className="text-sm leading-relaxed text-foreground/85 whitespace-pre-line">{n.body}</p>
              </article>
            ))}
          </div>
        </Section>
      )}

      {notes.definitions?.length > 0 && (
        <Section title="परिभाषाएँ">
          <dl className="space-y-3">
            {notes.definitions.map((d, i) => (
              <div key={i} className="border-l-2 border-primary pl-4">
                <dt className="font-semibold">{d.term}</dt>
                <dd className="text-sm text-muted-foreground mt-1">{d.meaning}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {notes.examples?.length > 0 && (
        <Section title="उदाहरण">
          <ul className="space-y-2 list-disc pl-5 text-sm leading-relaxed">
            {notes.examples.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </Section>
      )}

      {notes.common_mistakes?.length > 0 && (
        <Section title="सामान्य गलतियाँ">
          <ul className="space-y-2 text-sm leading-relaxed">
            {notes.common_mistakes.map((m, i) => (
              <li key={i} className="rounded-lg bg-destructive/5 border border-destructive/20 p-3">⚠️ {m}</li>
            ))}
          </ul>
        </Section>
      )}

      {notes.exam_points?.length > 0 && (
        <Section title="परीक्षा के लिए महत्वपूर्ण बिंदु">
          <ul className="space-y-2 text-sm">
            {notes.exam_points.map((p, i) => (
              <li key={i} className="flex gap-2"><CheckCircle2 className="size-4 text-success shrink-0 mt-0.5" /><span>{p}</span></li>
            ))}
          </ul>
        </Section>
      )}

      {notes.revision_notes?.length > 0 && (
        <Section title="त्वरित पुनरावृत्ति">
          <ul className="space-y-1.5 list-decimal pl-5 text-sm">
            {notes.revision_notes.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </Section>
      )}

      {notes.cheat_sheet && (
        <Section title="एक-पृष्ठीय चीट शीट">
          <CheatSheetView data={notes.cheat_sheet} />
        </Section>
      )}

    </div>
  );
}

// Strip markdown / LaTeX artifacts from legacy string cheat sheets.
function cleanLine(s: string): string {
  return s
    .replace(/\$\$?([^$]+)\$\$?/g, "$1")
    .replace(/\\frac\s*\{([^}]*)\}\s*\{([^}]*)\}/g, "($1)/($2)")
    .replace(/\\sqrt\s*\{([^}]*)\}/g, "√($1)")
    .replace(/\\(times|cdot)/g, "×")
    .replace(/\\div/g, "÷")
    .replace(/\\pi/g, "π")
    .replace(/\\(left|right)/g, "")
    .replace(/\\[a-zA-Z]+/g, "")
    .replace(/[*_`#>]+/g, "")
    .replace(/^\s*[-•]\s*/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseLegacyCheatSheet(text: string): CheatSheet {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const bullets: string[] = [];
  const formulas: { name: string; expression: string }[] = [];
  for (const raw of lines) {
    const line = cleanLine(raw);
    if (!line) continue;
    if (/^#+\s/.test(raw)) continue;
    // Heuristic: treat lines containing "=" as formulas
    if (/=/.test(line) && line.length < 80) {
      const [name, ...rest] = line.split(":");
      if (rest.length && /=/.test(rest.join(":"))) {
        formulas.push({ name: name.trim(), expression: rest.join(":").trim() });
      } else {
        formulas.push({ name: "", expression: line });
      }
    } else {
      bullets.push(line);
    }
  }
  return { formulas, quick_concepts: bullets, exam_must_remember: [], common_mistakes: [], quick_tricks: [] };
}

function CheatSheetView({ data }: { data: CheatSheet | string }) {
  const raw: CheatSheet = typeof data === "string" ? parseLegacyCheatSheet(data) : data;
  // Merge legacy fields into new structure so older notes still render well
  const cs: CheatSheet = {
    ...raw,
    most_important: raw.most_important?.length ? raw.most_important : raw.exam_must_remember,
    frequently_asked: raw.frequently_asked,
    memory_tricks: raw.memory_tricks?.length ? raw.memory_tricks : raw.quick_tricks,
    last_minute_points: raw.last_minute_points?.length ? raw.last_minute_points : raw.quick_concepts,
  };

  const hasAny =
    (cs.formulas?.length ?? 0) +
      (cs.most_important?.length ?? 0) +
      (cs.frequently_asked?.length ?? 0) +
      (cs.common_mistakes?.length ?? 0) +
      (cs.memory_tricks?.length ?? 0) +
      (cs.last_minute_points?.length ?? 0) >
    0;
  if (!hasAny) {
    return <p className="text-sm text-muted-foreground">कोई चीट शीट उपलब्ध नहीं है।</p>;
  }

  return (
    <div className="space-y-5">
      {cs.formulas && cs.formulas.length > 0 && (
        <CheatBlock label="📐 मुख्य सूत्र" accent="primary">
          <div className="grid gap-2 sm:grid-cols-2">
            {cs.formulas.map((f, i) => (
              <div key={i} className="rounded-lg border bg-card p-3 shadow-sm">
                {f.name && (
                  <div className="text-xs font-medium text-muted-foreground mb-1">{f.name}</div>
                )}
                <div className="font-mono text-base leading-snug break-words text-foreground">
                  {f.expression}
                </div>
                {f.when_to_use && (
                  <div className="mt-1.5 text-xs text-foreground/80">
                    <span className="font-semibold text-primary">कब उपयोग करें: </span>
                    {f.when_to_use}
                  </div>
                )}
                {f.trap && (
                  <div className="mt-1 text-xs text-destructive">
                    <span className="font-semibold">⚠ ट्रैप: </span>
                    {f.trap}
                  </div>
                )}
                {f.note && !f.when_to_use && !f.trap && (
                  <div className="mt-1 text-xs text-muted-foreground">{f.note}</div>
                )}
              </div>
            ))}
          </div>
        </CheatBlock>
      )}

      {cs.most_important && cs.most_important.length > 0 && (
        <CheatBlock label="🔥 सबसे महत्वपूर्ण" accent="danger">
          <BulletList items={cs.most_important} dotClass="bg-destructive" />
        </CheatBlock>
      )}

      {cs.frequently_asked && cs.frequently_asked.length > 0 && (
        <CheatBlock label="🎯 परीक्षा में अक्सर पूछे जाने वाले" accent="primary">
          <BulletList items={cs.frequently_asked} dotClass="bg-primary" />
        </CheatBlock>
      )}

      {cs.common_mistakes && cs.common_mistakes.length > 0 && (
        <CheatBlock label="⚠️ सामान्य गलतियाँ" accent="warning">
          <BulletList items={cs.common_mistakes} dotClass="bg-destructive" />
        </CheatBlock>
      )}

      {cs.memory_tricks && cs.memory_tricks.length > 0 && (
        <CheatBlock label="📝 याद रखने की ट्रिक्स" accent="info">
          <BulletList items={cs.memory_tricks} dotClass="bg-accent-foreground/60" />
        </CheatBlock>
      )}

      {cs.last_minute_points && cs.last_minute_points.length > 0 && (
        <CheatBlock label="📌 लास्ट मिनट रिवीजन" accent="success">
          <BulletList items={cs.last_minute_points} dotClass="bg-success" />
        </CheatBlock>
      )}
    </div>
  );
}

function CheatBlock({ label, accent, children }: { label: string; accent: "primary" | "info" | "success" | "danger" | "warning"; children: React.ReactNode }) {
  const badgeClass: Record<string, string> = {
    primary: "bg-primary/10 text-primary border-primary/20",
    info: "bg-accent text-accent-foreground border-accent",
    success: "bg-success/10 text-success border-success/20",
    danger: "bg-destructive/10 text-destructive border-destructive/20",
    warning: "bg-secondary text-secondary-foreground border-secondary",
  };
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badgeClass[accent]}`}>
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

function BulletList({ items, dotClass }: { items: string[]; dotClass: string }) {
  return (
    <ul className="space-y-1.5 text-sm">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2">
          <span className={`mt-1.5 size-1.5 rounded-full shrink-0 ${dotClass}`} />
          <span className="leading-relaxed">{t}</span>
        </li>
      ))}
    </ul>
  );
}

function ChipList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t, i) => (
        <span key={i} className="rounded-md border bg-card px-2 py-1 text-xs leading-snug">
          {t}
        </span>
      ))}
    </div>
  );
}


function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

function QuizView({ quizId, videoId, questions, autoStart = false }: { quizId: string; videoId: string; questions: QuizQuestion[]; autoStart?: boolean }) {
  const navigate = useNavigate();
  const [started, setStarted] = useState(autoStart);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(() => questions.map(() => -1));
  const [elapsed, setElapsed] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!started) return;
    startRef.current = Date.now();
    const t = setInterval(() => {
      if (startRef.current) setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);
    return () => clearInterval(t);
  }, [started]);

  const save = useServerFn(saveAttempt);
  const mut = useMutation({
    mutationFn: () => save({ data: { quizId, videoId, answers, timeTakenSeconds: elapsed } }),
    onSuccess: async (res) => {
      setConfirmOpen(false);
      toast.success(`जमा हो गया · ${res.score}/${res.total}`);
      // Defer navigation so the dialog has time to unmount cleanly
      setTimeout(() => {
        navigate({
          to: "/v/$id/results/$attemptId",
          params: { id: videoId, attemptId: res.id },
        }).catch(() => {
          window.location.href = `/v/${videoId}/results/${res.id}`;
        });
      }, 50);
    },
    onError: (e: Error) => toast.error(e.message || "सहेजने में विफल"),
  });

  if (!started) {
    const counts = questions.reduce((acc, q) => ({ ...acc, [q.difficulty]: (acc[q.difficulty] ?? 0) + 1 }), {} as Record<string, number>);
    return (
      <div className="rounded-2xl border border-border bg-card-gradient p-8 text-center shadow-soft">
        <div className="size-14 rounded-2xl bg-hero grid place-items-center mx-auto mb-4 shadow-elegant">
          <Sparkles className="size-6 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-bold mb-2">क्विज़ के लिए तैयार हैं?</h3>
        <p className="text-muted-foreground mb-2">{questions.length} प्रश्न · आसान {counts.easy ?? 0} · मध्यम {counts.medium ?? 0} · कठिन {counts.hard ?? 0}</p>
        <p className="text-xs text-muted-foreground mb-6">परीक्षा के दौरान उत्तर सही/गलत नहीं दिखाए जाएँगे। जमा करने के बाद विस्तृत विश्लेषण मिलेगा।</p>
        <Button size="lg" className="bg-hero hover:opacity-90" onClick={() => setStarted(true)}>क्विज़ शुरू करें</Button>
      </div>
    );
  }

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const answeredCount = answers.filter((a) => a >= 0).length;

  return (
    <div className="space-y-4">
      {/* Sticky exam header */}
      <div className="sticky top-0 z-10 -mx-2 sm:mx-0 rounded-none sm:rounded-xl border border-border bg-card/95 backdrop-blur px-4 py-3 shadow-soft flex items-center justify-between gap-3">
        <div className="text-sm">
          <span className="font-semibold">प्रश्न {current + 1}</span>
          <span className="text-muted-foreground"> / {questions.length}</span>
          <span className="ml-3 text-xs text-muted-foreground">उत्तरित: {answeredCount}/{questions.length}</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-sm tabular-nums bg-primary/10 text-primary px-3 py-1.5 rounded-lg">
          <Clock className="size-4" /> {formatTime(elapsed)}
        </div>
      </div>

      <Progress value={progress} className="h-1.5" />

      {/* Question palette */}
      <div className="rounded-xl border border-border bg-card p-3">
        <div className="flex flex-wrap gap-1.5">
          {questions.map((_, i) => {
            const isCurrent = i === current;
            const isAnswered = answers[i] >= 0;
            return (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`size-8 rounded-md text-xs font-semibold border transition-all ${
                  isCurrent ? "border-primary bg-primary text-primary-foreground" :
                  isAnswered ? "border-success/40 bg-success/10 text-success" :
                  "border-border bg-muted text-muted-foreground hover:border-primary/40"
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="mb-4 flex items-center gap-2">
          <Badge variant="outline" className="capitalize">
            {q.difficulty === "easy" ? "आसान" : q.difficulty === "medium" ? "मध्यम" : "कठिन"}
          </Badge>
          <Badge variant="secondary" className="text-[10px]">{q.concept}</Badge>
        </div>

        <h3 className="text-lg sm:text-xl font-semibold leading-snug mb-6">{q.question}</h3>

        <div className="space-y-3 mb-8">
          {q.options.map((opt, i) => {
            const selected = answers[current] === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setAnswers((a) => a.map((v, idx) => (idx === current ? i : v)))}
                className={`w-full text-left rounded-xl border-2 p-4 transition-all flex items-start gap-3 ${selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
              >
                <span className={`size-7 rounded-lg grid place-items-center text-sm font-semibold shrink-0 ${selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="leading-relaxed">{opt}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-3">
          <Button variant="ghost" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)} className="gap-2">
            <ChevronLeft className="size-4" /> पिछला
          </Button>
          <div className="flex items-center gap-2">
            {current < questions.length - 1 && (
              <Button onClick={() => setCurrent((c) => c + 1)} className="gap-2 bg-hero hover:opacity-90">
                अगला <ChevronRight className="size-4" />
              </Button>
            )}
            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
              <AlertDialogTrigger asChild>
                <Button variant={current === questions.length - 1 ? "default" : "outline"} className="gap-2">
                  <Flag className="size-4" /> जमा करें
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>क्विज़ जमा करें?</AlertDialogTitle>
                  <AlertDialogDescription>
                    आपने {answeredCount}/{questions.length} प्रश्नों के उत्तर दिए हैं। जमा करने के बाद आप उत्तर नहीं बदल सकेंगे।
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={mut.isPending}>रद्द करें</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={mut.isPending}
                    onClick={(e) => {
                      e.preventDefault();
                      mut.mutate();
                    }}
                  >
                    {mut.isPending && <Loader2 className="size-4 animate-spin mr-2" />}
                    हाँ, जमा करें
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
