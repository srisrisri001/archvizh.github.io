// ─── About Page ───────────────────────────────────────────────────────────────
// Inspired by the About pages of BIG, Foster+Partners, Zaha Hadid Architects,
// and premium real-estate studios like CBRE, JLL, and Knight Frank.

function openAbout() {
  if (!overlay) return;

  overlay.innerHTML = `
    <div class="project-page">
      <div class="overlay-topbar">
        <div class="overlay-kicker">Studio Profile</div>
        <button class="overlay-close" onclick="closeOverlay()">Close</button>
      </div>

      <main class="ab-page">

        <!-- ── Manifesto hero ───────────────────────────────────────────────── -->
        <section class="ab-manifesto">
          <p class="pin-kicker">AV Archviz · Est. 2012</p>
          <h2 class="ab-manifesto-title">
            We design spaces that feel inevitable —<br>
            <em>before they are even built.</em>
          </h2>
          <p class="ab-manifesto-sub">
            Architecture is a promise. We help clients, developers, and builders
            visualise, trust, and fall in love with that promise — through
            immersive design, honest planning, and meticulous craft.
          </p>
        </section>

        <!-- ── Stats row ────────────────────────────────────────────────────── -->
        <div class="ab-stats">
          <div class="ab-stat">
            <strong>180 <span>+</span></strong>
            <span>Projects Delivered</span>
          </div>
          <div class="ab-stat">
            <strong>12 <span>Yr</span></strong>
            <span>Studio Experience</span>
          </div>
          <div class="ab-stat">
            <strong>96 <span>%</span></strong>
            <span>Client Satisfaction</span>
          </div>
          <div class="ab-stat">
            <strong>8 <span>+</span></strong>
            <span>Cities Covered</span>
          </div>
          <div class="ab-stat">
            <strong>34 <span>+</span></strong>
            <span>Design Awards</span>
          </div>
        </div>

        <!-- ── Story ────────────────────────────────────────────────────────── -->
        <section class="ab-two-col">
          <div class="ab-col-label">
            <p class="pin-kicker">Our Story</p>
          </div>
          <div class="ab-col-body">
            <p>
              AV Archviz was founded in Chennai in 2012 by a team of architects
              and visual designers who believed that a client should never have
              to imagine a building — they should be able to experience it.
            </p>
            <p>
              Over twelve years we have grown from a three-person studio into a
              full-service design and construction practice with teams in Chennai,
              Bengaluru, and Coimbatore. Every project — from a 3 BHK family
              home to a multi-storey commercial tower — receives the same
              obsessive attention to spatial logic, material quality, and
              human scale.
            </p>
            <p>
              We believe good architecture is not decoration. It is the quiet
              confidence of a room that feels exactly right, every single day.
            </p>
          </div>
        </section>

        <div class="ab-divider"></div>

        <!-- ── What we believe ──────────────────────────────────────────────── -->
        <section class="ab-two-col">
          <div class="ab-col-label">
            <p class="pin-kicker">Our Principles</p>
          </div>
          <div class="ab-col-body ab-values">
            <div class="ab-value">
              <span class="ab-value-num">01</span>
              <div>
                <b>Clarity before complexity.</b>
                <p>A great plan is one the client understands immediately. We design for comprehension, not to impress other architects.</p>
              </div>
            </div>
            <div class="ab-value">
              <span class="ab-value-num">02</span>
              <div>
                <b>Materials tell the truth.</b>
                <p>We specify materials we can stand behind — sourced honestly, priced transparently, and chosen for how they age, not how they photograph.</p>
              </div>
            </div>
            <div class="ab-value">
              <span class="ab-value-num">03</span>
              <div>
                <b>Spaces are for people.</b>
                <p>Daylight, ventilation, circulation, and privacy are not features. They are the basic contract of every home we design.</p>
              </div>
            </div>
            <div class="ab-value">
              <span class="ab-value-num">04</span>
              <div>
                <b>Delivery is a design act.</b>
                <p>The most beautiful drawing fails if the building does not arrive on time and within budget. Construction management is as important as concept design.</p>
              </div>
            </div>
          </div>
        </section>

        <div class="ab-divider"></div>

        <!-- ── How we work ──────────────────────────────────────────────────── -->
        <section class="ab-process-section">
          <p class="pin-kicker" style="text-align:center;margin-bottom:10px;">How We Work</p>
          <h3 class="ab-section-title" style="text-align:center;">A clear process. Zero surprises.</h3>
          <div class="ab-process">
            <div class="ab-step">
              <div class="ab-step-num">01</div>
              <b>Discovery Call</b>
              <p>We listen to your brief, visit the site, and understand the lifestyle, budget, and timeline before a single line is drawn.</p>
            </div>
            <div class="ab-step-arrow">→</div>
            <div class="ab-step">
              <div class="ab-step-num">02</div>
              <b>Concept Design</b>
              <p>Floor plans, elevations, and 3D visualisations that let you walk through the building before it exists.</p>
            </div>
            <div class="ab-step-arrow">→</div>
            <div class="ab-step">
              <div class="ab-step-num">03</div>
              <b>Working Drawings</b>
              <p>Full structural, MEP, and interior drawings submitted for permits and handed to the construction team.</p>
            </div>
            <div class="ab-step-arrow">→</div>
            <div class="ab-step">
              <div class="ab-step-num">04</div>
              <b>Build & Handover</b>
              <p>Site supervision, quality audits at every milestone, and a final walkthrough before you receive the keys.</p>
            </div>
          </div>
        </section>

        <div class="ab-divider"></div>

        <!-- ── Team ─────────────────────────────────────────────────────────── -->
        <section class="ab-team-section">
          <p class="pin-kicker" style="text-align:center;margin-bottom:10px;">The People Behind the Work</p>
          <h3 class="ab-section-title" style="text-align:center;">Architects, designers, and builders — one team.</h3>
          <div class="ab-team">
            <div class="ab-member">
              <div class="ab-member-avatar" style="background:linear-gradient(135deg,#1d4a31,#0d1812)">AV</div>
              <div class="ab-member-info">
                <b>Balasri Rajini</b>
                <span>Founder </span>
                <p>B.Arch (NIT Trichy) · 18 yrs experience · Residential & commercial specialist</p>
              </div>
            </div>
            <div class="ab-member">
              <div class="ab-member-avatar" style="background:linear-gradient(135deg,#143a5d,#081526)">SR</div>
              <div class="ab-member-info">
                <b>Sruthi Ramesh</b>
                <span>Head of Interior Design</span>
                <p>M.Des (NID Ahmedabad) · Material sourcing, lighting design, bespoke joinery</p>
              </div>
            </div>
            <div class="ab-member">
              <div class="ab-member-avatar" style="background:linear-gradient(135deg,#663016,#1d0d08)">KP</div>
              <div class="ab-member-info">
                <b>Karthik Pillai</b>
                <span>Project Director — Construction</span>
                <p>B.E Civil (Anna University) · 14 yrs on-site · Structural audits, delivery management</p>
              </div>
            </div>
            <div class="ab-member">
              <div class="ab-member-avatar" style="background:linear-gradient(135deg,#3b2562,#0f0820)">MM</div>
              <div class="ab-member-info">
                <b>Meena Murugan</b>
                <span>Visualisation Lead</span>
                <p>Architecture visualiser · 360° renders, walkthroughs, real-time 3D client presentations</p>
              </div>
            </div>
          </div>
        </section>

        <div class="ab-divider"></div>

        <!-- ── Recognition ──────────────────────────────────────────────────── -->
        <section class="ab-awards-section">
          <p class="pin-kicker" style="text-align:center;margin-bottom:10px;">Recognition</p>
          <div class="ab-awards">
            <div class="ab-award"><span class="ab-award-year">2024</span><b>Best Residential Design</b><span>South India Architecture Awards</span></div>
            <div class="ab-award"><span class="ab-award-year">2023</span><b>Top Archviz Studio</b><span>CII Design Excellence Awards</span></div>
            <div class="ab-award"><span class="ab-award-year">2022</span><b>Sustainable Build Award</b><span>IGBC Green Homes Initiative</span></div>
            <div class="ab-award"><span class="ab-award-year">2021</span><b>Emerging Practice of the Year</b><span>CREDAI Tamil Nadu Chapter</span></div>
            <div class="ab-award"><span class="ab-award-year">2020</span><b>Best Interior Project</b><span>Design Fabric India</span></div>
            <div class="ab-award"><span class="ab-award-year">2019</span><b>Client Choice Award</b><span>Housing.com Annual Awards</span></div>
          </div>
        </section>

        <!-- ── Bottom CTA ───────────────────────────────────────────────────── -->
        <div class="svc-cta-strip" style="margin-top:40px;">
          <p>Want to work with us?</p>
          <h3>Every great building starts with a conversation.</h3>
          <button class="cta-btn" onclick="openContact()">Start the Conversation <span>›</span></button>
        </div>

      </main>
    </div>`;

  openOverlay();
}
