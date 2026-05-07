// ─── Services Page ────────────────────────────────────────────────────────────

const servicesData = [
  {
    id:       'residential',
    icon:     '🏡',
    accent:   '#7fd58b',
    tag:      'Residential Construction',
    headline: 'Your Dream Home, Built to Last',
    pitch:    'From foundation to finishing, we craft bespoke residential homes that reflect your lifestyle. Every detail — spatial flow, structural integrity, premium materials — is planned and delivered with precision.',
    features: [
      ['Custom Villa Design',   'Architect-led bespoke design tailored to your family needs and site.'],
      ['Turnkey Delivery',      'Single-point responsibility from permits to handover. Zero surprises.'],
      ['Budget Transparency',   'Fixed-cost contracts with itemised BOQ and milestone billing.'],
      ['Luxury Finishes',       'Curated material selection — Italian marble, teakwood, stone cladding.'],
    ],
    cta: 'Book a Residential Consultation',
    badge: 'Starting ₹65 LKH onwards',
  },
  {
    id:       'commercial',
    icon:     '🏢',
    accent:   '#70c9f2',
    tag:      'Commercial Construction',
    headline: 'Spaces That Work as Hard as You Do',
    pitch:    'Office towers, retail outlets, showrooms, and hospitality spaces built to commercial grade. We understand ROI-driven design — faster build cycles, durable structures, and interiors that convert visitors into clients.',
    features: [
      ['Corporate Offices',     'Open-plan and cabin layouts with branded interiors and smart lighting.'],
      ['Retail & Showrooms',    'High-footfall spaces designed for product visibility and customer flow.'],
      ['Hospitality Projects',  'Hotels, restaurants, and resorts built to 3-star and 5-star specs.'],
      ['Industrial Facilities', 'Warehouses, factories, and logistics hubs with safety-first design.'],
    ],
    cta: 'Get a Commercial Project Quote',
    badge: 'Projects from ₹1.2 Cr onwards',
  },
  {
    id:       'interior',
    icon:     '🛋️',
    accent:   '#f0a35a',
    tag:      'Interior Design & Fit-Out',
    headline: 'Interiors That Tell Your Story',
    pitch:    'Transform bare walls into stunning living and working environments. Our interior team merges aesthetics with functionality — every room receives a curated material palette, bespoke joinery, and layered lighting design.',
    features: [
      ['3D Visualisation',      'Photorealistic renders before a single nail is hammered.'],
      ['Full Fit-Out',          'Modular kitchens, wardrobes, false ceilings, and flooring — all in-house.'],
      ['Lighting Design',       'Warm, cool, and accent lighting zones tailored to each space.'],
      ['Furniture Sourcing',    'Curated furniture procurement from premium domestic and imported brands.'],
    ],
    cta: 'Start Your Interior Project',
    badge: 'Packages from ₹12 LKH',
  },
  {
    id:       'renovation',
    icon:     '🔨',
    accent:   '#e07a5f',
    tag:      'Renovation & Refurbishment',
    headline: 'Give Your Space a New Chapter',
    pitch:    'Whether it is an ageing apartment, a dated office, or a property you just acquired — our renovation team breathes new life into existing structures. Structural repairs, aesthetic upgrades, and smart space planning included.',
    features: [
      ['Structural Upgrades',   'Waterproofing, load-bearing fixes, and complete structural audits.'],
      ['Aesthetic Makeover',    'New flooring, wall textures, false ceilings, and modern fittings.'],
      ['Kitchen & Bath Revamp', 'Full remodelling of kitchens and bathrooms with modern layouts.'],
      ['Occupied Renovations',  'We work in phases so your home or business keeps running during work.'],
    ],
    cta: 'Book a Renovation Assessment',
    badge: 'From ₹4 LKH for apartments',
  },
];

// ── HTML Builder ──────────────────────────────────────────────────────────────
function buildServiceCard(s) {
  const featureRows = s.features.map(([title, desc]) => `
    <div class="svc-feature">
      <b class="svc-feat-title">${title}</b>
      <span class="svc-feat-desc">${desc}</span>
    </div>`).join('');

  return `
  <article class="svc-card" id="svc-${s.id}" style="--svc-accent:${s.accent}">
    <div class="svc-card-head">
      <div class="svc-icon-wrap">
        <span class="svc-icon" role="img" aria-label="${s.tag}">${s.icon}</span>
      </div>
      <div>
        <p class="svc-tag">${s.tag}</p>
        <h3 class="svc-headline">${s.headline}</h3>
      </div>
    </div>
    <p class="svc-pitch">${s.pitch}</p>
    <div class="svc-features">${featureRows}</div>
    <div class="svc-footer">
      <span class="svc-badge">${s.badge}</span>
      <button class="svc-cta" onclick="openContact()">${s.cta} →</button>
    </div>
  </article>`;
}

// ── Public function ───────────────────────────────────────────────────────────
function openServices() {
  if (!overlay) return;

  overlay.innerHTML = `
    <div class="project-page">
      <div class="overlay-topbar">
        <div class="overlay-kicker">Our Services</div>
        <button class="overlay-close" onclick="closeOverlay()">Close</button>
      </div>
      <main class="svc-page">

        <!-- Hero banner -->
        <div class="svc-hero">
          <p class="pin-kicker">What We Build</p>
          <h2 class="svc-hero-title">Construction &amp; Design Services for Every Vision</h2>
          <p class="svc-hero-sub">From a family villa to a corporate campus — AV Archviz plans, designs, and delivers end-to-end construction projects across South India with transparency, quality, and style.</p>
          <div class="svc-stats-row">
            <div class="svc-stat"><strong>180+</strong><span>Projects Delivered</span></div>
            <div class="svc-stat"><strong>12 Yr</strong><span>Industry Experience</span></div>
            <div class="svc-stat"><strong>96%</strong><span>Client Satisfaction</span></div>
            <div class="svc-stat"><strong>4</strong><span>Service Verticals</span></div>
          </div>
        </div>

        <!-- Service cards -->
        <div class="svc-grid">
          ${servicesData.map(buildServiceCard).join('')}
        </div>

        <!-- Bottom CTA strip -->
        <div class="svc-cta-strip">
          <p>Ready to start your project?</p>
          <h3>Let us turn your vision into a built reality.</h3>
          <button class="cta-btn" onclick="openContact()">Contact Our Team <span>›</span></button>
        </div>

      </main>
    </div>`;

  openOverlay();
}
