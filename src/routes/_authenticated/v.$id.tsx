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

type NotesContent = {
  summary: string;
  key_concepts: { title: string; description: string }[];
  detailed_notes: { heading: string; body: string }[];
  definitions: { term: string; meaning: string }[];
  examples: string[];
  common_mistakes: string[];
  exam_points: string[];
  revision_notes: string[];
  cheat_sheet: string;
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
        <Tabs defaultValue="notes" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12">
            <TabsTrigger value="notes" className="gap-2 text-base"><BookOpen className="size-4" /> नोट्स</TabsTrigger>
            <TabsTrigger value="quiz" className="gap-2 text-base"><ListChecks className="size-4" /> क्विज़</TabsTrigger>
          </TabsList>
          <TabsContent value="notes" className="mt-6">
            <NotesView notes={notesContent} />
          </TabsContent>
          <TabsContent value="quiz" className="mt-6">
            <QuizView quizId={quiz!.id} videoId={video.id} questions={questions} />
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
          <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans bg-accent/40 p-4 rounded-lg">{notes.cheat_sheet}</pre>
        </Section>
      )}
    </div>
  );
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

function QuizView({ quizId, videoId, questions }: { quizId: string; videoId: string; questions: QuizQuestion[] }) {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
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
