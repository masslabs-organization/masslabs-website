import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { siteConfig } from "../site.config.mjs";
import { capabilities, faqs, home, processSteps, projects, routes, ui } from "../content/site-content.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const year = new Date().getFullYear();

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const absolute = (path) => new URL(path, siteConfig.siteUrl).href;
const otherLocale = (locale) => (locale === "tr" ? "en" : "tr");

function alternateRoute(locale, key, slug = "") {
  const targetLocale = otherLocale(locale);
  if (key === "project") return routes[targetLocale].projects + slug + "/";
  return routes[targetLocale][key] || routes[targetLocale].home;
}

function seoHead({ locale, key, title, description, path, slug = "" }) {
  const altLocale = otherLocale(locale);
  const altPath = alternateRoute(locale, key, slug);
  const localeCode = locale === "tr" ? "tr_TR" : "en_US";
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": siteConfig.siteUrl + "/#organization",
        name: siteConfig.siteName,
        url: siteConfig.siteUrl,
        logo: absolute("/assets/masslabs-logo-chatgpt.png"),
        email: siteConfig.contactEmail || undefined,
        address: { "@type": "PostalAddress", addressLocality: "Izmir", addressCountry: "TR" },
        sameAs: Object.values(siteConfig.socialLinks).filter(Boolean)
      },
      {
        "@type": "WebSite",
        "@id": siteConfig.siteUrl + "/#website",
        name: siteConfig.siteName,
        url: siteConfig.siteUrl,
        inLanguage: locale
      }
    ]
  };

  return [
    '<meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '<title>' + escapeHtml(title) + "</title>",
    '<meta name="description" content="' + escapeHtml(description) + '">',
    '<meta name="theme-color" content="#0b0c0e">',
    '<link rel="canonical" href="' + absolute(path) + '">',
    '<link rel="alternate" hreflang="' + locale + '" href="' + absolute(path) + '">',
    '<link rel="alternate" hreflang="' + altLocale + '" href="' + absolute(altPath) + '">',
    '<link rel="alternate" hreflang="x-default" href="' + absolute(routes.tr.home) + '">',
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="MassLabs">',
    '<meta property="og:locale" content="' + localeCode + '">',
    '<meta property="og:url" content="' + absolute(path) + '">',
    '<meta property="og:title" content="' + escapeHtml(title) + '">',
    '<meta property="og:description" content="' + escapeHtml(description) + '">',
    '<meta property="og:image" content="' + absolute("/assets/masslabs-logo-chatgpt.png") + '">',
    '<meta property="og:image:alt" content="MassLabs">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:title" content="' + escapeHtml(title) + '">',
    '<meta name="twitter:description" content="' + escapeHtml(description) + '">',
    '<meta name="twitter:image" content="' + absolute("/assets/masslabs-logo-chatgpt.png") + '">',
    '<link rel="icon" type="image/png" sizes="96x96" href="/assets/favicon.png">',
    '<link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">',
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">',
    '<link rel="stylesheet" href="/css/styles.css">',
    '<script type="application/ld+json">' + JSON.stringify(graph) + "</script>"
  ].join("\n  ");
}

function logo(locale, footer = false) {
  return (
    '<a class="brand' + (footer ? " brand--footer" : "") + '" href="' + routes[locale].home + '" aria-label="MassLabs">' +
      '<span class="brand__mark"><img src="/assets/logo-small.png" width="44" height="44" alt=""></span>' +
      '<span class="brand__name">Mass<span>Labs</span></span>' +
    "</a>"
  );
}

function header(locale, active, key, slug = "") {
  const text = ui[locale];
  const navItems = ["services", "projects", "about", "research", "contact"];
  const links = navItems.map((key) =>
    '<a href="' + routes[locale][key] + '"' +
    (active === key ? ' aria-current="page"' : "") + ">" + escapeHtml(text.nav[key]) + "</a>"
  ).join("");

  return (
    '<a class="skip-link" href="#main">' + text.skip + "</a>" +
    '<header class="site-header" data-header>' +
      '<div class="shell header__inner">' +
        logo(locale) +
        '<nav class="desktop-nav" aria-label="' + (locale === "tr" ? "Ana navigasyon" : "Main navigation") + '">' +
          links +
        "</nav>" +
        '<div class="header__actions">' +
          '<a class="locale-switch" href="' + alternateRoute(locale, key, slug) + '" lang="' + otherLocale(locale) + '" hreflang="' + otherLocale(locale) + '">' +
            (locale === "tr" ? "EN" : "TR") +
          "</a>" +
          '<a class="button button--small desktop-cta" href="' + routes[locale].contact + '">' + text.cta + "</a>" +
          '<button class="menu-button" type="button" aria-expanded="false" aria-controls="mobile-menu" data-menu-button>' +
            '<span class="sr-only">' + text.menu + '</span><span></span><span></span>' +
          "</button>" +
        "</div>" +
      "</div>" +
      '<div class="mobile-menu" id="mobile-menu" data-mobile-menu hidden>' +
        '<nav class="shell mobile-nav" aria-label="' + (locale === "tr" ? "Mobil navigasyon" : "Mobile navigation") + '">' +
          links +
          '<a class="button" href="' + routes[locale].contact + '">' + text.cta + "</a>" +
        "</nav>" +
      "</div>" +
    "</header>"
  );
}

function socialLinks(locale) {
  const icons = {
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2"/>',
    x: '<path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l8.2-9.4L.8 2h6.5l4.4 6.7L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z"/>',
    linkedin: '<path d="M5.4 7.5a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2ZM3.6 9H7v12H3.6V9ZM9.5 9h3.3v1.6c.5-.9 1.7-1.9 3.6-1.9 3.5 0 4.1 2.2 4.1 5.1V21H17v-6.4c0-1.5 0-3.3-2-3.3s-2.2 1.5-2.2 3.2V21H9.5V9Z"/>'
  };
  return '<div class="social-links">' + [['instagram', 'Instagram', '@masslabstech'], ['x', 'X', '@masslabstech'], ['linkedin', 'LinkedIn', 'MassLabs']].filter(([key]) => siteConfig.socialLinks[key]).map(([key, label, handle]) =>
    '<a class="social-link social-link--' + key + '" href="' + escapeHtml(siteConfig.socialLinks[key]) + '" target="_blank" rel="noopener noreferrer"><span class="social-icon"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + icons[key] + '</svg></span><span class="social-copy"><strong>' + label + '</strong><span>' + handle + '</span></span><span class="social-arrow" aria-hidden="true">↗</span><span class="sr-only"> (' + (locale === 'tr' ? 'yeni sekmede açılır' : 'opens in a new tab') + ')</span></a>'
  ).join('') + '</div>';
}

function footer(locale, hideSocial = false) {
  const text = ui[locale];
  return (
    '<footer class="site-footer">' +
      (hideSocial ? '' : '<div class="shell social-banner"><div><span class="eyebrow-label">' + (locale === 'tr' ? 'Bağlantıda kalalım' : 'Stay connected') + '</span><h2>' + (locale === 'tr' ? 'MassLabs’ı takip edin.' : 'Follow MassLabs.') + '</h2></div>' + socialLinks(locale) + '</div>') +
      '<div class="shell footer__grid">' +
        '<div class="footer__brand">' + logo(locale, true) + "<p>" + text.footerText + "</p><span>" + text.location + "</span>" +
        "</div>" +
        '<div class="footer__column"><h2>' + text.nav.services + "</h2>" +
          '<a href="' + routes[locale].services + '#ai">' + capabilities[locale][0].title + "</a>" +
          '<a href="' + routes[locale].services + '#software">' + capabilities[locale][1].title + "</a>" +
          '<a href="' + routes[locale].services + '#product">' + capabilities[locale][2].title + "</a>" +
        "</div>" +
        '<div class="footer__column"><h2>' + (locale === "tr" ? "Stüdyo" : "Studio") + "</h2>" +
          '<a href="' + routes[locale].projects + '">' + text.nav.projects + "</a>" +
          '<a href="' + routes[locale].research + '">' + text.nav.research + "</a>" +
          '<a href="' + routes[locale].about + '">' + text.nav.about + "</a>" +
        "</div>" +
        '<div class="footer__column"><h2>' + (locale === "tr" ? "İletişim ve yasal" : "Contact and legal") + "</h2>" +
          '<a href="' + routes[locale].contact + '">' + text.nav.contact + "</a>" +
          (siteConfig.contactEmail ? '<a href="mailto:' + siteConfig.contactEmail + '">' + siteConfig.contactEmail + "</a>" : "") +
          '<a href="' + routes[locale].privacy + '">' + (locale === "tr" ? "Gizlilik Politikası" : "Privacy Policy") + "</a>" +
          '<a href="' + routes[locale].kvkk + '">' + (locale === "tr" ? "KVKK Aydınlatma Metni" : "Data Protection Notice") + "</a>" +
          '<a href="' + routes[locale].cookies + '">' + (locale === "tr" ? "Çerez Politikası" : "Cookie Policy") + "</a>" +
          '<a href="' + routes[locale].terms + '">' + (locale === "tr" ? "Kullanım Koşulları" : "Terms of Use") + "</a>" +
        "</div>" +
      "</div>" +
      '<div class="shell footer__bottom"><span>© ' + year + " MassLabs. " + text.rights + '</span><span>İzmir / Türkiye</span></div>' +
    "</footer>"
  );
}

function layout({ locale, key, title, description, path, active = key, slug = "", body, pageClass = "" }) {
  return (
    "<!DOCTYPE html>\n" +
    '<html lang="' + locale + '">\n<head>\n  ' + seoHead({ locale, key, title, description, path, slug }) + "\n</head>\n" +
    '<body class="' + pageClass + '">' +
      header(locale, active, key, slug) +
      '<main id="main">' + body + "</main>" +
      footer(locale, key === "contact") +
      '<script type="module" src="/js/main.js"></script>' +
    "</body>\n</html>\n"
  );
}

function eyebrow(text) {
  return '<p class="eyebrow"><span></span>' + escapeHtml(text) + "</p>";
}

function arrow() {
  return '<svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 10h11M11 6l4 4-4 4"/></svg>';
}

function projectVisual(project, index) {
  const letters = project.slug === "pma" ? "PM" : project.slug === "reveram" ? "RA" : "R&D";
  return (
    '<div class="project-visual project-visual--' + (index + 1) + '" aria-hidden="true">' +
      '<span class="project-visual__code">' + letters + "</span>" +
      '<span class="project-visual__line project-visual__line--a"></span>' +
      '<span class="project-visual__line project-visual__line--b"></span>' +
      '<span class="project-visual__node project-visual__node--a"></span>' +
      '<span class="project-visual__node project-visual__node--b"></span>' +
    "</div>"
  );
}

function projectCards(locale, limit = 0, exclude = "") {
  const list = projects[locale].filter((item) => item.slug !== exclude).slice(0, limit || undefined);
  return list.map((project, index) => {
    const url = routes[locale].projects + project.slug + "/";
    return (
      '<article class="project-card reveal">' +
        projectVisual(project, index) +
        '<div class="project-card__body">' +
          '<div class="status-row"><span class="status' + (project.archived ? " status--muted" : "") + '">' + escapeHtml(project.status) + "</span><span>" + escapeHtml(project.type) + "</span></div>" +
          "<h3><a href=\"" + url + '\">' + escapeHtml(project.name) + "</a></h3>" +
          "<p>" + escapeHtml(project.description) + "</p>" +
          '<div class="tag-list">' + project.tags.map((tag) => "<span>" + escapeHtml(tag) + "</span>").join("") + "</div>" +
          '<a class="text-link" href="' + url + '">' + ui[locale].details + arrow() + "</a>" +
        "</div>" +
      "</article>"
    );
  }).join("");
}

function ctaBlock(locale, compact = false) {
  const copy = home[locale];
  return (
    '<section class="section cta-section' + (compact ? " cta-section--compact" : "") + '">' +
      '<div class="shell cta-panel reveal">' +
        '<div><span class="eyebrow-label">' + (locale === "tr" ? "Birlikte değerlendirelim" : "Let’s explore it together") + "</span>" +
        "<h2>" + copy.finalTitle + "</h2><p>" + copy.finalText + "</p></div>" +
        '<div class="cta-panel__actions"><a class="button" href="' + routes[locale].contact + '">' + ui[locale].cta + arrow() + "</a>" +
        (siteConfig.contactEmail ? '<a class="text-link" href="mailto:' + siteConfig.contactEmail + '">' + siteConfig.contactEmail + "</a>" : "") + "</div>" +
      "</div>" +
    "</section>"
  );
}

function homePage(locale) {
  const copy = home[locale];
  const path = routes[locale].home;
  const services = capabilities[locale].map((item, index) =>
    '<article class="capability-card reveal"><span class="capability-card__index">0' + (index + 1) + "</span><h3>" + item.title + "</h3><p>" + item.short + '</p><a class="text-link" href="' + routes[locale].services + "#" + item.id + '">' + ui[locale].explore + arrow() + "</a></article>"
  ).join("");
  const why = copy.whyItems.map((item) => '<div class="principle"><span></span><div><h3>' + item[0] + "</h3><p>" + item[1] + "</p></div></div>").join("");
  const steps = processSteps[locale].map((item, index) => '<li class="process-step reveal"><span>0' + (index + 1) + "</span><div><h3>" + item[0] + "</h3><p>" + item[1] + "</p></div></li>").join("");
  const body =
    '<section class="hero"><div class="hero__atmosphere" aria-hidden="true"></div><div class="shell hero__grid">' +
      '<div class="hero__content">' + eyebrow(copy.eyebrow) + "<h1>" + copy.title + "</h1><p>" + copy.intro + "</p>" +
        '<div class="hero__actions"><a class="button" href="' + routes[locale].contact + '">' + ui[locale].cta + arrow() + '</a><a class="button button--secondary" href="' + routes[locale].projects + '">' + copy.secondaryCta + "</a></div>" +
      "</div>" +
      '<div class="system-map" aria-hidden="true"><div class="system-map__grid"></div><div class="system-map__core"><img src="/assets/masslabs-logo-chatgpt.png" alt="" width="92" height="92"></div>' +
        '<div class="system-node system-node--ai"><span>01</span>AI</div><div class="system-node system-node--data"><span>02</span>DATA</div><div class="system-node system-node--flow"><span>03</span>FLOW</div><div class="system-node system-node--app"><span>04</span>APP</div>' +
        '<svg viewBox="0 0 520 430" preserveAspectRatio="none"><path d="M105 95C190 95 190 180 260 210"/><path d="M415 90C345 90 335 165 260 210"/><path d="M95 335C170 335 180 245 260 210"/><path d="M425 335C345 335 340 245 260 210"/></svg>' +
      "</div>" +
    '</div><div class="shell trust-line">' + copy.trust.map((item) => "<span>" + item + "</span>").join("") + "</div></section>" +
    '<section class="section" id="capabilities"><div class="shell">' +
      '<div class="section-heading">' + eyebrow(copy.servicesEyebrow) + "<h2>" + copy.servicesTitle + "</h2><p>" + copy.servicesIntro + "</p></div>" +
      '<div class="capability-grid">' + services + "</div>" +
    "</div></section>" +
    '<section class="section section--contrast"><div class="shell split-heading">' +
      '<div>' + eyebrow(copy.whyEyebrow) + "<h2>" + copy.whyTitle + "</h2><p>" + copy.whyText + "</p></div>" +
      '<div class="principles">' + why + "</div>" +
    "</div></section>" +
    '<section class="section"><div class="shell"><div class="section-heading section-heading--row"><div>' + eyebrow(copy.projectsEyebrow) + "<h2>" + copy.projectsTitle + '</h2></div><a class="text-link" href="' + routes[locale].projects + '">' + ui[locale].nav.projects + arrow() + '</a></div><div class="project-grid">' + projectCards(locale, 3) + "</div></div></section>" +
    '<section class="section section--line"><div class="shell"><div class="section-heading">' + eyebrow(copy.processEyebrow) + "<h2>" + copy.processTitle + '</h2></div><ol class="process-list">' + steps + "</ol></div></section>" +
    '<section class="section"><div class="shell research-panel reveal"><div class="research-panel__graphic" aria-hidden="true"><span></span><span></span><span></span><span></span></div><div>' + eyebrow("R&D / LAB") + "<h2>" + copy.researchTitle + "</h2><p>" + copy.researchText + '</p><a class="text-link" href="' + routes[locale].research + '">' + copy.researchLink + arrow() + "</a></div></div></section>" +
    '<section class="section section--compact"><div class="shell about-strip reveal"><span class="about-strip__monogram">M/L</span><div><h2>' + copy.aboutTitle + "</h2><p>" + copy.aboutText + '</p><a class="text-link" href="' + routes[locale].about + '">' + ui[locale].nav.about + arrow() + "</a></div></div></section>" +
    ctaBlock(locale);
  return layout({ locale, key: "home", title: copy.seo.title, description: copy.seo.description, path, body, pageClass: "home-page" });
}

function pageHero(locale, eyebrowText, title, intro) {
  return '<section class="page-hero"><div class="shell page-hero__inner">' + eyebrow(eyebrowText) + "<h1>" + title + "</h1><p>" + intro + "</p></div></section>";
}

function servicesPage(locale) {
  const tr = locale === "tr";
  const title = tr ? "İhtiyacınıza göre şekillenen yazılım hizmetleri." : "Software services shaped around your needs.";
  const description = tr ? "MassLabs yapay zekâ, otomasyon, özel yazılım, SaaS, MVP, modernizasyon ve teknik destek hizmetleri sunar." : "MassLabs provides AI, automation, custom software, SaaS, MVP, modernisation and technical support services.";
  const cards = capabilities[locale].map((item, index) =>
    '<article class="service-detail reveal" id="' + item.id + '"><div class="service-detail__number">0' + (index + 1) + '</div><div class="service-detail__copy"><h2>' + item.title + "</h2><p>" + item.short + '</p><div class="service-context"><div><h3>' + (tr ? "Kimler için?" : "Who is it for?") + "</h3><p>" + (tr ? "Mevcut süreçlerini iyileştirmek veya yeni bir dijital ürün kurmak isteyen işletmeler ve ürün ekipleri." : "Businesses and product teams improving an existing process or building a new digital product.") + "</p></div><div><h3>" + (tr ? "Nasıl çalışıyoruz?" : "How we work") + "</h3><p>" + (tr ? "İhtiyacı ve mevcut sistemi inceler, ölçülebilir bir kapsam oluşturur ve kısa aşamalarla ilerleriz." : "We examine the need and current system, define measurable scope and work in short stages.") + '</p></div></div><ul class="check-list">' + item.items.map((value) => "<li>" + value + "</li>").join("") + "</ul></div></article>"
  ).join("");
  const faq = faqs[locale].map(([question, answer]) => '<details><summary>' + question + "</summary><p>" + answer + "</p></details>").join("");
  const body = pageHero(locale, tr ? "Hizmetler" : "Services", title, tr ? "Her projeyi aynı hizmet paketine yerleştirmek yerine ihtiyaca, mevcut altyapıya ve hedeflenen sonuca göre çalışma kapsamı oluşturuyoruz." : "Rather than fitting every project into the same package, we shape the scope around the need, existing infrastructure and intended outcome.") +
    '<section class="section section--first"><div class="shell service-list">' + cards + "</div></section>" +
    '<section class="section section--contrast"><div class="shell pricing-note reveal"><div><span>' + (tr ? "Şeffaf kapsam" : "Clear scope") + "</span><h2>" + (tr ? "Fiyat, ihtiyaç netleştikten sonra belirlenir." : "Pricing follows a clear understanding of the need.") + "</h2></div><p>" + (tr ? "Her projenin kapsamı farklıdır. Fiyatlandırmayı ilk değerlendirme ve ihtiyaç analizi sonrasında belirleriz. İlk görüşme ve ön proje değerlendirmesi ücretsizdir." : "Every project has a different scope. Pricing is defined after an initial assessment and needs analysis. The first conversation and preliminary project assessment are free.") + "</p></div></section>" +
    '<section class="section"><div class="shell faq-layout"><div><span class="eyebrow-label">FAQ</span><h2>' + (tr ? "Sık sorulan sorular" : "Frequently asked questions") + '</h2></div><div class="faq-list">' + faq + "</div></div></section>" + ctaBlock(locale, true);
  return layout({ locale, key: "services", title: title + " | MassLabs", description, path: routes[locale].services, body });
}

function projectsPage(locale) {
  const tr = locale === "tr";
  const title = tr ? "Ürünler ve Ar-Ge çalışmaları." : "Products and R&D work.";
  const description = tr ? "MassLabs tarafından geliştirilen PMA, Reveram ve önceki yapay zekâ altyapı araştırmalarını inceleyin." : "Explore PMA, Reveram and previous AI infrastructure research by MassLabs.";
  const body = pageHero(locale, tr ? "Projeler" : "Projects", title, tr ? "Kendi ürünlerimizi geliştirirken öğrendiklerimizi müşteri projelerine, müşteri projelerindeki deneyimi de araştırmalarımıza taşıyoruz." : "We carry what we learn from our own products into client work, and practical project experience back into our research.") +
    '<section class="section section--first"><div class="shell"><div class="project-grid project-grid--listing">' + projectCards(locale) + "</div></div></section>" + ctaBlock(locale, true);
  return layout({ locale, key: "projects", title: title + " | MassLabs", description, path: routes[locale].projects, body });
}

function projectPage(locale, project, index) {
  const tr = locale === "tr";
  const path = routes[locale].projects + project.slug + "/";
  const externalUrl = siteConfig.projectLinks[project.slug] || "";
  const archiveName = project.archived && siteConfig.archivedProjectName
    ? '<p class="metadata-note">' + (tr ? "Önceki çalışma adı: " : "Previous project name: ") + escapeHtml(siteConfig.archivedProjectName) + "</p>"
    : "";
  const action = externalUrl
    ? '<a class="button" href="' + escapeHtml(externalUrl) + '" target="_blank" rel="noopener noreferrer">' + (tr ? "Proje sitesini aç" : "Visit project site") + arrow() + "</a>"
    : '<span class="status status--large">' + (project.archived ? project.status : ui[locale].comingSoon) + "</span>";
  const body =
    '<section class="project-hero"><div class="shell project-hero__grid"><div><a class="back-link" href="' + routes[locale].projects + '">← ' + ui[locale].back + "</a>" + eyebrow(project.type) + "<h1>" + project.name + "</h1><p>" + project.description + '</p><div class="project-hero__action">' + action + "</div>" + archiveName + "</div>" + projectVisual(project, index) + "</div></section>" +
    '<section class="section section--first"><div class="shell project-detail-grid"><article><span>01</span><h2>' + (tr ? "Çözmeye çalıştığı problem" : "The problem it explores") + "</h2><p>" + project.problem + "</p></article><article><span>02</span><h2>" + (tr ? "Hedef kullanıcı" : "Intended users") + "</h2><p>" + project.audience + "</p></article><article><span>03</span><h2>" + (tr ? "MassLabs’ın rolü" : "MassLabs’ role") + "</h2><p>" + (tr ? "Araştırma, ürün tanımı, deneyim tasarımı, yazılım geliştirme ve teknik doğrulama." : "Research, product definition, experience design, software development and technical validation.") + '</p></article></div></section>' +
    '<section class="section section--contrast"><div class="shell"><div class="section-heading section-heading--row"><h2>' + ui[locale].otherWork + '</h2><a class="text-link" href="' + routes[locale].projects + '">' + ui[locale].back + arrow() + '</a></div><div class="project-grid">' + projectCards(locale, 2, project.slug) + "</div></div></section>";
  return layout({ locale, key: "project", active: "projects", slug: project.slug, title: project.name + " | MassLabs", description: project.description, path, body });
}

function aboutPage(locale) {
  const tr = locale === "tr";
  const values = tr
    ? [["Açıklık", "Ne bildiğimizi, neyi araştırmamız gerektiğini ve riskleri görünür tutarız."], ["Sorumluluk", "Teknik kararların ürün ve işletme üzerindeki uzun vadeli etkisini gözetiriz."], ["Araştırma", "Yeni yaklaşımları küçük ve ölçülebilir deneylerle değerlendiririz."], ["Uygulanabilirlik", "Teknolojiyi gerçek ihtiyaca hizmet ettiği ölçüde kullanırız."], ["Esneklik", "Çalışma biçimini proje aşamasına ve ekip yapısına göre uyarlarız."], ["Sürdürülebilirlik", "Bakımı yapılabilir, anlaşılır ve gelişmeye açık sistemler kurarız."]]
    : [["Clarity", "We keep knowns, research questions and risks visible."], ["Responsibility", "We consider the long-term product and business impact of technical choices."], ["Research", "We assess new approaches through small, measurable experiments."], ["Practicality", "We use technology only where it serves a real need."], ["Flexibility", "We adapt how we work to the project stage and team structure."], ["Sustainability", "We build maintainable, understandable systems that can evolve."]];
  const title = tr ? "Araştırma ile uygulamayı bir araya getiren teknoloji stüdyosu." : "A technology studio connecting research with practical delivery.";
  const description = tr ? "MassLabs’ın çalışma yaklaşımını, değerlerini ve İzmir merkezli teknoloji stüdyosunu tanıyın." : "Learn about MassLabs, our working principles and our technology studio based in Izmir.";
  const body = pageHero(locale, tr ? "Hakkımızda" : "About", title, tr ? "MassLabs, işletmelerin ve ürün ekiplerinin modern yazılım teknolojilerinden etkili biçimde yararlanmasına yardımcı olmak için kuruldu." : "MassLabs was founded to help businesses and product teams make effective use of modern software technology.") +
    '<section class="section section--first"><div class="shell narrative-grid"><div><span class="eyebrow-label">' + (tr ? "Nasıl çalışıyoruz?" : "How we work") + "</span><h2>" + (tr ? "Projeye göre şekillenen uzmanlık." : "The right expertise for each project.") + "</h2></div><div><p>" + (tr ? "Yapay zekâ, otomasyon, SaaS ve özel yazılım alanlarında araştırma yapıyor; uygulanabilir çözümler tasarlayıp geliştiriyoruz. Doğrudan iletişim kuruyor, çalışma modelimizi projenin ihtiyaçlarına göre şekillendiriyoruz." : "We research AI, automation, SaaS and custom software, then design and build practical solutions. We communicate directly and adapt our working model to the needs of each project.") + "</p><p>" + (tr ? "Amacımız tek seferlik teslimlerin ötesinde, sistemi anlayan ve ürünün gelişimine uzun vadede katkı veren teknik bir iş ortağı olmak." : "Our goal is to go beyond one-off delivery and become a technical partner who understands the system and contributes to the product over time.") + "</p></div></div></section>" +
    '<section class="section section--contrast"><div class="shell"><div class="section-heading"><span class="eyebrow-label">' + (tr ? "Değerler" : "Principles") + "</span><h2>" + (tr ? "Kararlarımızı yönlendiren ilkeler." : "Principles that guide our decisions.") + '</h2></div><div class="value-grid">' + values.map((item, index) => '<article><span>0' + (index + 1) + "</span><h3>" + item[0] + "</h3><p>" + item[1] + "</p></article>").join("") + "</div></div></section>" +
    ctaBlock(locale, true);
  return layout({ locale, key: "about", title: title + " | MassLabs", description, path: routes[locale].about, body });
}

function researchPage(locale) {
  const tr = locale === "tr";
  const topics = tr
    ? [["Yapay zekâ ve otomasyon", "Araç değerlendirmeleri, entegrasyon yaklaşımları ve uygulama notları."], ["SaaS ve ürün geliştirme", "Ürün kararları, MVP kapsamı ve sürdürülebilir geliştirme pratikleri."], ["Yazılım mimarisi", "Performans, entegrasyon ve sistem modernizasyonu üzerine teknik incelemeler."], ["Geliştirme günlükleri", "MassLabs ürünlerinden doğrulanmış teknik öğrenimler ve araştırma notları."]]
    : [["AI and automation", "Tool assessments, integration approaches and implementation notes."], ["SaaS and product development", "Product decisions, MVP scope and sustainable development practices."], ["Software architecture", "Technical reviews on performance, integrations and system modernisation."], ["Development journals", "Verified technical learnings and research notes from MassLabs products."]];
  const title = tr ? "Araştırma, prototipleme ve teknik notlar." : "Research, prototypes and technical notes.";
  const description = tr ? "MassLabs’ın yapay zekâ, otomasyon, SaaS ve yazılım geliştirme araştırmaları için içerik altyapısı." : "Research from MassLabs on AI, automation, SaaS and software development.";
  const body = pageHero(locale, tr ? "Araştırmalar" : "Research", title, tr ? "Yeni teknolojilerin gerçek projelerde sağlayabileceği değeri araştırıyor, doğruladığımız öğrenimleri burada paylaşmaya hazırlanıyoruz." : "We study the value new technologies can deliver in real projects and are preparing to share validated learnings here.") +
    '<section class="section section--first"><div class="shell"><div class="topic-grid">' + topics.map((item, index) => '<article class="topic-card reveal"><span>0' + (index + 1) + "</span><h2>" + item[0] + "</h2><p>" + item[1] + "</p></article>").join("") + '</div><div class="empty-state"><span class="empty-state__signal"></span><div><h2>' + (tr ? "İlk yayınlar hazırlanıyor." : "The first publications are in preparation.") + "</h2><p>" + (tr ? "Henüz doğrulanmamış demo makaleler yayınlamak yerine, üzerinde gerçekten çalıştığımız konulardan başlayacağız." : "Rather than publishing unverified demo articles, we will begin with topics drawn from work we have actually done.") + "</p></div></div></div></section>" + ctaBlock(locale, true);
  return layout({ locale, key: "research", title: title + " | MassLabs", description, path: routes[locale].research, body });
}

function contactPage(locale) {
  const tr = locale === "tr";
  const title = tr ? "Projenizi birlikte değerlendirelim." : "Let’s evaluate your project together.";
  const description = tr ? "Proje, destek ve güvenlik konularında MassLabs ile iletişime geçin." : "Contact MassLabs about projects, support and security.";
  const contacts = [
    [tr ? "Satış ve projeler" : "Sales and projects", siteConfig.contactEmail, tr ? "Fikrinizi, ihtiyacınızı veya iş birliği önerinizi paylaşın." : "Tell us about your idea, project or partnership."],
    [tr ? "Destek" : "Support", siteConfig.supportEmail, tr ? "Ürünlerimiz ve hizmetlerimizle ilgili yardım alın." : "Get help with our products and services."],
    [tr ? "Güvenlik" : "Security", siteConfig.securityEmail, tr ? "Güvenlik açıklarını ve ilgili bildirimlerinizi iletin." : "Report vulnerabilities and security concerns."]
  ];
  const body = pageHero(locale, tr ? "İletişim" : "Contact", title, tr ? "Size uygun adresten bize yazın. İlk görüşme ve ön değerlendirme ücretsizdir." : "Email us at the address that fits your enquiry. The first conversation and initial assessment are free.") +
    '<section class="section section--first"><div class="shell contact-cards">' + contacts.map(([label, email, text]) => '<article class="contact-card"><h2>' + label + '</h2><p>' + text + '</p><a class="text-link" href="mailto:' + email + '">' + email + arrow() + '</a></article>').join('') + '</div><div class="shell contact-social"><h2>' + (tr ? 'Sosyal medyada da bağlantıda kalalım.' : 'Connect with us on social media.') + '</h2>' + socialLinks(locale) + '</div></section>';
  return layout({ locale, key: "contact", title: title + " | MassLabs", description, path: routes[locale].contact, body });
}

const legalCopy = {
  privacy: {
    tr: ["Gizlilik Politikası", "Bu politika, MassLabs web sitesini ziyaret ettiğinizde veya iletişim kanallarını kullandığınızda kişisel verilerinizin nasıl ele alındığını açıklar.", [["Toplanan bilgiler", "İletişim talebi sırasında ad, e-posta adresi, şirket/proje bilgisi ve paylaştığınız mesaj işlenebilir. Site ilk sürümünde zorunlu olmayan analiz veya reklam çerezleri kullanmaz."], ["Kullanım amacı", "Bilgiler yalnızca talebinizi değerlendirmek, sizinle iletişime geçmek, hizmet güvenliğini sağlamak ve yasal yükümlülükleri yerine getirmek amacıyla kullanılır."], ["Saklama ve paylaşım", "Veriler, talebin gerektirdiği ve yasal yükümlülüklerin öngördüğü süreyle sınırlı tutulur. Yasal zorunluluklar dışında üçüncü kişilere satılmaz."], ["Haklarınız", "Verilerinize ilişkin erişim, düzeltme, silme veya işleme itiraz taleplerinizi iletişim e-posta adresimize iletebilirsiniz."]]],
    en: ["Privacy Policy", "This policy explains how personal information is handled when you visit the MassLabs website or use the contact channels.", [["Information we collect", "A contact request may include your name, email address, company or project information and the message you provide. The first release of this site does not use non-essential analytics or advertising cookies."], ["Purpose of processing", "Information is used only to evaluate your request, contact you, maintain service security and meet legal obligations."], ["Retention and sharing", "Data is retained only as long as needed for the request and applicable legal obligations. It is not sold to third parties."], ["Your rights", "You may contact us to request access, correction, deletion or an objection to processing of your information."]]]
  },
  kvkk: {
    tr: ["KVKK Aydınlatma Metni", "Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında web sitesi ve iletişim süreçlerine ilişkin temel bilgilendirmeyi sunar.", [["Veri sorumlusu", "Web sitesi üzerinden paylaşılan kişisel veriler bakımından veri sorumlusu, yapılandırma dosyasında belirtilen MassLabs oluşumudur."], ["İşlenen veriler", "Kimlik ve iletişim bilgileri ile proje talebinizde kendi iradenizle paylaştığınız mesleki veya ticari bilgiler işlenebilir."], ["Hukuki sebep ve amaç", "Veriler; talebin değerlendirilmesi, sözleşme öncesi iletişim, meşru menfaatler ve gerekli durumlarda açık rıza hukuki sebeplerine dayanılarak işlenebilir."], ["Başvuru", "KVKK kapsamındaki taleplerinizi kimliğinizi doğrulamaya elverişli bilgilerle birlikte iletişim e-posta adresine gönderebilirsiniz."]]],
    en: ["Data Protection Notice", "This notice provides general information about personal data processed through the website and contact process, including the principles of Türkiye’s data protection law.", [["Data controller", "The entity configured as MassLabs acts as the data controller for personal data shared through this website."], ["Data processed", "Identity and contact details, together with professional or commercial information you voluntarily include in a project enquiry, may be processed."], ["Legal basis and purpose", "Data may be processed to evaluate enquiries, conduct pre-contract communication, pursue legitimate interests and, where required, on the basis of consent."], ["Requests", "You may send data protection requests to the contact email address with sufficient information to verify your identity."]]]
  },
  cookies: {
    tr: ["Çerez Politikası", "MassLabs web sitesinin ilk sürümü yalnızca sitenin temel işlevleri için gerekli teknik depolama mekanizmalarını kullanmayı hedefler.", [["Zorunlu çerezler", "Dil veya güvenlik gibi temel işlevler için gerekli teknik kayıtlar kullanılabilir. Bunlar pazarlama amacı taşımaz."], ["Analitik", "Yapılandırılmış bir analiz kimliği bulunmadıkça Google Analytics veya benzeri takip scriptleri yüklenmez."], ["Tercihleriniz", "Tarayıcı ayarlarınızdan çerezleri kontrol edebilirsiniz. Zorunlu kayıtların engellenmesi bazı temel işlevleri etkileyebilir."]]],
    en: ["Cookie Policy", "The first release of the MassLabs website is designed to use only technical storage mechanisms required for core functionality.", [["Essential cookies", "Technical records may be used for basic functions such as language or security. They are not used for marketing."], ["Analytics", "Google Analytics or similar tracking scripts are not loaded unless an analytics ID is explicitly configured."], ["Your preferences", "You can control cookies through your browser settings. Blocking essential records may affect basic functionality."]]]
  },
  terms: {
    tr: ["Kullanım Koşulları", "Bu web sitesini kullanarak aşağıdaki temel koşulları kabul etmiş sayılırsınız.", [["Bilgilendirme amacı", "Sitedeki içerikler MassLabs’ın hizmetleri, ürünleri ve araştırma alanları hakkında genel bilgi verir; bağlayıcı teklif veya garanti oluşturmaz."], ["Fikri mülkiyet", "Aksi belirtilmedikçe site tasarımı, metinleri, marka unsurları ve özgün içerikler üzerindeki haklar MassLabs’a aittir."], ["Dış bağlantılar", "Sitedeki dış bağlantıların içerik ve güvenliğinden ilgili üçüncü taraflar sorumludur."], ["Sorumluluğun sınırı", "Bilgileri güncel tutmaya çalışsak da eksiksizlik veya kesintisiz erişim garantisi verilmez. Proje koşulları yazılı teklif ve sözleşmelerle belirlenir."]]],
    en: ["Terms of Use", "By using this website, you agree to the following basic terms.", [["Informational purpose", "Content provides general information about MassLabs services, products and research. It does not constitute a binding offer or warranty."], ["Intellectual property", "Unless stated otherwise, rights in the site design, copy, brand assets and original content belong to MassLabs."], ["External links", "Third parties are responsible for the content and security of external links."], ["Limitation", "We aim to keep information current but do not guarantee completeness or uninterrupted access. Project terms are defined through written proposals and agreements."]]]
  }
};

function legalPage(locale, key) {
  const [title, intro, sections] = legalCopy[key][locale];
  const path = routes[locale][key];
  const contactLine = siteConfig.supportEmail
    ? '<p class="legal-contact"><strong>' + (locale === "tr" ? "İletişim:" : "Contact:") + '</strong> <a href="mailto:' + siteConfig.supportEmail + '">' + siteConfig.supportEmail + "</a></p>"
    : "";
  const body = pageHero(locale, locale === "tr" ? "Yasal" : "Legal", title, intro) +
    '<section class="section section--first"><div class="shell legal-layout"><aside><span>' + (locale === "tr" ? "Son güncelleme" : "Last updated") + "</span><time datetime=\"" + siteConfig.legal.lastUpdated + '\">' + siteConfig.legal.lastUpdated + "</time></aside><article class=\"legal-copy\">" +
      sections.map(([heading, text]) => "<section><h2>" + heading + "</h2><p>" + text + "</p></section>").join("") + contactLine +
    "</article></div></section>";
  return layout({ locale, key, active: "", title: title + " | MassLabs", description: intro, path, body });
}

function notFoundPage(locale) {
  const text = ui[locale];
  const body = '<section class="not-found"><div class="shell"><span>404</span><h1>' + text.notFoundTitle + "</h1><p>" + text.notFoundText + '</p><a class="button" href="' + routes[locale].home + '">' + text.homeLink + arrow() + "</a></div></section>";
  return layout({ locale, key: "home", active: "", title: "404 | MassLabs", description: text.notFoundText, path: "/404.html", body });
}

async function output(path, content) {
  const target = join(root, path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, content, "utf8");
}

const generated = [];
for (const locale of ["tr", "en"]) {
  const pages = [
    [routes[locale].home, homePage(locale)],
    [routes[locale].services, servicesPage(locale)],
    [routes[locale].projects, projectsPage(locale)],
    [routes[locale].about, aboutPage(locale)],
    [routes[locale].research, researchPage(locale)],
    [routes[locale].contact, contactPage(locale)],
    [routes[locale].privacy, legalPage(locale, "privacy")],
    [routes[locale].kvkk, legalPage(locale, "kvkk")],
    [routes[locale].cookies, legalPage(locale, "cookies")],
    [routes[locale].terms, legalPage(locale, "terms")]
  ];
  projects[locale].forEach((project, index) => {
    pages.push([routes[locale].projects + project.slug + "/", projectPage(locale, project, index)]);
  });
  for (const [route, html] of pages) {
    await output(route.slice(1) + "index.html", html);
    generated.push(route);
  }
}

for (const locale of ["tr", "en"]) {
  const target = routes[locale].projects + "reveram/";
  await output(routes[locale].projects.slice(1) + "review-ai/index.html", '<!DOCTYPE html><html lang="' + locale + '"><head><meta charset="UTF-8"><meta http-equiv="refresh" content="0;url=' + target + '"><link rel="canonical" href="' + absolute(target) + '"><title>Reveram | MassLabs</title></head><body><a href="' + target + '">Reveram</a></body></html>');
}

const rootRedirect = '<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>MassLabs</title><link rel="icon" type="image/png" sizes="96x96" href="/assets/favicon.png"><link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png"><meta http-equiv="refresh" content="0;url=/tr/"><link rel="canonical" href="' + absolute(routes.tr.home) + '"><script>location.replace("/tr/")</script></head><body><a href="/tr/">MassLabs</a></body></html>';
await output("index.html", rootRedirect);
await output("404.html", notFoundPage("tr"));
await output("robots.txt", "User-agent: *\nAllow: /\nSitemap: " + absolute("/sitemap.xml") + "\n");
await output("sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + generated.map((route) => "  <url><loc>" + absolute(route) + "</loc></url>").join("\n") + "\n</urlset>\n");

const publicRoot = join(root, "public");
await rm(publicRoot, { recursive: true, force: true });
await mkdir(publicRoot, { recursive: true });
for (const directory of ["assets", "css", "js", "tr", "en"]) {
  await cp(join(root, directory), join(publicRoot, directory), { recursive: true });
}
for (const file of ["index.html", "404.html", "robots.txt", "sitemap.xml"]) {
  await cp(join(root, file), join(publicRoot, file));
}

console.log("Generated " + generated.length + " localized pages in public/.");
