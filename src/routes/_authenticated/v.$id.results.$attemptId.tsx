import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAttempt, getAttemptHistory, regenerateQuiz } from "@/lib/video.functions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  RotateCcw,
  Loader2,
  TrendingDown,
  TrendingUp,
  Target,
  Clock,
  Timer,
  BookOpen,
  Sparkles,
  History,
  Award,
  Minus,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/v/$id/results/$attemptId")({
  head: () => ({ meta: [{ title: "परिणाम — स्मार्टस्टडी AI" }] }),
  component: Results,
});

function formatDuration(s: number) {
  if (!s || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = s % 60;
  if (m === 0) return `${sec}से`;
  return `${m}मि ${sec}से`;
}

function Results() {
  const { id, attemptId } = Route.useParams();
  const fetcher = useServerFn(getAttempt);
  const { data, isLoading } = useQuery({
    queryKey: ["attempt", attemptId],
    queryFn: () => fetcher({ data: { id: attemptId } }),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="size-5 animate-spin mr-2" />लोड हो रहा है...
      </div>
    );
  }
  if (!data) return null;
  const { attempt, questions, video } = data;

  const total = attempt.total;
  const correct = attempt.score;
  const incorrect = total - correct;
  const pct = Math.round((correct / Math.max(total, 1)) * 100);
  const timeTaken = (attempt as { time_taken_seconds?: number }).time_taken_seconds ?? 0;
  const avgPerQ = total > 0 ? Math.round(timeTaken / total) : 0;
  const grade =
    pct >= 80 ? "उत्कृष्ट 🏆" : pct >= 60 ? "अच्छा 👍" : pct >= 40 ? "ठीक है — और अभ्यास करें" : "और मेहनत की ज़रूरत";
  const userAnswers = attempt.answers as number[];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link to="/v/$id" params={{ id }} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground gap-1">
        <ArrowLeft className="size-4" /> वीडियो पर वापस
      </Link>

      {/* Hero score */}
      <div className="rounded-3xl bg-hero p-8 sm:p-10 text-center text-primary-foreground shadow-elegant relative overflow-hidden">
        <Trophy className="size-12 mx-auto mb-4 opacity-90" />
        <p className="text-sm uppercase tracking-wider opacity-80 mb-2">आपका स्कोर</p>
        <div className="text-6xl sm:text-7xl font-extrabold tracking-tight mb-1">{pct}%</div>
        <p className="text-lg opacity-90">{correct} / {total} सही</p>
        <p className="mt-4 font-medium">{grade}</p>
      </div>

      {/* Stats dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard icon={<Target className="size-4" />} label="स्कोर" value={`${correct}/${total}`} tone="primary" />
        <StatCard icon={<CheckCircle2 className="size-4" />} label="सही" value={String(correct)} tone="success" />
        <StatCard icon={<XCircle className="size-4" />} label="गलत" value={String(incorrect)} tone="destructive" />
        <StatCard icon={<Target className="size-4" />} label="सटीकता" value={`${pct}%`} tone="primary" />
        <StatCard icon={<Clock className="size-4" />} label="कुल समय" value={formatDuration(timeTaken)} tone="muted" />
        <StatCard icon={<Timer className="size-4" />} label="औसत/प्रश्न" value={formatDuration(avgPerQ)} tone="muted" />
      </div>

      {/* Weak/strong */}
      {((attempt.weak_concepts as string[])?.length > 0 || (attempt.strong_concepts as string[])?.length > 0) && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-3"><TrendingDown className="size-4 text-destructive" /><h3 className="font-semibold">कमजोर विषय</h3></div>
            <div className="flex flex-wrap gap-2">
              {((attempt.weak_concepts as string[]) ?? []).map((c) => <Badge key={c} variant="outline" className="border-destructive/30 text-destructive">{c}</Badge>)}
              {((attempt.weak_concepts as string[]) ?? []).length === 0 && <p className="text-sm text-muted-foreground">कोई नहीं — शानदार!</p>}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-3"><TrendingUp className="size-4 text-success" /><h3 className="font-semibold">मजबूत विषय</h3></div>
            <div className="flex flex-wrap gap-2">
              {((attempt.strong_concepts as string[]) ?? []).map((c) => <Badge key={c} variant="outline" className="border-success/30 text-success">{c}</Badge>)}
              {((attempt.strong_concepts as string[]) ?? []).length === 0 && <p className="text-sm text-muted-foreground">और अभ्यास करें</p>}
            </div>
          </div>
        </div>
      )}

      {/* Per-question review */}
      <div>
        <h2 className="text-xl font-bold mb-1">विस्तृत समीक्षा</h2>
        <p className="text-sm text-muted-foreground mb-4">हर प्रश्न का उत्तर, सही विकल्प और व्याख्या देखें।</p>
        <div className="space-y-4">
          {questions.map((q, i) => {
            const userAns = userAnswers[i] ?? -1;
            const isCorrect = userAns === q.correct_index;
            const unattempted = userAns === -1;
            return (
              <div key={i} className={`rounded-2xl border-2 p-5 ${isCorrect ? "border-success/40 bg-success/5" : "border-destructive/40 bg-destructive/5"}`}>
                <div className="flex items-start gap-3 mb-3">
                  {isCorrect ? <CheckCircle2 className="size-5 text-success shrink-0 mt-0.5" /> : <XCircle className="size-5 text-destructive shrink-0 mt-0.5" />}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs">
                      <span className="text-muted-foreground">प्रश्न {i + 1}</span>
                      <Badge variant="outline" className="text-[10px]">{q.concept}</Badge>
                      <Badge variant="outline" className="text-[10px] capitalize">
                        {q.difficulty === "easy" ? "आसान" : q.difficulty === "medium" ? "मध्यम" : "कठिन"}
                      </Badge>
                      {isCorrect ? (
                        <Badge className="bg-success text-success-foreground hover:bg-success">सही</Badge>
                      ) : (
                        <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive">
                          {unattempted ? "अनुत्तरित" : "गलत"}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold leading-snug">{q.question}</h3>
                  </div>
                </div>

                {/* Answer summary row */}
                <div className="ml-8 mb-3 grid sm:grid-cols-2 gap-2 text-sm">
                  <div className="rounded-lg px-3 py-2 bg-card border border-border">
                    <span className="text-xs text-muted-foreground block">आपका उत्तर</span>
                    <span className={unattempted ? "text-muted-foreground italic" : isCorrect ? "text-success font-medium" : "text-destructive font-medium"}>
                      {unattempted ? "नहीं दिया" : `${String.fromCharCode(65 + userAns)}. ${q.options[userAns]}`}
                    </span>
                  </div>
                  <div className="rounded-lg px-3 py-2 bg-card border border-border">
                    <span className="text-xs text-muted-foreground block">सही उत्तर</span>
                    <span className="text-success font-medium">
                      {String.fromCharCode(65 + q.correct_index)}. {q.options[q.correct_index]}
                    </span>
                  </div>
                </div>

                {/* All options */}
                <div className="space-y-2 ml-8">
                  {q.options.map((opt, j) => {
                    const isUserPick = j === userAns;
                    const isRight = j === q.correct_index;
                    return (
                      <div key={j} className={`rounded-lg px-3 py-2 text-sm flex items-start gap-2 ${
                        isRight ? "bg-success/15 border border-success/40" :
                        isUserPick ? "bg-destructive/15 border border-destructive/40" :
                        "bg-card border border-border"
                      }`}>
                        <span className="font-semibold shrink-0">{String.fromCharCode(65 + j)}.</span>
                        <span className="flex-1">{opt}</span>
                        {isRight && <span className="text-xs font-semibold text-success shrink-0">सही उत्तर</span>}
                        {isUserPick && !isRight && <span className="text-xs font-semibold text-destructive shrink-0">आपका उत्तर</span>}
                      </div>
                    );
                  })}
                </div>

                <div className="ml-8 mt-3 p-3 rounded-lg bg-card border border-border">
                  <p className="text-xs font-semibold text-primary mb-1">विस्तृत समाधान</p>
                  <p className="text-sm leading-relaxed text-foreground/90">{q.explanation}</p>
                </div>

                {!isCorrect && video && (
                  <div className="ml-8 mt-3">
                    <Link to="/v/$id" params={{ id: video.id }}>
                      <Button variant="outline" size="sm" className="gap-2 border-primary/40 text-primary hover:bg-primary/5">
                        <BookOpen className="size-4" /> संबंधित नोट्स देखें
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center pt-4">
        <Link to="/v/$id" params={{ id }}>
          <Button variant="outline" className="gap-2"><RotateCcw className="size-4" /> क्विज़ दोबारा दें</Button>
        </Link>
        <Link to="/dashboard">
          <Button className="bg-hero hover:opacity-90">डैशबोर्ड पर जाएँ</Button>
        </Link>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: "primary" | "success" | "destructive" | "muted" }) {
  const toneClass =
    tone === "success" ? "text-success bg-success/10 border-success/30" :
    tone === "destructive" ? "text-destructive bg-destructive/10 border-destructive/30" :
    tone === "primary" ? "text-primary bg-primary/10 border-primary/30" :
    "text-foreground bg-muted border-border";
  return (
    <div className="rounded-xl border border-border bg-card p-3 shadow-soft">
      <div className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium border ${toneClass}`}>
        {icon} {label}
      </div>
      <div className="mt-2 text-xl font-bold tabular-nums">{value}</div>
    </div>
  );
}
