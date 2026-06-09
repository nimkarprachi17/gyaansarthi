import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link, Outlet } from "@tanstack/react-router";
import { s as supabase } from "./client-AYGnSOON.js";
import { Sparkles, LayoutDashboard, Plus, LogOut } from "lucide-react";
import { B as Button } from "./button-BXrfXN_b.js";
import { toast } from "sonner";
import "@supabase/supabase-js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function AuthenticatedLayout() {
  const navigate = useNavigate();
  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("साइन आउट हो गए");
    navigate({
      to: "/",
      replace: true
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx("header", { className: "border-b border-border/60 bg-background/90 backdrop-blur sticky top-0 z-40", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/dashboard", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "size-8 rounded-lg bg-hero grid place-items-center", children: /* @__PURE__ */ jsx(Sparkles, { className: "size-4 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxs("span", { className: "font-bold tracking-tight hidden sm:inline", children: [
          "ज्ञानसारथी ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "AI" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "ml-1 hidden sm:inline-flex items-center rounded-full bg-primary/10 text-primary text-[10px] font-semibold px-1.5 py-0.5 uppercase tracking-wider", children: "Beta" })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-1 sm:gap-2", children: [
        /* @__PURE__ */ jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", className: "gap-2", children: [
          /* @__PURE__ */ jsx(LayoutDashboard, { className: "size-4" }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "डैशबोर्ड" })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/new", children: /* @__PURE__ */ jsxs(Button, { size: "sm", className: "gap-2 bg-hero hover:opacity-90", children: [
          /* @__PURE__ */ jsx(Plus, { className: "size-4" }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "नया वीडियो" })
        ] }) }),
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: signOut, className: "gap-2 text-muted-foreground", children: /* @__PURE__ */ jsx(LogOut, { className: "size-4" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("main", { className: "mx-auto max-w-6xl px-4 sm:px-6 py-8", children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
}
export {
  AuthenticatedLayout as component
};
