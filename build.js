#!/usr/bin/env node
'use strict';
/*
 * Generates the portfolio hub, category galleries and project case-study pages
 * from content/*.json. Zero dependencies. Run: node build.js
 * Also refreshes the category cards + UI dictionary inside index.html (between PF markers).
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SITE = (process.env.SITE_URL || 'https://7r01h-portfolio.vercel.app').replace(/\/$/, '');
const LANGS = ['ar', 'en', 'de', 'fr'];
const DEF = 'ar';
const read = (f) => JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'));

const ui = read('content/ui.json');
const cats = read('content/categories.json').categories.sort((a, b) => (a.order || 0) - (b.order || 0));
const projects = read('content/projects.json')
  .projects.filter((p) => (p.status || 'published') === 'published')
  .map((p, i) => ({ ...p, _order: i }));
const indexSrc = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

/* ---------- helpers ---------- */
const esc = (s) =>
  String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const tx = (o, l = DEF) =>
  typeof o === 'string' ? o : (o && (o[l] || o.en || o[Object.keys(o).find((k) => o[k])])) || '';
const lattrs = (o) => LANGS.map((l) => `data-${l}="${esc(tx(o, l))}"`).join(' ');
const L = (o, tag = 'span', cls = '', extra = '') =>
  `<${tag}${cls ? ` class="${cls}"` : ''} ${lattrs(o)}${extra ? ' ' + extra : ''}>${esc(tx(o))}</${tag}>`;
const U = (k, tag, cls, extra) => {
  if (!ui[k]) throw new Error('missing ui key ' + k);
  return L(ui[k], tag, cls, extra);
};
const abs = (p) => (!p ? '' : /^(https?:)?\/\//.test(p) || p.startsWith('/') ? p : '/' + p);
const absUrl = (p) => (/^https?:/.test(p) ? p : SITE + abs(p));
const img = (x) => (typeof x === 'string' ? { src: x } : x || {});
const count = (n) => ({
  ar: n === 1 ? 'مشروع واحد' : n === 2 ? 'مشروعان' : n <= 10 ? `${n} مشاريع` : `${n} مشروعًا`,
  en: `${n} project${n === 1 ? '' : 's'}`,
  de: `${n} Projekt${n === 1 ? '' : 'e'}`,
  fr: `${n} projet${n > 1 ? 's' : ''}`,
});
const asList = (o) => {
  // {lang: [..]} -> array of per-index objects
  if (!o) return [];
  const n = Math.max(0, ...LANGS.map((l) => (Array.isArray(o[l]) ? o[l].length : 0)));
  return Array.from({ length: n }, (_, i) => {
    const r = {};
    LANGS.forEach((l) => {
      if (Array.isArray(o[l]) && o[l][i]) r[l] = o[l][i];
    });
    return r;
  });
};
const hasText = (o) => o && LANGS.some((l) => (Array.isArray(o[l]) ? o[l].length : o[l]));
const catOf = (id) => cats.find((c) => c.id === id);
const projHref = (p) => `/portfolio/${p.category}/${p.slug}/`;
const catHref = (c) => `/portfolio/${c.id}/`;
const coverOf = (p) => abs(p.cover || (p.images && img(p.images[0]).src));
const toolsOf = (p) => (p.tools || []).map((t) => (typeof t === 'string' ? t : t.name)).filter(Boolean);
const itemJson = (p) => esc(JSON.stringify({ slug: p.slug, href: projHref(p), title: p.title }));

for (const p of projects) {
  if (!catOf(p.category)) throw new Error(`Project "${p.slug}" uses unknown category "${p.category}"`);
}

/* ---------- shared fragments from index.html ---------- */
const grab = (re, what) => {
  const m = indexSrc.match(re);
  if (!m) throw new Error('Could not extract ' + what + ' from index.html');
  return m[0];
};
const themeBtn = grab(/<button id="theme-toggle"[\s\S]*?<\/button>/, 'theme toggle');
const chatWidget = grab(/<div class="chat-widget"[\s\S]*?(?=\s*<div class="lightbox")/, 'chat widget').replace(/src="images\//g, 'src="/images/');
const contactLinks = grab(/<div class="contact-links">[\s\S]*?<\/div>/, 'contact links');

const header = () => `
<header class="site-header">
  <div class="container nav">
    <a href="/#top" class="brand" aria-label="Reggaoui Hamza">
      <span class="icon"><img src="/images/HR3.png" alt="Reggaoui Hamza" /></span>
      <span class="brand-text">Reggaoui Hamza</span>
    </a>
    <nav class="main-nav" aria-label="Main navigation">
      ${U('about', 'a', '', 'href="/#about"')}
      ${U('services', 'a', '', 'href="/#services"')}
      ${U('portfolio', 'a', 'is-current', 'href="/portfolio/" aria-current="page"')}
      ${U('skills', 'a', '', 'href="/#skills"')}
      ${U('contact', 'a', '', 'href="/#contact"')}
      ${themeBtn}
    </nav>
    <div class="lang-switch" role="group" aria-label="Language switcher">
      ${LANGS.map((l, i) => `${i ? '<span class="switch-divider">/</span>' : ''}<button class="lang-btn" type="button" data-lang="${l}" aria-pressed="false">${l.toUpperCase()}</button>`).join('')}
    </div>
  </div>
</header>`;

const footer = () => `
<footer class="site-footer">
  <div class="container footer-inner pf-footer">
    ${contactLinks}
    ${U('rights', 'p')}
  </div>
</footer>`;

const crumbs = (items) => `
<nav class="pf-crumbs" aria-label="Breadcrumb" data-ui-aria="breadcrumb">
  <ol>${items
    .map((it, i) =>
      i === items.length - 1
        ? `<li aria-current="page">${L(it.label)}</li>`
        : `<li><a href="${it.href}">${L(it.label)}</a></li>`
    )
    .join('')}</ol>
</nav>`;

const breadcrumbLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: tx(it.label, 'en'),
    item: SITE + it.href,
  })),
});

function page({ title, desc, urlPath, image, ld = [], main, data }) {
  const t = `${tx(title)} | Reggaoui Hamza`;
  const d = tx(desc);
  const url = SITE + urlPath;
  const og = image ? absUrl(image) : '';
  return `<!DOCTYPE html>
<html lang="${DEF}" dir="rtl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(t)}</title>
<meta name="description" content="${esc(d)}" />
<link rel="canonical" href="${url}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Reggaoui Hamza" />
<meta property="og:title" content="${esc(t)}" />
<meta property="og:description" content="${esc(d)}" />
<meta property="og:url" content="${url}" />
${og ? `<meta property="og:image" content="${esc(og)}" />\n<meta name="twitter:card" content="summary_large_image" />` : ''}
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<link rel="icon" type="image/png" href="/images/HRb.png" />
<link rel="stylesheet" href="/style.css" />
<link rel="stylesheet" href="/portfolio.css" />
<script>(function(){try{var l=new URLSearchParams(location.search).get('lang')||localStorage.getItem('lang')||'ar';if(['ar','en','de','fr'].indexOf(l)<0)l='ar';document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';}catch(e){}})();</script>
${ld.map((x) => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join('\n')}
</head>
<body data-page="sub">
<a class="pf-skip" href="#top" data-ar="تخطَّ إلى المحتوى" data-en="Skip to content" data-de="Zum Inhalt springen" data-fr="Aller au contenu">تخطَّ إلى المحتوى</a>
<div class="page-shell">
${header()}
<main id="top" class="pf-main">
${main}
</main>
${footer()}
</div>
${chatWidget}
<script>window.PF_UI=${JSON.stringify(ui)};${data ? `window.PF_DATA=${JSON.stringify(data).replace(/</g, '\\u003c')};` : ''}</script>
<script src="/portfolio.js"></script>
<script src="/chat.js"></script>
</body>
</html>
`;
}

/* ---------- components ---------- */
const heart =
  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
const eye =
  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>';
const plus =
  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
const shareIco =
  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>';

function card(p) {
  const c = catOf(p.category);
  const tools = toolsOf(p);
  const search = [
    ...LANGS.map((l) => tx(p.title, l)),
    ...LANGS.map((l) => tx(p.type, l)),
    ...LANGS.map((l) => tx(c.title, l)),
    ...tools,
  ]
    .join(' ')
    .toLowerCase();
  return `
<article class="pf-card" data-slug="${esc(p.slug)}" data-cat="${esc(p.category)}" data-type="${esc(tx(p.type, 'en'))}" data-tools="${esc(tools.join('|'))}" data-featured="${p.featured ? 1 : 0}" data-order="${p._order}" data-date="${esc(p.date || '')}" data-search="${esc(search)}" data-item='${itemJson(p)}'>
  <a class="pf-media" href="${projHref(p)}" tabindex="-1" aria-hidden="true">
    <img src="${esc(coverOf(p))}" alt="" loading="lazy" decoding="async" />
    ${p.featured ? U('featured', 'span', 'pf-badge') : ''}
  </a>
  <div class="pf-card-actions">
    <button type="button" class="pf-icon-btn" data-act="fav" data-slug="${esc(p.slug)}" aria-pressed="false" data-ui-aria="favorite">${heart}</button>
    <button type="button" class="pf-icon-btn" data-act="quick" data-slug="${esc(p.slug)}" data-ui-aria="quickView">${eye}</button>
  </div>
  <div class="pf-card-body">
    <p class="pf-meta">${L(c.title, 'span', 'item-tag')}${L(p.type, 'span', 'pf-type')}</p>
    <h3><a href="${projHref(p)}" ${lattrs(p.title)}>${esc(tx(p.title))}</a></h3>
    ${L(p.summary, 'p', 'pf-summary')}
    <div class="pf-card-foot">
      ${U('viewProject', 'a', 'btn btn-primary pf-btn', `href="${projHref(p)}"`)}
      <button type="button" class="pf-add" data-act="inquiry" data-slug="${esc(p.slug)}" aria-pressed="false">${plus}<span class="pf-lbl"></span></button>
    </div>
  </div>
</article>`;
}

function toolbar(list, { withCats = false } = {}) {
  if (list.length < 2) return '';
  const types = [...new Map(list.map((p) => [tx(p.type, 'en'), p.type])).values()];
  const tools = [...new Set(list.flatMap(toolsOf))].sort();
  const hasDates = list.some((p) => p.date);
  const hasFeat = list.some((p) => p.featured);
  return `
<div class="pf-toolbar" role="search">
  <div class="pf-search">
    <label class="pf-sr" for="pfSearch">${esc(tx(ui.search))}</label>
    <input id="pfSearch" type="search" autocomplete="off" data-ui-ph="searchPh" />
  </div>
  <label class="pf-select"><span class="pf-sr">${esc(tx(ui.filterType))}</span>
    <select id="pfType"><option value="" ${lattrs(ui.all)}>${esc(tx(ui.all))}</option>${types
      .map((t) => `<option value="${esc(tx(t, 'en'))}" ${lattrs(t)}>${esc(tx(t))}</option>`)
      .join('')}</select></label>
  ${
    tools.length
      ? `<label class="pf-select"><span class="pf-sr">${esc(tx(ui.filterTool))}</span><select id="pfTool"><option value="" ${lattrs(ui.all)}>${esc(tx(ui.all))}</option>${tools
          .map((t) => `<option value="${esc(t)}">${esc(t)}</option>`)
          .join('')}</select></label>`
      : ''
  }
  <label class="pf-select"><span class="pf-sr">${esc(tx(ui.sort))}</span>
    <select id="pfSort">
      <option value="default" ${lattrs(ui.sortDefault)}>${esc(tx(ui.sortDefault))}</option>
      ${hasFeat ? `<option value="featured" ${lattrs(ui.sortFeatured)}>${esc(tx(ui.sortFeatured))}</option>` : ''}
      ${hasDates ? `<option value="newest" ${lattrs(ui.sortNewest)}>${esc(tx(ui.sortNewest))}</option><option value="oldest" ${lattrs(ui.sortOldest)}>${esc(tx(ui.sortOldest))}</option>` : ''}
      <option value="az" ${lattrs(ui.sortAZ)}>${esc(tx(ui.sortAZ))}</option>
    </select></label>
  <button type="button" class="pf-chip" id="pfFavOnly" aria-pressed="false">${heart}${U('favoritesOnly', 'span')}</button>
</div>
${
  withCats
    ? `<div class="pf-chips" role="group" aria-label="${esc(tx(ui.categories, 'en'))}">
  <button type="button" class="pf-chip" data-cat="" aria-pressed="true">${U('all', 'span')}</button>
  ${cats
    .filter((c) => projects.some((p) => p.category === c.id))
    .map((c) => `<button type="button" class="pf-chip" data-cat="${esc(c.id)}" aria-pressed="false">${L(c.title)}</button>`)
    .join('')}
</div>`
    : ''
}
<p class="pf-count" id="pfCount" role="status" aria-live="polite"></p>`;
}

const grid = (list) => `
<div class="pf-grid" id="pfGrid">${list.map(card).join('')}</div>
<p class="pf-empty" id="pfEmpty" hidden>${U('noResults', 'span')} <button type="button" class="pf-link-btn" id="pfReset">${U('reset', 'span')}</button></p>`;

const ctaBand = () => `
<section class="pf-cta" aria-labelledby="ctaT">
  <div>
    ${U('ctaTitle', 'h2', '', 'id="ctaT"')}
    ${U('ctaText', 'p')}
  </div>
  <div class="pf-cta-actions">
    ${U('contactMe', 'a', 'btn btn-primary', 'href="/#contact"')}
    ${U('viewMore', 'a', 'btn btn-secondary', 'href="/portfolio/"')}
  </div>
</section>`;

const quickData = (list) => {
  const o = {};
  list.forEach((p) => {
    o[p.slug] = {
      href: projHref(p),
      cover: coverOf(p),
      title: p.title,
      summary: p.summary,
      type: p.type,
      category: catOf(p.category).title,
      tools: toolsOf(p),
    };
  });
  return { projects: o };
};

/* ---------- output ---------- */
const outRoot = path.join(ROOT, 'portfolio');
fs.rmSync(outRoot, { recursive: true, force: true });
const write = (rel, content) => {
  const f = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content);
};
const urls = ['/', '/portfolio/'];

/* hub */
{
  const items = [
    { href: '/', label: ui.home },
    { href: '/portfolio/', label: ui.portfolio },
  ];
  const catCards = cats
    .map((c) => {
      const n = projects.filter((p) => p.category === c.id).length;
      return `
<a class="cat-card" href="${catHref(c)}">
  <span class="cat-media"><img src="${esc(abs(c.cover))}" alt="" loading="lazy" decoding="async" /></span>
  <span class="cat-body">
    ${L(c.title, 'strong')}
    ${L(c.description, 'span', 'cat-desc')}
    <span class="cat-foot">${L(count(n), 'span', 'cat-count')}${U('openCategory', 'span', 'cat-open')}</span>
  </span>
</a>`;
    })
    .filter(Boolean)
    .join('');
  write(
    'portfolio/index.html',
    page({
      title: ui.hubTitle,
      desc: ui.hubIntro,
      urlPath: '/portfolio/',
      image: projects[0] && coverOf(projects[0]),
      ld: [breadcrumbLd(items)],
      data: quickData(projects),
      main: `<div class="container">
${crumbs(items)}
<div class="section-heading">
  ${U('hubTitle', 'h1')}
  ${U('hubIntro', 'p')}
</div>
<div class="cat-grid">${catCards}</div>
<div class="pf-heading-row">${U('allProjects', 'h2')}</div>
${toolbar(projects, { withCats: true })}
${grid(projects)}
${ctaBand()}
</div>`,
    })
  );
}

/* categories + projects */
for (const c of cats) {
  const list = projects.filter((p) => p.category === c.id);
  urls.push(catHref(c));
  const items = [
    { href: '/', label: ui.home },
    { href: '/portfolio/', label: ui.portfolio },
    { href: catHref(c), label: c.title },
  ];
  write(
    `portfolio/${c.id}/index.html`,
    page({
      title: c.title,
      desc: c.description,
      urlPath: catHref(c),
      image: list[0] ? coverOf(list[0]) : c.cover,
      ld: [
        breadcrumbLd(items),
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: tx(c.title, 'en'),
          description: tx(c.description, 'en'),
          url: SITE + catHref(c),
        },
      ],
      data: quickData(list),
      main: `<div class="container">
${crumbs(items)}
<div class="section-heading">
  ${L(c.title, 'h1')}
  ${L(c.description, 'p')}
  ${L(count(list.length), 'p', 'pf-count-line')}
</div>
${list.length ? toolbar(list) + grid(list) : `<p class="pf-empty">${U('noResults', 'span')}</p>`}
${ctaBand()}
</div>`,
    })
  );

  list.forEach((p, idx) => {
    urls.push(projHref(p));
    const pItems = [...items, { href: projHref(p), label: p.title }];
    const tools = toolsOf(p);
    const gallery = [coverOf(p) && { src: coverOf(p) }, ...(p.images || []).map(img)]
      .filter(Boolean)
      .map((g) => ({ ...g, src: abs(g.src) }))
      .filter((g, i, a) => g.src && a.findIndex((x) => x.src === g.src) === i);
    const extra = gallery.slice(1);
    const overview = asList(p.overview);
    const objectives = asList(p.objectives);
    const results = asList(p.results);
    const steps = p.steps || [];
    const ba = p.beforeAfter && p.beforeAfter.before && p.beforeAfter.after ? p.beforeAfter : null;

    let related = list.filter((x) => x.slug !== p.slug);
    let relatedTitle = ui.related;
    if (!related.length) {
      related = projects.filter((x) => x.slug !== p.slug).slice(0, 3);
      relatedTitle = ui.moreProjects;
    }
    related = (p.related && p.related.length
      ? p.related.map((s) => projects.find((x) => x.slug === s)).filter(Boolean)
      : related
    ).slice(0, 3);

    const prev = list[idx - 1];
    const next = list[idx + 1];

    const dateTxt = p.date ? `<div><dt>${U('date', 'span')}</dt><dd><time class="pf-date" datetime="${esc(p.date)}">${esc(p.date)}</time></dd></div>` : '';

    const ld = [
      breadcrumbLd(pItems),
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: tx(p.title, 'en'),
        description: tx(p.summary, 'en'),
        image: absUrl(coverOf(p)),
        url: SITE + projHref(p),
        creator: { '@type': 'Person', name: 'Hamza Reggaoui' },
        genre: tx(c.title, 'en'),
        ...(p.date ? { dateCreated: p.date } : {}),
        ...(tools.length ? { tool: tools } : {}),
      },
    ];

    const block = (id, titleKey, inner) =>
      `<section class="pf-block" aria-labelledby="${id}">${U(titleKey, 'h2', '', `id="${id}"`)}${inner}</section>`;

    write(
      `portfolio/${c.id}/${p.slug}/index.html`,
      page({
        title: p.title,
        desc: p.summary,
        urlPath: projHref(p),
        image: coverOf(p),
        ld,
        data: quickData(related),
        main: `<div class="container pf-project">
${crumbs(pItems)}
<section class="pf-hero">
  <a class="pf-hero-media" href="${esc(gallery[0] ? gallery[0].src : coverOf(p))}" data-lb data-ui-aria="zoom">
    <img src="${esc(coverOf(p))}" alt="${esc(tx(p.title, 'en'))}" decoding="async" fetchpriority="high" />
  </a>
  <div class="pf-hero-copy">
    <p class="pf-meta">${L(c.title, 'a', 'item-tag', `href="${catHref(c)}"`)}${p.projectStatus === 'inProgress' ? U('inProgress', 'span', 'pf-type') : ''}</p>
    ${L(p.title, 'h1')}
    ${L(p.summary, 'p', 'pf-lead')}
    <dl class="pf-facts">
      <div><dt>${U('type', 'span')}</dt><dd>${L(p.type)}</dd></div>
      ${dateTxt}
    </dl>
    <div class="pf-actions" data-item='${itemJson(p)}'>
      <button type="button" class="btn btn-primary" data-act="request">${U('requestSimilar', 'span')}</button>
      <button type="button" class="btn btn-secondary pf-add" data-act="inquiry" data-slug="${esc(p.slug)}" aria-pressed="false">${plus}<span class="pf-lbl"></span></button>
      <button type="button" class="pf-icon-btn" data-act="fav" data-slug="${esc(p.slug)}" aria-pressed="false" data-ui-aria="favorite">${heart}</button>
      <button type="button" class="pf-icon-btn" data-act="share" data-ui-aria="share" data-title="${esc(tx(p.title, 'en'))}">${shareIco}</button>
    </div>
  </div>
</section>

${
  overview.length || hasText(p.problem) || objectives.length || hasText(p.audience)
    ? block(
        'ov',
        'overview',
        `<div class="pf-overview">
  ${overview.map((o) => L(o, 'p')).join('')}
  ${hasText(p.problem) ? `<div class="pf-note">${U('problem', 'h3')}${L(p.problem, 'p')}</div>` : ''}
  ${objectives.length ? `<div class="pf-note">${U('objectives', 'h3')}<ul>${objectives.map((o) => L(o, 'li')).join('')}</ul></div>` : ''}
  ${hasText(p.audience) ? `<div class="pf-note">${U('audience', 'h3')}${L(p.audience, 'p')}</div>` : ''}
</div>`
      )
    : ''
}

${block(
  'pr',
  'process',
  steps.length
    ? `<ol class="pf-steps">${steps
        .map((s) => {
          const simgs = (s.images || []).map(img);
          return `<li class="pf-step">
  <div class="pf-step-text">${L(s.title, 'h3')}${s.text ? L(s.text, 'p') : ''}</div>
  ${
    simgs.length
      ? `<div class="pf-step-media">${simgs
          .map(
            (g) =>
              `<a href="${esc(abs(g.src))}" data-lb><img src="${esc(abs(g.src))}" alt="${esc(tx(g.alt || s.title, 'en'))}" loading="lazy" decoding="async" /></a>`
          )
          .join('')}</div>`
      : ''
  }
  ${s.video ? `<video class="pf-step-video" src="${esc(abs(s.video))}" controls preload="metadata" playsinline></video>` : ''}
</li>`;
        })
        .join('')}</ol>`
    : `<p class="pf-soon">${U('processSoon', 'span')}</p>`
)}

${
  extra.length
    ? block(
        'gl',
        'gallery',
        `<div class="pf-masonry">${extra
          .map(
            (g) =>
              `<figure><a href="${esc(g.src)}" data-lb><img src="${esc(g.src)}" alt="${esc(tx(g.alt || p.title, 'en'))}" loading="lazy" decoding="async" /></a>${g.caption ? L(g.caption, 'figcaption') : ''}</figure>`
          )
          .join('')}</div>`
      )
    : ''
}

${
  ba
    ? block(
        'ba',
        'beforeAfter',
        `<div class="pf-ba" style="--pos:50%">
  <img class="pf-ba-after" src="${esc(abs(ba.after))}" alt="${esc(tx(ui.after, 'en'))}" loading="lazy" />
  <img class="pf-ba-before" src="${esc(abs(ba.before))}" alt="${esc(tx(ui.before, 'en'))}" loading="lazy" />
  <span class="pf-ba-tag pf-ba-tag-b">${U('before', 'span')}</span><span class="pf-ba-tag pf-ba-tag-a">${U('after', 'span')}</span>
  <input type="range" min="0" max="100" value="50" aria-label="${esc(tx(ui.beforeAfter, 'en'))}" />
</div>`
      )
    : ''
}

${tools.length ? block('tl', 'tools', `<ul class="pill-list pf-tools">${tools.map((t) => `<li><span>${esc(t)}</span></li>`).join('')}</ul>`) : ''}

${results.length ? block('rs', 'finalResults', `<ul class="pf-results">${results.map((o) => L(o, 'li')).join('')}</ul>`) : ''}

${ctaBand()}

${
  related.length
    ? `<section class="pf-block" aria-labelledby="rl">${U(relatedTitle === ui.related ? 'related' : 'moreProjects', 'h2', '', 'id="rl"')}<div class="pf-grid" id="pfRelated">${related.map(card).join('')}</div></section>`
    : ''
}

${
  prev || next
    ? `<nav class="pf-pn" aria-label="Project navigation">
  ${prev ? `<a href="${projHref(prev)}" rel="prev"><small>${U('prev', 'span')}</small>${L(prev.title, 'strong')}</a>` : '<span></span>'}
  ${next ? `<a href="${projHref(next)}" rel="next"><small>${U('next', 'span')}</small>${L(next.title, 'strong')}</a>` : '<span></span>'}
</nav>`
    : ''
}
</div>`,
      })
    );
  });
}

/* ---------- inject into index.html ---------- */
{
  const cards = cats
    .map((c) => {
      const n = projects.filter((p) => p.category === c.id).length;
      return `            <a class="cat-card reveal" href="${catHref(c)}">
              <span class="cat-media"><img src="${esc(abs(c.cover))}" alt="" loading="lazy" decoding="async" /></span>
              <span class="cat-body">
                ${L(c.title, 'strong')}
                ${L(c.description, 'span', 'cat-desc')}
                <span class="cat-foot">${L(count(n), 'span', 'cat-count')}${U('openCategory', 'span', 'cat-open')}</span>
              </span>
            </a>`;
    })
    .join('\n');
  const block = `<!--PF:CATEGORIES-->
          <div class="cat-grid">
${cards}
          </div>
          <div class="cat-more reveal">${U('viewAll', 'a', 'btn btn-secondary', 'href="/portfolio/"')}</div>
<!--/PF:CATEGORIES-->`;
  let h = indexSrc.replace(/<!--PF:CATEGORIES-->[\s\S]*?<!--\/PF:CATEGORIES-->/, block);
  h = h.replace(/<!--PF:UI-->[\s\S]*?<!--\/PF:UI-->/, `<!--PF:UI--><script>window.PF_UI=${JSON.stringify(ui)};</script><!--/PF:UI-->`);
  fs.writeFileSync(path.join(ROOT, 'index.html'), h);
}

/* ---------- sitemap & robots ---------- */
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${SITE}${u}</loc></url>`)
    .join('\n')}\n</urlset>\n`
);
write('robots.txt', `User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`Built ${cats.length} categories, ${projects.length} projects, ${urls.length} URLs.`);
