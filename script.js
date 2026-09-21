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
    "nav.contact": "تواصل"
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
    "nav.contact": "Kontakt"
  }
};

const body = document.body;
const langSwitchBtn = document.querySelector('.lang-switch');
const elements = document.querySelectorAll('[data-i18n]');
const navLinks = document.querySelectorAll('.main-nav a');
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightbox = document.querySelector('.close-lightbox');
const contactForm = document.getElementById('contactForm');

let currentLang = 'ar';

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  if (lang === 'ar') {
    navLinks[0].textContent = 'عنّي';
    navLinks[1].textContent = 'الخدمات';
    navLinks[2].textContent = 'أعمالي';
    navLinks[3].textContent = 'مهاراتي';
    navLinks[4].textContent = 'تواصل';
  } else {
    navLinks[0].textContent = 'Über mich';
    navLinks[1].textContent = 'Leistungen';
    navLinks[2].textContent = 'Projekte';
    navLinks[3].textContent = 'Fähigkeiten';
    navLinks[4].textContent = 'Kontakt';
  }

  elements.forEach((el) => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  const labels = document.querySelectorAll('label');
  labels.forEach((label) => {
    const key = label.getAttribute('data-i18n');
    if (key && translations[lang][key]) {
      label.textContent = translations[lang][key];
    }
  });

  document.querySelector('.brand-text').textContent = lang === 'ar' ? 'Reggaoui Hamza' : 'Reggaoui Hamza';
}

langSwitchBtn.addEventListener('click', () => {
  const nextLang = currentLang === 'ar' ? 'de' : 'ar';
  setLanguage(nextLang);
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

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = currentLang === 'ar' ? 'تم الإرسال' : 'Gesendet';
  submitButton.disabled = true;

  setTimeout(() => {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
    contactForm.reset();
  }, 1800);
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

setLanguage('ar');

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

