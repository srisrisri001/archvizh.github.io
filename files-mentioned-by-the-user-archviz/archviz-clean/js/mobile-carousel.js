// ─── Mobile Carousel ──────────────────────────────────────────────────────────
// On mobile (≤900px) the three theme sections are shown one at a time.
// Users can navigate with:
//   • The ← → arrow buttons inside each section
//   • A left / right finger swipe
// On desktop this script does nothing – desktop uses the existing scroll behaviour.

(function () {
  'use strict';

  const BREAKPOINT = 900;           // px, must match CSS media query
  const ANIM_MS   = 420;            // transition duration in ms

  const sections   = Array.from(document.querySelectorAll('.section'));
  const dots       = Array.from(document.querySelectorAll('.scroll-dot'));
  const mainEl     = document.getElementById('home');
  const overlayEl  = document.getElementById('projectOverlay');

  if (!sections.length || !mainEl) return;

  let currentIdx   = 0;
  let isAnimating  = false;
  let swipeStartX  = 0;
  let swipeStartY  = 0;
  let isCarousel   = false;         // true when mobile mode is active

  // ── Detect mobile ──────────────────────────────────────────────────────────
  function isMobile() {
    return window.innerWidth <= BREAKPOINT;
  }

  // ── Apply / remove carousel mode ───────────────────────────────────────────
  function applyCarousel() {
    isCarousel = true;
    mainEl.classList.add('mobile-carousel');
    showSection(currentIdx, false);   // snap without animation on init
  }

  function removeCarousel() {
    isCarousel = false;
    mainEl.classList.remove('mobile-carousel');
    sections.forEach(s => {
      s.classList.remove('mc-active', 'mc-hidden-left', 'mc-hidden-right', 'mc-slide-in-left', 'mc-slide-in-right');
    });
  }

  // ── Show a specific section ────────────────────────────────────────────────
  function showSection(idx, animate = true) {
    if (idx < 0 || idx >= sections.length) return;
    if (isAnimating && animate) return;

    const prev = currentIdx;
    currentIdx = idx;

    sections.forEach((sec, i) => {
      sec.classList.remove('mc-active', 'mc-hidden-left', 'mc-hidden-right', 'mc-slide-in-left', 'mc-slide-in-right');
    });

    if (!animate || prev === idx) {
      // Instant snap
      sections.forEach((sec, i) => {
        sec.classList.add(i === idx ? 'mc-active' : (i < idx ? 'mc-hidden-left' : 'mc-hidden-right'));
      });
    } else {
      const goingForward = idx > prev;
      isAnimating = true;

      // Position old section to slide out
      sections[prev].classList.add(goingForward ? 'mc-slide-out-left' : 'mc-slide-out-right');

      // Position new section ready to slide in from the opposite side
      sections.forEach((sec, i) => {
        if (i !== prev && i !== idx) {
          sec.classList.add(i < idx ? 'mc-hidden-left' : 'mc-hidden-right');
        }
      });
      sections[idx].classList.add(goingForward ? 'mc-slide-in-right' : 'mc-slide-in-left');

      // Trigger reflow, then animate in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          sections[prev].classList.add(goingForward ? 'mc-hidden-left' : 'mc-hidden-right');
          sections[prev].classList.remove('mc-slide-out-left', 'mc-slide-out-right');
          sections[idx].classList.remove('mc-slide-in-left', 'mc-slide-in-right');
          sections[idx].classList.add('mc-active');

          setTimeout(() => {
            isAnimating = false;
          }, ANIM_MS);
        });
      });
    }

    // Sync dots + in-view class
    sections.forEach((sec, i) => {
      sec.classList.toggle('in-view', i === idx);
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));

    // Tell home.js about the new current section
    if (typeof updateActiveSection === 'function') {
      updateActiveSection(idx);
    }
  }

  function goNext() { showSection(currentIdx + 1); }
  function goPrev() { showSection(currentIdx - 1); }

  // ── Arrow button listeners ─────────────────────────────────────────────────
  document.querySelectorAll('[data-mobile-next]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!isCarousel) return;
      e.stopPropagation();
      goNext();
    });
  });

  document.querySelectorAll('[data-mobile-prev]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!isCarousel) return;
      e.stopPropagation();
      goPrev();
    });
  });

  // Dot clicks
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      if (isCarousel) showSection(i);
    });
  });

  // ── Touch swipe ────────────────────────────────────────────────────────────
  mainEl.addEventListener('touchstart', (e) => {
    if (!isCarousel) return;
    if (overlayEl && overlayEl.classList.contains('open')) return;
    swipeStartX = e.touches[0].clientX;
    swipeStartY = e.touches[0].clientY;
  }, { passive: true });

  mainEl.addEventListener('touchend', (e) => {
    if (!isCarousel) return;
    if (overlayEl && overlayEl.classList.contains('open')) return;

    const dx = swipeStartX - e.changedTouches[0].clientX;
    const dy = swipeStartY - e.changedTouches[0].clientY;

    // Horizontal swipe with at least 50px travel, more horizontal than vertical
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      dx > 0 ? goNext() : goPrev();
    }
  }, { passive: true });

  // ── Responsive: switch mode when window resizes ────────────────────────────
  function onResize() {
    if (isMobile() && !isCarousel) {
      applyCarousel();
    } else if (!isMobile() && isCarousel) {
      removeCarousel();
    }
  }

  window.addEventListener('resize', onResize);

  // ── Expose helpers for home.js / navbar ───────────────────────────────────
  window.carouselGoTo = function (idx) {
    if (isCarousel) showSection(idx);
  };

  // ── Init ───────────────────────────────────────────────────────────────────
  onResize();

})();
