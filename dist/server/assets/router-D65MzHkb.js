import { QueryClientProvider, useQueryClient, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, redirect, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { s as supabase } from "./client-AYGnSOON.js";
import { Toaster as Toaster$1 } from "sonner";
const appCss = "/assets/styles-DX9VtnFy.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "पेज नहीं मिला" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "जो पेज आप खोज रहे हैं वह उपलब्ध नहीं है।" }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "होम पर जाएँ"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "कुछ गलत हुआ" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "पेज लोड नहीं हो सका। कृपया फिर से कोशिश करें।" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "फिर से कोशिश करें"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "होम पर जाएँ"
        }
      )
    ] })
  ] }) });
}
const Route$7 = createRootRouteWithContext()({
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
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/e7LPBzI7gqT9TWak6oyxmkQPvO82/social-images/social-1780638485227-ChatGPT_Image_Jun_5,_2026,_11_17_52_AM.webp" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "hi", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function AuthStateBridge() {
  const router2 = useRouter();
  const qc = useQueryClient();
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      router2.invalidate();
      qc.invalidateQueries();
    });
    return () => subscription.unsubscribe();
  }, [router2, qc]);
  return null;
}
function RootComponent() {
  const { queryClient } = Route$7.useRouteContext();
  return /* @__PURE__ */ jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsx(AuthStateBridge, {}),
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Toaster, { richColors: true, position: "top-center" })
  ] });
}
const $$splitComponentImporter$6 = () => import("./auth-DETk75Lq.js");
const Route$6 = createFileRoute("/auth")({
  head: () => ({
    meta: [{
      title: "साइन इन — ज्ञानसारथी AI"
    }, {
      name: "description",
      content: "ज्ञानसारथी AI में साइन इन करें या नया खाता बनाएँ।"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./route-vPn2eq1Y.js");
const Route$5 = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const {
      data,
      error
    } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({
      to: "/auth"
    });
    return {
      user: data.user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./index-kFG6LsdT.js");
const Route$4 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "ज्ञानसारथी AI — YouTube से नोट्स, MCQ और परीक्षा-तैयारी"
    }, {
      name: "description",
      content: "किसी भी शैक्षणिक YouTube वीडियो को विस्तृत नोट्स, परीक्षा-स्तर के MCQ, विस्तृत समाधान और व्यक्तिगत अध्ययन विश्लेषण में बदलें।"
    }, {
      property: "og:title",
      content: "ज्ञानसारथी AI — YouTube से नोट्स और MCQ"
    }, {
      property: "og:description",
      content: "किसी भी शैक्षणिक YouTube वीडियो को विस्तृत नोट्स, परीक्षा-स्तर के MCQ और व्यक्तिगत अध्ययन विश्लेषण में बदलें।"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./new-D0SSA5h1.js");
const Route$3 = createFileRoute("/_authenticated/new")({
  head: () => ({
    meta: [{
      title: "नया वीडियो — ज्ञानसारथी AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./dashboard-D-FwRpaT.js");
const Route$2 = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [{
      title: "डैशबोर्ड — ज्ञानसारथी AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./v._id-BwUC7TkU.js");
const Route$1 = createFileRoute("/_authenticated/v/$id")({
  head: () => ({
    meta: [{
      title: "वीडियो — ज्ञानसारथी AI"
    }]
  }),
  validateSearch: (s) => ({
    retake: s.retake === 1 || s.retake === "1" ? 1 : void 0
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./v._id.results._attemptId-B89QbzWD.js");
const Route = createFileRoute("/_authenticated/v/$id/results/$attemptId")({
  head: () => ({
    meta: [{
      title: "परिणाम — ज्ञानसारथी AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const AuthRoute = Route$6.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$7
});
const AuthenticatedRouteRoute = Route$5.update({
  id: "/_authenticated",
  getParentRoute: () => Route$7
});
const IndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const AuthenticatedNewRoute = Route$3.update({
  id: "/new",
  path: "/new",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedDashboardRoute = Route$2.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedVIdRoute = Route$1.update({
  id: "/v/$id",
  path: "/v/$id",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedVIdResultsAttemptIdRoute = Route.update({
  id: "/results/$attemptId",
  path: "/results/$attemptId",
  getParentRoute: () => AuthenticatedVIdRoute
});
const AuthenticatedVIdRouteChildren = {
  AuthenticatedVIdResultsAttemptIdRoute
};
const AuthenticatedVIdRouteWithChildren = AuthenticatedVIdRoute._addFileChildren(AuthenticatedVIdRouteChildren);
const AuthenticatedRouteRouteChildren = {
  AuthenticatedDashboardRoute,
  AuthenticatedNewRoute,
  AuthenticatedVIdRoute: AuthenticatedVIdRouteWithChildren
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AuthRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$1 as R,
  Route as a,
  router as r
};
