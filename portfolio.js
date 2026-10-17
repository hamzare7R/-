/* Portfolio client behaviour: language swap, gallery filters, quick view,
   favorites, inquiry list ("store"-style), lightbox, before/after, share. */
(function () {
  'use strict';

  var LANGS = ['ar', 'en', 'de', 'fr'];
  var UI = window.PF_UI || {};
  var DATA = (window.PF_DATA && window.PF_DATA.projects) || {};
  var isSub = document.body.getAttribute('data-page') === 'sub';
  var lang = initialLang();

  /* ---------- storage ---------- */
  function load(k) {
    try { return JSON.parse(localStorage.getItem(k) || '[]'); } catch (e) { return []; }
  }
  function save(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
  }
  var favs = load('pf_favs');
  var inquiry = load('pf_inquiry');

  /* ---------- i18n ---------- */
  function initialLang() {
    var l = null;
    try {
      l = new URLSearchParams(location.search).get('lang') || localStorage.getItem('lang');
    } catch (e) {}
    return LANGS.indexOf(l) > -1 ? l : 'ar';
  }
  function t(key) {
    var o = UI[key] || {};
    return o[lang] || o.en || key;
  }
  function pick(o) {
    if (!o) return '';
    if (typeof o === 'string') return o;
    return o[lang] || o.en || o[Object.keys(o)[0]] || '';
  }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  function formatDates() {
    $$('time.pf-date').forEach(function (el) {
      var d = new Date(el.getAttribute('datetime'));
      if (isNaN(d)) return;
      try {
        el.textContent = new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'long' }).format(d);
      } catch (e) {}
    });
  }

  function applyLang(l) {
    if (LANGS.indexOf(l) < 0) return;
    lang = l;
    document.documentElement.lang = l;
    document.documentElement.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
    document.body.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
    try { localStorage.setItem('lang', l); } catch (e) {}

    $$('[data-ar]').forEach(function (el) {
      var v = el.getAttribute('data-' + l);
      if (v == null || v === '') v = el.getAttribute('data-en');
      if (v != null && v !== '') el.textContent = v;
    });
    $$('[data-ui-ph]').forEach(function (el) { el.setAttribute('placeholder', t(el.getAttribute('data-ui-ph'))); });
    $$('[data-ui-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-ui-aria'))); });
    $$('.lang-btn').forEach(function (b) {
      var on = b.getAttribute('data-lang') === l;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    formatDates();
    refreshButtons();
    if (grid) runFilters();
    renderPanel();
    if (qvOpenSlug) openQuick(qvOpenSlug);
  }

  window.PF = { applyLang: applyLang };

  /* ---------- sub-page chrome: language buttons + theme ---------- */
  if (isSub) {
    $$('.lang-btn').forEach(function (b) {
      b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang')); });
    });
    var theme = null;
    try { theme = localStorage.getItem('theme'); } catch (e) {}
    if (theme === 'light') document.body.classList.add('light-mode');
    var tb = document.getElementById('theme-toggle');
    if (tb) {
      tb.addEventListener('click', function () {
        document.body.classList.toggle('light-mode');
        try { localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark'); } catch (e) {}
      });
    }
  }

  /* ---------- favorites + inquiry state ---------- */
  function inInquiry(slug) {
    return inquiry.some(function (i) { return i.slug === slug; });
  }
  function refreshButtons() {
    $$('[data-act="fav"]').forEach(function (b) {
      var on = favs.indexOf(b.getAttribute('data-slug')) > -1;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.setAttribute('aria-label', t(on ? 'unfavorite' : 'favorite'));
    });
    $$('[data-act="inquiry"]').forEach(function (b) {
      var on = inInquiry(b.getAttribute('data-slug'));
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      var lbl = $('.pf-lbl', b);
      if (lbl) lbl.textContent = t(on ? 'inInquiry' : 'addInquiry');
    });
    var fab = $('#pfFab');
    if (fab) {
      fab.hidden = !inquiry.length;
      $('b', fab).textContent = inquiry.length;
      $('span', fab).textContent = t('inquiryOpen');
    }
  }
  function toggleFav(slug) {
    var i = favs.indexOf(slug);
    if (i > -1) favs.splice(i, 1); else favs.push(slug);
    save('pf_favs', favs);
    refreshButtons();
    if (grid && state.fav) runFilters();
  }
  function toggleInquiry(item) {
    var i = -1;
    inquiry.forEach(function (x, n) { if (x.slug === item.slug) i = n; });
    if (i > -1) inquiry.splice(i, 1); else inquiry.push({ slug: item.slug, href: item.href, title: item.title });
    save('pf_inquiry', inquiry);
    refreshButtons();
    renderPanel();
  }
  function itemFrom(el) {
    var host = el.closest('[data-item]');
    if (!host) return null;
    try { return JSON.parse(host.getAttribute('data-item')); } catch (e) { return null; }
  }

  /* ---------- inquiry panel (sub pages) ---------- */
  var panel, fabBtn;
  if (isSub) {
    fabBtn = document.createElement('button');
    fabBtn.type = 'button';
    fabBtn.id = 'pfFab';
    fabBtn.className = 'pf-fab';
    fabBtn.hidden = true;
    fabBtn.setAttribute('aria-expanded', 'false');
    fabBtn.setAttribute('aria-controls', 'pfPanel');
    fabBtn.innerHTML = '<span></span><b>0</b>';
    document.body.appendChild(fabBtn);

    panel = document.createElement('aside');
    panel.id = 'pfPanel';
    panel.className = 'pf-panel';
    panel.hidden = true;
    panel.setAttribute('aria-label', 'Inquiry');
    document.body.appendChild(panel);

    fabBtn.addEventListener('click', function () {
      panel.hidden = !panel.hidden;
      fabBtn.setAttribute('aria-expanded', panel.hidden ? 'false' : 'true');
    });
  }
  function renderPanel() {
    if (!panel) return;
    panel.textContent = '';
    var h = document.createElement('h2'); h.textContent = t('inquiryTitle'); panel.appendChild(h);
    var p = document.createElement('p'); p.textContent = t('inquiryHelp'); panel.appendChild(p);
    var ul = document.createElement('ul');
    if (!inquiry.length) {
      var li0 = document.createElement('li'); li0.textContent = t('inquiryEmpty'); ul.appendChild(li0);
    }
    inquiry.forEach(function (it) {
      var li = document.createElement('li');
      var a = document.createElement('a'); a.href = it.href; a.textContent = pick(it.title);
      var x = document.createElement('button'); x.type = 'button'; x.textContent = '✕';
      x.setAttribute('aria-label', t('remove') + ': ' + pick(it.title));
      x.addEventListener('click', function () { toggleInquiry(it); });
      li.appendChild(a); li.appendChild(x); ul.appendChild(li);
    });
    panel.appendChild(ul);
    var row = document.createElement('div'); row.className = 'pf-panel-actions';
    var send = document.createElement('a');
    send.className = 'btn btn-primary pf-btn'; send.href = '/?inquiry=1#contact'; send.textContent = t('inquirySend');
    var clr = document.createElement('button');
    clr.type = 'button'; clr.className = 'btn btn-secondary pf-btn'; clr.textContent = t('inquiryClear');
    clr.addEventListener('click', function () { inquiry = []; save('pf_inquiry', inquiry); refreshButtons(); renderPanel(); });
    if (inquiry.length) { row.appendChild(send); row.appendChild(clr); panel.appendChild(row); }
    if (!inquiry.length && !panel.hidden) { panel.hidden = true; if (fabBtn) fabBtn.setAttribute('aria-expanded', 'false'); }
  }

  /* ---------- toast + share ---------- */
  var toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'pf-toast'; toastEl.setAttribute('role', 'status'); toastEl.hidden = true;
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg; toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.hidden = true; }, 2200);
  }
  function share(btn) {
    var url = location.href.split('#')[0];
    if (navigator.share) {
      navigator.share({ title: btn.getAttribute('data-title') || document.title, url: url }).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function () { toast(t('linkCopied')); });
    }
  }

  /* ---------- gallery filters ---------- */
  var grid = document.getElementById('pfGrid');
  var state = { q: '', type: '', tool: '', cat: '', fav: false, sort: 'default' };
  var cards = grid ? $$('.pf-card', grid) : [];

  function titleOf(card) {
    var a = $('h3 a', card);
    return a ? a.textContent : '';
  }
  function runFilters() {
    if (!grid) return;
    var q = state.q.trim().toLowerCase();
    var shown = 0;
    cards.forEach(function (c) {
      var ok =
        (!q || (c.getAttribute('data-search') || '').indexOf(q) > -1) &&
        (!state.type || c.getAttribute('data-type') === state.type) &&
        (!state.tool || (c.getAttribute('data-tools') || '').split('|').indexOf(state.tool) > -1) &&
        (!state.cat || c.getAttribute('data-cat') === state.cat) &&
        (!state.fav || favs.indexOf(c.getAttribute('data-slug')) > -1);
      c.hidden = !ok;
      if (ok) shown++;
    });
    var sorted = cards.slice().sort(function (a, b) {
      var o = function (c) { return +c.getAttribute('data-order'); };
      if (state.sort === 'az') return titleOf(a).localeCompare(titleOf(b), lang);
      if (state.sort === 'featured') return (+b.getAttribute('data-featured') - +a.getAttribute('data-featured')) || (o(a) - o(b));
      if (state.sort === 'newest' || state.sort === 'oldest') {
        var da = a.getAttribute('data-date'), db = b.getAttribute('data-date');
        if (!da && !db) return o(a) - o(b);
        if (!da) return 1;
        if (!db) return -1;
        return (state.sort === 'newest' ? -1 : 1) * da.localeCompare(db);
      }
      return o(a) - o(b);
    });
    sorted.forEach(function (c) { grid.appendChild(c); });
    var empty = document.getElementById('pfEmpty');
    if (empty) empty.hidden = shown > 0;
    var count = document.getElementById('pfCount');
    if (count) count.textContent = t('resultsN').replace('{n}', shown);
  }
  if (grid && document.getElementById('pfSearch')) {
    var bind = function (id, key, ev) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener(ev || 'change', function () { state[key] = el.value; runFilters(); });
    };
    bind('pfSearch', 'q', 'input');
    bind('pfType', 'type');
    bind('pfTool', 'tool');
    bind('pfSort', 'sort');
    var favOnly = document.getElementById('pfFavOnly');
    if (favOnly) favOnly.addEventListener('click', function () {
      state.fav = !state.fav;
      favOnly.setAttribute('aria-pressed', state.fav ? 'true' : 'false');
      runFilters();
    });
    $$('.pf-chips [data-cat]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        state.cat = chip.getAttribute('data-cat');
        $$('.pf-chips [data-cat]').forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
        runFilters();
      });
    });
    var reset = document.getElementById('pfReset');
    if (reset) reset.addEventListener('click', function () {
      state = { q: '', type: '', tool: '', cat: '', fav: false, sort: 'default' };
      ['pfSearch', 'pfType', 'pfTool'].forEach(function (id) { var e = document.getElementById(id); if (e) e.value = ''; });
      var s = document.getElementById('pfSort'); if (s) s.value = 'default';
      if (favOnly) favOnly.setAttribute('aria-pressed', 'false');
      $$('.pf-chips [data-cat]').forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-cat') === '' ? 'true' : 'false'); });
      runFilters();
    });
    // support deep links like /portfolio/?cat=branding
    try {
      var qc = new URLSearchParams(location.search).get('cat');
      var chip = qc && $('.pf-chips [data-cat="' + qc + '"]');
      if (chip) chip.click();
    } catch (e) {}
  }

  /* ---------- quick view ---------- */
  var qv, qvOpenSlug = null, qvPrevFocus;
  function openQuick(slug) {
    var d = DATA[slug];
    if (!d) return;
    qvOpenSlug = slug;
    if (!qv) {
      qv = document.createElement('div');
      qv.className = 'pf-modal'; qv.hidden = true;
      qv.addEventListener('click', function (e) { if (e.target === qv) closeQuick(); });
      document.body.appendChild(qv);
    }
    qvPrevFocus = qvPrevFocus || document.activeElement;
    qv.textContent = '';
    var box = document.createElement('div');
    box.className = 'pf-qv'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
    var im = document.createElement('img'); im.src = d.cover; im.alt = ''; box.appendChild(im);
    var body = document.createElement('div'); body.className = 'pf-qv-body';
    var close = document.createElement('button');
    close.type = 'button'; close.className = 'pf-icon-btn pf-qv-close'; close.textContent = '✕';
    close.setAttribute('aria-label', t('close')); close.addEventListener('click', closeQuick);
    var meta = document.createElement('p'); meta.className = 'pf-meta';
    var tag = document.createElement('span'); tag.className = 'item-tag'; tag.textContent = pick(d.category);
    var ty = document.createElement('span'); ty.className = 'pf-type'; ty.textContent = pick(d.type);
    meta.appendChild(tag); meta.appendChild(ty);
    var h = document.createElement('h2'); h.textContent = pick(d.title); box.setAttribute('aria-label', pick(d.title));
    var s = document.createElement('p'); s.textContent = pick(d.summary);
    body.appendChild(close); body.appendChild(meta); body.appendChild(h); body.appendChild(s);
    if (d.tools && d.tools.length) {
      var pl = document.createElement('div'); pl.className = 'pill-list';
      d.tools.forEach(function (x) { var sp = document.createElement('span'); sp.textContent = x; pl.appendChild(sp); });
      body.appendChild(pl);
    }
    var row = document.createElement('div'); row.className = 'pf-card-foot';
    var go = document.createElement('a'); go.className = 'btn btn-primary pf-btn'; go.href = d.href; go.textContent = t('viewProject');
    var add = document.createElement('button'); add.type = 'button'; add.className = 'pf-add';
    add.setAttribute('data-act', 'inquiry'); add.setAttribute('data-slug', slug);
    add.innerHTML = '<span class="pf-lbl"></span>';
    add.addEventListener('click', function () { toggleInquiry({ slug: slug, href: d.href, title: d.title }); });
    row.appendChild(go); row.appendChild(add); body.appendChild(row);
    box.appendChild(body); qv.appendChild(box);
    qv.hidden = false;
    refreshButtons();
    close.focus();
  }
  function closeQuick() {
    if (qv) qv.hidden = true;
    qvOpenSlug = null;
    if (qvPrevFocus && qvPrevFocus.focus) qvPrevFocus.focus();
    qvPrevFocus = null;
  }

  /* ---------- lightbox ---------- */
  var lb, lbItems = [], lbIndex = 0, lbTouchX = null;
  function lbBuild() {
    lb = document.createElement('div');
    lb.className = 'pf-lb'; lb.hidden = true; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true');
    lb.innerHTML =
      '<button type="button" class="pf-lb-close" data-k="close">✕</button>' +
      '<button type="button" class="pf-lb-prev" data-k="prev">‹</button>' +
      '<div class="pf-lb-stage"><img alt="" /></div>' +
      '<div class="pf-lb-cap"></div>' +
      '<button type="button" class="pf-lb-next" data-k="next">›</button>';
    document.body.appendChild(lb);
    lb.addEventListener('click', function (e) {
      var k = e.target.getAttribute && e.target.getAttribute('data-k');
      if (k === 'close' || e.target.classList.contains('pf-lb-stage')) lbClose();
      else if (k === 'prev') lbStep(-1);
      else if (k === 'next') lbStep(1);
      else if (e.target.tagName === 'IMG') e.target.classList.toggle('zoom');
    });
    lb.addEventListener('touchstart', function (e) { lbTouchX = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (lbTouchX == null) return;
      var dx = e.changedTouches[0].clientX - lbTouchX;
      lbTouchX = null;
      if (Math.abs(dx) > 50) lbStep(dx < 0 ? 1 : -1); // swipe left = next
    }, { passive: true });
  }
  function lbShow() {
    var it = lbItems[lbIndex];
    var im = $('.pf-lb-stage img', lb);
    im.classList.remove('zoom');
    im.src = it.src; im.alt = it.alt;
    $('.pf-lb-cap', lb).textContent = it.cap;
    var multi = lbItems.length > 1;
    $('.pf-lb-prev', lb).hidden = !multi; $('.pf-lb-next', lb).hidden = !multi;
    $('.pf-lb-close', lb).setAttribute('aria-label', t('close'));
    $('.pf-lb-prev', lb).setAttribute('aria-label', t('prev'));
    $('.pf-lb-next', lb).setAttribute('aria-label', t('next'));
  }
  function lbStep(d) {
    lbIndex = (lbIndex + d + lbItems.length) % lbItems.length;
    lbShow();
  }
  function lbClose() { if (lb) lb.hidden = true; document.body.style.overflow = ''; }
  var lbLinks = $$('a[data-lb]');
  if (lbLinks.length) {
    lbLinks.forEach(function (a, i) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        if (!lb) lbBuild();
        lbItems = lbLinks.map(function (x) {
          var im = $('img', x), fc = x.parentNode && $('figcaption', x.parentNode);
          return { src: x.getAttribute('href'), alt: im ? im.alt : '', cap: fc ? fc.textContent : '' };
        });
        lbIndex = i;
        lbShow();
        lb.hidden = false;
        document.body.style.overflow = 'hidden';
        $('.pf-lb-close', lb).focus();
      });
    });
  }

  /* ---------- before / after ---------- */
  $$('.pf-ba').forEach(function (box) {
    var r = $('input', box);
    r.addEventListener('input', function () { box.style.setProperty('--pos', r.value + '%'); });
  });

  /* ---------- global events ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-act]');
    if (!b) return;
    var act = b.getAttribute('data-act');
    if (act === 'fav') toggleFav(b.getAttribute('data-slug'));
    else if (act === 'quick') openQuick(b.getAttribute('data-slug'));
    else if (act === 'share') share(b);
    else if (act === 'inquiry' && !b.closest('.pf-qv')) {
      var it = itemFrom(b);
      if (it) toggleInquiry(it);
    } else if (act === 'request') {
      var item = itemFrom(b);
      if (item && !inInquiry(item.slug)) toggleInquiry(item);
      location.href = '/?inquiry=1#contact';
    }
  });
  document.addEventListener('keydown', function (e) {
    if (lb && !lb.hidden) {
      if (e.key === 'Escape') lbClose();
      else if (e.key === 'ArrowLeft') lbStep(document.documentElement.dir === 'rtl' ? 1 : -1);
      else if (e.key === 'ArrowRight') lbStep(document.documentElement.dir === 'rtl' ? -1 : 1);
    } else if (qv && !qv.hidden && e.key === 'Escape') closeQuick();
    else if (panel && !panel.hidden && e.key === 'Escape') { panel.hidden = true; fabBtn.setAttribute('aria-expanded', 'false'); }
  });

  /* skeleton -> loaded */
  $$('.pf-media img').forEach(function (im) {
    var done = function () { im.parentNode.classList.add('is-loaded'); };
    if (im.complete) done(); else { im.addEventListener('load', done); im.addEventListener('error', done); }
  });

  /* ---------- home page: prefill contact form from inquiry list ---------- */
  if (!isSub && /[?&]inquiry=1/.test(location.search)) {
    var msg = document.getElementById('message');
    if (msg && inquiry.length && !msg.value) {
      var names = inquiry.map(function (i) { return pick(i.title); }).join('، ');
      if (lang !== 'ar') names = names.replace(/،/g, ',');
      msg.value = t('inquiryMsg').replace('{list}', names);
    }
  }

  /* ---------- init ---------- */
  applyLang(lang);
  if (grid && document.getElementById('pfCount')) runFilters();
})();
