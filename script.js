/* ============================================================
   MASSLABS — script.js  (v2 — gerçek içerik güncellemesi)
   ============================================================ */

(function () {
  'use strict';

  /* ──────────────────────────────────────────
     TRANSLATIONS
  ─────────────────────────────────────────── */
  const T = {
    tr: {
      /* Navbar */
      'nav-logo-sub':       'SaaS & AI Otomasyon',
      'nav-link-services':  'Hizmetler',
      'nav-link-projects':  'Projeler',
      'nav-link-about':     'Hakkımızda',
      'nav-link-tech':      'Teknolojiler',
      'nav-link-contact':   'İletişim',
      'nav-cta-btn':        'Proje Başlat',
      'mob-services':       'Hizmetler',
      'mob-projects':       'Projeler',
      'mob-about':          'Hakkımızda',
      'mob-tech':           'Teknolojiler',
      'mob-contact':        'İletişim',
      'mob-cta':            'Proje Başlat',
      /* Hero */
      'hero-badge-text':    'SaaS & AI Otomasyon Ajansı',
      'hero-title-line1':   'Yazılımla',
      'hero-title-line2':   'Büyüyün',
      'hero-desc':          'SaaS ürün geliştirme ve AI otomasyon odaklı, iki kişilik çekirdek bir yazılım ajansıyız. Hızlı prototipleme, temiz mimari ve sahiplenilmiş teslimat anlayışıyla çalışıyoruz.',
      'hero-cta-primary':   'Hizmetlerimizi Gör',
      'hero-cta-secondary': 'Proje Başlat',
      'hero-q1':            'Hızlı Prototipleme',
      'hero-q2':            'SaaS & AI Odaklı',
      'hero-q3':            'Temiz Mimari',
      'hero-scroll-label':  'Aşağı Kaydır',
      /* Services */
      'services-tag':        'Hizmetler',
      'services-title':      'Ne Üzerine <span class="text-orange">Çalışıyoruz?</span>',
      'services-desc':       'Birincil uzmanlık alanımız SaaS ürün geliştirme ve AI otomasyon. Buna ek olarak custom yazılım, web ve mobil projeler de alıyoruz.',
      'featured-label-1':    '⭐ Birincil Uzmanlık',
      'featured-label-2':    '⭐ Birincil Uzmanlık',
      'svc-title-1':         'SaaS Geliştirme',
      'svc-desc-1':          'Çok kiracılı SaaS ürünleri, abonelik altyapısı ve ölçeklenebilir backend mimarileri tasarlıyor; sıfırdan lansmana kadar yürütüyoruz.',
      'svc-arrow-1':         'Proje Başlat',
      'svc-title-2':         'AI Otomasyon',
      'svc-desc-2':          'LLM entegrasyonları, akıllı iş akışları ve veri işleme pipeline\'ları ile tekrarlayan operasyonel süreçleri otomatize ediyoruz.',
      'svc-arrow-2':         'Proje Başlat',
      'services-sep-label':  'Ek Hizmetler',
      'svc-title-3':         'Custom Yazılım',
      'svc-desc-3':          'İşletmeye özgü iç araçlar, otomasyon sistemleri ve entegrasyon projeleri.',
      'svc-title-4':         'Web Geliştirme',
      'svc-desc-4':          'Next.js tabanlı, performanslı ve SEO dostu web uygulamaları.',
      'svc-title-5':         'Mobil Uygulama',
      'svc-desc-5':          'iOS ve Android için cross-platform mobil uygulama geliştirme.',
      'svc-title-6':         'Bulut & DevOps',
      'svc-desc-6':          'AWS altyapısı, Docker/container mimarisi ve CI/CD pipeline kurulumu.',
      /* Projects */
      'projects-tag':        'Projeler',
      'projects-title':      'Üzerinde Çalıştığımız <span class="text-orange">Proje Türleri</span>',
      'projects-desc':       'Aşağıdaki örnekler, geliştirdiğimiz çözüm türlerini temsil etmektedir. Gizlilik nedeniyle isimler ve bazı detaylar değiştirilmiştir.',
      'proj-a-type':         'AI Otomasyon',
      'proj-a-status':       'Tamamlandı',
      'proj-a-title':        'AI Destekli Operasyon Platformu',
      'proj-a-desc':         'Yüzlerce manuel adımı tek bir komutla gerçekleştiren, LLM tabanlı iş süreci otomasyon sistemi. Asenkron kuyruk mimarisiyle yüksek hacimli görevleri güvenilir şekilde işler.',
      'proj-a-cta':          'Benzer proje? Konuşalım →',
      'proj-b-type':         'SaaS Geliştirme',
      'proj-b-status':       'Devam Ediyor',
      'proj-b-title':        'Çok Kiracılı SaaS Platformu',
      'proj-b-desc':         'Abonelik yönetimi, rol tabanlı erişim kontrolü ve özelleştirilebilir dashboard içeren multi-tenant SaaS altyapısı. Stripe entegrasyonu ile faturalandırma tamamen otomatize.',
      'proj-b-cta':          'Benzer proje? Konuşalım →',
      'proj-c-type':         'Custom Yazılım',
      'proj-c-status':       'Tamamlandı',
      'proj-c-title':        'Asenkron İş Akışı Altyapısı',
      'proj-c-desc':         'Birden fazla harici API entegrasyonunu senkronize eden, yüksek hacimli işlemleri kuyruk tabanlı yöneten ölçeklenebilir bir altyapı. Hata yönetimi ve yeniden deneme mekanizmaları dahil.',
      'proj-c-cta':          'Benzer proje? Konuşalım →',
      /* About */
      'about-tag':           'Hakkımızda',
      'about-title':         'Küçük Ekip, <span class="text-orange">Odaklı Yaklaşım</span>',
      'about-desc':          'İki kişilik çekirdek bir yazılım ajansıyız. Büyük ekip görüntüsü vermek yerine, gerçekte ne yaptığımızı ve nasıl yaptığımızı net tutmayı tercih ediyoruz.',
      'about-feat1-title':   'Dar Kapsam, Derin Uzmanlık',
      'about-feat1-desc':    'Her şeyi yapmak yerine SaaS ve AI alanında derinleşmeyi seçtik. Bu odak, daha tahmin edilebilir ve kaliteli çıktılar sağlıyor.',
      'about-feat2-title':   'Hızlı Geri Bildirim Döngüsü',
      'about-feat2-desc':    'Küçük ekip avantajı: kararlar hızlı alınır, pivot kolaydır, iletişim kayıpları minimumdur.',
      'about-feat3-title':   'Sahiplenilmiş Teslimat',
      'about-feat3-desc':    'Projeyi bir başkasına devretmeyiz. Başından sonuna kadar aynı kişiler çalışır; sorumluluk net, takip kolaydır.',
      'about-cta':           'Birlikte Çalışalım',
      /* Tech */
      'tech-tag':            'Teknoloji Yığını',
      'tech-title':          'Kullandığımız <span class="text-orange">Teknolojiler</span>',
      /* Contact */
      'contact-tag':         'İletişim',
      'contact-title':       'Bir Projeniz mi <span class="text-orange">Var?</span>',
      'contact-desc':        'Aşağıdaki formu doldurun. Projeyi anlayarak geri dönelim.',
      'contact-sales-label': 'Satış & Proje',
      'contact-security-label': 'Güvenlik',
      'contact-support-label': 'Destek',
      'contact-hours-label': 'Çalışma Saatleri',
      'contact-hours':       'Pzt – Cum, 09:00 – 18:00',
      'form-sec-basic':      'Temel Bilgiler',
      'label-name':          'Ad Soyad',
      'label-email':         'E-posta',
      'label-subject':       'İlgilendiğiniz Hizmet',
      'form-opt-select':     'Seçin',
      'form-opt-1':          'SaaS Geliştirme',
      'form-opt-2':          'AI Otomasyon',
      'form-opt-3':          'Custom Yazılım',
      'form-opt-4':          'Web Geliştirme',
      'form-opt-5':          'Mobil Uygulama',
      'form-opt-6':          'Diğer',
      'label-timeline':      'Zaman Çerçevesi',
      'form-tl-select':      'Seçin',
      'form-tl-1':           '1 aydan kısa',
      'form-tl-2':           '1 – 3 ay',
      'form-tl-3':           '3 – 6 ay',
      'form-tl-4':           '6+ ay',
      'form-sec-qualify':    'Projeyi Anlayalım',
      'label-problem':       'Çözmek istediğiniz problemi kısaca anlatın',
      'label-current':       'Şu an bunu nasıl çözüyorsunuz?',
      'label-outcome':       'Hedeflediğiniz sonuç / çıktı nedir?',
      'label-budget':        'Tahmini bütçe aralığı',
      'form-bdg-skip':       'Belirtmek istemiyorum',
      'form-bdg-1':          '< 10.000 ₺',
      'form-bdg-2':          '10.000 – 25.000 ₺',
      'form-bdg-3':          '25.000 – 50.000 ₺',
      'form-bdg-4':          '50.000 ₺ üzeri',
      'label-message':       'Ek notlar',
      'form-submit-btn':     'Formu Gönder',
      'form-note':           'Form verileriniz yalnızca proje değerlendirmesi için kullanılır. <a href="privacy.html" id="form-privacy-link">Gizlilik Politikası</a>',
      /* Footer */
      'footer-tagline':      'SaaS geliştirme ve AI otomasyon odaklı, iki kişilik çekirdek bir yazılım ajansı.',
      'footer-col1-title':   'Hizmetler',
      'footer-svc-1':        'SaaS Geliştirme',
      'footer-svc-2':        'AI Otomasyon',
      'footer-svc-3':        'Custom Yazılım',
      'footer-svc-4':        'Web Geliştirme',
      'footer-svc-5':        'Mobil Uygulama',
      'footer-col2-title':   'Şirket',
      'footer-about':        'Hakkımızda',
      'footer-tech':         'Teknolojiler',
      'footer-projects':     'Projeler',
      'footer-blog':         'Blog',
      'footer-col3-title':   'Yasal',
      'footer-privacy':      'Gizlilik Politikası',
      'footer-terms':        'Kullanım Koşulları',
      'footer-kvkk':         'KVKK Aydınlatma',
      'footer-cookies':      'Çerez Politikası',
      'footer-copy':         '© 2025 <span>MassLabs</span>. Tüm hakları saklıdır.',
      'footer-made':         "Türkiye'de <span>❤️</span> ile yapıldı",
      /* Logo swap */
      'about-logo-src':      'assets/images/logo-turkce.png',
      'about-logo-alt':      'MassLabs Türkçe Logo',
      'footer-bottom-logo-src': 'assets/images/logo-turkce.png',
      'footer-bottom-logo-alt': 'MassLabs — SaaS & AI Otomasyon',
      'doc-title':           'MassLabs — SaaS & AI Otomasyon',
    },

    en: {
      /* Navbar */
      'nav-logo-sub':       'SaaS & AI Automation',
      'nav-link-services':  'Services',
      'nav-link-projects':  'Projects',
      'nav-link-about':     'About',
      'nav-link-tech':      'Tech Stack',
      'nav-link-contact':   'Contact',
      'nav-cta-btn':        'Start a Project',
      'mob-services':       'Services',
      'mob-projects':       'Projects',
      'mob-about':          'About',
      'mob-tech':           'Tech Stack',
      'mob-contact':        'Contact',
      'mob-cta':            'Start a Project',
      /* Hero */
      'hero-badge-text':    'SaaS & AI Automation Agency',
      'hero-title-line1':   'Grow Your Business',
      'hero-title-line2':   'With Software',
      'hero-desc':          'We are a two-person software agency focused on SaaS product development and AI automation. We work with fast prototyping, clean architecture and end-to-end ownership.',
      'hero-cta-primary':   'See Our Services',
      'hero-cta-secondary': 'Start a Project',
      'hero-q1':            'Fast Prototyping',
      'hero-q2':            'SaaS & AI Focused',
      'hero-q3':            'Clean Architecture',
      'hero-scroll-label':  'Scroll Down',
      /* Services */
      'services-tag':        'Services',
      'services-title':      'What We <span class="text-orange">Work On?</span>',
      'services-desc':       'Our primary expertise is SaaS product development and AI automation. We also take on custom software, web and mobile projects.',
      'featured-label-1':    '⭐ Primary Expertise',
      'featured-label-2':    '⭐ Primary Expertise',
      'svc-title-1':         'SaaS Development',
      'svc-desc-1':          'Multi-tenant SaaS products, subscription infrastructure and scalable backend architectures — from zero to launch.',
      'svc-arrow-1':         'Start a Project',
      'svc-title-2':         'AI Automation',
      'svc-desc-2':          'LLM integrations, intelligent workflows and data processing pipelines to automate repetitive operational processes.',
      'svc-arrow-2':         'Start a Project',
      'services-sep-label':  'Additional Services',
      'svc-title-3':         'Custom Software',
      'svc-desc-3':          'Business-specific internal tools, automation systems and integration projects.',
      'svc-title-4':         'Web Development',
      'svc-desc-4':          'High-performance, SEO-friendly web applications built with Next.js.',
      'svc-title-5':         'Mobile Apps',
      'svc-desc-5':          'Cross-platform mobile application development for iOS and Android.',
      'svc-title-6':         'Cloud & DevOps',
      'svc-desc-6':          'AWS infrastructure, Docker/container architecture and CI/CD pipeline setup.',
      /* Projects */
      'projects-tag':        'Projects',
      'projects-title':      'Types of Projects <span class="text-orange">We Build</span>',
      'projects-desc':       'The examples below represent the types of solutions we develop. Names and some details have been changed for confidentiality.',
      'proj-a-type':         'AI Automation',
      'proj-a-status':       'Completed',
      'proj-a-title':        'AI-Powered Operations Platform',
      'proj-a-desc':         'An LLM-based business process automation system that executes hundreds of manual steps with a single command. Reliably handles high-volume tasks with async queue architecture.',
      'proj-a-cta':          'Similar project? Let\'s talk →',
      'proj-b-type':         'SaaS Development',
      'proj-b-status':       'Ongoing',
      'proj-b-title':        'Multi-Tenant SaaS Platform',
      'proj-b-desc':         'Multi-tenant SaaS infrastructure with subscription management, role-based access control and customizable dashboards. Billing fully automated via Stripe integration.',
      'proj-b-cta':          'Similar project? Let\'s talk →',
      'proj-c-type':         'Custom Software',
      'proj-c-status':       'Completed',
      'proj-c-title':        'Async Workflow Infrastructure',
      'proj-c-desc':         'A scalable infrastructure that synchronizes multiple external API integrations and manages high-volume transactions via queue-based processing. Includes error handling and retry mechanisms.',
      'proj-c-cta':          'Similar project? Let\'s talk →',
      /* About */
      'about-tag':           'About Us',
      'about-title':         'Small Team, <span class="text-orange">Focused Approach</span>',
      'about-desc':          'We are a two-person core software agency. Rather than projecting a large-team image, we prefer to be clear about what we actually do and how we do it.',
      'about-feat1-title':   'Narrow Scope, Deep Expertise',
      'about-feat1-desc':    'Instead of doing everything, we chose to go deep in SaaS and AI. This focus delivers more predictable and higher-quality outputs.',
      'about-feat2-title':   'Fast Feedback Loops',
      'about-feat2-desc':    'Small team advantage: decisions are made quickly, pivots are easy, communication loss is minimal.',
      'about-feat3-title':   'End-to-End Ownership',
      'about-feat3-desc':    'We don\'t hand the project off. The same people work from start to finish — accountability is clear, follow-up is easy.',
      'about-cta':           'Work Together',
      /* Tech */
      'tech-tag':            'Tech Stack',
      'tech-title':          'Technologies We <span class="text-orange">Use</span>',
      /* Contact */
      'contact-tag':         'Contact',
      'contact-title':       'Have a <span class="text-orange">Project?</span>',
      'contact-desc':        'Fill out the form below. We\'ll get back to you after understanding your project.',
      'contact-sales-label': 'Sales & Projects',
      'contact-security-label': 'Security',
      'contact-support-label': 'Support',
      'contact-hours-label': 'Working Hours',
      'contact-hours':       'Mon – Fri, 09:00 – 18:00',
      'form-sec-basic':      'Basic Info',
      'label-name':          'Full Name',
      'label-email':         'Email',
      'label-subject':       'Service of Interest',
      'form-opt-select':     'Select',
      'form-opt-1':          'SaaS Development',
      'form-opt-2':          'AI Automation',
      'form-opt-3':          'Custom Software',
      'form-opt-4':          'Web Development',
      'form-opt-5':          'Mobile App',
      'form-opt-6':          'Other',
      'label-timeline':      'Timeline',
      'form-tl-select':      'Select',
      'form-tl-1':           'Less than 1 month',
      'form-tl-2':           '1 – 3 months',
      'form-tl-3':           '3 – 6 months',
      'form-tl-4':           '6+ months',
      'form-sec-qualify':    'Tell Us About Your Project',
      'label-problem':       'Briefly describe the problem you\'re trying to solve',
      'label-current':       'How are you solving it now?',
      'label-outcome':       'What\'s the desired outcome / output?',
      'label-budget':        'Estimated budget range',
      'form-bdg-skip':       'Prefer not to say',
      'form-bdg-1':          '< $2,500',
      'form-bdg-2':          '$2,500 – $6,500',
      'form-bdg-3':          '$6,500 – $13,000',
      'form-bdg-4':          '$13,000+',
      'label-message':       'Additional notes',
      'form-submit-btn':     'Send Form',
      'form-note':           'Your form data is used solely for project evaluation. <a href="privacy.html">Privacy Policy</a>',
      /* Footer */
      'footer-tagline':      'A two-person core software agency focused on SaaS development and AI automation.',
      'footer-col1-title':   'Services',
      'footer-svc-1':        'SaaS Development',
      'footer-svc-2':        'AI Automation',
      'footer-svc-3':        'Custom Software',
      'footer-svc-4':        'Web Development',
      'footer-svc-5':        'Mobile Apps',
      'footer-col2-title':   'Company',
      'footer-about':        'About Us',
      'footer-tech':         'Tech Stack',
      'footer-projects':     'Projects',
      'footer-blog':         'Blog',
      'footer-col3-title':   'Legal',
      'footer-privacy':      'Privacy Policy',
      'footer-terms':        'Terms of Service',
      'footer-kvkk':         'Data Protection',
      'footer-cookies':      'Cookie Policy',
      'footer-copy':         '© 2025 <span>MassLabs</span>. All rights reserved.',
      'footer-made':         'Made with <span>❤️</span> in Turkey',
      /* Logo swap */
      'about-logo-src':      'assets/images/logo-english.png',
      'about-logo-alt':      'MassLabs English Logo',
      'footer-bottom-logo-src': 'assets/images/logo-english.png',
      'footer-bottom-logo-alt': 'MassLabs — SaaS & AI Automation',
      'doc-title':           'MassLabs — SaaS & AI Automation',
    }
  };

  /* ──────────────────────────────────────────
     LANGUAGE SYSTEM
  ─────────────────────────────────────────── */
  let currentLang = localStorage.getItem('masslabs-lang') || 'tr';

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('masslabs-lang', lang);

    const t = T[lang];
    document.title = t['doc-title'];

    // Toggle buttons
    ['tr','en'].forEach(function(l) {
      var btn = document.getElementById('lang-' + l);
      if (btn) {
        btn.classList.toggle('active', l === lang);
        btn.setAttribute('aria-pressed', String(l === lang));
      }
    });

    // Apply text translations (skip special keys)
    const SPECIAL = ['about-logo-src','about-logo-alt','footer-bottom-logo-src','footer-bottom-logo-alt','doc-title'];
    Object.keys(t).forEach(function(id) {
      if (SPECIAL.indexOf(id) !== -1) return;
      var el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = t[id];
    });

    // Swap About logo
    var aLogo = document.getElementById('about-main-logo');
    if (aLogo) { aLogo.src = t['about-logo-src']; aLogo.alt = t['about-logo-alt']; }

    // Swap Footer bottom logo
    var fLogo = document.getElementById('footer-bottom-logo');
    if (fLogo) { fLogo.src = t['footer-bottom-logo-src']; fLogo.alt = t['footer-bottom-logo-alt']; }

    // Nav sub (text-only)
    var navSub = document.getElementById('nav-logo-sub');
    if (navSub) navSub.textContent = t['nav-logo-sub'];

    // Submit button (preserve icon)
    var submitBtn = document.getElementById('form-submit-btn');
    if (submitBtn) {
      submitBtn.innerHTML = t['form-submit-btn'] +
        ' <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>';
    }
  }

  window.setLang = applyLang;

  /* ──────────────────────────────────────────
     PAGE LOADER
  ─────────────────────────────────────────── */
  window.addEventListener('load', function() {
    var loader = document.getElementById('page-loader');
    if (loader) setTimeout(function() { loader.classList.add('hidden'); }, 1500);
  });

  /* ──────────────────────────────────────────
     NAVBAR SCROLL
  ─────────────────────────────────────────── */
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* ──────────────────────────────────────────
     HAMBURGER / MOBILE NAV
  ─────────────────────────────────────────── */
  var hamburger = document.getElementById('hamburger-btn');
  var mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      var open = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });
  }

  window.closeMobileNav = function() {
    if (mobileNav) mobileNav.classList.remove('open');
    if (hamburger) { hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded','false'); }
  };

  document.addEventListener('click', function(e) {
    if (navbar && mobileNav && !navbar.contains(e.target) && !mobileNav.contains(e.target)) {
      closeMobileNav();
    }
  });

  /* ──────────────────────────────────────────
     REVEAL ON SCROLL
  ─────────────────────────────────────────── */
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });

  /* ──────────────────────────────────────────
     SMOOTH ANCHOR SCROLL
  ─────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) || 76;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
    });
  });

  /* ──────────────────────────────────────────
     CONTACT FORM
     Form entegrasyonu için Formspree kullanın:
     1. https://formspree.io adresine gidin ve ücretsiz hesap açın
     2. Yeni bir form oluşturun → Form ID'nizi kopyalayın
     3. Aşağıdaki FORMSPREE_ID değişkenini kendi ID'nizle değiştirin
     Şu an simülasyon modu aktif (gerçek e-posta gitmiyor).
  ─────────────────────────────────────────── */
  var FORMSPREE_ID = null; // TODO: 'xwkgxxxx' gibi Formspree form ID'nizi buraya girin

  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      var btn = document.getElementById('form-submit-btn');
      var originalHTML = btn.innerHTML;
      btn.innerHTML = '⏳ Gönderiliyor...';
      btn.disabled = true;

      if (FORMSPREE_ID) {
        // Gerçek Formspree gönderimi
        fetch('https://formspree.io/f/' + FORMSPREE_ID, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        })
        .then(function(res) {
          if (res.ok) {
            showFormSuccess(btn);
            contactForm.reset();
          } else {
            showFormError(btn, originalHTML);
          }
        })
        .catch(function() { showFormError(btn, originalHTML); });
      } else {
        // Simülasyon modu
        setTimeout(function() { showFormSuccess(btn); contactForm.reset(); }, 1200);
      }
    });
  }

  function showFormSuccess(btn) {
    btn.innerHTML = '✓ ' + (currentLang === 'tr' ? 'Gönderildi! En kısa sürede dönüş yapacağız.' : 'Sent! We\'ll get back to you shortly.');
    btn.style.background = '#22c55e';
    btn.disabled = true;
    setTimeout(function() {
      btn.innerHTML = T[currentLang]['form-submit-btn'] +
        ' <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>';
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  }

  function showFormError(btn, originalHTML) {
    btn.innerHTML = '✕ ' + (currentLang === 'tr' ? 'Hata oluştu, tekrar deneyin.' : 'Error, please try again.');
    btn.style.background = '#ef4444';
    setTimeout(function() { btn.innerHTML = originalHTML; btn.style.background = ''; btn.disabled = false; }, 3000);
  }

  /* ──────────────────────────────────────────
     INIT
  ─────────────────────────────────────────── */
  applyLang(currentLang);

})();
