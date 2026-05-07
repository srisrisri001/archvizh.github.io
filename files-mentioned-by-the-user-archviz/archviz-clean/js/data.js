const projects = [
  {
    key: "forest",
    edition: "Forest Edition",
    title: "Serenity Forest Villa",
    image: "assets/forest-villa.png",
    panorama: "assets/forest-panorama.png",
    copy: "A quiet biophilic residence shaped around filtered daylight, garden edges, warm stone paths, and private family spaces that open naturally into the landscape.",
    stats: ["220 m² Plot", "4 BHK", "Garden Court"],
    colors: ["#1d4a31", "#0d1812", "rgba(106,191,122,0.22)", "#7fd58b"],
    // ── Project meta (shown on portfolio card) ────────────────────────────────
    location: "Coimbatore, Tamil Nadu",
    year: "2024",
    type: "Residential Villa",
    status: "Completed",
    area: "3,800 sq ft",
    price: "₹65 LKH",
    tags: ["Biophilic", "Garden Court", "Natural Stone"],
    gallery: [
      { name: "Elevation", image: "assets/forest-villa.png" },
      { name: "Living Room", image: "" },
      { name: "Bedroom", image: "" },
      { name: "Kitchen", image: "" },
      { name: "Terrace", image: "" },
      { name: "Garden", image: "" },
      { name: "Pool", image: "" },
      { name: "Outdoor Dining", image: "" }
    ],
    features: [
      ["Forest deck", "A shaded outdoor lounge for slow evenings and private gatherings."],
      ["Courtyard planning", "Interior rooms borrow light and breeze from a planted core."],
      ["Natural finishes", "Timber, textured stone, and muted green details throughout."],
      ["Smart climate", "Low-energy cooling zones tuned for warm afternoons."]
    ]
  },
  {
    key: "azure",
    edition: "Azure Edition",
    title: "Azure Sky Residence",
    image: "assets/modular-kitchen.png",
    panorama: "assets/terra-panorama.jpg",
    copy: "A crisp urban home with reflective surfaces, wide balcony lines, cool interior tones, and a light-filled plan designed for skyline views.",
    stats: ["260 m² Plot", "4.5 BHK", "Sky Terrace"],
    colors: ["#143a5d", "#081526", "rgba(90,176,224,0.22)", "#70c9f2"],
    location: "Chennai, Tamil Nadu",
    year: "2023",
    type: "Urban Residence",
    status: "Completed",
    area: "4,600 sq ft",
    price: "₹1.2 Cr",
    tags: ["Skyline Views", "Panoramic Glass", "Rooftop Lounge"],
    gallery: [
      { name: "Elevation", image: "assets/azure-residence.png" },
      { name: "Double Height Lounge", image: "" },
      { name: "Bedroom Suite", image: "" },
      { name: "Island Kitchen", image: "" },
      { name: "Sky Terrace", image: "" },
      { name: "Water Feature", image: "" },
      { name: "Pool Deck", image: "" },
      { name: "Study", image: "" }
    ],
    features: [
      ["Panoramic glazing", "Large openings frame city views while keeping interiors bright."],
      ["Sky lounge", "A roof terrace with lounge seating and evening lighting."],
      ["Blue stone palette", "Cool-toned finishes create a calm premium feel."],
      ["Gallery kitchen", "Open cooking and dining designed for entertaining."]
    ]
  },
  {
    key: "terra",
    edition: "Terra Edition",
    title: "Terra Cotta Manor",
    image: "assets/terra-manor.png",
    panorama: "assets/terra-panorama.jpg",
    copy: "An earthy family manor with sculpted walls, shaded verandas, tactile interiors, and warm outdoor rooms suited to long weekends and relaxed hosting.",
    stats: ["200 m² Plot", "3 BHK", "Veranda Pool"],
    colors: ["#663016", "#1d0d08", "rgba(224,130,58,0.24)", "#f0a35a"],
    location: "Bengaluru, Karnataka",
    year: "2023",
    type: "Family Manor",
    status: "Completed",
    area: "3,200 sq ft",
    price: "₹85 LKH",
    tags: ["Terracotta Facade", "Veranda Living", "Private Pool"],
    gallery: [
      { name: "Elevation", image: "assets/terra-manor.png" },
      { name: "Living Room", image: "" },
      { name: "Bedroom", image: "" },
      { name: "Chef Kitchen", image: "" },
      { name: "Terrace", image: "" },
      { name: "Garden Court", image: "" },
      { name: "Pool", image: "" },
      { name: "Guest Suite", image: "" }
    ],
    features: [
      ["Textured facade", "Layered terracotta surfaces with deep shadow reveals."],
      ["Veranda living", "A broad transitional edge between the home and garden."],
      ["Warm interiors", "Clay, brass, linen, and deep wood accents throughout."],
      ["Private pool", "A compact pool courtyard connected to the family lounge."]
    ]
  }
];

// ── Helper: tile background style for gallery visuals ─────────────────────────
function tileStyle(project, index) {
  const heights = [270, 190, 235, 210, 285, 220, 250, 205];
  const mixes = [project.colors[0], project.colors[3], "#263036", "#6f563f", "#2d5d4a", "#1c2c3a", "#533722", "#324236"];
  return `--h:${heights[index % heights.length]}px;--tile-a:${mixes[index % mixes.length]};--tile-b:${project.colors[1]};`;
}
