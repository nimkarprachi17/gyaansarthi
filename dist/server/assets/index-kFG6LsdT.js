import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Sparkles, GraduationCap, CheckCircle2, FileText, Brain, ClipboardList, BarChart3, Zap, BookOpen, Youtube } from "lucide-react";
import { B as Button } from "./button-BXrfXN_b.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
const features = [{
  icon: FileText,
  title: "AI-निर्मित नोट्स",
  desc: "कोचिंग-स्तर के टॉपिक-वाइज़ नोट्स — सारांश, अवधारणाएँ, उदाहरण।"
}, {
  icon: Brain,
  title: "परीक्षा-स्तर के MCQ",
  desc: "रट्टा नहीं — एप्लीकेशन और परिदृश्य पर आधारित 10+ कठिन प्रश्न।"
}, {
  icon: ClipboardList,
  title: "विस्तृत समाधान",
  desc: "हर प्रश्न के लिए विस्तृत व्याख्या — क्यों सही, क्यों गलत।"
}, {
  icon: BarChart3,
  title: "प्रगति ट्रैकिंग",
  desc: "कमजोर और मजबूत विषयों का व्यक्तिगत विश्लेषण।"
}, {
  icon: Zap,
  title: "स्मार्ट चीट शीट",
  desc: "5 मिनट में रिवीज़न के लिए हाई-यील्ड पॉइंट्स।"
}, {
  icon: BookOpen,
  title: "हिंदी + English",
  desc: "दोनों भाषाओं में पूर्ण समर्थन।"
}];
const audience = ["CTET", "UPSC", "JEE", "Engineering", "CA", "Competitive Exams"];
const steps = [{
  n: "1",
  t: "YouTube लिंक पेस्ट करें",
  d: "किसी भी शैक्षणिक वीडियो का URL।"
}, {
  n: "2",
  t: "नोट्स प्राप्त करें",
  d: "AI टॉपिक-वाइज़ नोट्स तैयार करता है।"
}, {
  n: "3",
  t: "क्विज़ हल करें",
  d: "परीक्षा-स्तर के MCQ का अभ्यास।"
}, {
  n: "4",
  t: "परिणाम देखें",
  d: "विस्तृत समाधान + विश्लेषण।"
}, {
  n: "5",
  t: "बेहतर सीखें",
  d: "कमजोर विषयों पर ध्यान केंद्रित करें।"
}];
function Landing() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx("header", { className: "border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-40", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "size-9 rounded-lg bg-hero shadow-soft grid place-items-center", children: /* @__PURE__ */ jsx(Sparkles, { className: "size-5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxs("span", { className: "font-bold text-lg tracking-tight", children: [
          "ज्ञानसारथी ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "AI" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "ml-1 inline-flex items-center rounded-full bg-primary/10 text-primary text-[10px] font-semibold px-1.5 py-0.5 uppercase tracking-wider", children: "Beta" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Link, { to: "/auth", children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", children: "साइन इन" }) }),
        /* @__PURE__ */ jsx(Link, { to: "/auth", children: /* @__PURE__ */ jsx(Button, { size: "sm", className: "bg-primary hover:bg-primary/90", children: "शुरू करें" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden border-b border-border/60", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 -z-10 opacity-[0.07]", style: {
        backgroundImage: "radial-gradient(circle at 20% 10%, hsl(var(--primary)/0.6), transparent 45%), radial-gradient(circle at 85% 30%, hsl(var(--saffron)/0.5), transparent 50%)"
      }, "aria-hidden": true }),
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-4xl px-4 sm:px-6 pt-16 pb-14 sm:pt-24 sm:pb-20 text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground mb-7 shadow-soft", children: [
          /* @__PURE__ */ jsx(GraduationCap, { className: "size-3.5 text-saffron" }),
          "हिंदी-फर्स्ट लर्निंग प्लेटफ़ॉर्म"
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.02]", children: /* @__PURE__ */ jsx("span", { className: "bg-hero bg-clip-text text-transparent", children: "ज्ञानसारथी AI" }) }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 text-xl sm:text-2xl font-semibold text-foreground max-w-3xl mx-auto text-balance leading-snug", children: "YouTube वीडियो को बदलें विस्तृत नोट्स, परीक्षा-स्तर के MCQ, विस्तृत समाधान और व्यक्तिगत अध्ययन विश्लेषण में।" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto", children: "CTET, UPSC, JEE, Engineering, CA और अन्य प्रतियोगी परीक्षाओं के लिए।" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-9 flex flex-col sm:flex-row justify-center gap-3", children: [
          /* @__PURE__ */ jsx(Link, { to: "/auth", className: "w-full sm:w-auto", children: /* @__PURE__ */ jsx(Button, { size: "lg", className: "w-full sm:w-auto bg-hero hover:opacity-90 text-primary-foreground shadow-elegant h-12 px-8 text-base", children: "अभी मुफ़्त शुरू करें" }) }),
          /* @__PURE__ */ jsx("a", { href: "#how", className: "w-full sm:w-auto", children: /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", className: "w-full sm:w-auto h-12 px-8 text-base", children: "कैसे काम करता है" }) })
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 max-w-2xl mx-auto text-left text-sm", children: ["YouTube वीडियो से स्वतः नोट्स", "परीक्षा-स्तर के MCQ", "विस्तृत समाधान", "प्रगति विश्लेषण", "स्मार्ट रिवीजन चीट शीट", "हिंदी + English सपोर्ट"].map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-foreground/85", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "size-4 text-primary mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsx("span", { children: item })
        ] }, item)) }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 flex flex-wrap justify-center gap-2", children: audience.map((a) => /* @__PURE__ */ jsx("span", { className: "rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground", children: a }, a)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-14 mx-auto max-w-2xl rounded-2xl border border-border bg-card shadow-elegant overflow-hidden text-left", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-muted/50 border-b border-border px-4 py-2.5 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "size-2.5 rounded-full bg-red-400" }),
            /* @__PURE__ */ jsx("div", { className: "size-2.5 rounded-full bg-yellow-400" }),
            /* @__PURE__ */ jsx("div", { className: "size-2.5 rounded-full bg-green-400" }),
            /* @__PURE__ */ jsx("span", { className: "ml-2 text-xs text-muted-foreground", children: "ज्ञानसारथी AI — नोट्स" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 space-y-4 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-background p-3.5", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-wide mb-1", children: "अवधारणा" }),
              /* @__PURE__ */ jsx("p", { className: "text-foreground/80 text-xs leading-relaxed", children: "कृषि मजदूर मौसमी रोजगार की स्थिति में जीते हैं — बुवाई, निराई और कटाई के दौरान ही काम मिलता है।" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-background p-3.5", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1", children: "परीक्षा में महत्व" }),
              /* @__PURE__ */ jsx("p", { className: "text-foreground/80 text-xs leading-relaxed", children: "Assertion-Reasoning प्रश्नों में पूछा जाता है — मजदूर गरीब क्यों रहते हैं, इसका कारण बताएं।" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-background p-3.5", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-red-500 uppercase tracking-wide mb-1", children: "सामान्य गलतियाँ" }),
              /* @__PURE__ */ jsx("p", { className: "text-foreground/80 text-xs leading-relaxed", children: "Red Fort को Sandstone समझना सही है, Taj Mahal को नहीं — वो Metamorphic Marble है।" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-background p-3.5", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-green-600 uppercase tracking-wide mb-1", children: "याद करने की ट्रिक" }),
              /* @__PURE__ */ jsx("p", { className: "text-foreground/80 text-xs leading-relaxed", children: "NIFE: Ni (Nickel) + FE (Ferrous/Iron) = Earth's Core. PPP: Patwari-Paimaish-Paper।" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-10 sm:mb-12", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl font-bold tracking-tight", children: [
          "क्यों चुनें ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "ज्ञानसारथी AI" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted-foreground max-w-xl mx-auto", children: "परीक्षा की तैयारी के लिए ज़रूरी हर टूल — एक ही जगह।" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5", children: features.map((f, i) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card-gradient p-6 shadow-soft hover:shadow-elegant hover:border-primary/30 transition-all", children: [
        /* @__PURE__ */ jsx("div", { className: "size-11 rounded-xl bg-primary/10 grid place-items-center mb-4", children: /* @__PURE__ */ jsx(f.icon, { className: "size-5 text-primary" }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-base mb-1.5", children: f.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: f.desc })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { id: "how", className: "mx-auto max-w-6xl px-4 sm:px-6 py-16 scroll-mt-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-bold tracking-tight", children: "कैसे काम करता है" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted-foreground", children: "सिर्फ़ 5 आसान कदम।" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-5 gap-4", children: steps.map((s) => /* @__PURE__ */ jsxs("div", { className: "relative rounded-2xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsx("div", { className: "size-10 rounded-full bg-hero text-primary-foreground grid place-items-center font-bold text-base shadow-elegant mb-3", children: s.n }),
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-1.5", children: s.t }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: s.d })
      ] }, s.n)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-4xl px-4 sm:px-6 py-12", children: /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-border bg-card p-6 sm:p-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "size-10 rounded-xl bg-primary/10 grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "size-5 text-primary" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-semibold mb-1", children: [
          /* @__PURE__ */ jsx("span", { className: "inline-flex items-center rounded-full bg-primary/10 text-primary text-[10px] font-semibold px-1.5 py-0.5 uppercase tracking-wider mr-2 align-middle", children: "Beta" }),
          "सक्रिय रूप से विकसित किया जा रहा है"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "ज्ञानसारथी AI लगातार बेहतर बनाया जा रहा है। आपके सुझाव स्वागत योग्य हैं।" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-4xl px-4 sm:px-6 py-20", children: /* @__PURE__ */ jsxs("div", { className: "rounded-3xl bg-hero p-10 sm:p-14 text-center shadow-elegant", children: [
      /* @__PURE__ */ jsx(Youtube, { className: "size-12 text-primary-foreground/90 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-primary-foreground mb-3", children: "अभी से बेहतर पढ़ाई शुरू करें" }),
      /* @__PURE__ */ jsx("p", { className: "text-primary-foreground/80 max-w-xl mx-auto mb-8", children: "एक खाता बनाएँ और आज ही पहला वीडियो प्रोसेस करें — पूरी तरह मुफ़्त।" }),
      /* @__PURE__ */ jsx(Link, { to: "/auth", children: /* @__PURE__ */ jsx(Button, { size: "lg", variant: "secondary", className: "h-12 px-8 text-base font-semibold", children: "मुफ़्त खाता बनाएँ" }) })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { className: "border-t border-border py-8 text-center text-sm text-muted-foreground", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { children: "© ज्ञानसारथी AI" }),
      /* @__PURE__ */ jsx("span", { children: "·" }),
      /* @__PURE__ */ jsx("span", { children: "हिंदी-फर्स्ट लर्निंग" }),
      /* @__PURE__ */ jsx("span", { className: "inline-flex items-center rounded-full bg-primary/10 text-primary text-[10px] font-semibold px-1.5 py-0.5 uppercase tracking-wider", children: "Beta" })
    ] }) })
  ] });
}
export {
  Landing as component
};
