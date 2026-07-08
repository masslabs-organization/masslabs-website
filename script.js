/* ============================================================
   MASSLABS — script.js
   Handles: Loader | Navbar | Reveal | Lang Toggle | Form
   ============================================================ */

(function () {
  'use strict';

  /* ──────────────────────────────────────────
     TRANSLATIONS
  ─────────────────────────────────────────── */
  const translations = {
    tr: {
      // Navbar
      'nav-logo-sub':       'Yazılım Çözümleri ve Ar-Ge',
      'nav-link-services':  'Hizmetler',
      'nav-link-about':     'Hakkımızda',
      'nav-link-tech':      'Teknolojiler',
      'nav-link-contact':   'İletişim',
      'nav-cta-btn':        'İletişime Geç',
      // Mobile nav
      'mob-services':       'Hizmetler',
      'mob-about':          'Hakkımızda',
      'mob-tech':           'Teknolojiler',
      'mob-contact':        'İletişim',
      'mob-cta':            'İletişime Geç',
      // Hero
      'hero-badge-text':    'Yenilikçi Yazılım Çözümleri',
      'hero-title-line1':   'Geleceği Bugün',
      'hero-title-line2':   'İnşa Ediyoruz',
      'hero-desc':          'Yazılım geliştirme, araştırma-geliştirme ve yenilikçi teknoloji çözümleriyle işletmenizi dijital çağın ötesine taşıyoruz.',
      'hero-cta-primary':   'Hizmetlerimizi Keşfet',
      'hero-cta-secondary': 'Proje Başlat',
      'stat-projects-label':'Proje',
      'stat-clients-label': 'Müşteri',
      'stat-years-label':   'Yıl Deneyim',
      // Services
      'services-tag':       'Hizmetler',
      'services-title':     'Neler <span class="text-orange">Sunuyoruz?</span>',
      'services-desc':      'Modern teknoloji altyapısı ve uzman ekibimizle her ölçekteki projeye özel, yüksek kaliteli yazılım çözümleri geliştiriyoruz.',
      'svc-title-1':        'Özel Yazılım Geliştirme',
      'svc-desc-1':         'İşletmenizin ihtiyaçlarına göre tasarlanan, ölçeklenebilir ve yüksek performanslı yazılım sistemleri geliştiriyoruz.',
      'svc-title-2':        'Yapay Zeka & Makine Öğrenmesi',
      'svc-desc-2':         'Verilerinizi değere dönüştüren AI/ML çözümleri, otomasyon sistemleri ve akıllı karar destek mekanizmaları tasarlıyoruz.',
      'svc-title-3':        'Web Uygulama Geliştirme',
      'svc-desc-3':         'Modern web teknolojileri ile hızlı, güvenli ve kullanıcı odaklı web uygulamaları ve platformlar inşa ediyoruz.',
      'svc-title-4':        'Mobil Uygulama',
      'svc-desc-4':         'iOS ve Android platformları için native ve cross-platform mobil uygulamalar geliştirip yayımlıyoruz.',
      'svc-title-5':        'Ar-Ge ve İnovasyon',
      'svc-desc-5':         'Teknolojik sınırları zorlayan araştırma projeleri yürütüyor, prototip geliştiriyor ve inovasyon süreçlerini yönetiyoruz.',
      'svc-title-6':        'Bulut & DevOps',
      'svc-desc-6':         'AWS, Azure ve GCP üzerinde ölçeklenebilir mimari tasarımı, CI/CD pipeline kurulumu ve altyapı optimizasyonu yapıyoruz.',
      // About
      'about-tag':          'Hakkımızda',
      'about-title':        'Teknolojiyle <span class="text-orange">Değer</span> Yaratıyoruz',
      'about-desc':         'MassLabs olarak, işletmelerin dijital dönüşüm yolculuğunda güvenilir teknoloji ortağı olmayı hedefliyoruz.',
      'about-feat1-title':  'Odaklı Çözümler',
      'about-feat1-desc':   'Her müşterinin ihtiyacını derinlemesine analiz ederek, tam olarak ihtiyaç duyulan çözümü tasarlıyoruz.',
      'about-feat2-title':  'Hızlı Teslimat',
      'about-feat2-desc':   'Çevik metodoloji ile hızlı prototipleme ve iteratif geliştirme süreçleriyle zamanında teslimat garantisi sunuyoruz.',
      'about-feat3-title':  'Uzun Vadeli Ortaklık',
      'about-feat3-desc':   'Proje teslimi sonrasında da yanınızda olan, büyümenize destek veren bir teknoloji partneri olarak hizmet veriyoruz.',
      'about-cta':          'Bizimle Çalışın',
      // Tech
      'tech-tag':           'Teknoloji Yığını',
      'tech-title':         'Kullandığımız <span class="text-orange">Teknolojiler</span>',
      // Contact
      'contact-tag':        'İletişim',
      'contact-title':      'Bir Proje mi <span class="text-orange">Başlatıyorsunuz?</span>',
      'contact-desc':       'Fikirlerinizi gerçeğe dönüştürmek için buradayız. Hemen iletişime geçin.',
      'contact-address':    'Türkiye',
      'contact-email':      'info@masslabs.com.tr',
      'contact-hours-label':'Çalışma Saatleri',
      'contact-hours':      'Pzt – Cum, 09:00 – 18:00',
      'label-name':         'Adınız',
      'label-email':        'E-posta',
      'label-subject':      'Konu',
      'label-message':      'Mesajınız',
      'form-opt-select':    'Hizmet Seçin',
      'form-opt-1':         'Özel Yazılım Geliştirme',
      'form-opt-2':         'Yapay Zeka & ML',
      'form-opt-3':         'Web Uygulama',
      'form-opt-4':         'Mobil Uygulama',
      'form-opt-5':         'Ar-Ge Projesi',
      'form-opt-6':         'Diğer',
      'form-submit-btn':    'Mesaj Gönder',
      // Footer
      'footer-tagline':     'Yazılım Çözümleri ve Ar-Ge alanında yenilikçi teknolojilerle geleceği şekillendiriyoruz.',
      'footer-col1-title':  'Hizmetler',
      'footer-svc-1':       'Yazılım Geliştirme',
      'footer-svc-2':       'Yapay Zeka & ML',
      'footer-svc-3':       'Web Uygulamalar',
      'footer-svc-4':       'Mobil Uygulama',
      'footer-svc-5':       'Ar-Ge Projeleri',
      'footer-col2-title':  'Şirket',
      'footer-about':       'Hakkımızda',
      'footer-tech':        'Teknolojiler',
      'footer-career':      'Kariyer',
      'footer-blog':        'Blog',
      'footer-press':       'Basın',
      'footer-col3-title':  'Yasal',
      'footer-privacy':     'Gizlilik Politikası',
      'footer-terms':       'Kullanım Koşulları',
      'footer-kvkk':        'KVKK Aydınlatma',
      'footer-cookies':     'Çerez Politikası',
      'footer-copy':        '© 2024 <span>MassLabs</span>. Tüm hakları saklıdır.',
      'footer-made':        "Türkiye'de <span>❤️</span> ile yapıldı",
      // About logo
      'about-logo-src':     'assets/images/logo-turkce.png',
      'about-logo-alt':     'MassLabs Türkçe Logo — Yazılım Çözümleri ve Ar-Ge',
      // Footer bottom logo
      'footer-bottom-logo-src': 'assets/images/logo-turkce.png',
      'footer-bottom-logo-alt': 'MassLabs — Yazılım Çözümleri ve Ar-Ge',
      // Nav sub
      'doc-title':          'MassLabs — Yazılım Çözümleri ve Ar-Ge',
    },
    en: {
      // Navbar
      'nav-logo-sub':       'Software Solutions & R&D',
      'nav-link-services':  'Services',
      'nav-link-about':     'About',
      'nav-link-tech':      'Tech Stack',
      'nav-link-contact':   'Contact',
      'nav-cta-btn':        'Get in Touch',
      // Mobile nav
      'mob-services':       'Services',
      'mob-about':          'About',
      'mob-tech':           'Tech Stack',
      'mob-contact':        'Contact',
      'mob-cta':            'Get in Touch',
      // Hero
      'hero-badge-text':    'Innovative Software Solutions',
      'hero-title-line1':   'Building Tomorrow',
      'hero-title-line2':   'Today',
      'hero-desc':          'We drive your business beyond the digital age with software development, research & development, and innovative technology solutions.',
      'hero-cta-primary':   'Explore Services',
      'hero-cta-secondary': 'Start a Project',
      'stat-projects-label':'Projects',
      'stat-clients-label': 'Clients',
      'stat-years-label':   'Years Experience',
      // Services
      'services-tag':       'Services',
      'services-title':     'What We <span class="text-orange">Offer?</span>',
      'services-desc':      'We develop high-quality, custom software solutions for projects of all scales, powered by our modern tech stack and expert team.',
      'svc-title-1':        'Custom Software Development',
      'svc-desc-1':         'We build scalable, high-performance software systems tailored to your business needs.',
      'svc-title-2':        'Artificial Intelligence & ML',
      'svc-desc-2':         'We design AI/ML solutions, automation systems and smart decision support mechanisms that turn your data into value.',
      'svc-title-3':        'Web Application Development',
      'svc-desc-3':         'We build fast, secure and user-focused web applications and platforms using modern web technologies.',
      'svc-title-4':        'Mobile Applications',
      'svc-desc-4':         'We develop and publish native and cross-platform mobile applications for iOS and Android.',
      'svc-title-5':        'R&D and Innovation',
      'svc-desc-5':         'We run research projects that push the boundaries of technology, develop prototypes and manage innovation processes.',
      'svc-title-6':        'Cloud & DevOps',
      'svc-desc-6':         'We design scalable architectures on AWS, Azure and GCP, set up CI/CD pipelines and optimize infrastructure.',
      // About
      'about-tag':          'About Us',
      'about-title':        'Creating <span class="text-orange">Value</span> Through Technology',
      'about-desc':         'At MassLabs, we aim to be a reliable technology partner in businesses\' digital transformation journey.',
      'about-feat1-title':  'Focused Solutions',
      'about-feat1-desc':   'We deeply analyze each client\'s needs and design exactly the solution they require.',
      'about-feat2-title':  'Fast Delivery',
      'about-feat2-desc':   'We guarantee timely delivery through agile methodology, rapid prototyping and iterative development.',
      'about-feat3-title':  'Long-Term Partnership',
      'about-feat3-desc':   'We serve as a technology partner that stays by your side after project delivery and supports your growth.',
      'about-cta':          'Work With Us',
      // Tech
      'tech-tag':           'Tech Stack',
      'tech-title':         'Technologies We <span class="text-orange">Use</span>',
      // Contact
      'contact-tag':        'Contact',
      'contact-title':      'Starting a <span class="text-orange">Project?</span>',
      'contact-desc':       'We are here to turn your ideas into reality. Get in touch now.',
      'contact-address':    'Turkey',
      'contact-email':      'info@masslabs.com.tr',
      'contact-hours-label':'Working Hours',
      'contact-hours':      'Mon – Fri, 09:00 – 18:00',
      'label-name':         'Your Name',
      'label-email':        'Email',
      'label-subject':      'Subject',
      'label-message':      'Your Message',
      'form-opt-select':    'Select a Service',
      'form-opt-1':         'Custom Software Development',
      'form-opt-2':         'AI & ML',
      'form-opt-3':         'Web Application',
      'form-opt-4':         'Mobile App',
      'form-opt-5':         'R&D Project',
      'form-opt-6':         'Other',
      'form-submit-btn':    'Send Message',
      // Footer
      'footer-tagline':     'Shaping the future with innovative technologies in Software Solutions and R&D.',
      'footer-col1-title':  'Services',
      'footer-svc-1':       'Software Development',
      'footer-svc-2':       'AI & Machine Learning',
      'footer-svc-3':       'Web Applications',
      'footer-svc-4':       'Mobile Apps',
      'footer-svc-5':       'R&D Projects',
      'footer-col2-title':  'Company',
      'footer-about':       'About Us',
      'footer-tech':        'Tech Stack',
      'footer-career':      'Careers',
      'footer-blog':        'Blog',
      'footer-press':       'Press',
      'footer-col3-title':  'Legal',
      'footer-privacy':     'Privacy Policy',
      'footer-terms':       'Terms of Service',
      'footer-kvkk':        'Data Protection',
      'footer-cookies':     'Cookie Policy',
      'footer-copy':        '© 2024 <span>MassLabs</span>. All rights reserved.',
      'footer-made':        'Made with <span>❤️</span> in Turkey',
      // About logo
      'about-logo-src':     'assets/images/logo-english.png',
      'about-logo-alt':     'MassLabs English Logo — Software Solutions & R&D',
      // Footer bottom logo
      'footer-bottom-logo-src': 'assets/images/logo-english.png',
      'footer-bottom-logo-alt': 'MassLabs — Software Solutions & R&D',
      // doc title
      'doc-title':          'MassLabs — Software Solutions & R&D',
    }
  };

  /* ──────────────────────────────────────────
     LANGUAGE SYSTEM
  ─────────────────────────────────────────── */
  let currentLang = localStorage.getItem('masslabs-lang') || 'tr';

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('masslabs-lang', lang);

    const t = translations[lang];

    // Toggle buttons
    document.getElementById('lang-tr').classList.toggle('active', lang === 'tr');
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    document.getElementById('lang-tr').setAttribute('aria-pressed', String(lang === 'tr'));
    document.getElementById('lang-en').setAttribute('aria-pressed', String(lang === 'en'));

    // Document title
    document.title = t['doc-title'];

    // Apply all text translations
    Object.keys(t).forEach(function (id) {
      if (id === 'about-logo-src' || id === 'about-logo-alt' ||
          id === 'footer-bottom-logo-src' || id === 'footer-bottom-logo-alt' ||
          id === 'doc-title') return;

      var el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = t[id];
    });

    // Swap About logo (TR/EN)
    var aboutLogo = document.getElementById('about-main-logo');
    if (aboutLogo) {
      aboutLogo.src = t['about-logo-src'];
      aboutLogo.alt = t['about-logo-alt'];
    }

    // Swap Footer bottom logo
    var footerBottomLogo = document.getElementById('footer-bottom-logo');
    if (footerBottomLogo) {
      footerBottomLogo.src = t['footer-bottom-logo-src'];
      footerBottomLogo.alt = t['footer-bottom-logo-alt'];
    }

    // Nav sub text — rebuild with SVG arrow preserved
    var navSubEl = document.getElementById('nav-logo-sub');
    if (navSubEl) navSubEl.textContent = t['nav-logo-sub'];

    // Form submit button — rebuild to preserve icon
    var submitBtn = document.getElementById('form-submit-btn');
    if (submitBtn) {
      submitBtn.innerHTML = t['form-submit-btn'] +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>';
    }
  }

  // Expose to global scope (used in HTML onclick)
  window.setLang = setLang;

  /* ──────────────────────────────────────────
     PAGE LOADER
  ─────────────────────────────────────────── */
  window.addEventListener('load', function () {
    var loader = document.getElementById('page-loader');
    if (!loader) return;
    setTimeout(function () {
      loader.classList.add('hidden');
    }, 1500);
  });

  /* ──────────────────────────────────────────
     NAVBAR SCROLL
  ─────────────────────────────────────────── */
  var navbar = document.getElementById('navbar');
  var lastScrollY = 0;

  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (y > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScrollY = y;
  }, { passive: true });

  /* ──────────────────────────────────────────
     HAMBURGER / MOBILE NAV
  ─────────────────────────────────────────── */
  var hamburger = document.getElementById('hamburger-btn');
  var mobileNav = document.getElementById('mobile-nav');

  hamburger.addEventListener('click', function () {
    var isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  window.closeMobileNav = function () {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target) && !mobileNav.contains(e.target)) {
      closeMobileNav();
    }
  });

  /* ──────────────────────────────────────────
     REVEAL ON SCROLL
  ─────────────────────────────────────────── */
  var revealEls = document.querySelectorAll('.reveal');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ──────────────────────────────────────────
     SMOOTH ANCHOR SCROLL
  ─────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var navH = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--navbar-h')) || 76;
      var top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ──────────────────────────────────────────
     CONTACT FORM
  ─────────────────────────────────────────── */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = document.getElementById('form-submit-btn');
      var originalHTML = btn.innerHTML;

      btn.innerHTML = '✓ ' + (currentLang === 'tr' ? 'Gönderildi!' : 'Sent!');
      btn.style.background = '#22c55e';
      btn.disabled = true;

      setTimeout(function () {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

  /* ──────────────────────────────────────────
     COUNTER ANIMATION (hero stats)
  ─────────────────────────────────────────── */
  var counters = [
    { id: 'stat-projects', target: 50, suffix: '+' },
    { id: 'stat-clients',  target: 30, suffix: '+' },
    { id: 'stat-years',    target: 5,  suffix: '+' },
  ];

  var countersDone = false;
  var heroSection = document.getElementById('hero');

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !countersDone) {
        countersDone = true;
        counters.forEach(function (c) {
          animateCounter(c.id, c.target, c.suffix);
        });
      }
    });
  }, { threshold: 0.5 });

  if (heroSection) counterObserver.observe(heroSection);

  function animateCounter(id, target, suffix) {
    var el = document.getElementById(id);
    if (!el) return;
    var start = 0;
    var duration = 1800;
    var startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ──────────────────────────────────────────
     INIT
  ─────────────────────────────────────────── */
  setLang(currentLang);

})();
