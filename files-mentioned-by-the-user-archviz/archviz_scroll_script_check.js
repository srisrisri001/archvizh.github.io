
// ---- Scroll snapping & dot tracking ----
const sections = document.querySelectorAll(".section");
const dots = document.querySelectorAll(".scroll-dot");
let currentSection = 0;
let isScrolling = false;

function scrollToSection(idx) {
  sections[idx].scrollIntoView({ behavior: "smooth" });
}

// IntersectionObserver for in-view animations & dot tracking
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const idx = Array.from(sections).indexOf(entry.target);
    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
      entry.target.classList.add("in-view");
      dots.forEach(d => d.classList.remove("active"));
      if (dots[idx]) dots[idx].classList.add("active");
      currentSection = idx;
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => observer.observe(s));

// Wheel-based snapping
let scrollCooldown = false;
window.addEventListener("wheel", (e) => {
  e.preventDefault();
  if (scrollCooldown) return;
  scrollCooldown = true;
  if (e.deltaY > 0 && currentSection < sections.length - 1) {
    scrollToSection(currentSection + 1);
  } else if (e.deltaY < 0 && currentSection > 0) {
    scrollToSection(currentSection - 1);
  }
  setTimeout(() => { scrollCooldown = false; }, 900);
}, { passive: false });

// Touch support
let touchStartY = 0;
window.addEventListener("touchstart", e => { touchStartY = e.touches[0].clientY; });
window.addEventListener("touchend", e => {
  const delta = touchStartY - e.changedTouches[0].clientY;
  if (Math.abs(delta) < 40) return;
  if (delta > 0 && currentSection < sections.length - 1) scrollToSection(currentSection + 1);
  else if (delta < 0 && currentSection > 0) scrollToSection(currentSection - 1);
});

// Initial in-view trigger for section 0
sections[0].classList.add("in-view");

// ---- Codex project pages, mobile nav, and like counts ----
const projectThemes = [
  {
    key: "forest",
    edition: "Forest Edition",
    title: "Serenity Forest Villa",
    copy: "A quiet biophilic residence shaped around filtered daylight, garden edges, warm stone paths, and private family spaces that open naturally into the landscape.",
    price: "Rs 2.4 Cr",
    stats: ["220 m2 Plot", "4 BHK", "Garden Court"],
    colors: ["#1d4a31", "#0d1812", "rgba(106,191,122,0.22)", "#7fd58b"],
    features: [
      ["Forest deck", "A shaded outdoor lounge for slow evenings and private gatherings."],
      ["Courtyard planning", "Interior rooms borrow light and breeze from a planted core."],
      ["Natural finishes", "Timber, textured stone, and muted green details throughout."],
      ["Smart climate", "Low-energy cooling zones tuned for warm afternoons."]
    ],
    gallery: ["Elevation", "Living Room", "Bedroom", "Kitchen", "Terrace", "Garden", "Pool", "Outdoor Dining"]
  },
  {
    key: "azure",
    edition: "Azure Edition",
    title: "Azure Sky Residence",
    copy: "A crisp urban home with reflective surfaces, wide balcony lines, cool interior tones, and a light-filled plan designed for skyline views.",
    price: "Rs 2.8 Cr",
    stats: ["260 m2 Plot", "4.5 BHK", "Sky Terrace"],
    colors: ["#143a5d", "#081526", "rgba(90,176,224,0.22)", "#70c9f2"],
    features: [
      ["Panoramic glazing", "Large openings frame city views while keeping interiors bright."],
      ["Sky lounge", "A roof terrace with lounge seating and evening lighting."],
      ["Blue stone palette", "Cool-toned finishes create a calm premium feel."],
      ["Gallery kitchen", "Open cooking and dining designed for entertaining."]
    ],
    gallery: ["Elevation", "Double Height Lounge", "Bedroom Suite", "Island Kitchen", "Sky Terrace", "Water Feature", "Pool Deck", "Study"]
  },
  {
    key: "terra",
    edition: "Terra Edition",
    title: "Terra Cotta Manor",
    copy: "An earthy family manor with sculpted walls, shaded verandas, tactile interiors, and warm outdoor rooms suited to long weekends and relaxed hosting.",
    price: "Rs 2.1 Cr",
    stats: ["200 m2 Plot", "3 BHK", "Veranda Pool"],
    colors: ["#663016", "#1d0d08", "rgba(224,130,58,0.24)", "#f0a35a"],
    features: [
      ["Textured facade", "Layered terracotta surfaces with deep shadow reveals."],
      ["Veranda living", "A broad transitional edge between the home and garden."],
      ["Warm interiors", "Clay, brass, linen, and deep wood accents throughout."],
      ["Private pool", "A compact pool courtyard connected to the family lounge."]
    ],
    gallery: ["Elevation", "Living Room", "Bedroom", "Chef Kitchen", "Terrace", "Garden Court", "Pool", "Guest Suite"]
  }
];

let activeProjectIndex = 0;
const overlay = document.createElement("div");
overlay.className = "project-overlay";
overlay.id = "projectOverlay";
document.body.appendChild(overlay);

function activeHeroImage(idx) {
  const img = sections[idx]?.querySelector(".building-img");
  return img ? img.src : "";
}

function tileStyle(theme, i) {
  const heights = [270, 190, 235, 210, 285, 220, 250, 205];
  const mixes = [theme.colors[0], theme.colors[3], "#263036", "#6f563f", "#2d5d4a", "#1c2c3a", "#533722", "#324236"];
  return `--h:${heights[i % heights.length]}px;--tile-a:${mixes[i % mixes.length]};--tile-b:${theme.colors[1]};`;
}

function openProject(idx) {
  activeProjectIndex = idx;
  const theme = projectThemes[idx];
  const image = activeHeroImage(idx);
  overlay.innerHTML = `
    <div class="project-page" style="--page-a:${theme.colors[0]};--page-b:${theme.colors[1]};--page-glow:${theme.colors[2]};--page-accent:${theme.colors[3]};">
      <div class="overlay-topbar">
        <div>
          <div class="overlay-kicker">${theme.edition} / Project Detail</div>
        </div>
        <button class="overlay-close" onclick="closeOverlay()">Close</button>
      </div>
      <section class="project-hero">
        <div>
          <div class="pin-kicker">Pinterest style project board</div>
          <h1 class="project-title">${theme.title}</h1>
          <p class="project-copy">${theme.copy}</p>
          <div class="project-stats">${theme.stats.map(item => `<div class="stat-pill"><strong>${item.split(" ")[0]}</strong><span>${item.replace(item.split(" ")[0], "").trim()}</span></div>`).join("")}</div>
        </div>
        <div class="rotator-card">
          <div class="overlay-kicker">360 rotate image</div>
          <div class="rotator-stage"><img id="rotateImage" src="${image}" alt="${theme.title} elevation"></div>
          <div class="rotator-controls">
            <input id="rotateRange" type="range" min="0" max="360" value="0" oninput="setRotation(this.value)">
            <button class="spin-btn" onclick="spinProject()">Rotate 360</button>
          </div>
        </div>
      </section>
      <section class="pinterest-grid">
        ${theme.gallery.map((name, i) => `<article class="pin-card"><div class="pin-visual" style="${tileStyle(theme, i)}">${i === 0 ? `<img src="${image}" alt="${name}">` : ""}</div><div class="pin-body"><h3>${name}</h3><p>${galleryCopy(name, theme.key)}</p></div></article>`).join("")}
      </section>
      <section class="feature-strip">${theme.features.map(([title, body]) => `<div class="feature-item"><b>${title}</b><span>${body}</span></div>`).join("")}</section>
    </div>`;
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function galleryCopy(name, key) {
  const tone = key === "forest" ? "natural" : key === "azure" ? "bright" : "earthy";
  return `${name} concept with ${tone} materials, layered lighting, and client-ready architectural detailing.`;
}

function openInfoPage(type) {
  const isAbout = type === "about";
  overlay.innerHTML = `
    <div class="project-page">
      <div class="overlay-topbar">
        <div class="overlay-kicker">${isAbout ? "Studio Profile" : "Client Enquiry"}</div>
        <button class="overlay-close" onclick="closeOverlay()">Close</button>
      </div>
      <main class="info-page">
        <div class="info-layout">
          <section>
            <div class="pin-kicker">${isAbout ? "About Us" : "Contact"}</div>
            <h1 class="info-title">${isAbout ? "Architecture that feels calm, clear, and livable." : "Tell us about the site, the lifestyle, and the dream."}</h1>
          </section>
          <section class="${isAbout ? "info-panel" : "contact-panel"}">
            ${isAbout ? `<p>AV Archviz creates immersive residential concepts for clients who want to understand a home before it is built. We combine exterior visualization, interior mood direction, spatial storytelling, and premium presentation design so every project feels easy to imagine and confident to approve.</p>` : `<p>Share your preferred edition, site size, city, budget range, and the rooms you want prioritized. Our team can prepare a project walkthrough, image gallery, feature list, and visual direction for your villa or residence.</p><div class="contact-grid"><div class="contact-row"><span>Email</span><strong>studio@avarchviz.com</strong></div><div class="contact-row"><span>Phone</span><strong>+91 98765 43210</strong></div><div class="contact-row"><span>Visit</span><strong>Chennai Design District</strong></div></div>`}
          </section>
        </div>
      </main>
    </div>`;
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function openAllProjects() {
  overlay.innerHTML = `
    <div class="project-page">
      <div class="overlay-topbar">
        <div class="overlay-kicker">All Projects</div>
        <button class="overlay-close" onclick="closeOverlay()">Close</button>
      </div>
      <section class="pinterest-grid">
        ${projectThemes.map((theme, idx) => `<article class="pin-card" role="button" onclick="openProject(${idx})"><div class="pin-visual" style="${tileStyle(theme, idx)}"><img src="${activeHeroImage(idx)}" alt="${theme.title}"></div><div class="pin-body"><h3>${theme.title}</h3><p>${theme.edition} with gallery, 360 rotate view, and unique project features.</p></div></article>`).join("")}
      </section>
    </div>`;
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeOverlay() {
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

function setRotation(value) {
  const img = document.getElementById("rotateImage");
  if (img) img.style.setProperty("--spin", `${value}deg`);
}

function spinProject() {
  const range = document.getElementById("rotateRange");
  if (!range) return;
  let step = 0;
  const start = Number(range.value) || 0;
  const timer = setInterval(() => {
    step += 12;
    const value = (start + step) % 361;
    range.value = value;
    setRotation(value);
    if (step >= 360) clearInterval(timer);
  }, 28);
}

document.querySelectorAll(".cta-btn").forEach((button, idx) => {
  button.addEventListener("click", () => openProject(idx));
});

const menuToggle = document.getElementById("menuToggle");
if (menuToggle) {
  menuToggle.addEventListener("click", () => document.querySelector("nav").classList.toggle("menu-open"));
}

document.querySelectorAll("[data-nav]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-nav]").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    document.querySelector("nav").classList.remove("menu-open");
    const target = button.dataset.nav;
    if (target === "residences") scrollToSection(currentSection || 0);
    if (target === "projects") openAllProjects();
    if (target === "about") openInfoPage("about");
    if (target === "contact") openInfoPage("contact");
  });
});

const likeKey = "archvizLikeCount";
const likedKey = "archvizLiked";
const likeCount = document.getElementById("likeCount");
const globalHeart = document.getElementById("globalHeart");
function renderLikes() {
  if (likeCount) likeCount.textContent = localStorage.getItem(likeKey) || "0";
  if (globalHeart) globalHeart.classList.toggle("liked", localStorage.getItem(likedKey) === "1");
}
if (globalHeart) {
  globalHeart.addEventListener("click", () => {
    const liked = localStorage.getItem(likedKey) === "1";
    let count = Number(localStorage.getItem(likeKey) || "0");
    count = liked ? Math.max(0, count - 1) : count + 1;
    localStorage.setItem(likeKey, String(count));
    localStorage.setItem(likedKey, liked ? "0" : "1");
    renderLikes();
  });
}
renderLikes();

