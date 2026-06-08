import { createFileRoute, Outlet, redirect, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, LayoutDashboard, Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const navigate = useNavigate();

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("साइन आउट हो गए");
    navigate({ to: "/", replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-background/90 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-hero grid place-items-center">
              <Sparkles className="size-4 text-primary-foreground" />
            </div>
            <span className="font-bold tracking-tight hidden sm:inline">ज्ञानसारथी <span className="text-primary">AI</span></span>
            <span className="ml-1 hidden sm:inline-flex items-center rounded-full bg-primary/10 text-primary text-[10px] font-semibold px-1.5 py-0.5 uppercase tracking-wider">Beta</span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <LayoutDashboard className="size-4" />
                <span className="hidden sm:inline">डैशबोर्ड</span>
              </Button>
            </Link>
            <Link to="/new">
              <Button size="sm" className="gap-2 bg-hero hover:opacity-90">
                <Plus className="size-4" />
                <span className="hidden sm:inline">नया वीडियो</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={signOut} className="gap-2 text-muted-foreground">
              <LogOut className="size-4" />
            </Button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
