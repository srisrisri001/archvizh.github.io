// ─── Navbar Controller ────────────────────────────────────────────────────────
// Handles: active link state, mobile drawer open/close,
//          close-on-outside-click, scroll shrink effect.

const navEl        = document.querySelector('.site-nav');
const menuToggleEl = document.getElementById('menuToggle');
const navLinksEl   = document.getElementById('navLinks');
const navBtns      = Array.from(document.querySelectorAll('[data-nav]'));

// ── Mobile menu open / close ──────────────────────────────────────────────────
function openMobileMenu() {
  navEl.classList.add('menu-open');
  menuToggleEl.classList.add('is-open');
  menuToggleEl.setAttribute('aria-label', 'Close navigation');
  menuToggleEl.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
  navEl.classList.remove('menu-open');
  menuToggleEl.classList.remove('is-open');
  menuToggleEl.setAttribute('aria-label', 'Open navigation');
  menuToggleEl.setAttribute('aria-expanded', 'false');
}

function toggleMobileMenu() {
  navEl.classList.contains('menu-open') ? closeMobileMenu() : openMobileMenu();
}

if (menuToggleEl) {
  menuToggleEl.addEventListener('click', toggleMobileMenu);
}

// Close drawer when clicking outside
document.addEventListener('click', (e) => {
  if (navEl.classList.contains('menu-open') &&
      !navEl.contains(e.target)) {
    closeMobileMenu();
  }
});

// Close drawer on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileMenu();
});

// ── Active nav link ───────────────────────────────────────────────────────────
function setActiveNav(key) {
  navBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.nav === key));
}

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    setActiveNav(btn.dataset.nav);
    closeMobileMenu();

    const key = btn.dataset.nav;
    if (key === 'residences'  && typeof scrollToSection === 'function') scrollToSection(0);
    if (key === 'services'    && typeof openServices    === 'function') openServices();
    if (key === 'projects'    && typeof openAllProjects === 'function') openAllProjects();
    if (key === 'about'       && typeof openAbout       === 'function') openAbout();
    if (key === 'contact'     && typeof openContact     === 'function') openContact();
  });
});

// ── Scroll shrink effect ──────────────────────────────────────────────────────
function updateNavScroll() {
  navEl.classList.toggle('nav-scrolled', window.scrollY > 20);
}

window.addEventListener('scroll', updateNavScroll, { passive: true });
updateNavScroll();
