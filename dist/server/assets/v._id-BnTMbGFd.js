import { jsx, jsxs } from "react/jsx-runtime";
import { useRouterState, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { u as useServerFn, a as getVideoBundle, s as saveAttempt } from "./video.functions-DVdS0jk_.js";
import { useQuery, useMutation } from "@tanstack/react-query";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { c as cn, b as buttonVariants, B as Button } from "./button-BXrfXN_b.js";
import { B as Badge } from "./badge-B-q03HH0.js";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { Loader2, ArrowLeft, BookOpen, ListChecks, CheckCircle2, Sparkles, Clock, ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { toast } from "sonner";
import { R as Route } from "./router-Djl1bvhg.js";
import "./server-Bee8Jo-H.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
import "zod";
import "./auth-middleware-DJtYHvKR.js";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "./client-AYGnSOON.js";
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
const Progress = React.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsx(
  ProgressPrimitive.Root,
  {
    ref,
    className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
    ...props,
    children: /* @__PURE__ */ jsx(
      ProgressPrimitive.Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = ProgressPrimitive.Root.displayName;
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
function VideoWorkspace() {
  const {
    id
  } = Route.useParams();
  const search = Route.useSearch();
  const retake = search.retake === 1;
  const isResultsRoute = useRouterState({
    select: (state) => state.location.pathname.includes(`/v/${id}/results/`)
  });
  const fetcher = useServerFn(getVideoBundle);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["video", id],
    queryFn: () => fetcher({
      data: {
        id
      }
    }),
    enabled: !isResultsRoute
  });
  if (isResultsRoute) {
    return /* @__PURE__ */ jsx(Outlet, {});
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center py-20 text-muted-foreground", children: [
      /* @__PURE__ */ jsx(Loader2, { className: "size-5 animate-spin mr-2" }),
      "लोड हो रहा है..."
    ] });
  }
  if (!data) return null;
  const {
    video,
    notes,
    quiz
  } = data;
  const notesContent = notes?.content;
  const questions = quiz?.questions ?? [];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/dashboard", className: "inline-flex items-center text-sm text-muted-foreground hover:text-foreground gap-1", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { className: "size-4" }),
      " डैशबोर्ड पर वापस"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card overflow-hidden shadow-soft", children: [
      /* @__PURE__ */ jsx("div", { className: "aspect-video bg-black", children: /* @__PURE__ */ jsx("iframe", { src: `https://www.youtube.com/embed/${video.youtube_id}`, title: video.title ?? "", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, className: "w-full h-full" }) }),
      /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-xl sm:text-2xl font-bold leading-tight", children: video.title }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 flex gap-2", children: /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: video.language === "hi" ? "हिंदी" : "English" }) })
      ] })
    ] }),
    video.status === "failed" ? /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "font-semibold text-destructive mb-2", children: "AI जनरेशन विफल" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "कृपया फिर से कोशिश करें।" })
    ] }) : !notesContent || questions.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 text-center", children: [
      /* @__PURE__ */ jsx(Loader2, { className: "size-5 animate-spin mx-auto mb-2 text-primary" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "सामग्री तैयार हो रही है..." })
    ] }) : /* @__PURE__ */ jsxs(Tabs, { defaultValue: retake ? "quiz" : "notes", className: "w-full", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-2 h-12", children: [
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "notes", className: "gap-2 text-base", children: [
          /* @__PURE__ */ jsx(BookOpen, { className: "size-4" }),
          " नोट्स"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "quiz", className: "gap-2 text-base", children: [
          /* @__PURE__ */ jsx(ListChecks, { className: "size-4" }),
          " क्विज़"
        ] })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "notes", className: "mt-6", children: /* @__PURE__ */ jsx(NotesView, { notes: notesContent }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "quiz", className: "mt-6", children: /* @__PURE__ */ jsx(QuizView, { quizId: quiz.id, videoId: video.id, questions, autoStart: retake }, quiz.id + (retake ? "-retake" : "")) })
    ] })
  ] });
}
function Section({
  title,
  children,
  accent
}) {
  return /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-border bg-card p-6 shadow-soft", children: [
    /* @__PURE__ */ jsxs("h3", { className: `text-lg font-bold mb-4 flex items-center gap-2 ${accent ?? ""}`, children: [
      /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-saffron" }),
      " ",
      title
    ] }),
    children
  ] });
}
function NotesView({
  notes
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsx(Section, { title: "सारांश", children: /* @__PURE__ */ jsx("p", { className: "text-base leading-relaxed text-foreground/90", children: notes.summary }) }),
    notes.key_concepts?.length > 0 && /* @__PURE__ */ jsx(Section, { title: "मुख्य अवधारणाएँ", children: /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: notes.key_concepts.map((c, i) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-secondary/40 p-4", children: [
      /* @__PURE__ */ jsx("h4", { className: "font-semibold text-primary mb-1", children: c.title }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: c.description })
    ] }, i)) }) }),
    notes.detailed_notes?.length > 0 && /* @__PURE__ */ jsx(Section, { title: "विस्तृत नोट्स", children: /* @__PURE__ */ jsx("div", { className: "space-y-6", children: notes.detailed_notes.map((n, i) => {
      const structured = n.concept || n.explanation || n.why_it_matters || n.exam_relevance || n.example;
      return /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-border bg-card p-5 shadow-soft", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
          /* @__PURE__ */ jsx("div", { className: "size-7 shrink-0 rounded-lg bg-primary/10 text-primary grid place-items-center text-xs font-bold", children: i + 1 }),
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-lg text-ink leading-snug", children: n.heading })
        ] }),
        structured ? /* @__PURE__ */ jsxs("div", { className: "space-y-3 pl-10", children: [
          n.concept && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase tracking-wider text-primary mb-1", children: "अवधारणा" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-foreground leading-relaxed", children: n.concept })
          ] }),
          n.explanation && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1", children: "व्याख्या" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-foreground/85 leading-relaxed whitespace-pre-line", children: n.explanation })
          ] }),
          n.why_it_matters && /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-accent/40 border border-accent px-3 py-2", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase tracking-wider text-accent-foreground/70 mb-1", children: "क्यों ज़रूरी है" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-foreground leading-relaxed", children: n.why_it_matters })
          ] }),
          n.exam_relevance && /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-primary/5 border border-primary/20 px-3 py-2", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase tracking-wider text-primary mb-1", children: "परीक्षा में महत्व" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-foreground leading-relaxed", children: n.exam_relevance })
          ] }),
          n.example && /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-success/10 border border-success/30 px-3 py-2", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase tracking-wider text-success mb-1", children: "उदाहरण" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-foreground leading-relaxed whitespace-pre-line", children: n.example })
          ] })
        ] }) : /* @__PURE__ */ jsx("p", { className: "pl-10 text-sm leading-relaxed text-foreground/85 whitespace-pre-line", children: n.body })
      ] }, i);
    }) }) }),
    notes.definitions?.length > 0 && /* @__PURE__ */ jsx(Section, { title: "परिभाषाएँ", children: /* @__PURE__ */ jsx("dl", { className: "space-y-3", children: notes.definitions.map((d, i) => /* @__PURE__ */ jsxs("div", { className: "border-l-2 border-primary pl-4", children: [
      /* @__PURE__ */ jsx("dt", { className: "font-semibold", children: d.term }),
      /* @__PURE__ */ jsx("dd", { className: "text-sm text-muted-foreground mt-1", children: d.meaning })
    ] }, i)) }) }),
    notes.examples?.length > 0 && /* @__PURE__ */ jsx(Section, { title: "उदाहरण", children: /* @__PURE__ */ jsx("ul", { className: "space-y-2 list-disc pl-5 text-sm leading-relaxed", children: notes.examples.map((e, i) => /* @__PURE__ */ jsx("li", { children: e }, i)) }) }),
    notes.common_mistakes?.length > 0 && /* @__PURE__ */ jsx(Section, { title: "सामान्य गलतियाँ", children: /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm leading-relaxed", children: notes.common_mistakes.map((m, i) => /* @__PURE__ */ jsxs("li", { className: "rounded-lg bg-destructive/5 border border-destructive/20 p-3", children: [
      "⚠️ ",
      m
    ] }, i)) }) }),
    notes.exam_points?.length > 0 && /* @__PURE__ */ jsx(Section, { title: "परीक्षा के लिए महत्वपूर्ण बिंदु", children: /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm", children: notes.exam_points.map((p, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(CheckCircle2, { className: "size-4 text-success shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsx("span", { children: p })
    ] }, i)) }) }),
    notes.revision_notes?.length > 0 && /* @__PURE__ */ jsx(Section, { title: "त्वरित पुनरावृत्ति", children: /* @__PURE__ */ jsx("ul", { className: "space-y-1.5 list-decimal pl-5 text-sm", children: notes.revision_notes.map((r, i) => /* @__PURE__ */ jsx("li", { children: r }, i)) }) }),
    notes.cheat_sheet && /* @__PURE__ */ jsx(Section, { title: "एक-पृष्ठीय चीट शीट", children: /* @__PURE__ */ jsx(CheatSheetView, { data: notes.cheat_sheet }) })
  ] });
}
function cleanLine(s) {
  return s.replace(/\$\$?([^$]+)\$\$?/g, "$1").replace(/\\frac\s*\{([^}]*)\}\s*\{([^}]*)\}/g, "($1)/($2)").replace(/\\sqrt\s*\{([^}]*)\}/g, "√($1)").replace(/\\(times|cdot)/g, "×").replace(/\\div/g, "÷").replace(/\\pi/g, "π").replace(/\\(left|right)/g, "").replace(/\\[a-zA-Z]+/g, "").replace(/[*_`#>]+/g, "").replace(/^\s*[-•]\s*/, "").replace(/\s+/g, " ").trim();
}
function parseLegacyCheatSheet(text) {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const bullets = [];
  const formulas = [];
  for (const raw of lines) {
    const line = cleanLine(raw);
    if (!line) continue;
    if (/^#+\s/.test(raw)) continue;
    if (/=/.test(line) && line.length < 80) {
      const [name, ...rest] = line.split(":");
      if (rest.length && /=/.test(rest.join(":"))) {
        formulas.push({
          name: name.trim(),
          expression: rest.join(":").trim()
        });
      } else {
        formulas.push({
          name: "",
          expression: line
        });
      }
    } else {
      bullets.push(line);
    }
  }
  return {
    formulas,
    quick_concepts: bullets,
    exam_must_remember: [],
    common_mistakes: [],
    quick_tricks: []
  };
}
function CheatSheetView({
  data
}) {
  const raw = typeof data === "string" ? parseLegacyCheatSheet(data) : data;
  const cs = {
    ...raw,
    most_important: raw.most_important?.length ? raw.most_important : raw.exam_must_remember,
    frequently_asked: raw.frequently_asked,
    memory_tricks: raw.memory_tricks?.length ? raw.memory_tricks : raw.quick_tricks,
    last_minute_points: raw.last_minute_points?.length ? raw.last_minute_points : raw.quick_concepts
  };
  const hasAny = (cs.formulas?.length ?? 0) + (cs.most_important?.length ?? 0) + (cs.frequently_asked?.length ?? 0) + (cs.common_mistakes?.length ?? 0) + (cs.memory_tricks?.length ?? 0) + (cs.last_minute_points?.length ?? 0) > 0;
  if (!hasAny) {
    return /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "कोई चीट शीट उपलब्ध नहीं है।" });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
    cs.formulas && cs.formulas.length > 0 && /* @__PURE__ */ jsx(CheatBlock, { label: "📐 मुख्य सूत्र", accent: "primary", children: /* @__PURE__ */ jsx("div", { className: "grid gap-2 sm:grid-cols-2", children: cs.formulas.map((f, i) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border bg-card p-3 shadow-sm", children: [
      f.name && /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-muted-foreground mb-1", children: f.name }),
      /* @__PURE__ */ jsx("div", { className: "font-mono text-base leading-snug break-words text-foreground", children: f.expression }),
      f.when_to_use && /* @__PURE__ */ jsxs("div", { className: "mt-1.5 text-xs text-foreground/80", children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-primary", children: "कब उपयोग करें: " }),
        f.when_to_use
      ] }),
      f.trap && /* @__PURE__ */ jsxs("div", { className: "mt-1 text-xs text-destructive", children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "⚠ ट्रैप: " }),
        f.trap
      ] }),
      f.note && !f.when_to_use && !f.trap && /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: f.note })
    ] }, i)) }) }),
    cs.most_important && cs.most_important.length > 0 && /* @__PURE__ */ jsx(CheatBlock, { label: "🔥 सबसे महत्वपूर्ण", accent: "danger", children: /* @__PURE__ */ jsx(BulletList, { items: cs.most_important, dotClass: "bg-destructive" }) }),
    cs.frequently_asked && cs.frequently_asked.length > 0 && /* @__PURE__ */ jsx(CheatBlock, { label: "🎯 परीक्षा में अक्सर पूछे जाने वाले", accent: "primary", children: /* @__PURE__ */ jsx(BulletList, { items: cs.frequently_asked, dotClass: "bg-primary" }) }),
    cs.common_mistakes && cs.common_mistakes.length > 0 && /* @__PURE__ */ jsx(CheatBlock, { label: "⚠️ सामान्य गलतियाँ", accent: "warning", children: /* @__PURE__ */ jsx(BulletList, { items: cs.common_mistakes, dotClass: "bg-destructive" }) }),
    cs.memory_tricks && cs.memory_tricks.length > 0 && /* @__PURE__ */ jsx(CheatBlock, { label: "📝 याद रखने की ट्रिक्स", accent: "info", children: /* @__PURE__ */ jsx(BulletList, { items: cs.memory_tricks, dotClass: "bg-accent-foreground/60" }) }),
    cs.last_minute_points && cs.last_minute_points.length > 0 && /* @__PURE__ */ jsx(CheatBlock, { label: "📌 लास्ट मिनट रिवीजन", accent: "success", children: /* @__PURE__ */ jsx(BulletList, { items: cs.last_minute_points, dotClass: "bg-success" }) })
  ] });
}
function CheatBlock({
  label,
  accent,
  children
}) {
  const badgeClass = {
    primary: "bg-primary/10 text-primary border-primary/20",
    info: "bg-accent text-accent-foreground border-accent",
    success: "bg-success/10 text-success border-success/20",
    danger: "bg-destructive/10 text-destructive border-destructive/20",
    warning: "bg-secondary text-secondary-foreground border-secondary"
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-2 flex items-center gap-2", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badgeClass[accent]}`, children: label }) }),
    children
  ] });
}
function BulletList({
  items,
  dotClass
}) {
  return /* @__PURE__ */ jsx("ul", { className: "space-y-1.5 text-sm", children: items.map((t, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
    /* @__PURE__ */ jsx("span", { className: `mt-1.5 size-1.5 rounded-full shrink-0 ${dotClass}` }),
    /* @__PURE__ */ jsx("span", { className: "leading-relaxed", children: t })
  ] }, i)) });
}
function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}
function QuizView({
  quizId,
  videoId,
  questions,
  autoStart = false
}) {
  const navigate = useNavigate();
  const [started, setStarted] = useState(autoStart);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(() => questions.map(() => -1));
  const [elapsed, setElapsed] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const startRef = useRef(null);
  useEffect(() => {
    if (!started) return;
    startRef.current = Date.now();
    const t = setInterval(() => {
      if (startRef.current) setElapsed(Math.floor((Date.now() - startRef.current) / 1e3));
    }, 1e3);
    return () => clearInterval(t);
  }, [started]);
  const save = useServerFn(saveAttempt);
  const mut = useMutation({
    mutationFn: () => save({
      data: {
        quizId,
        videoId,
        answers,
        timeTakenSeconds: elapsed
      }
    }),
    onSuccess: async (res) => {
      setConfirmOpen(false);
      toast.success(`जमा हो गया · ${res.score}/${res.total}`);
      setTimeout(() => {
        navigate({
          to: "/v/$id/results/$attemptId",
          params: {
            id: videoId,
            attemptId: res.id
          }
        }).catch(() => {
          window.location.href = `/v/${videoId}/results/${res.id}`;
        });
      }, 50);
    },
    onError: (e) => toast.error(e.message || "सहेजने में विफल")
  });
  if (!started) {
    const counts = questions.reduce((acc, q2) => ({
      ...acc,
      [q2.difficulty]: (acc[q2.difficulty] ?? 0) + 1
    }), {});
    return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card-gradient p-8 text-center shadow-soft", children: [
      /* @__PURE__ */ jsx("div", { className: "size-14 rounded-2xl bg-hero grid place-items-center mx-auto mb-4 shadow-elegant", children: /* @__PURE__ */ jsx(Sparkles, { className: "size-6 text-primary-foreground" }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-2", children: "क्विज़ के लिए तैयार हैं?" }),
      /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mb-2", children: [
        questions.length,
        " प्रश्न · आसान ",
        counts.easy ?? 0,
        " · मध्यम ",
        counts.medium ?? 0,
        " · कठिन ",
        counts.hard ?? 0
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mb-6", children: "परीक्षा के दौरान उत्तर सही/गलत नहीं दिखाए जाएँगे। जमा करने के बाद विस्तृत विश्लेषण मिलेगा।" }),
      /* @__PURE__ */ jsx(Button, { size: "lg", className: "bg-hero hover:opacity-90", onClick: () => setStarted(true), children: "क्विज़ शुरू करें" })
    ] });
  }
  const q = questions[current];
  const progress = (current + 1) / questions.length * 100;
  const answeredCount = answers.filter((a) => a >= 0).length;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "sticky top-0 z-10 -mx-2 sm:mx-0 rounded-none sm:rounded-xl border border-border bg-card/95 backdrop-blur px-4 py-3 shadow-soft flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
        /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
          "प्रश्न ",
          current + 1
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
          " / ",
          questions.length
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "ml-3 text-xs text-muted-foreground", children: [
          "उत्तरित: ",
          answeredCount,
          "/",
          questions.length
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 font-mono text-sm tabular-nums bg-primary/10 text-primary px-3 py-1.5 rounded-lg", children: [
        /* @__PURE__ */ jsx(Clock, { className: "size-4" }),
        " ",
        formatTime(elapsed)
      ] })
    ] }),
    /* @__PURE__ */ jsx(Progress, { value: progress, className: "h-1.5" }),
    /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-border bg-card p-3", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: questions.map((_, i) => {
      const isCurrent = i === current;
      const isAnswered = answers[i] >= 0;
      return /* @__PURE__ */ jsx("button", { onClick: () => setCurrent(i), className: `size-8 rounded-md text-xs font-semibold border transition-all ${isCurrent ? "border-primary bg-primary text-primary-foreground" : isAnswered ? "border-success/40 bg-success/10 text-success" : "border-border bg-muted text-muted-foreground hover:border-primary/40"}`, children: i + 1 }, i);
    }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "capitalize", children: q.difficulty === "easy" ? "आसान" : q.difficulty === "medium" ? "मध्यम" : "कठिन" }),
        /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-[10px]", children: q.concept })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl font-semibold leading-snug mb-6", children: q.question }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3 mb-8", children: q.options.map((opt, i) => {
        const selected = answers[current] === i;
        return /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setAnswers((a) => a.map((v, idx) => idx === current ? i : v)), className: `w-full text-left rounded-xl border-2 p-4 transition-all flex items-start gap-3 ${selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`, children: [
          /* @__PURE__ */ jsx("span", { className: `size-7 rounded-lg grid place-items-center text-sm font-semibold shrink-0 ${selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`, children: String.fromCharCode(65 + i) }),
          /* @__PURE__ */ jsx("span", { className: "leading-relaxed", children: opt })
        ] }, i);
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "ghost", disabled: current === 0, onClick: () => setCurrent((c) => c - 1), className: "gap-2", children: [
          /* @__PURE__ */ jsx(ChevronLeft, { className: "size-4" }),
          " पिछला"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          current < questions.length - 1 && /* @__PURE__ */ jsxs(Button, { onClick: () => setCurrent((c) => c + 1), className: "gap-2 bg-hero hover:opacity-90", children: [
            "अगला ",
            /* @__PURE__ */ jsx(ChevronRight, { className: "size-4" })
          ] }),
          /* @__PURE__ */ jsxs(AlertDialog, { open: confirmOpen, onOpenChange: setConfirmOpen, children: [
            /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: current === questions.length - 1 ? "default" : "outline", className: "gap-2", children: [
              /* @__PURE__ */ jsx(Flag, { className: "size-4" }),
              " जमा करें"
            ] }) }),
            /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
              /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsx(AlertDialogTitle, { children: "क्विज़ जमा करें?" }),
                /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
                  "आपने ",
                  answeredCount,
                  "/",
                  questions.length,
                  " प्रश्नों के उत्तर दिए हैं। जमा करने के बाद आप उत्तर नहीं बदल सकेंगे।"
                ] })
              ] }),
              /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsx(AlertDialogCancel, { disabled: mut.isPending, children: "रद्द करें" }),
                /* @__PURE__ */ jsxs(AlertDialogAction, { disabled: mut.isPending, onClick: (e) => {
                  e.preventDefault();
                  mut.mutate();
                }, children: [
                  mut.isPending && /* @__PURE__ */ jsx(Loader2, { className: "size-4 animate-spin mr-2" }),
                  "हाँ, जमा करें"
                ] })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  VideoWorkspace as component
};
