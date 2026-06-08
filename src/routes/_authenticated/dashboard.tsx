import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/lib/video.functions";
import { youtubeThumb } from "@/lib/youtube";
import { Plus, Video, ListChecks, Target, Flame, TrendingDown, TrendingUp, Loader2, Sparkles, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "डैशबोर्ड — ज्ञानसारथी AI" }] }),
  component: Dashboard,
});

function StatCard({ icon: Icon, label, value, accent }: { icon: React.ElementType; label: string; value: string | number; accent?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
        <div className={`size-9 rounded-lg grid place-items-center ${accent ?? "bg-primary/10 text-primary"}`}>
          <Icon className="size-4" />
        </div>
      </div>
      <div className="mt-3 text-3xl font-bold tracking-tight">{value}</div>
    </div>
  );
}

function Dashboard() {
  const fetchDash = useServerFn(getDashboard);
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchDash(),
  });

  if (isLoading) {
    return <div className="flex items-center justify-center py-20 text-muted-foreground"><Loader2 className="size-5 animate-spin mr-2" />लोड हो रहा है...</div>;
  }
  if (!data) return null;

  const { profile, videos, stats, weakAreas, strongAreas, trend } = data;
  const name = profile?.display_name ?? "छात्र";
  const trendData = trend ?? [];
  const maxPct = 100;

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">स्वागत है,</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{name} 👋</h1>
          <p className="text-muted-foreground mt-2">आपकी सीखने की यात्रा एक नज़र में</p>
        </div>
        <Link to="/new">
          <Button size="lg" className="bg-hero hover:opacity-90 gap-2 shadow-elegant">
            <Plus className="size-4" /> नया वीडियो
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon={Video} label="कुल वीडियो" value={stats.totalVideos} />
        <StatCard icon={ListChecks} label="क्विज़ प्रयास" value={stats.totalAttempts} accent="bg-accent text-accent-foreground" />
        <StatCard icon={Target} label="औसत सटीकता" value={`${stats.avgScore}%`} accent="bg-success/15 text-success" />
        <StatCard icon={Trophy} label="बेस्ट स्कोर" value={`${stats.bestScore}%`} accent="bg-primary/15 text-primary" />
        <StatCard icon={Flame} label="लगातार दिन" value={stats.streak} accent="bg-saffron/15 text-saffron" />
      </div>

      {/* Learning trend */}
      {trendData.length >= 2 && (
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="size-4 text-primary" />
            <h3 className="font-semibold">सीखने का ट्रेंड (अंतिम {trendData.length} प्रयास)</h3>
          </div>
          <div className="flex items-end gap-2 h-32">
            {trendData.map((t, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1 group">
                <span className="text-[10px] font-semibold text-muted-foreground opacity-0 group-hover:opacity-100 transition">{t.pct}%</span>
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-primary to-primary-glow transition-all"
                  style={{ height: `${(t.pct / maxPct) * 100}%`, minHeight: "4px" }}
                  title={`${t.pct}% · ${new Date(t.date).toLocaleDateString("hi-IN")}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weak / Strong */}
      {(weakAreas.length > 0 || strongAreas.length > 0) && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="size-4 text-destructive" />
              <h3 className="font-semibold">कमजोर विषय</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {weakAreas.length > 0 ? weakAreas.map((w) => (
                <Badge key={w} variant="outline" className="border-destructive/30 text-destructive">{w}</Badge>
              )) : <p className="text-sm text-muted-foreground">अभी पर्याप्त डेटा नहीं</p>}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="size-4 text-success" />
              <h3 className="font-semibold">मजबूत विषय</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {strongAreas.length > 0 ? strongAreas.map((w) => (
                <Badge key={w} variant="outline" className="border-success/30 text-success">{w}</Badge>
              )) : <p className="text-sm text-muted-foreground">अभी पर्याप्त डेटा नहीं</p>}
            </div>
          </div>
        </div>
      )}

      {/* Videos */}
      <div>
        <h2 className="text-xl font-bold mb-4">हाल के वीडियो</h2>
        {videos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card-gradient p-12 text-center">
            <div className="size-14 rounded-2xl bg-hero grid place-items-center mx-auto mb-4 shadow-elegant">
              <Sparkles className="size-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">अभी तक कोई वीडियो नहीं</h3>
            <p className="text-muted-foreground text-sm mb-6">एक YouTube URL पेस्ट करके शुरुआत करें।</p>
            <Link to="/new">
              <Button className="bg-hero hover:opacity-90 gap-2"><Plus className="size-4" /> पहला वीडियो जोड़ें</Button>
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((v) => (
              <Link key={v.id} to="/v/$id" params={{ id: v.id }} className="group">
                <article className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-elegant hover:border-primary/40 transition-all">
                  <div className="aspect-video bg-muted overflow-hidden relative">
                    <img src={youtubeThumb(v.youtube_id)} alt={v.title ?? ""} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    <div className="absolute top-2 right-2 flex gap-1.5">
                      <Badge variant="secondary" className="text-[10px]">{v.language === "hi" ? "हिंदी" : "EN"}</Badge>
                      {v.status === "processing" && <Badge className="bg-warning text-warning-foreground text-[10px]">प्रोसेसिंग</Badge>}
                      {v.status === "failed" && <Badge variant="destructive" className="text-[10px]">विफल</Badge>}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">{v.title ?? "बिना शीर्षक"}</h3>
                    <p className="text-xs text-muted-foreground mt-2">{new Date(v.created_at).toLocaleDateString("hi-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
