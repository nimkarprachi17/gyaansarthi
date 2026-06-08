import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  BookOpen,
  Brain,
  Trophy,
  Youtube,
  Zap,
  FileText,
  ClipboardList,
  BarChart3,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ज्ञानसारथी AI — YouTube से नोट्स, MCQ और परीक्षा-तैयारी" },
      {
        name: "description",
        content:
          "किसी भी शैक्षणिक YouTube वीडियो को विस्तृत नोट्स, परीक्षा-स्तर के MCQ, विस्तृत समाधान और व्यक्तिगत अध्ययन विश्लेषण में बदलें।",
      },
      { property: "og:title", content: "ज्ञानसारथी AI — YouTube से नोट्स और MCQ" },
      {
        property: "og:description",
        content:
          "किसी भी शैक्षणिक YouTube वीडियो को विस्तृत नोट्स, परीक्षा-स्तर के MCQ और व्यक्तिगत अध्ययन विश्लेषण में बदलें।",
      },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: FileText, title: "AI-निर्मित नोट्स", desc: "कोचिंग-स्तर के टॉपिक-वाइज़ नोट्स — सारांश, अवधारणाएँ, उदाहरण।" },
  { icon: Brain, title: "परीक्षा-स्तर के MCQ", desc: "रट्टा नहीं — एप्लीकेशन और परिदृश्य पर आधारित 10+ कठिन प्रश्न।" },
  { icon: ClipboardList, title: "विस्तृत समाधान", desc: "हर प्रश्न के लिए विस्तृत व्याख्या — क्यों सही, क्यों गलत।" },
  { icon: BarChart3, title: "प्रगति ट्रैकिंग", desc: "कमजोर और मजबूत विषयों का व्यक्तिगत विश्लेषण।" },
  { icon: Zap, title: "स्मार्ट चीट शीट", desc: "5 मिनट में रिवीज़न के लिए हाई-यील्ड पॉइंट्स।" },
  { icon: BookOpen, title: "हिंदी + English", desc: "दोनों भाषाओं में पूर्ण समर्थन।" },
];

const audience = ["CTET", "UPSC", "JEE", "Engineering", "CA", "Competitive Exams"];

const steps = [
  { n: "1", t: "YouTube लिंक पेस्ट करें", d: "किसी भी शैक्षणिक वीडियो का URL।" },
  { n: "2", t: "नोट्स प्राप्त करें", d: "AI टॉपिक-वाइज़ नोट्स तैयार करता है।" },
  { n: "3", t: "क्विज़ हल करें", d: "परीक्षा-स्तर के MCQ का अभ्यास।" },
  { n: "4", t: "परिणाम देखें", d: "विस्तृत समाधान + विश्लेषण।" },
  { n: "5", t: "बेहतर सीखें", d: "कमजोर विषयों पर ध्यान केंद्रित करें।" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-9 rounded-lg bg-hero shadow-soft grid place-items-center">
              <Sparkles className="size-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              ज्ञानसारथी <span className="text-primary">AI</span>
            </span>
            <span className="ml-1 inline-flex items-center rounded-full bg-primary/10 text-primary text-[10px] font-semibold px-1.5 py-0.5 uppercase tracking-wider">
              Beta
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/auth">
              <Button variant="ghost" size="sm">साइन इन</Button>
            </Link>
            <Link to="/auth">
              <Button size="sm" className="bg-primary hover:bg-primary/90">शुरू करें</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div
          className="absolute inset-0 -z-10 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 10%, hsl(var(--primary)/0.6), transparent 45%), radial-gradient(circle at 85% 30%, hsl(var(--saffron)/0.5), transparent 50%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 pt-16 pb-14 sm:pt-24 sm:pb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground mb-7 shadow-soft">
            <GraduationCap className="size-3.5 text-saffron" />
            हिंदी-फर्स्ट लर्निंग प्लेटफ़ॉर्म
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.02]">
            <span className="bg-hero bg-clip-text text-transparent">ज्ञानसारथी AI</span>
          </h1>

          <p className="mt-6 text-xl sm:text-2xl font-semibold text-foreground max-w-3xl mx-auto text-balance leading-snug">
            YouTube वीडियो को बदलें विस्तृत नोट्स, परीक्षा-स्तर के MCQ, विस्तृत समाधान और व्यक्तिगत अध्ययन विश्लेषण में।
          </p>

          <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            CTET, UPSC, JEE, Engineering, CA और अन्य प्रतियोगी परीक्षाओं के लिए।
          </p>

          <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/auth" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-hero hover:opacity-90 text-primary-foreground shadow-elegant h-12 px-8 text-base">
                अभी मुफ़्त शुरू करें
              </Button>
            </Link>
            <a href="#how" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base">
                कैसे काम करता है
              </Button>
            </a>
          </div>

          {/* Trust checklist */}
          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 max-w-2xl mx-auto text-left text-sm">
            {[
              "YouTube वीडियो से स्वतः नोट्स",
              "परीक्षा-स्तर के MCQ",
              "विस्तृत समाधान",
              "प्रगति विश्लेषण",
              "स्मार्ट रिवीजन चीट शीट",
              "हिंदी + English सपोर्ट",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-foreground/85">
                <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Audience pills */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {audience.map((a) => (
              <span
                key={a}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            क्यों चुनें <span className="text-primary">ज्ञानसारथी AI</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            परीक्षा की तैयारी के लिए ज़रूरी हर टूल — एक ही जगह।
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card-gradient p-6 shadow-soft hover:shadow-elegant hover:border-primary/30 transition-all"
            >
              <div className="size-11 rounded-xl bg-primary/10 grid place-items-center mb-4">
                <f.icon className="size-5 text-primary" />
              </div>
              <h3 className="font-semibold text-base mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 scroll-mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">कैसे काम करता है</h2>
          <p className="mt-3 text-muted-foreground">सिर्फ़ 5 आसान कदम।</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-border bg-card p-5">
              <div className="size-10 rounded-full bg-hero text-primary-foreground grid place-items-center font-bold text-base shadow-elegant mb-3">
                {s.n}
              </div>
              <h3 className="font-semibold text-sm mb-1.5">{s.t}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-xl bg-primary/10 grid place-items-center shrink-0">
              <CheckCircle2 className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">
                <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-[10px] font-semibold px-1.5 py-0.5 uppercase tracking-wider mr-2 align-middle">
                  Beta
                </span>
                सक्रिय रूप से विकसित किया जा रहा है
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                ज्ञानसारथी AI लगातार बेहतर बनाया जा रहा है। आपके सुझाव स्वागत योग्य हैं।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-20">
        <div className="rounded-3xl bg-hero p-10 sm:p-14 text-center shadow-elegant">
          <Youtube className="size-12 text-primary-foreground/90 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-3">
            अभी से बेहतर पढ़ाई शुरू करें
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            एक खाता बनाएँ और आज ही पहला वीडियो प्रोसेस करें — पूरी तरह मुफ़्त।
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="h-12 px-8 text-base font-semibold">
              मुफ़्त खाता बनाएँ
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <span>© ज्ञानसारथी AI</span>
          <span>·</span>
          <span>हिंदी-फर्स्ट लर्निंग</span>
          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-[10px] font-semibold px-1.5 py-0.5 uppercase tracking-wider">
            Beta
          </span>
        </div>
      </footer>
    </div>
  );
}
