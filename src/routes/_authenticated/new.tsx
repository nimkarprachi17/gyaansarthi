import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { processVideo } from "@/lib/video.functions";
import { extractYouTubeId } from "@/lib/youtube";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Youtube, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/new")({
  head: () => ({ meta: [{ title: "नया वीडियो — स्मार्टस्टडी AI" }] }),
  component: NewVideo;
});

function NewVideo() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [language, setLanguage] = useState<"hi" | "en">("hi");
  const [transcript, setTranscript] = useState("");
  const [showTranscript, setShowTranscript] = useState(false);

  const proc = useServerFn(processVideo);
  const mutation = useMutation({
    mutationFn: (input: { url: string; language: "hi" | "en"; manualTranscript?: string }) =>
      proc({ data: input }),
    onSuccess: (res: { id: string }) => {
      toast.success("तैयार है!");
      navigate({ to: "/v/$id", params: { id: res.id } });
    },
    onError: (e: Error) => {
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
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = extractYouTubeId(url);
    if (!id) {
      toast.error("कृपया मान्य YouTube URL डालें");
      return;
    }
    mutation.mutate({ url, language, manualTranscript: transcript.trim() || undefined });
  };

  if (mutation.isPending) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <div className="size-16 rounded-2xl bg-hero grid place-items-center mx-auto mb-6 shadow-elegant animate-pulse">
          <Sparkles className="size-7 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">AI आपके नोट्स बना रहा है</h2>
        <p className="text-muted-foreground mb-6">यह 30-60 सेकंड ले सकता है। कृपया रुकें...</p>
        <Loader2 className="size-6 animate-spin mx-auto text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">नया वीडियो जोड़ें</h1>
        <p className="text-muted-foreground mt-2">YouTube URL पेस्ट करें — AI नोट्स और क्विज़ बनाएगा।</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card-gradient p-6 sm:p-8 shadow-soft space-y-6">
        <div>
          <Label htmlFor="url" className="flex items-center gap-2 mb-2">
            <Youtube className="size-4 text-destructive" /> YouTube URL
          </Label>
          <Input
            id="url"
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="h-12 text-base"
          />
        </div>

        <div>
          <Label className="mb-2 block">आउटपुट भाषा</Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setLanguage("hi")}
              className={`rounded-xl border-2 p-4 text-left transition-all ${language === "hi" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
            >
              <div className="font-semibold">हिंदी</div>
              <div className="text-xs text-muted-foreground mt-1">नोट्स और क्विज़ हिंदी में</div>
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`rounded-xl border-2 p-4 text-left transition-all ${language === "en" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
            >
              <div className="font-semibold">English</div>
              <div className="text-xs text-muted-foreground mt-1">Notes & quiz in English</div>
            </button>
          </div>
        </div>

        {showTranscript && (
          <div className="rounded-xl bg-warning/10 border border-warning/30 p-4 flex gap-3">
            <AlertCircle className="size-5 text-warning shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold mb-1">ट्रांसक्रिप्ट स्वतः नहीं मिला</p>
              <p className="text-muted-foreground">YouTube पर वीडियो खोलें → "Show transcript" → कॉपी करें और नीचे पेस्ट करें।</p>
            </div>
          </div>
        )}

        <div>
          <button
            type="button"
            onClick={() => setShowTranscript(!showTranscript)}
            className="text-sm text-primary hover:underline mb-2"
          >
            {showTranscript ? "ट्रांसक्रिप्ट छुपाएँ" : "ट्रांसक्रिप्ट मैन्युअली पेस्ट करें (वैकल्पिक)"}
          </button>
          {showTranscript && (
            <Textarea
              placeholder="वीडियो का पूरा ट्रांसक्रिप्ट यहाँ पेस्ट करें..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              rows={8}
              className="font-mono text-xs"
            />
          )}
        </div>

        <Button type="submit" size="lg" className="w-full h-12 bg-hero hover:opacity-90 text-base font-semibold">
          <Sparkles className="size-4 mr-2" /> नोट्स और क्विज़ बनाएँ
        </Button>
      </form>
    </div>
  );
}
