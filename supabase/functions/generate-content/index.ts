import "@supabase/functions-js/edge-runtime.d.ts";

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";

async function callGemini(system: string, user: string): Promise<unknown> {
  const key = Deno.env.get("GEMINI_API_KEY");
  if (!key) throw new Error("GEMINI_API_KEY is not configured");

  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    if (res.status === 429) throw new Error("RATE_LIMIT");
    if (res.status === 402) throw new Error("CREDITS");
    throw new Error(`Gemini error: ${res.status} ${txt}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty response");

  try {
    return JSON.parse(content);
  } catch {
    const match = content.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("Failed to parse JSON response");
  }
}

export default {
  fetch: async (req: Request) => {
    // Handle CORS
    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type, apiKey, Authorization",
        },
      });
    }

    try {
      const {system, user } = await req.json();

      if (!system || !user) {
        return Response.json({ error: "Missing type, system, or user" }, {
          status: 400,
          headers: { "Access-Control-Allow-Origin": "*" },
        });
      }

      const result = await callGemini(system, user);

      return Response.json({ result }, {
        headers: { "Access-Control-Allow-Origin": "*" },
      });

    } catch (err) {
    console.error("FUNCTION ERROR:", err);

    const message =
      err instanceof Error
        ? `${err.name}: ${err.message}`
        : JSON.stringify(err);

    return Response.json(
      { error: message },
      {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
  }
  },
};