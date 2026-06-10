import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "साइन इन — ज्ञानसारथी AI" }, { name: "description", content: "ज्ञानसारथी AI में साइन इन करें या नया खाता बनाएँ।" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // If already signed in, bounce to dashboard
  useEffect(() => {
    let cancel = false;
    supabase.auth.getUser().then(({ data }) => {
      if (!cancel && data.user) navigate({ to: "/dashboard", replace: true });
    });
    return () => { cancel = true; };
  }, [navigate]);

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: name },
          },
        });
        if (error) throw error;
        toast.success("खाता बन गया! कृपया अपने ईमेल को सत्यापित करें फिर साइन इन करें।");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("स्वागत है!");
        navigate({ to: "/dashboard", replace: true });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "कुछ गलत हुआ");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
  setLoading(true);

  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) throw error;

    // Supabase will redirect automatically
  } catch (err) {
    toast.error(
      err instanceof Error
        ? err.message
        : "Google साइन-इन विफल"
    );
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Brand panel */}
      <div className="hidden lg:flex bg-hero text-primary-foreground p-12 flex-col justify-between relative overflow-hidden">
        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="size-9 rounded-lg bg-white/15 grid place-items-center backdrop-blur">
            <Sparkles className="size-5" />
          </div>
          <span className="font-bold text-lg">ज्ञानसारथी AI</span>
          <span className="ml-1 inline-flex items-center rounded-full bg-white/20 text-[10px] font-semibold px-1.5 py-0.5 uppercase tracking-wider">Beta</span>
        </Link>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold leading-tight text-balance">
            YouTube से पढ़ाई का<br />नया तरीका
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-md">
            हिंदी और English दोनों में — कोचिंग संस्थान-स्तर के नोट्स और परीक्षा-स्तर के MCQ।
          </p>
        </div>
        <div className="text-xs text-primary-foreground/60 relative z-10">
          © ज्ञानसारथी AI
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="size-9 rounded-lg bg-hero grid place-items-center">
              <Sparkles className="size-5 text-primary-foreground" />
            </div>
            <span className="font-bold">ज्ञानसारथी AI</span>
          </Link>

          <h1 className="text-3xl font-bold tracking-tight">
            {mode === "signin" ? "वापसी पर स्वागत" : "खाता बनाएँ"}
          </h1>
          <p className="text-muted-foreground mt-2 mb-8">
            {mode === "signin" ? "अपनी पढ़ाई जारी रखें" : "मुफ़्त — कोई क्रेडिट कार्ड नहीं"}
          </p>

          <Button
            type="button"
            variant="outline"
            className="w-full h-11 font-medium"
            onClick={handleGoogle}
            disabled={loading}
          >
            <svg className="size-5 mr-2" viewBox="0 0 24 24" aria-hidden>
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.1A6.97 6.97 0 015.47 12c0-.73.13-1.43.36-2.1V7.07H2.18A11 11 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.83z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z" fill="#EA4335"/>
            </svg>
            Google से जारी रखें
          </Button>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-border flex-1" />
            <span className="text-xs text-muted-foreground">या</span>
            <div className="h-px bg-border flex-1" />
          </div>

          <form onSubmit={handleEmail} className="space-y-4">
            {mode === "signup" && (
              <div>
                <Label htmlFor="name">पूरा नाम</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="h-11" />
              </div>
            )}
            <div>
              <Label htmlFor="email">ईमेल</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-11" />
            </div>
            <div>
              <Label htmlFor="password">पासवर्ड</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="h-11" />
            </div>
            <Button type="submit" className="w-full h-11 bg-hero hover:opacity-90" disabled={loading}>
              {loading && <Loader2 className="size-4 mr-2 animate-spin" />}
              {mode === "signin" ? "साइन इन करें" : "खाता बनाएँ"}
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-6">
            {mode === "signin" ? "खाता नहीं है? " : "पहले से खाता है? "}
            <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-primary font-medium hover:underline">
              {mode === "signin" ? "खाता बनाएँ" : "साइन इन करें"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
