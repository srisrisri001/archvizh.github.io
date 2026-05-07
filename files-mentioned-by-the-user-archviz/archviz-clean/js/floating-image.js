let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// Update center points on resize
window.addEventListener("resize", () => {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
});

// Track mouse movement
document.addEventListener("mousemove", (event) => {
  // Map mouse position to a range, dampening the effect for subtlety
  mouseX = (event.clientX - windowHalfX) * 0.03;
  mouseY = (event.clientY - windowHalfY) * 0.03;
});

function animateFloat() {
  // Smoothly interpolate the target coordinates
  targetX += (mouseX - targetX) * 0.06;
  targetY += (mouseY - targetY) * 0.06;

  // Add the idle floating motion based on time
  const time = Date.now() * 0.0015;
  const idleFloatY = Math.sin(time) * -6; // Moves up to -6px and down to 6px

  const images = document.querySelectorAll(".building-img");
  
  images.forEach(img => {
    // Apply 2D translation (idle float + mouse parallax) 
    // and subtle 3D rotation based on mouse position to create a dynamic, premium feel
    img.style.transform = `
      translate(${targetX}px, ${targetY + idleFloatY}px) 
      rotateX(${-targetY * 0.6}deg) 
      rotateY(${targetX * 0.6}deg)
    `;
  });

  requestAnimationFrame(animateFloat);
}

// Start the animation loop
animateFloat();
