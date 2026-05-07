// ─── Projects Portfolio Page ──────────────────────────────────────────────────
// Inspired by: Zaha Hadid Architects, BIG Portfolio, Knight Frank Residential,
// and premium real-estate studios.

function openAllProjects() {
  if (!overlay) return;

  overlay.innerHTML = `
    <div class="project-page">
      <div class="overlay-topbar">
        <div class="overlay-kicker">Our Portfolio</div>
        <button class="overlay-close" onclick="closeOverlay()">Close</button>
      </div>

      <main class="pf-page">

        <!-- ── Hero ──────────────────────────────────────────────────────────── -->
        <section class="pf-hero">
          <p class="pin-kicker">Crafted with intention · Delivered with precision</p>
          <h2 class="pf-hero-title">Residential Masterpieces,<br>Built Across South India</h2>
          <p class="pf-hero-sub">
            Each project in our portfolio is a singular response to a site, a family, and a vision.
            No two homes are identical. Every detail — from structural logic to material finish — is
            resolved before construction begins.
          </p>

          <!-- Trust bar -->
          <div class="pf-trust-bar">
            <div class="pf-trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>ISO 9001 Quality Certified</span>
            </div>
            <div class="pf-trust-sep"></div>
            <div class="pf-trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span>On-time delivery guarantee</span>
            </div>
            <div class="pf-trust-sep"></div>
            <div class="pf-trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span>180+ happy families</span>
            </div>
            <div class="pf-trust-sep"></div>
            <div class="pf-trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span>34+ design awards</span>
            </div>
          </div>
        </section>

        <!-- ── Filter tabs ────────────────────────────────────────────────────── -->
        <div class="pf-filters">
          <button class="pf-filter active" data-filter="all" onclick="pfFilter(this,'all')">All Projects</button>
          <button class="pf-filter" data-filter="Residential Villa" onclick="pfFilter(this,'Residential Villa')">Residential</button>
          <button class="pf-filter" data-filter="Urban Residence" onclick="pfFilter(this,'Urban Residence')">Urban</button>
          <button class="pf-filter" data-filter="Family Manor" onclick="pfFilter(this,'Family Manor')">Manor</button>
          <span class="pf-count" id="pfCount">${projects.length} projects</span>
        </div>

        <!-- ── Project cards ──────────────────────────────────────────────────── -->
        <div class="pf-grid" id="pfGrid">
          ${projects.map((p, i) => buildProjectCard(p, i)).join('')}
        </div>

        <!-- ── Stats strip ────────────────────────────────────────────────────── -->
        <section class="pf-stats-strip">
          <div class="pf-strip-stat"><strong>₹300 Cr+</strong><span>Total project value delivered</span></div>
          <div class="pf-strip-stat"><strong>12 Years</strong><span>of design and construction</span></div>
          <div class="pf-strip-stat"><strong>8 Cities</strong><span>across South India</span></div>
          <div class="pf-strip-stat"><strong>Zero</strong><span>structural defect claims</span></div>
        </section>

        <!-- ── Testimonials ───────────────────────────────────────────────────── -->
        <section class="pf-testimonials">
          <p class="pin-kicker" style="text-align:center;margin-bottom:8px;">Client Words</p>
          <h3 class="pf-section-title" style="text-align:center;">What our clients say</h3>
          <div class="pf-testi-grid">
            <div class="pf-testi">
              <p class="pf-testi-quote">"AV Archviz turned our sketched napkin idea into a villa that took our breath away on first visit. The 3D walkthrough before construction meant zero surprises."</p>
              <div class="pf-testi-author">
                <div class="pf-testi-avatar" style="background:linear-gradient(135deg,#1d4a31,#0d1812)">RK</div>
                <div><b>Ramesh Krishnamurthy</b><span>Forest Villa Client · Coimbatore</span></div>
              </div>
            </div>
            <div class="pf-testi">
              <p class="pf-testi-quote">"We had worked with three other firms before. AV Archviz was the first that delivered on time, within budget, and with a finish quality we had only seen in magazines."</p>
              <div class="pf-testi-author">
                <div class="pf-testi-avatar" style="background:linear-gradient(135deg,#143a5d,#081526)">PS</div>
                <div><b>Priya Sundar</b><span>Azure Residence Client · Chennai</span></div>
              </div>
            </div>
            <div class="pf-testi">
              <p class="pf-testi-quote">"Our Terra manor feels like it grew out of the land itself. The material palette, the proportions, the light — everything is exactly as we hoped but better than we imagined."</p>
              <div class="pf-testi-author">
                <div class="pf-testi-avatar" style="background:linear-gradient(135deg,#663016,#1d0d08)">VP</div>
                <div><b>Vikram Pillai</b><span>Terra Manor Client · Bengaluru</span></div>
              </div>
            </div>
          </div>
        </section>

        <!-- ── CTA ───────────────────────────────────────────────────────────── -->
        <div class="svc-cta-strip" style="margin:40px 40px 0;">
          <p>Your project could be next</p>
          <h3>Ready to start your own masterpiece?</h3>
          <button class="cta-btn" onclick="openContact()">Begin Your Project <span>›</span></button>
        </div>

      </main>
    </div>`;

  openOverlay();
}

// ── Card builder ──────────────────────────────────────────────────────────────
function buildProjectCard(p, i) {
  const tags = (p.tags || []).map(t => `<span class="pf-tag">${t}</span>`).join('');
  return `
  <article class="pf-card" data-type="${p.type || ''}" onclick="openProject(${i})" role="button" tabindex="0" style="--pf-accent:${p.colors[3]};--pf-bg:${p.colors[1]};">
    <div class="pf-card-visual" style="background:linear-gradient(145deg,${p.colors[0]},${p.colors[1]});">
      <img src="${p.image}" alt="${p.title}" loading="lazy">
      <div class="pf-card-overlay">
        <span class="pf-view-btn">View Project →</span>
      </div>
      <div class="pf-card-badges">
        <span class="pf-status-badge ${p.status === 'Completed' ? 'completed' : 'ongoing'}">${p.status || 'Ongoing'}</span>
        <span class="pf-year-badge">${p.year || ''}</span>
      </div>
    </div>
    <div class="pf-card-body">
      <div class="pf-card-edition">${p.edition}</div>
      <h3 class="pf-card-title">${p.title}</h3>
      <p class="pf-card-copy">${p.copy}</p>
      <div class="pf-card-meta">
        <div class="pf-meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${p.location || ''}
        </div>
        <div class="pf-meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          ${p.area || ''}
        </div>
        <div class="pf-meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          ${p.price || ''}
        </div>
      </div>
      <div class="pf-card-tags">${tags}</div>
    </div>
  </article>`;
}

// ── Filter ────────────────────────────────────────────────────────────────────
function pfFilter(btn, type) {
  // Active button
  document.querySelectorAll('.pf-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Show/hide cards
  const cards = document.querySelectorAll('.pf-card');
  let visible = 0;
  cards.forEach(card => {
    const match = type === 'all' || card.dataset.type === type;
    card.style.display = match ? '' : 'none';
    if (match) visible++;
  });

  const countEl = document.getElementById('pfCount');
  if (countEl) countEl.textContent = `${visible} project${visible !== 1 ? 's' : ''}`;
}
