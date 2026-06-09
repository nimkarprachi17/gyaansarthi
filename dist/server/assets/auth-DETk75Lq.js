import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { s as supabase } from "./client-AYGnSOON.js";
import { createLovableAuth } from "@lovable.dev/cloud-auth-js";
import { B as Button } from "./button-BXrfXN_b.js";
import { L as Label, I as Input } from "./label-BsuFFEVs.js";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
const lovableAuth = createLovableAuth();
const lovable = {
  auth: {
    signInWithOAuth: async (provider, opts) => {
      const result = await lovableAuth.signInWithOAuth(provider, {
        redirect_uri: opts?.redirect_uri,
        extraParams: {
          ...opts?.extraParams
        }
      });
      if (result.redirected) {
        return result;
      }
      if (result.error) {
        return result;
      }
      try {
        await supabase.auth.setSession(result.tokens);
      } catch (e) {
        return { error: e instanceof Error ? e : new Error(String(e)) };
      }
      return result;
    }
  }
};
function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let cancel = false;
    supabase.auth.getUser().then(({
      data
    }) => {
      if (!cancel && data.user) navigate({
        to: "/dashboard",
        replace: true
      });
    });
    return () => {
      cancel = true;
    };
  }, [navigate]);
  const handleEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const {
          error
        } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              full_name: name
            }
          }
        });
        if (error) throw error;
        toast.success("खाता बन गया! कृपया अपने ईमेल को सत्यापित करें फिर साइन इन करें।");
        setMode("signin");
      } else {
        const {
          error
        } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        toast.success("स्वागत है!");
        navigate({
          to: "/dashboard",
          replace: true
        });
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
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin
      });
      if (result.error) throw result.error;
      if (result.redirected) return;
      navigate({
        to: "/dashboard",
        replace: true
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google साइन-इन विफल");
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen grid lg:grid-cols-2 bg-background", children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex bg-hero text-primary-foreground p-12 flex-col justify-between relative overflow-hidden", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 relative z-10", children: [
        /* @__PURE__ */ jsx("div", { className: "size-9 rounded-lg bg-white/15 grid place-items-center backdrop-blur", children: /* @__PURE__ */ jsx(Sparkles, { className: "size-5" }) }),
        /* @__PURE__ */ jsx("span", { className: "font-bold text-lg", children: "ज्ञानसारथी AI" }),
        /* @__PURE__ */ jsx("span", { className: "ml-1 inline-flex items-center rounded-full bg-white/20 text-[10px] font-semibold px-1.5 py-0.5 uppercase tracking-wider", children: "Beta" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl font-bold leading-tight text-balance", children: [
          "YouTube से पढ़ाई का",
          /* @__PURE__ */ jsx("br", {}),
          "नया तरीका"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-primary-foreground/80 max-w-md", children: "हिंदी और English दोनों में — कोचिंग संस्थान-स्तर के नोट्स और परीक्षा-स्तर के MCQ।" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-primary-foreground/60 relative z-10", children: "© ज्ञानसारथी AI" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-6 sm:p-12", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "lg:hidden flex items-center gap-2 mb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "size-9 rounded-lg bg-hero grid place-items-center", children: /* @__PURE__ */ jsx(Sparkles, { className: "size-5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsx("span", { className: "font-bold", children: "ज्ञानसारथी AI" })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold tracking-tight", children: mode === "signin" ? "वापसी पर स्वागत" : "खाता बनाएँ" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-2 mb-8", children: mode === "signin" ? "अपनी पढ़ाई जारी रखें" : "मुफ़्त — कोई क्रेडिट कार्ड नहीं" }),
      /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", className: "w-full h-11 font-medium", onClick: handleGoogle, disabled: loading, children: [
        /* @__PURE__ */ jsxs("svg", { className: "size-5 mr-2", viewBox: "0 0 24 24", "aria-hidden": true, children: [
          /* @__PURE__ */ jsx("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill: "#4285F4" }),
          /* @__PURE__ */ jsx("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }),
          /* @__PURE__ */ jsx("path", { d: "M5.84 14.1A6.97 6.97 0 015.47 12c0-.73.13-1.43.36-2.1V7.07H2.18A11 11 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.83z", fill: "#FBBC05" }),
          /* @__PURE__ */ jsx("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z", fill: "#EA4335" })
        ] }),
        "Google से जारी रखें"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 my-6", children: [
        /* @__PURE__ */ jsx("div", { className: "h-px bg-border flex-1" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "या" }),
        /* @__PURE__ */ jsx("div", { className: "h-px bg-border flex-1" })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleEmail, className: "space-y-4", children: [
        mode === "signup" && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "पूरा नाम" }),
          /* @__PURE__ */ jsx(Input, { id: "name", value: name, onChange: (e) => setName(e.target.value), required: true, className: "h-11" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "ईमेल" }),
          /* @__PURE__ */ jsx(Input, { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "h-11" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "पासवर्ड" }),
          /* @__PURE__ */ jsx(Input, { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 6, className: "h-11" })
        ] }),
        /* @__PURE__ */ jsxs(Button, { type: "submit", className: "w-full h-11 bg-hero hover:opacity-90", disabled: loading, children: [
          loading && /* @__PURE__ */ jsx(Loader2, { className: "size-4 mr-2 animate-spin" }),
          mode === "signin" ? "साइन इन करें" : "खाता बनाएँ"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-center text-muted-foreground mt-6", children: [
        mode === "signin" ? "खाता नहीं है? " : "पहले से खाता है? ",
        /* @__PURE__ */ jsx("button", { onClick: () => setMode(mode === "signin" ? "signup" : "signin"), className: "text-primary font-medium hover:underline", children: mode === "signin" ? "खाता बनाएँ" : "साइन इन करें" })
      ] })
    ] }) })
  ] });
}
export {
  AuthPage as component
};
