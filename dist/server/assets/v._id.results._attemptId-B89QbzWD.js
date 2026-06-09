import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { u as useServerFn, b as getAttempt, c as getAttemptHistory, r as regenerateQuiz } from "./video.functions-BXayOPnF.js";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { B as Button } from "./button-BXrfXN_b.js";
import { B as Badge } from "./badge-B-q03HH0.js";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Trophy, Target, CheckCircle2, XCircle, Clock, Timer, TrendingDown, TrendingUp, BookOpen, Award, Minus, History, RotateCcw, Sparkles } from "lucide-react";
import { a as Route } from "./router-D65MzHkb.js";
import "react";
import "./server-CzRGUrwi.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
import "zod";
import "./auth-middleware-uIcXcC6I.js";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "./client-AYGnSOON.js";
function formatDuration(s) {
  if (!s || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = s % 60;
  if (m === 0) return `${sec}से`;
  return `${m}मि ${sec}से`;
}
function Results() {
  const {
    id,
    attemptId
  } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fetcher = useServerFn(getAttempt);
  const historyFetcher = useServerFn(getAttemptHistory);
  const regen = useServerFn(regenerateQuiz);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["attempt", attemptId],
    queryFn: () => fetcher({
      data: {
        id: attemptId
      }
    })
  });
  const {
    data: history
  } = useQuery({
    queryKey: ["attempt-history", id],
    queryFn: () => historyFetcher({
      data: {
        videoId: id
      }
    })
  });
  const regenMut = useMutation({
    mutationFn: () => regen({
      data: {
        videoId: id
      }
    }),
    onSuccess: () => {
      toast.success("नया क्विज़ तैयार है!");
      qc.invalidateQueries({
        queryKey: ["video", id]
      });
      navigate({
        to: "/v/$id",
        params: {
          id
        },
        search: {
          retake: 1
        }
      });
    },
    onError: (e) => toast.error(e.message || "क्विज़ बनाने में विफल")
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center py-20 text-muted-foreground", children: [
      /* @__PURE__ */ jsx(Loader2, { className: "size-5 animate-spin mr-2" }),
      "लोड हो रहा है..."
    ] });
  }
  if (!data) return null;
  const {
    attempt,
    questions,
    video
  } = data;
  const total = attempt.total;
  const correct = attempt.score;
  const incorrect = total - correct;
  const pct = Math.round(correct / Math.max(total, 1) * 100);
  const timeTaken = attempt.time_taken_seconds ?? 0;
  const avgPerQ = total > 0 ? Math.round(timeTaken / total) : 0;
  const grade = pct >= 80 ? "उत्कृष्ट 🏆" : pct >= 60 ? "अच्छा 👍" : pct >= 40 ? "ठीक है — और अभ्यास करें" : "और मेहनत की ज़रूरत";
  const userAnswers = attempt.answers;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/v/$id", params: {
      id
    }, className: "inline-flex items-center text-sm text-muted-foreground hover:text-foreground gap-1", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { className: "size-4" }),
      " वीडियो पर वापस"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-3xl bg-hero p-8 sm:p-10 text-center text-primary-foreground shadow-elegant relative overflow-hidden", children: [
      /* @__PURE__ */ jsx(Trophy, { className: "size-12 mx-auto mb-4 opacity-90" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm uppercase tracking-wider opacity-80 mb-2", children: "आपका स्कोर" }),
      /* @__PURE__ */ jsxs("div", { className: "text-6xl sm:text-7xl font-extrabold tracking-tight mb-1", children: [
        pct,
        "%"
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-lg opacity-90", children: [
        correct,
        " / ",
        total,
        " सही"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 font-medium", children: grade })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3", children: [
      /* @__PURE__ */ jsx(StatCard, { icon: /* @__PURE__ */ jsx(Target, { className: "size-4" }), label: "स्कोर", value: `${correct}/${total}`, tone: "primary" }),
      /* @__PURE__ */ jsx(StatCard, { icon: /* @__PURE__ */ jsx(CheckCircle2, { className: "size-4" }), label: "सही", value: String(correct), tone: "success" }),
      /* @__PURE__ */ jsx(StatCard, { icon: /* @__PURE__ */ jsx(XCircle, { className: "size-4" }), label: "गलत", value: String(incorrect), tone: "destructive" }),
      /* @__PURE__ */ jsx(StatCard, { icon: /* @__PURE__ */ jsx(Target, { className: "size-4" }), label: "सटीकता", value: `${pct}%`, tone: "primary" }),
      /* @__PURE__ */ jsx(StatCard, { icon: /* @__PURE__ */ jsx(Clock, { className: "size-4" }), label: "कुल समय", value: formatDuration(timeTaken), tone: "muted" }),
      /* @__PURE__ */ jsx(StatCard, { icon: /* @__PURE__ */ jsx(Timer, { className: "size-4" }), label: "औसत/प्रश्न", value: formatDuration(avgPerQ), tone: "muted" })
    ] }),
    (attempt.weak_concepts?.length > 0 || attempt.strong_concepts?.length > 0) && /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsx(TrendingDown, { className: "size-4 text-destructive" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "कमजोर विषय" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
          (attempt.weak_concepts ?? []).map((c) => /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-destructive/30 text-destructive", children: c }, c)),
          (attempt.weak_concepts ?? []).length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "कोई नहीं — शानदार!" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsx(TrendingUp, { className: "size-4 text-success" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "मजबूत विषय" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
          (attempt.strong_concepts ?? []).map((c) => /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-success/30 text-success", children: c }, c)),
          (attempt.strong_concepts ?? []).length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "और अभ्यास करें" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-1", children: "विस्तृत समीक्षा" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "हर प्रश्न का उत्तर, सही विकल्प और व्याख्या देखें।" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: questions.map((q, i) => {
        const userAns = userAnswers[i] ?? -1;
        const isCorrect = userAns === q.correct_index;
        const unattempted = userAns === -1;
        return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border-2 p-5 ${isCorrect ? "border-success/40 bg-success/5" : "border-destructive/40 bg-destructive/5"}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
            isCorrect ? /* @__PURE__ */ jsx(CheckCircle2, { className: "size-5 text-success shrink-0 mt-0.5" }) : /* @__PURE__ */ jsx(XCircle, { className: "size-5 text-destructive shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1.5 text-xs", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
                  "प्रश्न ",
                  i + 1
                ] }),
                /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-[10px]", children: q.concept }),
                /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-[10px] capitalize", children: q.difficulty === "easy" ? "आसान" : q.difficulty === "medium" ? "मध्यम" : "कठिन" }),
                isCorrect ? /* @__PURE__ */ jsx(Badge, { className: "bg-success text-success-foreground hover:bg-success", children: "सही" }) : /* @__PURE__ */ jsx(Badge, { className: "bg-destructive text-destructive-foreground hover:bg-destructive", children: unattempted ? "अनुत्तरित" : "गलत" })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "font-semibold leading-snug", children: q.question })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ml-8 mb-3 grid sm:grid-cols-2 gap-2 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg px-3 py-2 bg-card border border-border", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground block", children: "आपका उत्तर" }),
              /* @__PURE__ */ jsx("span", { className: unattempted ? "text-muted-foreground italic" : isCorrect ? "text-success font-medium" : "text-destructive font-medium", children: unattempted ? "नहीं दिया" : `${String.fromCharCode(65 + userAns)}. ${q.options[userAns]}` })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg px-3 py-2 bg-card border border-border", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground block", children: "सही उत्तर" }),
              /* @__PURE__ */ jsxs("span", { className: "text-success font-medium", children: [
                String.fromCharCode(65 + q.correct_index),
                ". ",
                q.options[q.correct_index]
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2 ml-8", children: q.options.map((opt, j) => {
            const isUserPick = j === userAns;
            const isRight = j === q.correct_index;
            return /* @__PURE__ */ jsxs("div", { className: `rounded-lg px-3 py-2 text-sm flex items-start gap-2 ${isRight ? "bg-success/15 border border-success/40" : isUserPick ? "bg-destructive/15 border border-destructive/40" : "bg-card border border-border"}`, children: [
              /* @__PURE__ */ jsxs("span", { className: "font-semibold shrink-0", children: [
                String.fromCharCode(65 + j),
                "."
              ] }),
              /* @__PURE__ */ jsx("span", { className: "flex-1", children: opt }),
              isRight && /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-success shrink-0", children: "सही उत्तर" }),
              isUserPick && !isRight && /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-destructive shrink-0", children: "आपका उत्तर" })
            ] }, j);
          }) }),
          /* @__PURE__ */ jsxs("div", { className: "ml-8 mt-3 p-3 rounded-lg bg-card border border-border", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-primary mb-1", children: "विस्तृत समाधान" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-foreground/90", children: q.explanation })
          ] }),
          !isCorrect && video && /* @__PURE__ */ jsx("div", { className: "ml-8 mt-3", children: /* @__PURE__ */ jsx(Link, { to: "/v/$id", params: {
            id: video.id
          }, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "gap-2 border-primary/40 text-primary hover:bg-primary/5", children: [
            /* @__PURE__ */ jsx(BookOpen, { className: "size-4" }),
            " संबंधित नोट्स देखें"
          ] }) }) })
        ] }, i);
      }) })
    ] }),
    history && history.attempts.length > 0 && /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsx(Award, { className: "size-4 text-primary" }),
        /* @__PURE__ */ jsx("h2", { className: "font-bold", children: "आपकी प्रगति इस वीडियो पर" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsx(StatCard, { icon: /* @__PURE__ */ jsx(Trophy, { className: "size-4" }), label: "बेस्ट स्कोर", value: `${history.stats.best}%`, tone: "success" }),
        /* @__PURE__ */ jsx(StatCard, { icon: /* @__PURE__ */ jsx(Target, { className: "size-4" }), label: "नवीनतम", value: `${history.stats.latest}%`, tone: "primary" }),
        /* @__PURE__ */ jsx(StatCard, { icon: /* @__PURE__ */ jsx(TrendingUp, { className: "size-4" }), label: "औसत", value: `${history.stats.avg}%`, tone: "muted" }),
        /* @__PURE__ */ jsx(StatCard, { icon: history.stats.improvement > 0 ? /* @__PURE__ */ jsx(TrendingUp, { className: "size-4" }) : history.stats.improvement < 0 ? /* @__PURE__ */ jsx(TrendingDown, { className: "size-4" }) : /* @__PURE__ */ jsx(Minus, { className: "size-4" }), label: "सुधार", value: history.stats.improvement > 0 ? `+${history.stats.improvement}%` : `${history.stats.improvement}%`, tone: history.stats.improvement > 0 ? "success" : history.stats.improvement < 0 ? "destructive" : "muted" })
      ] })
    ] }),
    history && history.attempts.length > 1 && /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsx(History, { className: "size-4 text-primary" }),
        /* @__PURE__ */ jsxs("h2", { className: "font-bold", children: [
          "सभी प्रयास (",
          history.attempts.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: history.attempts.map((a) => {
        const pct2 = Math.round(a.score / Math.max(a.total, 1) * 100);
        const isCurrent = a.id === attemptId;
        return /* @__PURE__ */ jsxs(Link, { to: "/v/$id/results/$attemptId", params: {
          id,
          attemptId: a.id
        }, className: `flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${isCurrent ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/40"}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "shrink-0", children: [
              "v",
              a.quiz_version
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxs("p", { className: "font-medium", children: [
                a.score,
                "/",
                a.total,
                " · ",
                pct2,
                "%"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: new Date(a.completed_at).toLocaleString("hi-IN", {
                dateStyle: "medium",
                timeStyle: "short"
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Clock, { className: "size-3" }),
              formatDuration(a.time_taken_seconds ?? 0)
            ] }),
            isCurrent && /* @__PURE__ */ jsx(Badge, { className: "bg-primary text-primary-foreground", children: "यह प्रयास" })
          ] })
        ] }, a.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 justify-center pt-4", children: [
      /* @__PURE__ */ jsx(Link, { to: "/v/$id", params: {
        id
      }, search: {
        retake: 1
      }, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "gap-2", children: [
        /* @__PURE__ */ jsx(RotateCcw, { className: "size-4" }),
        " फिर से अभ्यास करें"
      ] }) }),
      /* @__PURE__ */ jsxs(Button, { className: "bg-hero hover:opacity-90 gap-2", disabled: regenMut.isPending, onClick: () => regenMut.mutate(), children: [
        regenMut.isPending ? /* @__PURE__ */ jsx(Loader2, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsx(Sparkles, { className: "size-4" }),
        "नया क्विज़ बनाएँ"
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsx(Button, { variant: "ghost", children: "डैशबोर्ड पर जाएँ" }) })
    ] })
  ] });
}
function StatCard({
  icon,
  label,
  value,
  tone
}) {
  const toneClass = tone === "success" ? "text-success bg-success/10 border-success/30" : tone === "destructive" ? "text-destructive bg-destructive/10 border-destructive/30" : tone === "primary" ? "text-primary bg-primary/10 border-primary/30" : "text-foreground bg-muted border-border";
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-3 shadow-soft", children: [
    /* @__PURE__ */ jsxs("div", { className: `inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium border ${toneClass}`, children: [
      icon,
      " ",
      label
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-2 text-xl font-bold tabular-nums", children: value })
  ] });
}
export {
  Results as component
};
