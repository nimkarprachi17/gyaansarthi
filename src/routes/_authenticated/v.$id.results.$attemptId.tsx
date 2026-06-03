import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getAttempt } from "@/lib/video.functions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, CheckCircle2, XCircle, ArrowLeft, RotateCcw, Loader2, TrendingDown, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/_authenticated/v/$id/results/$attemptId")({
  head: () => ({ meta: [{ title: "परिणाम — स्मार्टस्टडी AI" }] }),
  component: Results,
});

function Results() {
  const { id, attemptId } = Route.useParams();
  const fetcher = useServerFn(getAttempt);
  const { data, isLoading } = useQuery({
    queryKey: ["attempt", attemptId],
    queryFn: () => fetcher({ data: { id: attemptId } }),
  });

  if (isLoading) {
    return <div className="flex items-center justify-center py-20 text-muted-foreground"><Loader2 className="size-5 animate-spin mr-2" />लोड हो रहा है...</div>;
  }
  if (!data) return null;
  const { attempt, questions, video } = data;

  const pct = Math.round((attempt.score / Math.max(attempt.total, 1)) * 100);
  const grade = pct >= 80 ? "उत्कृष्ट 🏆" : pct >= 60 ? "अच्छा 👍" : pct >= 40 ? "ठीक है — और अभ्यास करें" : "और मेहनत की ज़रूरत";
  const userAnswers = attempt.answers as number[];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Link to="/v/$id" params={{ id }} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground gap-1">
        <ArrowLeft className="size-4" /> वीडियो पर वापस
      </Link>

      {/* Hero score */}
      <div className="rounded-3xl bg-hero p-8 sm:p-10 text-center text-primary-foreground shadow-elegant relative overflow-hidden">
        <Trophy className="size-12 mx-auto mb-4 opacity-90" />
        <p className="text-sm uppercase tracking-wider opacity-80 mb-2">आपका स्कोर</p>
        <div className="text-6xl sm:text-7xl font-extrabold tracking-tight mb-1">{pct}%</div>
        <p className="text-lg opacity-90">{attempt.score} / {attempt.total} सही</p>
        <p className="mt-4 font-medium">{grade}</p>
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
        <h2 className="text-xl font-bold mb-4">उत्तर समीक्षा</h2>
        <div className="space-y-4">
          {questions.map((q, i) => {
            const userAns = userAnswers[i] ?? -1;
            const isCorrect = userAns === q.correct_index;
            return (
              <div key={i} className={`rounded-2xl border-2 p-5 ${isCorrect ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"}`}>
                <div className="flex items-start gap-3 mb-3">
                  {isCorrect ? <CheckCircle2 className="size-5 text-success shrink-0 mt-0.5" /> : <XCircle className="size-5 text-destructive shrink-0 mt-0.5" />}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 text-xs">
                      <span className="text-muted-foreground">प्रश्न {i + 1}</span>
                      <Badge variant="outline" className="text-[10px]">{q.concept}</Badge>
                    </div>
                    <h3 className="font-semibold leading-snug">{q.question}</h3>
                  </div>
                </div>
                <div className="space-y-2 ml-8">
                  {q.options.map((opt, j) => {
                    const isUserPick = j === userAns;
                    const isRight = j === q.correct_index;
                    return (
                      <div key={j} className={`rounded-lg px-3 py-2 text-sm flex items-start gap-2 ${
                        isRight ? "bg-success/15 border border-success/30" :
                        isUserPick ? "bg-destructive/15 border border-destructive/30" :
                        "bg-card border border-border"
                      }`}>
                        <span className="font-semibold shrink-0">{String.fromCharCode(65 + j)}.</span>
                        <span className="flex-1">{opt}</span>
                        {isRight && <span className="text-xs font-semibold text-success">सही उत्तर</span>}
                        {isUserPick && !isRight && <span className="text-xs font-semibold text-destructive">आपका उत्तर</span>}
                      </div>
                    );
                  })}
                </div>
                <div className="ml-8 mt-3 p-3 rounded-lg bg-card border border-border">
                  <p className="text-xs font-semibold text-primary mb-1">विस्तृत समाधान</p>
                  <p className="text-sm leading-relaxed text-foreground/90">{q.explanation}</p>
                </div>
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
