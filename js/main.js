const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updateHeader() {
  if (header) header.classList.toggle("is-scrolled", window.scrollY > 16);
}

function closeMenu() {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute("aria-expanded", "false");
  mobileMenu.hidden = true;
  if (header) header.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

function toggleMenu() {
  if (!menuButton || !mobileMenu) return;
  const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(willOpen));
  mobileMenu.hidden = !willOpen;
  if (header) header.classList.toggle("is-open", willOpen);
  document.body.classList.toggle("menu-open", willOpen);
  if (willOpen) {
    const firstLink = mobileMenu.querySelector("a");
    if (firstLink) firstLink.focus();
  }
}

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", function () {
  if (window.innerWidth > 860) closeMenu();
});
if (menuButton) menuButton.addEventListener("click", toggleMenu);
if (mobileMenu) {
  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });
}
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeMenu();
});
updateHeader();

const revealItems = document.querySelectorAll(".reveal");
if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach(function (item) { item.classList.add("is-visible"); });
} else {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -30px" });
  revealItems.forEach(function (item) { observer.observe(item); });
}

const contactForm = document.querySelector("[data-contact-form]");
if (contactForm) {
  const locale = document.documentElement.lang;
  const messages = locale === "tr"
    ? {
        required: "Bu alan zorunludur.",
        email: "Geçerli bir e-posta adresi girin.",
        consent: "Devam etmek için bilgilendirmeyi onaylayın.",
        unavailable: "Gönderim adresi henüz yapılandırılmamış. Lütfen daha sonra tekrar deneyin.",
        ready: "E-posta uygulamanızda mesaj hazırlanıyor."
      }
    : {
        required: "This field is required.",
        email: "Enter a valid email address.",
        consent: "Please accept the notice to continue.",
        unavailable: "The submission address has not been configured yet. Please try again later.",
        ready: "Preparing the message in your email app."
      };

  function setError(name, message) {
    const field = contactForm.elements[name];
    const error = contactForm.querySelector('[data-error-for="' + name + '"]');
    if (field) field.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) error.textContent = message;
  }

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const data = new FormData(contactForm);
    const status = contactForm.querySelector("[data-form-status]");
    let valid = true;

    ["name", "email", "message"].forEach(function (name) {
      const empty = !String(data.get(name) || "").trim();
      setError(name, empty ? messages.required : "");
      if (empty) valid = false;
    });

    const email = String(data.get("email") || "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("email", messages.email);
      valid = false;
    }

    const consent = data.get("consent");
    setError("consent", consent ? "" : messages.consent);
    if (!consent) valid = false;

    if (String(data.get("website") || "").trim()) return;
    if (!valid) {
      status.textContent = locale === "tr" ? "Lütfen işaretlenen alanları kontrol edin." : "Please review the highlighted fields.";
      status.classList.add("is-error");
      const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const destination = contactForm.dataset.email;
    if (!destination) {
      status.textContent = messages.unavailable;
      status.classList.add("is-error");
      return;
    }

    const service = contactForm.querySelector("#service");
    const subject = (locale === "tr" ? "Yeni proje talebi — " : "New project enquiry — ") + data.get("name");
    const serviceText = service && service.selectedOptions[0] ? service.selectedOptions[0].textContent : "-";
    const body = [
      (locale === "tr" ? "Ad: " : "Name: ") + data.get("name"),
      "E-mail: " + email,
      (locale === "tr" ? "Şirket / proje: " : "Company / project: ") + (data.get("company") || "-"),
      (locale === "tr" ? "Hizmet: " : "Service: ") + serviceText,
      "",
      String(data.get("message"))
    ].join("\n");

    status.textContent = messages.ready;
    status.classList.remove("is-error");
    window.location.href = "mailto:" + destination + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  });
}
