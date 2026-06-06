// Server-only AI gateway helper. Never import from client code.
const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";

export type Lang = "hi" | "en";

export async function callAIJson<T = unknown>({
  system,
  user,
  model = "google/gemini-3-flash-preview",
}: {
  system: string;
  user: string;
  model?: string;
}): Promise<T> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("LOVABLE_API_KEY is not configured");

  const res = await fetch(GATEWAY, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    if (res.status === 429) throw new Error("RATE_LIMIT: AI service is rate-limited. Please try again in a moment.");
    if (res.status === 402) throw new Error("CREDITS: AI credits exhausted. Please add credits to your workspace.");
    console.error("AI gateway error", res.status, txt);
    throw new Error(`AI gateway error: ${res.status}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty AI response");
  try {
    return JSON.parse(content) as T;
  } catch {
    // Try to extract JSON block
    const match = content.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]) as T;
    throw new Error("Failed to parse AI JSON response");
  }
}

// ---------------- NOTES ----------------

export type CheatSheet = {
  formulas: { name: string; expression: string; when_to_use?: string; trap?: string }[];
  most_important: string[];
  frequently_asked: string[];
  common_mistakes: string[];
  memory_tricks: string[];
  last_minute_points: string[];
  // legacy fields kept optional for backward compatibility with older saved notes
  quick_concepts?: string[];
  exam_must_remember?: string[];
  quick_tricks?: string[];
};

export type NotesContent = {
  summary: string;
  key_concepts: { title: string; description: string }[];
  detailed_notes: { heading: string; body: string }[];
  definitions: { term: string; meaning: string }[];
  examples: string[];
  common_mistakes: string[];
  exam_points: string[];
  revision_notes: string[];
  cheat_sheet: CheatSheet;
};


export async function generateNotes(transcript: string, lang: Lang, title?: string): Promise<NotesContent> {
  const isHi = lang === "hi";
  const langInstruction = isHi
    ? `IMPORTANT: सभी आउटपुट सरल, स्वाभाविक हिंदी में लिखें। तकनीकी शब्दों (जैसे Array, Database, Stack) को अंग्रेज़ी में रखें और कोष्ठक में हिंदी अर्थ दें। कठिन संस्कृत-निष्ठ शब्दों से बचें।`
    : `IMPORTANT: Write all output in clear, professional English suitable for exam preparation.`;

  const system = `You are an expert educator creating premium study notes from a video transcript. ${langInstruction}

Rules:
- Stay faithful to the transcript. NEVER invent facts not in the transcript.
- If a topic is unclear in the transcript, say so honestly instead of guessing.
- Use exam-oriented structure. Be concise but complete.
- Return ONLY valid JSON matching this schema (no markdown, no commentary):
{
  "summary": string,                                  // 3-5 sentence overview
  "key_concepts": [{"title": string, "description": string}],   // 5-10 items
  "detailed_notes": [{"heading": string, "body": string}],      // 4-8 sections, body can use \\n for line breaks
  "definitions": [{"term": string, "meaning": string}],         // important terms
  "examples": string[],                               // examples discussed
  "common_mistakes": string[],                        // misconceptions
  "exam_points": string[],                            // exam-important bullets
  "revision_notes": string[],                         // quick revision bullets
  "cheat_sheet": {
    "formulas": [{"name": string, "expression": string, "when_to_use"?: string, "trap"?: string}],   // 0-6 HIGH-YIELD formulas only. expression MUST be plain text/unicode (e.g. "F = m·a", "v² = u² + 2as"). NEVER LaTeX/$/\\frac/\\sqrt/markdown. "when_to_use" = one short phrase telling the student WHEN to apply it. "trap" = the common mistake/pitfall examiners exploit. Empty [] for pure theory subjects.
    "most_important": string[],        // 4-7 highest-yield facts/ideas a student MUST know — the things most likely to be tested. Sharp, exam-keyword-rich. Not a summary.
    "frequently_asked": string[],      // 4-7 specific points/question-angles known to appear repeatedly in exams (PYQ patterns, classic questions, definitions examiners love).
    "common_mistakes": string[],       // 3-6 specific traps students fall for. Phrase as "X is NOT Y" or "don't confuse A with B".
    "memory_tricks": string[],         // 3-6 mnemonics, acronyms, analogies, or shortcuts to recall facts under exam pressure.
    "last_minute_points": string[]     // 4-7 ultra-condensed punch-line facts to scan in the final 60 seconds before the exam.
  }
}

CRITICAL CHEAT SHEET RULES — this is NOT a summary of the notes:
- Answer the question: "What should a student remember 5 MINUTES BEFORE THE EXAM?"
- Prioritize HIGH-YIELD, frequently tested, exam-oriented content only. Skip background, history, derivations, and anything not directly testable.
- The cheat sheet must be readable in 2–3 minutes. Be ruthless — cut everything non-essential.
- Do NOT mini-summarize the notes. Pick only what wins marks.
- Every bullet must be sharp, specific, and exam-keyword rich. NO vague phrases like "important concept" or "remember the basics".
- For formula-heavy subjects: include formulas with "when_to_use" + "trap". For theory subjects: leave formulas as [] and lean on most_important / frequently_asked / memory_tricks.
- Highlight comparisons and edge cases inside most_important or frequently_asked when relevant (e.g. "X vs Y: X is …, Y is …").
- All strings MUST be plain text. NO markdown (**, _, #, \`, -, *), NO LaTeX ($, \\frac, etc.), NO HTML, NO emoji inside bullets. Use unicode symbols directly (×, ÷, ², ³, √, π, →, ≈, ≤, ≥). Keep each bullet under 140 characters.`;


  const user = `${title ? `Video title: ${title}\n\n` : ""}Transcript:\n"""\n${transcript.slice(0, 60000)}\n"""\n\nGenerate the study notes JSON now.`;

  return callAIJson<NotesContent>({ system, user });
}

// ---------------- QUIZ ----------------

export type QuizQuestion = {
  question: string;
  options: string[]; // 4 options
  correct_index: number; // 0-3
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  concept: string;
};

export async function generateQuiz(transcript: string, lang: Lang, title?: string, avoidQuestions: string[] = []): Promise<QuizQuestion[]> {
  const isHi = lang === "hi";
  const langInstruction = isHi
    ? `सभी प्रश्न, विकल्प, और स्पष्टीकरण सरल हिंदी में लिखें। तकनीकी शब्द अंग्रेज़ी में रखें।`
    : `Write all questions, options, and explanations in clear English.`;

  const avoidBlock = avoidQuestions.length > 0
    ? `\n\nIMPORTANT — DO NOT REPEAT these previously-asked questions or any near-paraphrase. Generate FRESH questions covering different angles, subtopics, scenarios, and edge cases:\n${avoidQuestions.slice(0, 40).map((q, i) => `${i + 1}. ${q}`).join("\n")}\n`
    : "";

  const system = `You are a senior exam-setter creating a challenging quiz from a video transcript. ${langInstruction}

Strict rules:
- Generate exactly 10 MCQs.
- Difficulty mix MUST be: 2 easy (20%), 5 medium (50%), 3 hard (30%).
- AVOID trivial memorization or copy-paste-from-transcript questions.
- PREFER: application-based, scenario-based, conceptual reasoning, comparative analysis, edge cases, interview-style.
- Each question must have exactly 4 distinct, plausible options.
- correct_index is the 0-based index of the correct option.
- explanation must be detailed: why correct answer is right AND why each other option is wrong.
- Stay faithful to the transcript. Never invent facts.
- Return ONLY valid JSON:
{
  "questions": [
    {
      "question": string,
      "options": [string, string, string, string],
      "correct_index": 0|1|2|3,
      "explanation": string,
      "difficulty": "easy"|"medium"|"hard",
      "concept": string
    }
  ]
}`;

  const user = `${title ? `Video title: ${title}\n\n` : ""}Transcript:\n"""\n${transcript.slice(0, 60000)}\n"""${avoidBlock}\n\nGenerate the quiz JSON now.`;

  const res = await callAIJson<{ questions: QuizQuestion[] }>({ system, user });
  if (!Array.isArray(res?.questions) || res.questions.length === 0) {
    throw new Error("AI returned no questions");
  }
  // Validate
  return res.questions
    .filter((q) => q && Array.isArray(q.options) && q.options.length === 4 && typeof q.correct_index === "number")
    .map((q) => ({
      ...q,
      correct_index: Math.max(0, Math.min(3, q.correct_index)),
      difficulty: ["easy", "medium", "hard"].includes(q.difficulty) ? q.difficulty : "medium",
    }));
}
