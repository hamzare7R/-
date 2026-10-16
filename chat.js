(function () {
"use strict";
// AI chat assistant for the portfolio
// CHAT_ENDPOINT = the deployed Cloudflare Worker in worker/hamza-chat-worker.js

const CHAT_ENDPOINT = "https://hamza-chat.hamzareggaoui63.workers.dev";

const chatCopy = {
  ar: {
    trigger: "مساعد حمزة",
    title: "مساعد حمزة",
    subtitle: "اسألني عن الخدمات، أو المشاريع، أو طريقة التواصل مع حمزة.",
    inputLabel: "اكتب سؤالك",
    placeholder: "اكتب سؤالك هنا...",
    send: "إرسال",
    close: "إغلاق المحادثة",
    minimize: "تصغير المحادثة",
    welcome: "مرحبًا! أنا المساعد الخاص بحمزة رجّاوي. يمكنني أن أجيبك عن خدماته، وأعماله، ومهاراته، أو طريقة التواصل معه. ماذا تودّ أن تعرف؟",
    chips: ["ما الخدمات التي يقدمها حمزة؟", "كيف تُحدَّد الأسعار؟", "أرني أعماله", "أريد التواصل مع حمزة"],
    typing: "المساعد يكتب...",
    contactTitle: "التواصل المباشر مع حمزة",
    openForm: "فتح نموذج التواصل",
    copyEmail: "نسخ البريد الإلكتروني",
    emailCopied: "تم نسخ البريد ✓",
    error: "المساعد غير متاح حاليًا. من الأفضل أن تتواصل مع حمزة مباشرة.",
    offlineNote: "يتوفر المساعد الذكي الكامل بعد نشر الخادم الخاص به. حتى ذلك الحين يمكنني تزويدك بالمعلومات الأساسية:",
    thinkingFail: "حاول مرة أخرى، أو انتقل إلى قسم التواصل في أسفل الصفحة.",
    fallback: {
      greeting: "مرحبًا! أنا مساعد حمزة. اسألني عن التصميم، أو الهوية البصرية، أو صفحات الهبوط، أو طريقة التواصل.",
      services: "يقدم حمزة أربع خدمات: تصميم الهوية البصرية والشعارات، وتصميم الواجهات وصفحات الهبوط، وتصميم إعلانات التواصل الاجتماعي، وكتابة السير الذاتية والمحتوى التسويقي.",
      price: "تختلف الأسعار بحسب حجم المشروع ونطاقه، ويحدّدها حمزة بنفسه في عرض مفصّل. تواصل معه لتحصل على سعر دقيق.",
      portfolio: "يتضمن المعرض أربعة أقسام: الهوية البصرية والشعارات، والمطبوعات والسوشيال ميديا، والواجهات وصفحات الهبوط، والسير الذاتية والمستندات. افتح أي قسم لعرض أعماله مع الوصف وخطوات الإنجاز.",
      skills: "أدوات العمل: Adobe Illustrator، وInkscape، وCanva، وVS Code. كما يملك حمزة خبرة ميدانية في عمليات الموانئ (طنجة المتوسط وEurogate)، ويعمل بأربع لغات: العربية والإنجليزية والألمانية والفرنسية.",
      about: "حمزة رجّاوي مصمم جرافيك مستقل ومبدع محتوى رقمي من المغرب، تجمع أعماله بين دقة البيئات التشغيلية وحسّ التصميم البصري.",
      contact: "أفضل الطرق: نموذج التواصل في أسفل الصفحة، أو البريد الإلكتروني، أو Instagram وLinkedIn، أو خدماته عبر خمسات ومستقل.",
      language: "الموقع متاح بلغات العربية، والإنجليزية، والألمانية، والفرنسية. بدّل اللغة من الأزرار في الأعلى، وأجيبك باللغة التي تكتب بها.",
      default: "هذا السؤال يجيب عنه حمزة شخصيًا بدقة أكبر. يمكنك الوصول إليه مباشرة من هنا:",
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
      services: "Hamza offers four services: brand identity & logo design, interface & landing page design, social media design, and CV writing with marketing content.",
      price: "Pricing depends on the project scope, so Hamza confirms it personally. Reach out and he'll send you an accurate quote.",
      portfolio: "The store has four sections: brand identity & logos, print & social media, interfaces & landing pages, and CVs & career documents. Open a section to see every project with its description and production steps.",
      skills: "Tools: Adobe Illustrator, Inkscape, Canva, VS Code. Hamza also has hands-on port operations experience (Tanger Med, Eurogate) and works in Arabic, English, German and French.",
      about: "Hamza Reggaoui is a freelance graphic designer and digital content creator from Morocco, combining field precision with visual design craft.",
      contact: "Best options: the contact form at the bottom of the page, email, Instagram/LinkedIn, or his Khamsat and Mostaql profiles.",
      language: "The site is available in Arabic, English, German and French. Switch with the buttons at the top and I'll answer in whichever language you write in.",
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
      portfolio: "Der Store hat vier Bereiche: Markenidentität & Logos, Print & Social Media, Interfaces & Landingpages sowie Lebensläufe & Dokumente. Öffnen Sie einen Bereich für alle Projekte mit Beschreibung und Ablauf.",
      skills: "Tools: Adobe Illustrator, Inkscape, Canva, VS Code. Hamza hat Praxis in Hafenbetrieben (Tanger Med, Eurogate) und arbeitet auf Arabisch, Englisch, Deutsch und Französisch.",
      about: "Hamza Reggaoui ist selbstständiger Grafikdesigner und digitaler Content Creator aus Marokko; er verbindet betriebliche Präzision mit gestalterischem Handwerk.",
      contact: "Am besten: das Kontaktformular unten, E-Mail, Instagram/LinkedIn oder seine Khamsat- und Mostaql-Profile.",
      language: "Die Website ist auf Arabisch, Englisch, Deutsch und Französisch. Nutzen Sie die Buttons oben; ich antworte in Ihrer Sprache.",
      default: "Diese Antwort gibt Hamza am besten persönlich. Sie erreichen ihn hier:",
    },
  },
  fr: {
    trigger: "Assistant de Hamza",
    title: "Assistant de Hamza",
    subtitle: "Posez vos questions sur les services, les projets ou le contact.",
    inputLabel: "Écrivez votre question",
    placeholder: "Écrivez votre question ici...",
    send: "Envoyer",
    close: "Fermer la discussion",
    minimize: "Réduire la discussion",
    welcome: "Bonjour ! Je suis l'assistant du portfolio de Hamza. Je peux répondre sur ses services, ses projets, ses compétences ou la façon de le contacter. Que souhaitez-vous savoir ?",
    chips: ["Que propose Hamza ?", "Quels sont les tarifs ?", "Montrez-moi ses projets", "Je veux contacter Hamza"],
    typing: "L'assistant écrit...",
    contactTitle: "Contacter Hamza directement",
    openForm: "Ouvrir le formulaire de contact",
    copyEmail: "Copier l'e-mail",
    emailCopied: "E-mail copié ✓",
    error: "L'assistant est indisponible pour le moment. Contactez Hamza directement.",
    offlineNote: "Le chat IA complet s'active dès que le proxy est déployé. Les informations de base sont déjà disponibles :",
    thinkingFail: "Réessayez, ou utilisez la section contact en bas de page.",
    fallback: {
      greeting: "Bonjour ! Je suis l'assistant de Hamza. Demandez-moi du design, de l'identité visuelle, des landing pages ou du contact.",
      services: "Hamza propose quatre services : identité visuelle et logos, design d'interfaces et de landing pages, création pour réseaux sociaux, et rédaction de CV avec contenu marketing.",
      price: "Le tarif dépend de l'ampleur du projet et est confirmé personnellement par Hamza. Contactez-le pour un devis précis.",
      portfolio: "La boutique compte quatre sections : identité visuelle & logos, print & réseaux sociaux, interfaces & landing pages, et CV & documents de carrière. Ouvrez une section pour voir chaque projet avec sa description et sa réalisation.",
      skills: "Outils : Adobe Illustrator, Inkscape, Canva, VS Code. Hamza a aussi une expérience terrain des opérations portuaires (Tanger Med, Eurogate) et travaille en arabe, anglais, allemand et français.",
      about: "Hamza Reggaoui est graphiste freelance et créateur de contenu digital marocain ; il associe la rigueur opérationnelle au savoir-faire visuel.",
      contact: "Le mieux : le formulaire en bas de page, l'e-mail, Instagram/LinkedIn, ou ses profils Khamsat et Mostaql.",
      language: "Le site est disponible en arabe, anglais, allemand et français. Changez la langue avec les boutons du haut ; je réponds dans votre langue.",
      default: "Hamza est le mieux placé pour répondre à cela. Vous pouvez l'atteindre directement ici :",
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

const history = [];
let busy = false;

function lang() {
  const siteLang = document.documentElement.lang || "ar";
  return chatCopy[siteLang] ? siteLang : "ar";
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
  panel.setAttribute("dir", lang() === "ar" ? "rtl" : "ltr");
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

  if (/(^(hi|hello|hey|salam|salut|hallo|bonjour)\b|مرحبا|السلام|سلام)/.test(q)) return { reply: t.greeting, contactNext: false };
  if (has("price", "pricing", "cost", "rate", "tarif", "prix", "preis", "kosten", "سعر", "اسعار", "أسعار", "ثمن", "بشحون", "بشحال", "كم كلف", "bchkon", "bchhal", "flous", "thman")) return { reply: t.price, contactNext: true };
  if (has("service", "offer", "leistung", "prestation", "خدمة", "خدمات", "اش كتدير", "شنو كتدير", "khedma", "khdamat", "khdamt")) return { reply: t.services, contactNext: false };
  if (has("portfolio", "work", "project", "sample", "projekt", "arbeit", "travaux", "أعمال", "أعمالي", "اعمالك", "مشاريع", "مشروع", "bortifolio", "wkhat")) return { reply: t.portfolio, contactNext: false };
  if (has("skill", "tool", "adobe", "illustrator", "canva", "مهارة", "مهارات", "أدوات", "ادوات", "outil")) return { reply: t.skills, contactNext: false };
  if (has("about", "who", "bio", "experience", "background", "من أنا", "مين حمزة", "über", "profil", "chkoun")) return { reply: t.about, contactNext: false };
  if (has("contact", "reach", "email", "mail", "instagram", "linkedin", "khamsat", "mostaql", "form", "تواصل", "مراسلة", "بريد", "twessel", "message")) return { reply: t.contact, contactNext: true };
  if (has("language", "langue", "sprache", "arabic", "english", "german", "french", "لغة", "لغات", "دارجة", "ألمانية", "talgha", "lougha", "فرنسية")) return { reply: t.language, contactNext: false };
  return { reply: t.default, contactNext: true };
}

async function requestReply() {
  if (!CHAT_ENDPOINT) {
    const last = history[history.length - 1];
    return localAnswer(last ? last.content : "");
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    const response = await fetch(CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        lang: lang(),
        contacts: contactChannels().map(({ label, href }) => ({ label, href })),
        messages: history.slice(-10),
      }),
    });
    clearTimeout(timer);

    if (!response.ok) throw new Error(`chat request failed: ${response.status}`);

    const data = await response.json();
    const replyText = data.reply || data.response || data.message;

    if (!replyText || typeof replyText !== "string") {
      throw new Error("Invalid response format from AI worker");
    }

    return {
      reply: replyText.trim(),
      contactNext: Boolean(data.contact_next || data.contactNext),
    };
  } catch (error) {
    console.warn("AI endpoint failed, using local answers", error);
    const last = history[history.length - 1];
    return localAnswer(last ? last.content : "");
  }
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

new MutationObserver(() => {
  applyCopy();
  if (!panel.hidden) renderChips();
}).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

applyCopy();
})();
