import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, BookOpen, Brain, Trophy, Youtube, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "स्मार्टस्टडी AI — YouTube वीडियो से प्रीमियम हिंदी नोट्स" },
      { name: "description", content: "किसी भी YouTube एजुकेशनल वीडियो को पेस्ट करें और तुरंत हिंदी में विस्तृत नोट्स, मुख्य अवधारणाएँ, और परीक्षा-स्तर के MCQ प्राप्त करें।" },
    ],
  }),
  component: Landing,
});

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
            <span className="font-bold text-lg tracking-tight">स्मार्टस्टडी <span className="text-primary">AI</span></span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/auth"><Button variant="ghost" size="sm">साइन इन</Button></Link>
            <Link to="/auth"><Button size="sm" className="bg-primary hover:bg-primary/90">शुरू करें</Button></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero opacity-[0.06]" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground mb-6 shadow-soft">
            <Zap className="size-3.5 text-saffron" />
            हिंदी और English — दोनों के लिए
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-balance leading-[1.05]">
            YouTube वीडियो को
            <span className="block bg-hero bg-clip-text text-transparent">परीक्षा-स्तर के नोट्स</span>
            में बदलें
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            कोई भी एजुकेशनल वीडियो URL पेस्ट करें — AI तुरंत विस्तृत नोट्स, मुख्य अवधारणाएँ, चीट शीट और 12 कठिन MCQ तैयार करेगा।
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/auth">
              <Button size="lg" className="bg-hero hover:opacity-90 text-primary-foreground shadow-elegant h-12 px-6 text-base">
                मुफ़्त में शुरू करें
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: BookOpen, title: "प्रीमियम नोट्स", desc: "सारांश, मुख्य अवधारणाएँ, परिभाषाएँ, उदाहरण और एक-पृष्ठीय चीट शीट — कोचिंग संस्थान-स्तर के।" },
            { icon: Brain, title: "कठिन MCQ", desc: "रट्टा नहीं — एप्लीकेशन-आधारित, परिदृश्य-आधारित और परीक्षा-स्तर के 12 प्रश्न।" },
            { icon: Trophy, title: "विश्लेषण", desc: "हर प्रयास पर कमजोर और मजबूत विषयों की रिपोर्ट और लगातार दिन का streak।" },
          ].map((f, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card-gradient p-6 shadow-soft">
              <div className="size-11 rounded-xl bg-primary/10 grid place-items-center mb-4">
                <f.icon className="size-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">कैसे काम करता है</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { n: "1", t: "URL पेस्ट करें", d: "किसी भी YouTube एजुकेशनल वीडियो का URL डालें।" },
            { n: "2", t: "AI प्रोसेस करता है", d: "ट्रांसक्रिप्ट से नोट्स और 12 MCQ तैयार किए जाते हैं।" },
            { n: "3", t: "पढ़ें और परखें", d: "नोट्स पढ़ें, क्विज़ दें, और तुरंत विस्तृत समाधान देखें।" },
          ].map((s, i) => (
            <div key={i} className="relative rounded-2xl border border-border bg-card p-6">
              <div className="absolute -top-4 -left-4 size-12 rounded-full bg-hero text-primary-foreground grid place-items-center font-bold text-lg shadow-elegant">
                {s.n}
              </div>
              <h3 className="font-semibold mt-4 mb-2">{s.t}</h3>
              <p className="text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-20">
        <div className="rounded-3xl bg-hero p-10 sm:p-14 text-center shadow-elegant">
          <Youtube className="size-12 text-primary-foreground/90 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-3">अभी से बेहतर पढ़ाई शुरू करें</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            एक खाता बनाएँ और आज ही पहला वीडियो प्रोसेस करें।
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="h-12 px-8 text-base font-semibold">
              मुफ़्त खाता बनाएँ
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        स्मार्टस्टडी AI · हिंदी-फर्स्ट लर्निंग
      </footer>
    </div>
  );
}
