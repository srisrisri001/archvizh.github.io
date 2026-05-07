function projectStyle(project) {
  return `--page-a:${project.colors[0]};--page-b:${project.colors[1]};--page-glow:${project.colors[2]};--page-accent:${project.colors[3]};`;
}



function galleryCopy(name, key) {
  const tone = key === "forest" ? "natural" : key === "azure" ? "bright" : "earthy";
  return `${name} concept with ${tone} materials, layered lighting, and client-ready architectural detailing.`;
}

function openProject(index) {
  const project = projects[index];
  if (!overlay) return;

  overlay.innerHTML = `
    <div class="project-page" style="${projectStyle(project)}">
      <div class="overlay-topbar">
        <div class="overlay-kicker">${project.edition} / Project Detail</div>
        <button class="overlay-close" onclick="closeOverlay()">Close</button>
      </div>
      <section class="project-hero">
        <div>
          <div class="pin-kicker">Pinterest style project board</div>
          <h2 class="project-title">${project.title}</h2>
          <p class="project-copy">${project.copy}</p>
          <div class="project-stats">
            ${project.stats.map((item) => `<div class="stat-pill"><strong>${item.split(" ")[0]}</strong><span>${item.replace(item.split(" ")[0], "").trim()}</span></div>`).join("")}
          </div>
        </div>
        <div class="rotator-card">
          <div class="overlay-kicker">${project.panorama ? '360 panorama view' : '360 rotate image'}</div>
          <div class="rotator-stage ${project.panorama ? 'panorama-stage' : ''}">
            ${project.panorama
              ? `<div id="rotateImage" class="panorama-view"></div>`
              : `<img id="rotateImage" src="${project.image}" alt="${project.title} elevation">`
            }
          </div>
          ${project.panorama ? '<p class="hint" style="font-size:12px;color:rgba(255,255,255,0.5);text-align:center;margin-top:8px;">Drag to look around</p>' : ''}
        </div>
      </section>
      <section class="pinterest-grid">
        ${project.gallery.map((item, itemIndex) => {
          const name = typeof item === 'object' ? item.name : item;
          const imgSrc = typeof item === 'object' ? item.image : (itemIndex === 0 ? project.image : '');
          return `
          <article class="pin-card" onclick="openLightbox('${imgSrc}', '${name}', '${project.key}')">
            <div class="pin-visual" style="${tileStyle(project, itemIndex)}">
               ${imgSrc ? `<img src="${imgSrc}" alt="${name}">` : ""}
               <div class="pin-zoom-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg></div>
            </div>
            <div class="pin-body">
              <h3>${name}</h3>
              <p>${galleryCopy(name, project.key)}</p>
            </div>
          </article>`;
        }).join("")}
      </section>
      <section class="feature-strip">
        ${project.features.map(([title, body]) => `<div class="feature-item"><b>${title}</b><span>${body}</span></div>`).join("")}
      </section>
    </div>`;

  openOverlay();

  if (project.panorama && typeof initThreeJSPanorama === 'function') {
    setTimeout(() => initThreeJSPanorama(project.panorama, "rotateImage"), 200);
  }
}

// ── Lightbox with Zoom + Fullscreen ──────────────────────────────────────────
let lbZoom = 1;
const LB_ZOOM_MIN = 0.5;
const LB_ZOOM_MAX = 4;
const LB_ZOOM_STEP = 0.35;

function openLightbox(imgSrc, name, projectKey) {
  const existing = document.getElementById('pinLightbox');
  if (existing) existing.remove();
  lbZoom = 1;

  const pagestyle = document.querySelector('.project-page');
  const accent = pagestyle
    ? getComputedStyle(pagestyle).getPropertyValue('--page-accent').trim()
    : '#f0a35a';

  const lb = document.createElement('div');
  lb.id = 'pinLightbox';
  lb.className = 'pin-lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');

  lb.innerHTML = `
    <div class="pin-lightbox-backdrop" onclick="closeLightbox()"></div>
    <div class="pin-lightbox-card">

      <!-- Top toolbar -->
      <div class="pin-lightbox-toolbar">
        <span class="pin-lightbox-tag">${projectKey} edition · ${name}</span>
        <div class="pin-lightbox-actions">
          <button class="lb-btn" id="lbZoomOut" onclick="lbZoomBy(-1)" title="Zoom out (−)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          </button>
          <span class="lb-zoom-label" id="lbZoomLabel">100%</span>
          <button class="lb-btn" id="lbZoomIn" onclick="lbZoomBy(1)" title="Zoom in (+)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          </button>
          <button class="lb-btn" id="lbZoomReset" onclick="lbResetZoom()" title="Reset zoom">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 3v6h6"/></svg>
          </button>
          <button class="lb-btn" id="lbFullscreen" onclick="lbToggleFullscreen()" title="Fullscreen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
          </button>
          <button class="lb-btn lb-btn-close" onclick="closeLightbox()" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      <!-- Image area -->
      <div class="pin-lightbox-visual" id="lbVisual" style="--lb-accent:${accent}">
        ${imgSrc
          ? `<img src="${imgSrc}" alt="${name}" class="pin-lightbox-img" id="lbImg">`
          : `<div class="pin-lightbox-placeholder"><span>${name}</span></div>`
        }
      </div>

      <!-- Bottom info -->
      <div class="pin-lightbox-info">
        <h3 class="pin-lightbox-title">${name}</h3>
        <p class="pin-lightbox-desc">A detailed view of the <em>${name}</em> space — featuring curated materials, considered lighting, and refined architectural detailing.</p>
      </div>
    </div>
  `;

  document.body.appendChild(lb);
  requestAnimationFrame(() => lb.classList.add('is-open'));

  // Mouse-wheel zoom on the visual area
  const visual = lb.querySelector('#lbVisual');
  visual.addEventListener('wheel', (e) => {
    e.preventDefault();
    lbZoomBy(e.deltaY < 0 ? 1 : -1);
  }, { passive: false });

  lb._keyHandler = (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === '+' || e.key === '=') lbZoomBy(1);
    if (e.key === '-') lbZoomBy(-1);
    if (e.key === '0') lbResetZoom();
  };
  document.addEventListener('keydown', lb._keyHandler);

  document.addEventListener('fullscreenchange', lbOnFullscreenChange);
}

function lbZoomBy(direction) {
  lbZoom = Math.min(LB_ZOOM_MAX, Math.max(LB_ZOOM_MIN, lbZoom + direction * LB_ZOOM_STEP));
  const img = document.getElementById('lbImg');
  const label = document.getElementById('lbZoomLabel');
  if (img) img.style.transform = `scale(${lbZoom})`;
  if (label) label.textContent = Math.round(lbZoom * 100) + '%';
}

function lbResetZoom() {
  lbZoom = 1;
  const img = document.getElementById('lbImg');
  const label = document.getElementById('lbZoomLabel');
  if (img) { img.style.transform = 'scale(1)'; img.style.transition = 'transform 0.25s ease'; }
  if (label) label.textContent = '100%';
}

function lbToggleFullscreen() {
  const card = document.querySelector('.pin-lightbox-card');
  if (!card) return;
  if (!document.fullscreenElement) {
    card.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
}

function lbOnFullscreenChange() {
  const btn = document.getElementById('lbFullscreen');
  if (!btn) { document.removeEventListener('fullscreenchange', lbOnFullscreenChange); return; }
  const isFs = !!document.fullscreenElement;
  btn.title = isFs ? 'Exit fullscreen' : 'Fullscreen';
  btn.querySelector('svg').innerHTML = isFs
    ? '<path d="M8 3v5H3M16 3v5h5M8 21v-5H3M16 21v-5h5"/>'
    : '<path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/>';
}

function closeLightbox() {
  if (document.fullscreenElement) document.exitFullscreen();
  const lb = document.getElementById('pinLightbox');
  if (!lb) return;
  document.removeEventListener('keydown', lb._keyHandler);
  document.removeEventListener('fullscreenchange', lbOnFullscreenChange);
  lb.classList.remove('is-open');
  lb.addEventListener('transitionend', () => lb.remove(), { once: true });
}
