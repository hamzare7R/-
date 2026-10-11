// Portfolio website behavior
const translations = {
  ar: {
    "hero.eyebrow": "Graphic Designer & Digital Content Creator",
    "hero.title": "حمزة - مصمم جرافيك ومبدع محتوى رقمي",
    "hero.text": "أدمج بين الدقة في بيئة الموانئ وعمليات التبادل التجاري في Tanger Med وبين الإبداع في تصميم الهوية، التسويق الرقمي، والمحتوى المرئي لخلق تجارب بصرية احترافية تؤثر وتبني ثقة العلامة.",
    "hero.primaryBtn": "تصفح أعمالي",
    "hero.secondaryBtn": "تواصل معي",
    "hero.meta1": "خبرة ميدانية في الموانئ",
    "hero.meta2": "مصمم مستقل ومبدع رقمي",
    "hero.meta3": "متعدد اللغات",
    "hero.role": "Graphic Designer & Digital Creator",
    "hero.statYears": "سنوات خبرة",
    "hero.statProjects": "مشاريع",
    "about.eyebrow": "من أنا",
    "about.title": "مصمم يوازن بين العمليات الميدانية والإبداع الرقمي.",
    "about.paragraph1": "أنا حمزة ر، مصمم جرافيك مستقل ومبدع محتوى رقمي، أعمل على دمج المنهجية العملية مع اللمسة الفنية في كل مشروع. خبرتي في بيئات الموانئ مثل Tanger Med وEurogate أعطتني قدرة عالية على التنظيم، الدقة، والعمل ضمن ضغط المهام، بينما شغفي بالتصميم والتسويق يمدّني بقدرة على صناعة هوية بصرية واضحة وجذابة.",
    "about.paragraph2": "كما أملك خلفية تقنية في نجارة الألومنيوم، ما ساهم في تطوير نظرتي للعناصر المادية والوظيفية، ومن ثم تطبيقها في واجهات وتصاميم تفاعلية. كما أحرص على التعلّم المستمر باللغة الألمانية وتحديث مهاراتي في مجال التصميم والهوية البصرية بما يتوافق مع السوق المعاصر.",
    "services.eyebrow": "خدماتي",
    "services.title": "حلول تصميمية متكاملة لكل مرحلة من علامتك.",
    "services.card1.title": "تصميم الهوية البصرية واللوجوهات",
    "services.card1.text": "تصميم هوية بصرية متكاملة، شعارات، أنماط مرئية، وتطبيقات احترافية عبر Mockups ثلاثية الأبعاد.",
    "services.card2.title": "تصميم واجهات وصفحات الهبوط",
    "services.card2.text": "تصميم واجهات حديثة، تنسيق صفحات هبوط فعالة، وتجربة مستخدم متوازنة بين الجمال والوضوح.",
    "services.card3.title": "إعلانات السوشيال ميديا",
    "services.card3.text": "تصميم منشورات، ستوريات، إعلانات، وبوستات جاهزة للنشر عبر المنصات الرقمية.",
    "services.card4.title": "كتابة السير الذاتية والمحتوى التسويقي",
    "services.card4.text": "صياغة سيرة ذاتية احترافية، كتابة محتوى تسويقي، ورسائل بصرية تركز على التميز والوضوح.",
    "portfolio.eyebrow": "معرض الأعمال",
    "portfolio.title": "أحدث المشاريع والإنجازات.",
    "skills.eyebrow": "مهاراتي وأدواتي",
    "skills.title": "التصميم، التشغيل، واللغة في خدمة المشاريع.",
    "skills.text": "أعمل على خلق حلول مرئية عملية تعزز الهوية وتجربة المستخدم، مع توازن بين البعد الفني والبصري والفهم العملي في بيئات تشغيلية متنوعة.",
    "skills.designTools": "أدوات التصميم",
    "skills.fieldSkills": "مهارات ميدانية وتقنية",
    "contact.eyebrow": "تواصل",
    "contact.title": "دعنا نبني شيئًا مميزًا معًا.",
    "contact.text": "إذا كنت تحتاج هوية بصرية، تصميم منشورات، أو صفحة هبوط أنيقة وواضحة، يمكنني مساعدتك في تحويل الفكرة إلى تجربة بصرية قوية.",
    "contact.name": "الاسم",
    "contact.email": "البريد الإلكتروني",
    "contact.message": "الرسالة",
    "contact.submit": "إرسال",
    "nav.about": "عنّي",
    "nav.services": "الخدمات",
    "nav.portfolio": "أعمالي",
    "nav.skills": "مهاراتي",
    "nav.contact": "تواصل",
    "contact.sent": "تم الإرسال",
    "contact.namePlaceholder": "أدخل اسمك",
    "contact.messagePlaceholder": "اكتب رسالتك...",
    "contact.sending": "جارٍ الإرسال...",
    "contact.success": "تم إرسال رسالتك بنجاح. سأرد عليك قريبًا.",
    "contact.error": "تعذّر إرسال الرسالة. حاول مرة أخرى أو راسلني عبر البريد الإلكتروني."
  },
  en: {
    "hero.eyebrow": "Graphic Designer & Digital Content Creator",
    "hero.title": "Hamza - Graphic Designer & Digital Content Creator",
    "hero.text": "I combine the precision of port and trade operations at Tanger Med with creativity in brand identity, digital marketing, and visual content, to create professional visual experiences that make an impact and build brand trust.",
    "hero.primaryBtn": "View my work",
    "hero.secondaryBtn": "Contact me",
    "hero.meta1": "Hands-on port experience",
    "hero.meta2": "Freelance designer & digital creator",
    "hero.meta3": "Multilingual",
    "hero.role": "Graphic Designer & Digital Creator",
    "hero.statYears": "Years of experience",
    "hero.statProjects": "Projects",
    "about.eyebrow": "About me",
    "about.title": "A designer who balances field operations with digital creativity.",
    "about.paragraph1": "I'm Hamza R., a freelance graphic designer and digital content creator. I combine a practical method with an artistic touch in every project. My experience in port environments such as Tanger Med and Eurogate gave me strong organization, precision, and the ability to work under pressure, while my passion for design and marketing helps me create clear and attractive visual identities.",
    "about.paragraph2": "I also have a technical background in aluminum craftsmanship, which shaped how I see physical and functional elements and how I apply them to interfaces and interactive designs. I keep learning German and updating my skills in design and visual identity to match today's market.",
    "services.eyebrow": "Services",
    "services.title": "Complete design solutions for every stage of your brand.",
    "services.card1.title": "Brand Identity & Logo Design",
    "services.card1.text": "Complete visual identities, logos, visual patterns, and professional applications through 3D mockups.",
    "services.card2.title": "Interface & Landing Page Design",
    "services.card2.text": "Modern interface design, effective landing pages, and a user experience that balances beauty and clarity.",
    "services.card3.title": "Social Media Ads",
    "services.card3.text": "Posts, stories, ads, and ready-to-publish content for digital platforms.",
    "services.card4.title": "CV Writing & Marketing Content",
    "services.card4.text": "Professional CV writing, marketing content, and visual messages focused on distinction and clarity.",
    "portfolio.eyebrow": "Portfolio",
    "portfolio.title": "Latest projects and achievements.",
    "skills.eyebrow": "Skills & tools",
    "skills.title": "Design, operations, and language at the service of projects.",
    "skills.text": "I create practical visual solutions that strengthen identity and user experience, balancing artistic skill with hands-on understanding of different operational environments.",
    "skills.designTools": "Design tools",
    "skills.fieldSkills": "Field & technical skills",
    "contact.eyebrow": "Contact",
    "contact.title": "Let's build something special together.",
    "contact.text": "If you need a brand identity, social media designs, or a clean and clear landing page, I can help you turn your idea into a strong visual experience.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.submit": "Send",
    "contact.sent": "Sent",
    "contact.namePlaceholder": "Enter your name",
    "contact.messagePlaceholder": "Write your message...",
    "contact.sending": "Sending...",
    "contact.success": "Your message was sent. I'll reply soon.",
    "contact.error": "Your message could not be sent. Please try again or email me directly.",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.skills": "Skills",
    "nav.contact": "Contact"
  },
  de: {
    "hero.eyebrow": "Grafikdesigner & Digital Content Creator",
    "hero.title": "Hamza Reggaoui - Grafikdesigner & Digitaler Content Creator",
    "hero.text": "Ich kombiniere Präzision in der Hafen- und Logistikumgebung von Tanger Med mit kreativer Gestaltung, digitalem Marketing und visuellen Inhalten, um starke, professionelle Marken und digitale Erlebnisse zu schaffen.",
    "hero.primaryBtn": "Meine Arbeiten",
    "hero.secondaryBtn": "Kontakt aufnehmen",
    "hero.meta1": "Praxis in Hafenbetrieben",
    "hero.meta2": "Selbstständiger Designer & Kreativer",
    "hero.meta3": "Mehrsprachig",
    "hero.role": "Grafikdesigner & Digital Creator",
    "hero.statYears": "Jahre Erfahrung",
    "hero.statProjects": "Projekte",
    "about.eyebrow": "Über mich",
    "about.title": "Ein Designer, der zwischen Betrieb und Kreativität die Balance hält.",
    "about.paragraph1": "Ich bin Hamza Reggaoui, selbstständiger Grafikdesigner und digitaler Content Creator. Ich verbinde methodische Genauigkeit mit gestalterischer Kreativität in jedem Projekt. Meine Erfahrung in Hafenumgebungen wie Tanger Med und Eurogate hat mir hohe Organisationsfähigkeit, Präzision und die Fähigkeit unter Zeitdruck zu arbeiten, gegeben. Gleichzeitig ermöglicht mir meine Leidenschaft für Design und Marketing die Entwicklung klarer, starker visueller Identitäten.",
    "about.paragraph2": "Zusätzlich besitze ich eine technische Grundlage in der Aluminiumfertigung, die meine Wahrnehmung für funktionale und materielle Elemente geschärft hat. Ich setze diese Perspektive auch in interaktiven Interfaces und Präsentationen um. Zudem lerne ich kontinuierlich Deutsch und aktualisiere meine Fähigkeiten im Bereich Design, Branding und visueller Kommunikation.",
    "services.eyebrow": "Leistungen",
    "services.title": "Umfassende Designlösungen für jede Phase Ihrer Marke.",
    "services.card1.title": "Logo & visuelle Identität",
    "services.card1.text": "Entwicklung einer vollständigen visuellen Markenidentität, Logos, Stilrichtlinien und professioneller Mockups in 3D.",
    "services.card2.title": "Landingpage & UI-Design",
    "services.card2.text": "Moderne Interface-Designs, optimierte Landingpages und ein ausgewogenes Nutzererlebnis zwischen Ästhetik und Klarheit.",
    "services.card3.title": "Social-Media-Design",
    "services.card3.text": "Design von Postern, Stories, Anzeigen und visuellen Assets für digitale Kampagnen und Plattformen.",
    "services.card4.title": "Lebenslauf & Content Creation",
    "services.card4.text": "Professionelle Lebenslauf- und Bewerbungsgestaltung, Marketingcopy und visuelle Botschaften mit Fokus auf Klarheit und Wirkung.",
    "portfolio.eyebrow": "Portfolio",
    "portfolio.title": "Neueste Projekte und Erfolge.",
    "skills.eyebrow": "Fähigkeiten & Tools",
    "skills.title": "Design, Praxis und Sprache im Service Ihrer Projekte.",
    "skills.text": "Ich schaffe visuelle Lösungen, die Identität und Nutzererfahrung stärken und gleichzeitig die praktische Umsetzung in verschiedenen betrieblichen Umgebungen berücksichtigen.",
    "skills.designTools": "Design-Tools",
    "skills.fieldSkills": "Technische & praktische Fähigkeiten",
    "contact.eyebrow": "Kontakt",
    "contact.title": "Lassen Sie uns gemeinsam etwas Besonderes schaffen.",
    "contact.text": "Wenn Sie eine starke visuelle Identität, Social-Media-Design oder eine saubere Landingpage benötigen, unterstütze ich Sie dabei, Ihre Idee in ein starkes digitales Erlebnis zu verwandeln.",
    "contact.name": "Name",
    "contact.email": "E-Mail",
    "contact.message": "Nachricht",
    "contact.submit": "Senden",
    "nav.about": "Über mich",
    "nav.services": "Leistungen",
    "nav.portfolio": "Projekte",
    "nav.skills": "Fähigkeiten",
    "nav.contact": "Kontakt",
    "contact.sent": "Gesendet",
    "contact.namePlaceholder": "Namen eingeben",
    "contact.messagePlaceholder": "Nachricht schreiben...",
    "contact.sending": "Wird gesendet...",
    "contact.success": "Ihre Nachricht wurde gesendet. Ich melde mich bald.",
    "contact.error": "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie mir per E-Mail."
  }
};

const body = document.body;
const langButtons = document.querySelectorAll('.lang-btn');
const elements = document.querySelectorAll('[data-i18n]');
const navLinks = document.querySelectorAll('.main-nav a');
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightbox = document.querySelector('.close-lightbox');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

const SUPPORTED_LANGS = ['ar', 'en', 'de'];
let formStatusKey = null;
let formStatusIsError = false;

function setFormStatus(key, isError = false) {
  formStatusKey = key;
  formStatusIsError = isError;
  renderFormStatus();
}

function renderFormStatus() {
  if (!formStatus) return;
  formStatus.textContent = formStatusKey ? translations[currentLang][formStatusKey] : '';
  formStatus.classList.toggle('error', Boolean(formStatusKey) && formStatusIsError);
}
let currentLang = 'ar';

function getInitialLanguage() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (SUPPORTED_LANGS.includes(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem('lang');
    if (SUPPORTED_LANGS.includes(saved)) return saved;
  } catch (e) {}
  return 'ar';
}

function setLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) return;
  currentLang = lang;
  document.documentElement.lang = lang;
  body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  try {
    localStorage.setItem('lang', lang);
  } catch (e) {}

  const t = translations[lang];

  const navKeys = ['nav.about', 'nav.services', 'nav.portfolio', 'nav.skills', 'nav.contact'];
  navLinks.forEach((link, i) => {
    if (navKeys[i]) link.textContent = t[navKeys[i]];
  });

  const footerLinks = document.querySelectorAll('.footer-links a');
  const footerKeys = ['nav.about', 'nav.portfolio', 'nav.contact'];
  footerLinks.forEach((link, i) => {
    if (footerKeys[i]) link.textContent = t[footerKeys[i]];
  });

  elements.forEach((el) => {
    const key = el.dataset.i18n;
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key]) {
      el.setAttribute('placeholder', t[key]);
    }
  });

  langButtons.forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

  renderFormStatus();
}

langButtons.forEach((btn) => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

    portfolioItems.forEach((item) => {
      const matches = selected === 'all' || item.dataset.category === selected;
      item.classList.toggle('hidden', !matches);
    });
  });
});

portfolioItems.forEach((item) => {
  item.addEventListener('click', () => {
    const image = item.querySelector('img');
    lightboxImg.src = image.src;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

closeLightbox.addEventListener('click', () => {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
});

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }
});

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const resetLabel = () => {
    submitButton.textContent = translations[currentLang]['contact.submit'];
  };

  submitButton.disabled = true;
  submitButton.textContent = translations[currentLang]['contact.sending'];
  setFormStatus(null);

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      throw new Error('Form request failed: ' + response.status);
    }

    contactForm.reset();
    submitButton.textContent = translations[currentLang]['contact.sent'];
    setFormStatus('contact.success');
    setTimeout(resetLabel, 2000);
  } catch (error) {
    console.error(error);
    resetLabel();
    setFormStatus('contact.error', true);
  } finally {
    submitButton.disabled = false;
  }
});

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

setLanguage(getInitialLanguage());

const themeToggleBtn = document.getElementById('theme-toggle');

// التحقق من الثيم المخزن مسبقاً
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
        document.body.classList.toggle('light-mode');
        
        let theme = 'dark';
        if (document.body.classList.contains('light-mode')) {
            theme = 'light';
        }
        localStorage.setItem('theme', theme);
    });
}

