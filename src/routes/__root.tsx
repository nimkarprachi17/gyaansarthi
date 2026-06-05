import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">पेज नहीं मिला</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          जो पेज आप खोज रहे हैं वह उपलब्ध नहीं है।
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            होम पर जाएँ
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          कुछ गलत हुआ
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          पेज लोड नहीं हो सका। कृपया फिर से कोशिश करें।
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            फिर से कोशिश करें
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            होम पर जाएँ
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
      { name: "theme-color", content: "#3a2d8a" },
      { title: "ज्ञानसारथी AI — YouTube से नोट्स और MCQ क्विज़" },
      { name: "description", content: "किसी भी हिंदी या अंग्रेज़ी YouTube शैक्षणिक वीडियो से तुरंत विस्तृत नोट्स, महत्वपूर्ण अवधारणाएँ, परीक्षा-स्तर के MCQ, विस्तृत समाधान और व्यक्तिगत अध्ययन विश्लेष" },
      { property: "og:title", content: "ज्ञानसारथी AI — YouTube से नोट्स और MCQ क्विज़" },
      { property: "og:description", content: "किसी भी हिंदी या अंग्रेज़ी YouTube शैक्षणिक वीडियो से तुरंत विस्तृत नोट्स, महत्वपूर्ण अवधारणाएँ, परीक्षा-स्तर के MCQ, विस्तृत समाधान और व्यक्तिगत अध्ययन विश्लेष" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ज्ञानसारथी AI — YouTube से नोट्स और MCQ क्विज़" },
      { name: "twitter:description", content: "किसी भी हिंदी या अंग्रेज़ी YouTube शैक्षणिक वीडियो से तुरंत विस्तृत नोट्स, महत्वपूर्ण अवधारणाएँ, परीक्षा-स्तर के MCQ, विस्तृत समाधान और व्यक्तिगत अध्ययन विश्लेष" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/e7LPBzI7gqT9TWak6oyxmkQPvO82/social-images/social-1780638485227-ChatGPT_Image_Jun_5,_2026,_11_17_52_AM.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/e7LPBzI7gqT9TWak6oyxmkQPvO82/social-images/social-1780638485227-ChatGPT_Image_Jun_5,_2026,_11_17_52_AM.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="hi">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function AuthStateBridge() {
  const router = useRouter();
  const qc = useQueryClient();
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      router.invalidate();
      qc.invalidateQueries();
    });
    return () => subscription.unsubscribe();
  }, [router, qc]);
  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthStateBridge />
      <Outlet />
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}
