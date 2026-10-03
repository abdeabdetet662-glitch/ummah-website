/* ═══════════════════════════════════════════════════
   UMMAH v2.0 — Main Interactions
   ═══════════════════════════════════════════════════ */

// ═══ Loader ═══
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
  }, 800);
});

// ═══ Navbar Scroll ═══
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// ═══ Progress Bar ═══
window.addEventListener("scroll", () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
});

// ═══ Mobile Menu ═══
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

document.querySelectorAll(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => navMenu.classList.remove("open"));
});

// ═══ Language Switcher ═══
const langBtn = document.getElementById("langBtn");
const langDropdown = document.getElementById("langDropdown");

langBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  langDropdown.classList.toggle("open");
});

document.querySelectorAll("[data-lang]").forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-lang");
    applyLanguage(lang);
    langDropdown.classList.remove("open");
  });
});

document.addEventListener("click", () => {
  langDropdown.classList.remove("open");
});

// ═══ Back to Top ═══
const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 500);
});
backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ═══ Reveal on Scroll ═══
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// ═══ Counter Animation ═══
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = "1";
      const target = parseInt(entry.target.getAttribute("data-count"));
      const isCurrency = entry.target.textContent.includes("$");
      animateCounter(entry.target, 0, target, 1500, isCurrency);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll("[data-count]").forEach(el => counterObserver.observe(el));

function animateCounter(el, start, end, duration, isCurrency) {
  const startTime = performance.now();
  const update = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(start + (end - start) * eased);
    el.textContent = isCurrency ? value + "$" : value + "+";
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// ═══ Particles ═══
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.reset();
    this.y = Math.random() * canvas.height;
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 10;
    this.size = Math.random() * 2 + 0.5;
    this.speedY = Math.random() * 0.5 + 0.1;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? "212, 175, 55" : "16, 185, 129";
  }
  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    if (this.y < -10) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
  }
}

function initParticles() {
  const count = Math.min(Math.floor(canvas.width / 20), 60);
  particles = [];
  for (let i = 0; i < count; i++) particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
window.addEventListener("resize", initParticles);

// ═══ Smooth scroll for old browsers ═══
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  });
});

console.log("%c👑 Ummah v2.0", "color: #D4AF37; font-size: 24px; font-weight: 900;");
console.log("%cأول دولة رقمية عربية", "color: #10B981; font-size: 14px;");
