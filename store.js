// Store views: category catalog, work detail, order-by-email
import { storeData } from "./works.js";

const storeCopy = {
  ar: {
    back: "رجوع",
    home: "الأقسام",
    search: "ابحث في الأعمال...",
    sortLabel: "ترتيب",
    sortNew: "الأحدث",
    sortOld: "الأقدم",
    sortName: "الاسم",
    sortDuration: "الأسرع",
    tagsLabel: "الوسوم",
    clearFilters: "مسح التصفية",
    worksCount: (n) => `${n} عمل`,
    onRequest: "السعر حسب المشروع",
    from: "يبدأ من",
    days: "يوم",
    duration: "مدة التنفيذ",
    tools: "الأدوات",
    deliverables: "ما تستلمه",
    process: "كيف أُنجز",
    description: "عن المشروع",
    order: "اطلب هذا العمل",
    orderSubject: (title) => `طلب بشأن: ${title}`,
    orderBody: (title, cat) => `مرحبًا حمزة،\n\nأنا مهتم بـ «${title}» (${cat}).\nأودّ مناقشة مشروع مشابه.\n\nالخطوات التي أريدها:\n1. \n2. \n\nشكرًا.`,
    alsoForm: "أو املأ نموذج التواصل",
    live: "فتح الموقع الحي",
    gallery: "معرض الصور",
    related: "أعمال ذات صلة",
    noResults: "لا نتائج مطابقة. جرّب كلمة أخرى.",
    share: "نسخ رابط العمل",
    copied: "تم نسخ الرابط ✓",
    openStore: "تصفح المتجر",
    featured: "أعمال مختارة",
    categoryIntro: "اختر قسمًا لعرض كل الأعمال المرتبطة به مع الوصف و خطوات الإنجاز.",
  },
  en: {
    back: "Back",
    home: "Sections",
    search: "Search the works...",
    sortLabel: "Sort",
    sortNew: "Newest",
    sortOld: "Oldest",
    sortName: "Name",
    sortDuration: "Fastest",
    tagsLabel: "Tags",
    clearFilters: "Clear filters",
    worksCount: (n) => `${n} works`,
    onRequest: "Price on request",
    from: "From",
    days: "days",
    duration: "Turnaround",
    tools: "Tools",
    deliverables: "What you get",
    process: "How it was made",
    description: "About the project",
    order: "Order this work",
    orderSubject: (title) => `Request about: ${title}`,
    orderBody: (title, cat) => `Hi Hamza,\n\nI'm interested in "${title}" (${cat}).\nI'd like to discuss a similar project.\n\nWhat I need:\n1. \n2. \n\nThanks.`,
    alsoForm: "Or use the contact form",
    live: "Open the live site",
    gallery: "Gallery",
    related: "Related work",
    noResults: "No matches. Try another word.",
    share: "Copy work link",
    copied: "Link copied ✓",
    openStore: "Browse the store",
    featured: "Selected work",
    categoryIntro: "Pick a section to see every related project with its description and production steps.",
  },
  de: {
    back: "Zurück",
    home: "Bereiche",
    search: "Projekte durchsuchen...",
    sortLabel: "Sortieren",
    sortNew: "Neueste",
    sortOld: "Älteste",
    sortName: "Name",
    sortDuration: "Schnellste",
    tagsLabel: "Schlagwörter",
    clearFilters: "Filter zurücksetzen",
    worksCount: (n) => `${n} Projekte`,
    onRequest: "Preis auf Anfrage",
    from: "Ab",
    days: "Tage",
    duration: "Laufzeit",
    tools: "Tools",
    deliverables: "Lieferumfang",
    process: "So entstand es",
    description: "Zum Projekt",
    order: "Dieses Projekt anfragen",
    orderSubject: (title) => `Anfrage zu: ${title}`,
    orderBody: (title, cat) => `Hallo Hamza,\n\nich interessiere mich für „${title}“ (${cat}).\nGerne würde ich ein ähnliches Projekt besprechen.\n\nMeine Anforderungen:\n1. \n2. \n\nDanke.`,
    alsoForm: "Oder das Kontaktformular nutzen",
    live: "Live-Seite öffnen",
    gallery: "Galerie",
    related: "Ähnliche Arbeiten",
    noResults: "Keine Treffer. Anderes Wort versuchen.",
    share: "Projektlink kopieren",
    copied: "Link kopiert ✓",
    openStore: "Store ansehen",
    featured: "Ausgewählte Arbeiten",
    categoryIntro: "Wählen Sie einen Bereich für alle zugehörigen Projekte inklusive Beschreibung und Ablauf.",
  },
  fr: {
    back: "Retour",
    home: "Sections",
    search: "Rechercher un projet...",
    sortLabel: "Trier",
    sortNew: "Plus récents",
    sortOld: "Plus anciens",
    sortName: "Nom",
    sortDuration: "Les plus rapides",
    tagsLabel: "Étiquettes",
    clearFilters: "Réinitialiser",
    worksCount: (n) => `${n} projets`,
    onRequest: "Tarif sur devis",
    from: "À partir de",
    days: "jours",
    duration: "Délai",
    tools: "Outils",
    deliverables: "Ce que vous recevez",
    process: "Comment c'est fait",
    description: "À propos du projet",
    order: "Commander ce projet",
    orderSubject: (title) => `Demande à propos de : ${title}`,
    orderBody: (title, cat) => `Bonjour Hamza,\n\nJe suis intéressé par « ${title} » (${cat}).\nJ'aimerais échanger sur un projet similaire.\n\nCe dont j'ai besoin :\n1. \n2. \n\nMerci.`,
    alsoForm: "Ou utiliser le formulaire de contact",
    live: "Ouvrir le site en ligne",
    gallery: "Galerie",
    related: "Projets similaires",
    noResults: "Aucun résultat. Essayez un autre mot.",
    share: "Copier le lien du projet",
    copied: "Lien copié ✓",
    openStore: "Parcourir la boutique",
    featured: "Projets choisis",
    categoryIntro: "Choisissez une section pour voir tous les projets associés, avec description et étapes de réalisation.",
  },
};

const root = document.getElementById("storeRoot");
const grid = document.getElementById("categoryGrid");
const intro = document.getElementById("storeIntro");

const state = { category: null, work: null, query: "", sort: "new", tags: new Set() };
let lastHash = null;

function scrollToStore() {
  const section = root.closest("section") || root;
  const header = document.querySelector(".site-header");
  const offset = (header ? header.offsetHeight : 0) + 12;
  const top = section.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
}

function uiLang() {
  const value = document.documentElement.lang || "ar";
  return storeCopy[value] ? value : "ar";
}

function tr() {
  return storeCopy[uiLang()];
}

function pick(field) {
  return field ? field[uiLang()] || field.en || "" : "";
}

function workById(id) {
  return storeData.works.find((item) => item.id === id);
}

function categoryById(id) {
  return storeData.categories.find((item) => item.id === id);
}

function worksIn(categoryId) {
  return storeData.works.filter((item) => item.category === categoryId);
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function contactEmail() {
  const link = document.querySelector('.contact-links a[href^="mailto:"]');
  return link ? link.getAttribute("href").slice(7) : "";
}

function navigate(hash) {
  window.location.hash = hash;
}

function openLightbox(src) {
  const box = document.getElementById("lightbox");
  const image = document.getElementById("lightboxImg");
  if (!box || !image) return;
  image.src = src;
  box.classList.add("open");
  box.setAttribute("aria-hidden", "false");
}

function readRoute() {
  const parts = window.location.hash.replace(/^#\/?/, "").split("/");
  state.work = parts[0] === "work" ? parts[1] || null : null;
  state.category = parts[0] === "store" ? parts[1] || null : null;
  if (state.work) state.category = null;
}

/* ---------- section: category tiles ---------- */

function renderTiles() {
  grid.textContent = "";
  intro.textContent = tr().categoryIntro;
  storeData.categories.forEach((category) => {
    const card = el("button", "category-card");
    card.type = "button";

    const count = worksIn(category.id).length;
    const cover = worksIn(category.id).find((w) => w.featured) || worksIn(category.id)[0];

    card.appendChild(el("span", "category-icon", category.icon));
    const body = el("div", "category-body");
    body.appendChild(el("h3", "category-title", pick(category.title)));
    body.appendChild(el("p", "category-blurb", pick(category.blurb)));
    const meta = el("div", "category-meta");
    meta.appendChild(el("span", "category-count", tr().worksCount(count)));
    meta.appendChild(el("span", "category-open", `${tr().openStore} →`));
    body.appendChild(meta);
    card.appendChild(body);

    if (cover) {
      const img = el("img", "category-thumb");
      img.src = cover.cover;
      img.alt = pick(cover.title);
      img.loading = "lazy";
      card.appendChild(img);
    }

    card.addEventListener("click", () => navigate(`#/store/${category.id}`));
    grid.appendChild(card);
  });
}

/* ---------- store view ---------- */

function visibleWorks() {
  let list = worksIn(state.category);
  const query = state.query.trim().toLowerCase();
  if (query) {
    list = list.filter((work) =>
      [pick(work.title), pick(work.tagline), pick(work.description), work.tags.join(" ")].join(" ").toLowerCase().includes(query)
    );
  }
  if (state.tags.size) list = list.filter((work) => work.tags.some((tag) => state.tags.has(tag)));

  const sorted = [...list];
  if (state.sort === "new") sorted.sort((a, b) => b.year - a.year);
  if (state.sort === "old") sorted.sort((a, b) => a.year - b.year);
  if (state.sort === "name") sorted.sort((a, b) => pick(a.title).localeCompare(pick(b.title)));
  if (state.sort === "fast") sorted.sort((a, b) => parseInt(a.duration, 10) - parseInt(b.duration, 10));
  return sorted;
}

function renderStore() {
  root.textContent = "";
  root.classList.add("active");
  const category = categoryById(state.category);
  if (!category) return navigate("#portfolio");

  const head = el("header", "store-head");
  const back = el("button", "store-back", `← ${tr().home}`);
  back.type = "button";
  back.addEventListener("click", () => navigate("#portfolio"));
  head.appendChild(back);

  const titleBlock = el("div", "store-title-block");
  titleBlock.appendChild(el("p", "eyebrow", pick(category.title)));
  titleBlock.appendChild(el("h2", "store-title", pick(category.blurb)));
  head.appendChild(titleBlock);

  const search = el("input", "store-search");
  search.type = "search";
  search.placeholder = tr().search;
  search.value = state.query;
  search.setAttribute("aria-label", tr().search);
  search.addEventListener("input", () => {
    state.query = search.value;
    renderGrid();
  });
  head.appendChild(search);

  const sort = el("select", "store-sort");
  sort.setAttribute("aria-label", tr().sortLabel);
  [
    ["new", tr().sortNew],
    ["old", tr().sortOld],
    ["name", tr().sortName],
    ["fast", tr().sortDuration],
  ].forEach(([value, label]) => {
    const option = el("option", null, label);
    option.value = value;
    sort.appendChild(option);
  });
  sort.value = state.sort;
  sort.addEventListener("change", () => {
    state.sort = sort.value;
    renderGrid();
  });
  head.appendChild(sort);

  root.appendChild(head);

  const tagBar = el("div", "store-tags");
  const usedTags = [...new Set(worksIn(state.category).flatMap((work) => work.tags))];
  usedTags.forEach((tag) => {
    const chip = el("button", "store-tag" + (state.tags.has(tag) ? " on" : ""), tag);
    chip.type = "button";
    chip.addEventListener("click", () => {
      state.tags.has(tag) ? state.tags.delete(tag) : state.tags.add(tag);
      renderStore();
    });
    tagBar.appendChild(chip);
  });
  if (state.tags.size) {
    const clear = el("button", "store-tag clear", `✕ ${tr().clearFilters}`);
    clear.type = "button";
    clear.addEventListener("click", () => {
      state.tags.clear();
      renderStore();
    });
    tagBar.appendChild(clear);
  }
  root.appendChild(tagBar);

  const gridWrap = el("div", "store-grid-wrap");
  root.appendChild(gridWrap);
  renderGrid();
}

function renderGrid() {
  const wrap = root.querySelector(".store-grid-wrap");
  if (!wrap) return;
  wrap.textContent = "";
  const list = visibleWorks();

  if (!list.length) {
    wrap.appendChild(el("p", "store-empty", tr().noResults));
    return;
  }

  list.forEach((work) => {
    const card = el("article", "work-card");
    const media = el("div", "work-media");
    const img = el("img");
    img.src = work.cover;
    img.alt = pick(work.title);
    img.loading = "lazy";
    media.appendChild(img);
    if (work.featured) media.appendChild(el("span", "work-badge", "★"));
    card.appendChild(media);

    const body = el("div", "work-body");
    body.appendChild(el("h3", "work-title", pick(work.title)));
    body.appendChild(el("p", "work-tagline", pick(work.tagline)));

    const meta = el("div", "work-meta");
    meta.appendChild(el("span", "work-year", String(work.year)));
    meta.appendChild(el("span", "work-time", `${work.duration} ${tr().days}`));
    meta.appendChild(el("span", "work-price", work.priceFrom ? `${tr().from} ${work.priceFrom} ${storeData.currency}` : tr().onRequest));
    body.appendChild(meta);
    card.appendChild(body);

    card.appendChild(el("span", "work-cta", `${tr().order} →`));
    card.tabIndex = 0;
    card.addEventListener("click", () => navigate(`#/work/${work.id}`));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter") navigate(`#/work/${work.id}`);
    });
    wrap.appendChild(card);
  });
}

/* ---------- work detail ---------- */

function renderWork() {
  const work = workById(state.work);
  if (!work) return navigate("#portfolio");
  const category = categoryById(work.category);
  const t = tr();

  root.textContent = "";
  root.classList.add("active");

  const head = el("header", "store-head detail-head");
  const back = el("button", "store-back", `← ${pick(category.title)}`);
  back.type = "button";
  back.addEventListener("click", () => navigate(`#/store/${category.id}`));
  head.appendChild(back);
  const titleBlock = el("div", "store-title-block");
  titleBlock.appendChild(el("p", "eyebrow", pick(category.title)));
  titleBlock.appendChild(el("h2", "store-title", pick(work.title)));
  head.appendChild(titleBlock);
  root.appendChild(head);

  const layout = el("div", "work-layout");

  const gallery = el("section", "work-gallery");
  const main = el("img", "work-main");
  main.src = work.gallery[0];
  main.alt = pick(work.title);
  main.addEventListener("click", () => openLightbox(main.src));
  gallery.appendChild(main);

  if (work.gallery.length > 1) {
    const thumbs = el("div", "work-thumbs");
    work.gallery.forEach((src, i) => {
      const thumb = el("button", "work-thumb" + (i === 0 ? " on" : ""));
      thumb.type = "button";
      const image = el("img");
      image.src = src;
      image.alt = `${pick(work.title)} ${i + 1}`;
      image.loading = "lazy";
      thumb.appendChild(image);
      thumb.addEventListener("click", () => {
        main.src = src;
        thumbs.querySelectorAll(".work-thumb").forEach((node) => node.classList.remove("on"));
        thumb.classList.add("on");
      });
      thumbs.appendChild(thumb);
    });
    gallery.appendChild(thumbs);
  }
  gallery.appendChild(el("p", "work-gallery-label", `${t.gallery} · ${work.gallery.length}`));
  layout.appendChild(gallery);

  const info = el("section", "work-info");
  info.appendChild(el("p", "work-tagline", pick(work.tagline)));

  const priceBox = el("div", "work-price-box");
  priceBox.appendChild(el("span", "work-price-label", t.duration));
  priceBox.appendChild(el("span", "work-price-value", `${work.duration} ${t.days}`));
  priceBox.appendChild(el("span", "work-price-value price", work.priceFrom ? `${t.from} ${work.priceFrom} ${storeData.currency}` : t.onRequest));
  info.appendChild(priceBox);

  const desc = el("div", "work-block");
  desc.appendChild(el("h4", null, t.description));
  desc.appendChild(el("p", null, pick(work.description)));
  info.appendChild(desc);

  const tools = el("div", "work-block");
  tools.appendChild(el("h4", null, t.tools));
  const toolRow = el("div", "pill-list");
  work.tools.forEach((tool) => toolRow.appendChild(el("span", null, tool)));
  tools.appendChild(toolRow);
  info.appendChild(tools);

  const gets = el("div", "work-block");
  gets.appendChild(el("h4", null, t.deliverables));
  const getsList = el("ul", "work-deliverables");
  (work.deliverables[uiLang()] || work.deliverables.en).forEach((item) => getsList.appendChild(el("li", null, item)));
  gets.appendChild(getsList);
  info.appendChild(gets);

  const actions = el("div", "work-actions");
  const email = contactEmail();

  if (email) {
    const order = el("a", "btn btn-primary");
    order.textContent = t.order;
    order.href = `mailto:${email}?subject=${encodeURIComponent(t.orderSubject(pick(work.title)))}&body=${encodeURIComponent(t.orderBody(pick(work.title), pick(category.title)))}`;
    actions.appendChild(order);
  }

  const viaForm = el("button", "btn btn-secondary", t.alsoForm);
  viaForm.type = "button";
  viaForm.addEventListener("click", () => {
    const message = document.getElementById("message");
    const formLang = uiLang();
    message.value = storeCopy[formLang].orderBody(pick(work.title), pick(category.title));
    document.getElementById("contact").scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => document.getElementById("name").focus(), 600);
  });
  actions.appendChild(viaForm);

  if (work.liveUrl) {
    const live = el("a", "btn btn-secondary", t.live);
    live.href = work.liveUrl;
    live.target = "_blank";
    live.rel = "noreferrer";
    actions.appendChild(live);
  }

  const share = el("button", "btn btn-secondary", t.share);
  share.type = "button";
  share.addEventListener("click", async () => {
    await navigator.clipboard.writeText(`${location.origin}${location.pathname}#/work/${work.id}`);
    share.textContent = t.copied;
  });
  actions.appendChild(share);

  info.appendChild(actions);
  layout.appendChild(info);
  root.appendChild(layout);

  const steps = el("section", "work-process");
  steps.appendChild(el("h3", null, t.process));
  const timeline = el("ol", "process-timeline");
  work.process.forEach((step) => {
    const item = el("li", "process-step");
    item.appendChild(el("span", "process-num", String(timeline.childElementCount + 1).padStart(2, "0")));
    const text = el("div");
    text.appendChild(el("strong", null, pick(step.t)));
    text.appendChild(el("p", null, pick(step.d)));
    item.appendChild(text);
    timeline.appendChild(item);
  });
  steps.appendChild(timeline);
  root.appendChild(steps);

  const related = worksIn(work.category).filter((item) => item.id !== work.id).slice(0, 3);
  if (related.length) {
    const rel = el("section", "work-related");
    rel.appendChild(el("h3", null, t.related));
    const row = el("div", "related-row");
    related.forEach((item) => {
      const link = el("button", "related-card");
      link.type = "button";
      const image = el("img");
      image.src = item.cover;
      image.alt = pick(item.title);
      image.loading = "lazy";
      link.appendChild(image);
      link.appendChild(el("span", null, pick(item.title)));
      link.addEventListener("click", () => navigate(`#/work/${item.id}`));
      row.appendChild(link);
    });
    rel.appendChild(row);
    root.appendChild(rel);
  }
}

function render() {
  const hash = window.location.hash;
  const routeChanged = hash !== lastHash;
  lastHash = hash;

  readRoute();
  const inStore = Boolean(state.category || state.work);
  grid.classList.toggle("off", inStore);
  intro.classList.toggle("hidden", inStore);
  if (!inStore) {
    root.classList.remove("active");
    root.textContent = "";
    return;
  }
  if (state.work) renderWork();
  else if (state.category) renderStore();
  if (routeChanged) scrollToStore();
}

window.addEventListener("hashchange", render);

new MutationObserver(() => {
  renderTiles();
  if (state.category || state.work) render();
}).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

renderTiles();
render();
