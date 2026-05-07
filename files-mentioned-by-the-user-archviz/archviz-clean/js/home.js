const sections = Array.from(document.querySelectorAll(".section"));
const dots = Array.from(document.querySelectorAll(".scroll-dot"));
const nav = document.querySelector(".site-nav");
const overlay = document.getElementById("projectOverlay");
let currentSection = 0;
let scrollCooldown = false;
let touchStartX = 0;
let touchStartY = 0;

function isMobileView() {
  return window.matchMedia("(max-width: 900px)").matches;
}

function scrollToSection(index) {
  const nextIndex = Math.max(0, Math.min(index, sections.length - 1));
  sections[nextIndex].scrollIntoView({ behavior: "smooth" });
}

function updateActiveSection(index) {
  currentSection = index;
  dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === index));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const index = sections.indexOf(entry.target);
    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
      entry.target.classList.add("in-view");
      updateActiveSection(index);
    }
  });
}, { threshold: 0.5 });

sections.forEach((section) => observer.observe(section));

dots.forEach((dot) => {
  dot.addEventListener("click", () => scrollToSection(Number(dot.dataset.section)));
});

window.addEventListener("wheel", (event) => {
  if (overlay && overlay.classList.contains("open") || isMobileView()) return;
  event.preventDefault();
  if (scrollCooldown) return;

  scrollCooldown = true;
  scrollToSection(currentSection + (event.deltaY > 0 ? 1 : -1));
  window.setTimeout(() => {
    scrollCooldown = false;
  }, 900);
}, { passive: false });

window.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
}, { passive: true });

window.addEventListener("touchend", (event) => {
  if (overlay && overlay.classList.contains("open") || !isMobileView()) return;

  const deltaX = touchStartX - event.changedTouches[0].clientX;
  const deltaY = touchStartY - event.changedTouches[0].clientY;

  if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY)) {
    scrollToSection(currentSection + (deltaX > 0 ? 1 : -1));
  }
}, { passive: true });

document.querySelectorAll("[data-mobile-prev]").forEach((button) => {
  button.addEventListener("click", () => scrollToSection(currentSection - 1));
});

document.querySelectorAll("[data-mobile-next]").forEach((button) => {
  button.addEventListener("click", () => scrollToSection(currentSection + 1));
});



document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    if (typeof openProject === "function") {
      openProject(Number(button.dataset.project));
    }
  });
});

// ── History-based back navigation ────────────────────────────────────────────
// Push a state when any overlay opens so the browser back button and
// Android hardware back key (which fires popstate) close the overlay
// instead of leaving the page.
let _overlayHistoryPushed = false;

function openOverlay() {
  if (!overlay) return;
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // Push a history entry so back = close overlay
  if (!_overlayHistoryPushed) {
    history.pushState({ overlayOpen: true }, '', window.location.href);
    _overlayHistoryPushed = true;
  }
}

function closeOverlay() {
  if (!overlay) return;
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (typeof destroyThreeJSPanorama === 'function') {
    destroyThreeJSPanorama();
  }

  // If we pushed a history entry, go back to clean the stack
  // (only when the overlay is being closed programmatically, not via popstate)
  if (_overlayHistoryPushed && !_closingViaPopstate) {
    _overlayHistoryPushed = false;
    history.back();
  }
  _overlayHistoryPushed = false;
  _closingViaPopstate    = false;
}

// popstate fires when:
//   • Desktop browser ← back button is clicked
//   • Mobile browser ← back button is tapped
//   • Android hardware back key is pressed
let _closingViaPopstate = false;
window.addEventListener('popstate', (e) => {
  if (overlay && overlay.classList.contains('open')) {
    _closingViaPopstate = true;   // prevent double history.back() call
    closeOverlay();
  }
});

