import * as React from "react";
import { useRouter, isRedirect } from "@tanstack/react-router";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, a as createServerFn } from "./server-CzRGUrwi.js";
import { z } from "zod";
import { r as requireSupabaseAuth } from "./auth-middleware-uIcXcC6I.js";
function useServerFn(serverFn) {
  const router = useRouter();
  return React.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const processVideo = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => z.object({
  url: z.string().min(1).max(500),
  language: z.enum(["hi", "en"]),
  manualTranscript: z.string().max(2e5).optional()
}).parse(input)).handler(createSsrRpc("140620bf5d58dd4abcbc154e6897ae01ed13993d7c12d4c6ecd786ca00015dea"));
const getVideoBundle = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => z.object({
  id: z.string().uuid()
}).parse(input)).handler(createSsrRpc("3e0036cb7e9376651aea8c2820a5cd1a9a70247236d017b2a951bd636034edeb"));
const getDashboard = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("1e9a8aea7e7a43ef03a16e6def9f3756789d957defa1188a1716c1758d33a4ed"));
const saveAttempt = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => z.object({
  quizId: z.string().uuid(),
  videoId: z.string().uuid(),
  answers: z.array(z.number().int().min(-1).max(3)),
  timeTakenSeconds: z.number().int().min(0).max(60 * 60 * 6).optional()
}).parse(input)).handler(createSsrRpc("3ab80bd672b54c4a2e9086163bb3d5041abee4a8ab30ec4c15637700c43c069f"));
const getAttempt = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => z.object({
  id: z.string().uuid()
}).parse(input)).handler(createSsrRpc("b21eb7d0459e6541b31abfa2b8df10687af39ca83a649c63237a3d114837fe41"));
const getAttemptHistory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => z.object({
  videoId: z.string().uuid()
}).parse(input)).handler(createSsrRpc("6c53e05e1c21125a5a248e2a500a5175e0b9c1079b5e7aceae9991f12e4c7d47"));
const regenerateQuiz = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => z.object({
  videoId: z.string().uuid()
}).parse(input)).handler(createSsrRpc("648e3a98c39e14d42160c41856491c4cc7c5647856bb7cff851f3d67491b6d75"));
export {
  getVideoBundle as a,
  getAttempt as b,
  getAttemptHistory as c,
  getDashboard as g,
  processVideo as p,
  regenerateQuiz as r,
  saveAttempt as s,
  useServerFn as u
};
