import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { u as useServerFn, p as processVideo } from "./video.functions-CnukHVXe.js";
import { useMutation } from "@tanstack/react-query";
import * as React from "react";
import { useState } from "react";
import { e as extractYouTubeId } from "./youtube-Cc2Ep5JX.js";
import { c as cn, B as Button } from "./button-BXrfXN_b.js";
import { L as Label, I as Input } from "./label-BsuFFEVs.js";
import { Sparkles, Loader2, Youtube, AlertCircle } from "lucide-react";
import { toast } from "sonner";
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
import "@radix-ui/react-label";
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
function NewVideo() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [language, setLanguage] = useState("hi");
  const [transcript, setTranscript] = useState("");
  const [showTranscript, setShowTranscript] = useState(false);
  const proc = useServerFn(processVideo);
  const mutation = useMutation({
    mutationFn: (input) => proc({
      data: input
    }),
    onSuccess: (res) => {
      toast.success("तैयार है!");
      navigate({
        to: "/v/$id",
        params: {
          id: res.id
        }
      });
    },
    onError: (e) => {
      if (e.message === "NO_TRANSCRIPT") {
        setShowTranscript(true);
        toast.error("ट्रांसक्रिप्ट स्वतः नहीं मिला। कृपया नीचे मैन्युअली पेस्ट करें।");
      } else if (e.message === "INVALID_URL") {
        toast.error("कृपया मान्य YouTube URL डालें");
      } else if (e.message.startsWith("CREDITS")) {
        toast.error("AI क्रेडिट समाप्त हो गए। कृपया अपने वर्कस्पेस में क्रेडिट जोड़ें।");
      } else if (e.message.startsWith("RATE_LIMIT")) {
        toast.error("कुछ देर बाद फिर कोशिश करें — AI व्यस्त है।");
      } else {
        toast.error(e.message || "कुछ गलत हुआ");
      }
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = extractYouTubeId(url);
    if (!id) {
      toast.error("कृपया मान्य YouTube URL डालें");
      return;
    }
    mutation.mutate({
      url,
      language,
      manualTranscript: transcript.trim() || void 0
    });
  };
  if (mutation.isPending) {
    return /* @__PURE__ */ jsxs("div", { className: "max-w-xl mx-auto py-20 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "size-16 rounded-2xl bg-hero grid place-items-center mx-auto mb-6 shadow-elegant animate-pulse", children: /* @__PURE__ */ jsx(Sparkles, { className: "size-7 text-primary-foreground" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-2", children: "AI आपके नोट्स बना रहा है" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6", children: "यह 30-60 सेकंड ले सकता है। कृपया रुकें..." }),
      /* @__PURE__ */ jsx(Loader2, { className: "size-6 animate-spin mx-auto text-primary" })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "नया वीडियो जोड़ें" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-2", children: "YouTube URL पेस्ट करें — AI नोट्स और क्विज़ बनाएगा।" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "rounded-2xl border border-border bg-card-gradient p-6 sm:p-8 shadow-soft space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(Label, { htmlFor: "url", className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsx(Youtube, { className: "size-4 text-destructive" }),
          " YouTube URL"
        ] }),
        /* @__PURE__ */ jsx(Input, { id: "url", type: "url", placeholder: "https://www.youtube.com/watch?v=...", value: url, onChange: (e) => setUrl(e.target.value), required: true, className: "h-12 text-base" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { className: "mb-2 block", children: "आउटपुट भाषा" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setLanguage("hi"), className: `rounded-xl border-2 p-4 text-left transition-all ${language === "hi" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`, children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "हिंदी" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "नोट्स और क्विज़ हिंदी में" })
          ] }),
          /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setLanguage("en"), className: `rounded-xl border-2 p-4 text-left transition-all ${language === "en" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`, children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "English" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "Notes & quiz in English" })
          ] })
        ] })
      ] }),
      showTranscript && /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-warning/10 border border-warning/30 p-4 flex gap-3", children: [
        /* @__PURE__ */ jsx(AlertCircle, { className: "size-5 text-warning shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold mb-1", children: "ट्रांसक्रिप्ट स्वतः नहीं मिला" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: 'YouTube पर वीडियो खोलें → "Show transcript" → कॉपी करें और नीचे पेस्ट करें।' })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShowTranscript(!showTranscript), className: "text-sm text-primary hover:underline mb-2", children: showTranscript ? "ट्रांसक्रिप्ट छुपाएँ" : "ट्रांसक्रिप्ट मैन्युअली पेस्ट करें (वैकल्पिक)" }),
        showTranscript && /* @__PURE__ */ jsx(Textarea, { placeholder: "वीडियो का पूरा ट्रांसक्रिप्ट यहाँ पेस्ट करें...", value: transcript, onChange: (e) => setTranscript(e.target.value), rows: 8, className: "font-mono text-xs" })
      ] }),
      /* @__PURE__ */ jsxs(Button, { type: "submit", size: "lg", className: "w-full h-12 bg-hero hover:opacity-90 text-base font-semibold", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "size-4 mr-2" }),
        " नोट्स और क्विज़ बनाएँ"
      ] })
    ] })
  ] });
}
export {
  NewVideo as component
};
