(function () {
"use strict";
// AI chat assistant for the portfolio
// 1) انشر worker/hamza-chat-worker.js على Cloudflare
// 2) حط الـ URL ديالو فـ CHAT_ENDPOINT تحت
// 3) فعّل هاد الملف فـ index.html (موجودين راه مربوطين)

const CHAT_ENDPOINT = "";

const chatCopy = {
  ar: {
    trigger: "مساعد حمزة",
    title: "مساعد حمزة",
    subtitle: "اسألني عن الخدمات.",
    inputLabel: "اكتب سؤالك",
    placeholder: "اكتب سؤالك هنا...",
    send: "إرسال",
    close: "إغلاق المحادثة",
    minimize: "تصغير المحادثة",
    welcome: "مرحبًا! أنا المساعد ديال حمزة. نقدر نجاوبك على الخدمات، الأعمالي، المهارات ولا كيفاش تتواصل معاه. شنو بغيتي تعرف؟",
    chips: ["شنو الخدمات اللي كيدير حمزة؟", "بشحون الخدمات؟", "وريني أعمالو", "بغيت نتواصل مع حمزة"],
    typing: "المساعد كيكتب...",
    contactTitle: "تواصل مباشر مع حمزة",
    openForm: "افتح نموذج التواصل",
    copyEmail: "نسخ البريد الإلكتروني",
    emailCopied: "تم نسخ البريد ✓",
    error: "المساعد متوقف حاليًا. من الأحسن تواصل مباشرة مع حمزة.",
    offlineNote: "المساعد الذكي الكامل كيولي متاح ملي كيتنشر الخادم ديالو. حتى دابا نقدر نعطيك المعلومات الأساسية:",
    thinkingFail: "عاود المحاولة، ولا شوف قسم التواصل فأسفل الصفحة.",
    fallback: {
      greeting: "مرحبًا! أنا المساعد ديال حمزة. اسألني على التصميم، الهوية البصرية، صفحات الهبوط أو التواصل.",
      services: "حمزة كيدير 4 خدمات: تصميم الهوية البصرية واللوجوهات، تصميم واجهات وصفحات هبوط، إعلانات السوشيال ميديا، وكتابة السير الذاتية والمحتوى التسويقي.",
      price: "الأسعار كتختلف على حجم المشروع، وهادشي كيأكدو حمزة مباشرة. تواصل معاه باش يعطيك عرض دقيق.",
      portfolio: "فلمعرض كاين: Logo & Brand Identity، Social Media Ad Pack، Landing Page Design، 3D Mockups & Stationery، Career Blueprint، و Business Card. دوس على أي صورة باش تشوفها كبيرة.",
      skills: "الأدوات: Adobe Illustrator، Inkscape، Canva، VS Code. وحمزة عنده خبرة ميدانية فعمليات الموانئ (Tanger Med، Eurogate) وكيتعامل بثلاث لغات: العربية، الإنجليزية، الألمانية.",
      about: "حمزة مصمم جرافيك مستقل ومبدع محتوى رقمي من المغرب، عنده خلفية فعمليات الموانئ وفي نجارة الألومنيوم، وكيجمع بين الدقة والإبداع.",
      contact: "أحسن طريقة: نموذج التواصل فأسفل الصفحة، ولا البريد الإلكتروني، ولا Instagram/LinkedIn، ولا الخدمات عبر خمسات ومستقل.",
      language: "الموقع متاح بالعربية، الإنجليزية والألمانية. بدّل اللغة من الأزرار AR / EN / DE فالفوق، وأنا نجاوبك بأي لغة كتبلي بيها.",
      default: "هاد السؤال الأحسن يجاوب عليه حمزة بنفسو. تقدر توصل ليه مباشرة من هنا:",
    },
  },
  en: {
    trigger: "Hamza's Assistant",
    title: "Hamza's Assistant",
    subtitle: "Ask me about services, projects, or how to reach Hamza.",
    inputLabel: "Type your question",
    placeholder: "Type your question here...",
    send: "Send",
    close: "Close chat",
    minimize: "Minimize chat",
    welcome: "Hi! I'm the assistant on Hamza's portfolio. I can help with his services, projects, skills, or how to contact him. What would you like to know?",
    chips: ["What does Hamza offer?", "How much does it cost?", "Show me his work", "I want to contact Hamza"],
    typing: "Assistant is typing...",
    contactTitle: "Reach Hamza directly",
    openForm: "Open the contact form",
    copyEmail: "Copy email address",
    emailCopied: "Email copied ✓",
    error: "The assistant is unavailable right now. Please contact Hamza directly.",
    offlineNote: "Full AI chat goes live once the proxy is deployed. Basic info is available now:",
    thinkingFail: "Try again, or use the contact section.",
    fallback: {
      greeting: "Hi! I'm Hamza's assistant. Ask me about design, brand identity, landing pages, or contacting him.",
      services: "Hamza offers four services: brand identity & logo design, interface & landing page design, social media ads, and CV writing with marketing content.",
      price: "Pricing depends on the project scope, so Hamza confirms it personally. Reach out and he'll send you an accurate quote.",
      portfolio: "The portfolio shows Logo & Brand Identity, Social Media Ad Pack, Landing Page Design, 3D Mockups & Stationery, Career Blueprint, and a Business Card. Click any image to view it larger.",
      skills: "Tools: Adobe Illustrator, Inkscape, Canva, VS Code. Hamza also has hands-on port operations experience (Tanger Med, Eurogate) and works in Arabic, English and German.",
      about: "Hamza Reggaoui is a freelance graphic designer and digital content creator from Morocco, with a background in port operations and aluminum craftsmanship, combining precision with creativity.",
      contact: "Best options: the contact form at the bottom of the page, email, Instagram/LinkedIn, or his Khamsat and Mostaql profiles.",
      language: "The site is available in Arabic, English and German. Switch with the AR / EN / DE buttons and I'll answer in whichever language you write in.",
      default: "Hamza himself is the best person to answer that. You can reach him directly here:",
    },
  },
  de: {
    trigger: "Hamzas Assistent",
    title: "Hamzas Assistent",
    subtitle: "Fragen Sie zu Leistungen, Projekten oder dem Kontaktweg.",
    inputLabel: "Ihre Frage eingeben",
    placeholder: "Frage hier eingeben...",
    send: "Senden",
    close: "Chat schließen",
    minimize: "Chat minimieren",
    welcome: "Hallo! Ich bin der Assistent auf Hamzas Portfolio. Ich helfe bei Fragen zu Leistungen, Projekten, Fähigkeiten oder Kontakt. Was möchten Sie wissen?",
    chips: ["Was bietet Hamza an?", "Was kosten die Leistungen?", "Zeigen Sie mir die Projekte", "Ich möchte Hamza kontaktieren"],
    typing: "Assistent schreibt...",
    contactTitle: "Hamza direkt erreichen",
    openForm: "Kontaktformular öffnen",
    copyEmail: "E-Mail kopieren",
    emailCopied: "E-Mail kopiert ✓",
    error: "Der Assistent ist gerade nicht erreichbar. Bitte kontaktieren Sie Hamza direkt.",
    offlineNote: "Der vollständige KI-Chat ist online, sobald der Proxy deployed ist. Basisinfos gibt es jetzt schon:",
    thinkingFail: "Versuchen Sie es erneut oder nutzen Sie den Kontaktbereich.",
    fallback: {
      greeting: "Hallo! Ich bin Hamzas Assistent. Fragen Sie zu Design, Brand Identity, Landingpages oder Kontakt.",
      services: "Hamza bietet vier Leistungen: Logo- & Brand-Identity-Design, UI- und Landingpage-Design, Social-Media-Design sowie Lebenslauf- und Marketing-Content.",
      price: "Der Preis hängt vom Projektumfang ab und wird von Hamza persönlich bestätigt. Kontaktieren Sie ihn für ein genaues Angebot.",
      portfolio: "Im Portfolio: Logo & Brand Identity, Social Media Ad Pack, Landing Page Design, 3D Mockups & Stationery, Career Blueprint und Business Card. Klicken Sie auf ein Bild für die Großansicht.",
      skills: "Tools: Adobe Illustrator, Inkscape, Canva, VS Code. Hamza hat Praxis in Hafenbetrieben (Tanger Med, Eurogate) und arbeitet auf Arabisch, Englisch und Deutsch.",
      about: "Hamza Reggaoui ist selbstständiger Grafikdesigner und digitaler Content Creator aus Marokko mit Hintergrund in Hafenbetrieb und Aluminiumfertigung.",
      contact: "Am besten: das Kontaktformular unten, E-Mail, Instagram/LinkedIn oder seine Khamsat- und Mostaql-Profile.",
      language: "Die Website ist auf Arabisch, Englisch und Deutsch. Nutzen Sie die AR / EN / DE Buttons; ich antworte in Ihrer Sprache.",
      default: "Diese Antwort gibt Hamza am besten persönlich. Sie erreichen ihn hier:",
    },
  },
};

const widget = document.getElementById("chatWidget");
const trigger = document.getElementById("chatTrigger");
const panel = document.getElementById("chatPanel");
const collapse = document.getElementById("chatCollapse");
const avatarBtn = document.getElementById("chatAvatarBtn");
const log = document.getElementById("chatLog");
const chipsBar = document.getElementById("chatChips");
const form = document.getElementById("chatForm");
const input = document.getElementById("chatInput");

panel.setAttribute("dir", "rtl");

const history = [];
let busy = false;
let lastChipsLang = null;

// الشات دائمًا بالعربية، بغض النظر على لغة الموقع
function lang() {
  return "ar";
}

function copy() {
  return chatCopy[lang()];
}

function contactChannels() {
  return Array.from(document.querySelectorAll(".contact-links a"))
    .map((link) => {
      const href = link.getAttribute("href") || "";
      const isMail = href.startsWith("mailto:");
      return {
        label: (isMail ? "Email" : link.textContent.trim()) || "Link",
        href: isMail ? href.slice(7) : href,
        mail: isMail,
      };
    })
    .filter((item) => item.href);
}

function applyCopy() {
  const t = copy();
  document.getElementById("chatTriggerText").textContent = t.trigger;
  document.getElementById("chatTitle").textContent = t.title;
  document.getElementById("chatSubtitle").textContent = t.subtitle;
  document.getElementById("chatInputLabel").textContent = t.inputLabel;
  input.placeholder = t.placeholder;
  document.getElementById("chatSendLabel").textContent = t.send;
  collapse.setAttribute("aria-label", t.close);
  avatarBtn.setAttribute("aria-label", t.minimize);
}

function renderChips() {
  const t = copy();
  chipsBar.textContent = "";
  t.chips.forEach((text) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chat-chip";
    btn.textContent = text;
    btn.addEventListener("click", () => submit(text));
    chipsBar.appendChild(btn);
  });
}

function bubble(role, text) {
  const wrap = document.createElement("div");
  wrap.className = `chat-msg ${role}`;
  const body = document.createElement("p");
  body.textContent = text;
  wrap.appendChild(body);
  log.appendChild(wrap);
  log.scrollTop = log.scrollHeight;
  return wrap;
}

function typingBubble() {
  const wrap = bubble("bot", "");
  wrap.classList.add("typing");
  wrap.querySelector("p").textContent = copy().typing;
  return wrap;
}

function contactCard() {
  const t = copy();
  const card = document.createElement("div");
  card.className = "chat-msg bot chat-contact-card";

  const title = document.createElement("strong");
  title.textContent = t.contactTitle;
  card.appendChild(title);

  const list = document.createElement("div");
  list.className = "chat-contact-links";
  contactChannels().forEach((channel) => {
    const link = document.createElement("a");
    link.textContent = channel.label;
    link.href = channel.mail ? `mailto:${channel.href}` : channel.href;
    if (!channel.mail) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }
    list.appendChild(link);
  });
  card.appendChild(list);

  const actions = document.createElement("div");
  actions.className = "chat-card-actions";

  const formBtn = document.createElement("button");
  formBtn.type = "button";
  formBtn.textContent = t.openForm;
  formBtn.addEventListener("click", () => {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => document.getElementById("name").focus(), 600);
  });
  actions.appendChild(formBtn);

  const email = (contactChannels().find((channel) => channel.mail) || {}).href;
  if (email && navigator.clipboard) {
    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.textContent = t.copyEmail;
    copyBtn.addEventListener("click", async () => {
      await navigator.clipboard.writeText(email);
      copyBtn.textContent = t.emailCopied;
    });
    actions.appendChild(copyBtn);
  }
  card.appendChild(actions);

  log.appendChild(card);
  log.scrollTop = log.scrollHeight;
}

function localAnswer(text) {
  const t = copy().fallback;
  const q = text.toLowerCase();
  const has = (...tokens) => tokens.some((token) => q.includes(token));

  if (/(^(hi|hello|hey|salam|salut|hallo|bonjour)\b|مرحبا|السلام|سلام|كيفاش|واش|khoya)/.test(q)) return { reply: t.greeting, contactNext: false };
  if (has("price", "pricing", "cost", "rate", "tarif", "prix", "preis", "kosten", "سعر", "اسعار", "أسعار", "ثمن", "بشحون", "بشحال", "بقد", "كم كلف", "bchkon", "bchhal", "flous", "thman")) return { reply: t.price, contactNext: true };
  if (has("service", "offer", "leistung", "angebot", "prestation", "خدمة", "خدمات", "اش كتدير", "شنو كتدير", "كندير", "design", "logo", "khedma", "khdamat", "khdamt")) return { reply: t.services, contactNext: false };
  if (has("portfolio", "work", "project", "sample", "projekt", "arbeit", "travaux", "أعمال", "أعمالي", "اعمالك", "مشاريع", "مشروع", "bortifolio", "wkhat")) return { reply: t.portfolio, contactNext: false };
  if (has("skill", "tool", "adobe", "illustrator", "canva", "مهارة", "مهارات", "أدوات", "ادوات", "outil")) return { reply: t.skills, contactNext: false };
  if (has("about", "who", "bio", "experience", "background", "من أنا", "مين حمزة", "تعرف على", "über", "profil", "chkoun")) return { reply: t.about, contactNext: false };
  if (has("contact", "reach", "email", "mail", "instagram", "linkedin", "khamsat", "mostaql", "form", "تواصل", "مراسلة", "بريد", "سكسي", "twessel", "message")) return { reply: t.contact, contactNext: true };
  if (has("language", "langue", "sprache", "arabic", "english", "german", "darija", "لغة", "لغات", "دارجة", "المانيا", "المانية", "ألمانية", "talgha", "lougha")) return { reply: t.language, contactNext: false };
  return { reply: t.default, contactNext: true };
}

async function requestReply() {
  if (!CHAT_ENDPOINT) {
    const last = history[history.length - 1];
    return localAnswer(last ? last.content : "");
  }

  const response = await fetch(CHAT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lang: lang(),
      contacts: contactChannels().map(({ label, href }) => ({ label, href })),
      messages: history.slice(-10),
    }),
  });

  if (!response.ok) throw new Error(`chat request failed: ${response.status}`);

  const data = await response.json();
  if (!data || typeof data.reply !== "string") throw new Error("malformed assistant reply");
  return { reply: data.reply, contactNext: Boolean(data.contact_next) };
}

async function submit(text) {
  const message = (text || "").trim();
  if (!message || busy) return;

  busy = true;
  form.querySelector(".chat-send").disabled = true;
  chipsBar.classList.add("off");
  input.value = "";
  bubble("user", message);
  history.push({ role: "user", content: message });

  const typing = typingBubble();
  try {
    const { reply, contactNext } = await requestReply();
    history.push({ role: "assistant", content: reply });
    typing.remove();
    bubble("bot", reply);
    if (contactNext) contactCard();
  } catch (error) {
    console.error(error);
    typing.remove();
    bubble("bot", `${copy().error} ${copy().thinkingFail}`);
    contactCard();
  } finally {
    busy = false;
    form.querySelector(".chat-send").disabled = false;
    chipsBar.classList.remove("off");
    input.focus();
  }
}

function open() {
  panel.hidden = false;
  widget.classList.add("open");
  trigger.setAttribute("aria-expanded", "true");
  if (!log.childElementCount) {
    bubble("bot", copy().welcome);
    if (!CHAT_ENDPOINT) bubble("bot", copy().offlineNote);
  }
  renderChips();
  lastChipsLang = lang();
  input.focus();
}

function close() {
  panel.hidden = true;
  widget.classList.remove("open");
  trigger.setAttribute("aria-expanded", "false");
  trigger.focus();
}

trigger.addEventListener("click", () => (panel.hidden ? open() : close()));
collapse.addEventListener("click", close);
avatarBtn.addEventListener("click", close);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  submit(input.value);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !panel.hidden) close();
});

applyCopy();
})();
