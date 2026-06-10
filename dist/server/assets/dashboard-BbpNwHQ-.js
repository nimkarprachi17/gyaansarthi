import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { u as useServerFn, g as getDashboard } from "./video.functions-CnukHVXe.js";
import { useQuery } from "@tanstack/react-query";
import { y as youtubeThumb } from "./youtube-Cc2Ep5JX.js";
import { Loader2, Plus, Video, ListChecks, Target, Trophy, Flame, TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { B as Button } from "./button-BXrfXN_b.js";
import { B as Badge } from "./badge-B-q03HH0.js";
import "react";
import "./server-Bod7FD6f.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
import "zod";
import "./auth-middleware-CJs7VfH6.js";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function StatCard({
  icon: Icon,
  label,
  value,
  accent
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-soft", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("span", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: label }),
      /* @__PURE__ */ jsx("div", { className: `size-9 rounded-lg grid place-items-center ${accent ?? "bg-primary/10 text-primary"}`, children: /* @__PURE__ */ jsx(Icon, { className: "size-4" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-3 text-3xl font-bold tracking-tight", children: value })
  ] });
}
function Dashboard() {
  const fetchDash = useServerFn(getDashboard);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchDash()
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center py-20 text-muted-foreground", children: [
      /* @__PURE__ */ jsx(Loader2, { className: "size-5 animate-spin mr-2" }),
      "लोड हो रहा है..."
    ] });
  }
  if (!data) return null;
  const {
    profile,
    videos,
    stats,
    weakAreas,
    strongAreas,
    trend
  } = data;
  const name = profile?.display_name ?? "छात्र";
  const trendData = trend ?? [];
  const maxPct = 100;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "स्वागत है," }),
        /* @__PURE__ */ jsxs("h1", { className: "text-3xl sm:text-4xl font-bold tracking-tight", children: [
          name,
          " 👋"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-2", children: "आपकी सीखने की यात्रा एक नज़र में" })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/new", children: /* @__PURE__ */ jsxs(Button, { size: "lg", className: "bg-hero hover:opacity-90 gap-2 shadow-elegant", children: [
        /* @__PURE__ */ jsx(Plus, { className: "size-4" }),
        " नया वीडियो"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-5 gap-4", children: [
      /* @__PURE__ */ jsx(StatCard, { icon: Video, label: "कुल वीडियो", value: stats.totalVideos }),
      /* @__PURE__ */ jsx(StatCard, { icon: ListChecks, label: "क्विज़ प्रयास", value: stats.totalAttempts, accent: "bg-accent text-accent-foreground" }),
      /* @__PURE__ */ jsx(StatCard, { icon: Target, label: "औसत सटीकता", value: `${stats.avgScore}%`, accent: "bg-success/15 text-success" }),
      /* @__PURE__ */ jsx(StatCard, { icon: Trophy, label: "बेस्ट स्कोर", value: `${stats.bestScore}%`, accent: "bg-primary/15 text-primary" }),
      /* @__PURE__ */ jsx(StatCard, { icon: Flame, label: "लगातार दिन", value: stats.streak, accent: "bg-saffron/15 text-saffron" })
    ] }),
    trendData.length >= 2 && /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsx(TrendingUp, { className: "size-4 text-primary" }),
        /* @__PURE__ */ jsxs("h3", { className: "font-semibold", children: [
          "सीखने का ट्रेंड (अंतिम ",
          trendData.length,
          " प्रयास)"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-end gap-2 h-32", children: trendData.map((t, i) => /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center justify-end gap-1 group", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-semibold text-muted-foreground opacity-0 group-hover:opacity-100 transition", children: [
          t.pct,
          "%"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full rounded-t-md bg-gradient-to-t from-primary to-primary-glow transition-all", style: {
          height: `${t.pct / maxPct * 100}%`,
          minHeight: "4px"
        }, title: `${t.pct}% · ${new Date(t.date).toLocaleDateString("hi-IN")}` })
      ] }, i)) })
    ] }),
    (weakAreas.length > 0 || strongAreas.length > 0) && /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsx(TrendingDown, { className: "size-4 text-destructive" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "कमजोर विषय" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: weakAreas.length > 0 ? weakAreas.map((w) => /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-destructive/30 text-destructive", children: w }, w)) : /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "अभी पर्याप्त डेटा नहीं" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsx(TrendingUp, { className: "size-4 text-success" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "मजबूत विषय" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: strongAreas.length > 0 ? strongAreas.map((w) => /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-success/30 text-success", children: w }, w)) : /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "अभी पर्याप्त डेटा नहीं" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-4", children: "हाल के वीडियो" }),
      videos.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-card-gradient p-12 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "size-14 rounded-2xl bg-hero grid place-items-center mx-auto mb-4 shadow-elegant", children: /* @__PURE__ */ jsx(Sparkles, { className: "size-6 text-primary-foreground" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-1", children: "अभी तक कोई वीडियो नहीं" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "एक YouTube URL पेस्ट करके शुरुआत करें।" }),
        /* @__PURE__ */ jsx(Link, { to: "/new", children: /* @__PURE__ */ jsxs(Button, { className: "bg-hero hover:opacity-90 gap-2", children: [
          /* @__PURE__ */ jsx(Plus, { className: "size-4" }),
          " पहला वीडियो जोड़ें"
        ] }) })
      ] }) : /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: videos.map((v) => /* @__PURE__ */ jsx(Link, { to: "/v/$id", params: {
        id: v.id
      }, className: "group", children: /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-elegant hover:border-primary/40 transition-all", children: [
        /* @__PURE__ */ jsxs("div", { className: "aspect-video bg-muted overflow-hidden relative", children: [
          /* @__PURE__ */ jsx("img", { src: youtubeThumb(v.youtube_id), alt: v.title ?? "", className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300", loading: "lazy" }),
          /* @__PURE__ */ jsxs("div", { className: "absolute top-2 right-2 flex gap-1.5", children: [
            /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-[10px]", children: v.language === "hi" ? "हिंदी" : "EN" }),
            v.status === "processing" && /* @__PURE__ */ jsx(Badge, { className: "bg-warning text-warning-foreground text-[10px]", children: "प्रोसेसिंग" }),
            v.status === "failed" && /* @__PURE__ */ jsx(Badge, { variant: "destructive", className: "text-[10px]", children: "विफल" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold line-clamp-2 group-hover:text-primary transition-colors", children: v.title ?? "बिना शीर्षक" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-2", children: new Date(v.created_at).toLocaleDateString("hi-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
          }) })
        ] })
      ] }) }, v.id)) })
    ] })
  ] });
}
export {
  Dashboard as component
};
