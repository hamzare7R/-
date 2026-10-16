// Cloudflare Worker — شات AI لموقع حمزة (Workers AI: بلا مفاتيح، بلا Google، كلشي داخل Cloudflare)
// الإعداد الوحيد: Settings > Bindings > Add binding > Workers AI > Variable name = AI > Deploy

// كيجرب الموديلات بالترتيب حتى يخدم واحد (إيلا تحيد موديل من Cloudflare كيدوز للتالي تلقائياً)
const MODELS = [
  "@cf/google/gemma-3-12b-it",            // مزيان فاللغات المتعددة
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  "@cf/meta/llama-3.1-8b-instruct",
];

const SYSTEM_PROMPT = `You are "مساعد حمزة", the chat assistant on the portfolio website of Hamza Reggaoui.
LANGUAGE: Always reply in the same language the visitor writes in (Moroccan Darija / Arabic, English, German, French, Spanish...). For Arabic or Darija, answer in simple Moroccan Darija using Arabic script. Be friendly, natural and SHORT (max 3-4 sentences). Never repeat the same answer twice; answer the actual question.
Facts about Hamza (use ONLY these, never invent prices, dates, clients or promises):
- Freelance graphic designer and digital content creator from Morocco (Tangier).
- Background in aluminum craftsmanship and port operations (Tanger Med, Eurogate): precise, organized, creative.
- Services: brand identity and logo design, UI and landing page design, social media ad design, CV writing and marketing content.
- Portfolio: Logo & Brand Identity, Social Media Ad Pack, Landing Page Design, 3D Mockups & Stationery, Career Blueprint, Business Card.
- Tools: Adobe Illustrator, Inkscape, Canva, VS Code.
- Languages: Arabic (native), English, German (learning).
- Contact: the contact form at the bottom of the website, email, Instagram, LinkedIn, Khamsat and Mostaqel profiles.
Rules: for prices say it depends on the project and Hamza gives a quote after talking with the client. If you don't know, say so honestly and suggest contacting Hamza. If the question is unrelated, politely say you only help with Hamza's work and contacting him.`;

const ALLOWED_ORIGINS = [
  "https://7r01h-portfolio.vercel.app",
  "http://localhost",
  "http://127.0.0.1",
  "null", // فتح الملف مباشرة من الكمبيوتر (file://)
];

const CONTACT_HINT = /(contact|email|mail|reach|hire|price|cost|quote|tarif|preis|kosten|تواصل|بريد|سعر|اسعار|أسعار|ثمن|بشحال|بشحون|نتواصل|نخدم|توظيف)/i;

function cors(origin) {
  const ok = ALLOWED_ORIGINS.some((o) => origin === o || origin.startsWith(o + ":"));
  return {
    "Access-Control-Allow-Origin": ok ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...cors(origin) },
  });
}

// حد بسيط لكل زائر (كيتحسب فالذاكرة ديال الـ Worker، كيحمي من التكرار الزايد)
const hits = new Map();
function tooMany(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 60000);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 500) hits.clear();
  return arr.length > 12; // 12 رسالة فالدقيقة لكل زائر
}

// الأسئلة الأولى المتكررة (بحال أزرار الاقتراحات) كتتخزن ساعة: كتوفر الحد المجاني وكتسرع الجواب
async function sha(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

async function ask(env, messages) {
  let lastError = "no model worked";
  for (const model of MODELS) {
    try {
      const out = await env.AI.run(model, {
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 300,
        temperature: 0.5,
      });
      // الأشكال الممكنة ديال الجواب حسب الموديل
      const text =
        (typeof out === "string" ? out : "") ||
        out.response ||
        (out.choices && out.choices[0] && out.choices[0].message && out.choices[0].message.content) ||
        "";
      if (String(text).trim()) return String(text).trim();
      lastError = `${model}: empty`;
    } catch (e) {
      lastError = `${model}: ${(e && e.message) || e}`;
    }
  }
  throw new Error(lastError);
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const url = new URL(request.url);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });

    if (!env.AI) return json({ error: "AI binding missing", detail: "Add Workers AI binding named AI" }, 500, origin);

    // اختبار سريع من المتصفح: https://YOUR-WORKER.workers.dev/?q=hello
    if (request.method === "GET") {
      const q = url.searchParams.get("q");
      if (!q) return json({ status: "ok", hint: "add ?q=hello to test the AI" }, 200, origin);
      try {
        return json({ reply: await ask(env, [{ role: "user", content: q.slice(0, 300) }]) }, 200, origin);
      } catch (e) {
        return json({ error: "ai failed", detail: String(e.message || e) }, 502, origin);
      }
    }

    if (request.method !== "POST") return json({ error: "method not allowed" }, 405, origin);

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ error: "bad json" }, 400, origin);
    }

    const messages = (Array.isArray(payload.messages) ? payload.messages : [])
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-6)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 600) }));

    if (!messages.length || messages[messages.length - 1].role !== "user") {
      return json({ error: "no user message" }, 400, origin);
    }

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    if (tooMany(ip)) return json({ error: "rate limited" }, 429, origin);

    const lastText = messages[messages.length - 1].content;
    const contactNext = CONTACT_HINT.test(lastText);

    // كاش للأسئلة الأولى فالمحادثة فقط
    let cacheKey = null;
    if (messages.length === 1) {
      cacheKey = new Request("https://cache.hamza-chat/" + (await sha(lastText.trim().toLowerCase())));
      const hit = await caches.default.match(cacheKey);
      if (hit) {
        const cached = await hit.json();
        return json({ reply: cached.reply, contact_next: contactNext }, 200, origin);
      }
    }

    try {
      const reply = await ask(env, messages);
      if (cacheKey) {
        await caches.default.put(
          cacheKey,
          new Response(JSON.stringify({ reply }), { headers: { "Content-Type": "application/json", "Cache-Control": "max-age=3600" } })
        );
      }
      return json({ reply, contact_next: contactNext }, 200, origin);
    } catch (e) {
      return json({ error: "ai failed", detail: String(e.message || e) }, 502, origin);
    }
  },
};
