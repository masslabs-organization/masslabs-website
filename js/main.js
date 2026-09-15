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
