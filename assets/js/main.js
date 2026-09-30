/* ═══════════════════════════════════════════
   أُمّة — JavaScript
   ═══════════════════════════════════════════ */

// ═══════════════════════════════════════════
//  Navbar Scroll Effect
// ═══════════════════════════════════════════
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ═══════════════════════════════════════════
//  Mobile Menu Toggle
// ═══════════════════════════════════════════
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            navToggle.classList.remove('active');
        });
    });
}

// ═══════════════════════════════════════════
//  Smooth Scroll for Anchor Links
// ═══════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 80; // navbar height
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ═══════════════════════════════════════════
//  Fade-in on Scroll
// ═══════════════════════════════════════════
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// نضيف fade-in لكل العناصر المهمة
document.querySelectorAll(
    '.feature-card, .stat-item, .section-header, .download-box'
).forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ═══════════════════════════════════════════
//  Counter Animation
// ═══════════════════════════════════════════
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString('ar-EG') + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString('ar-EG') + '+';
        }
    };

    updateCounter();
}

// نطبّق Counter Animation عندما يظهر القسم
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ═══════════════════════════════════════════
//  Parallax Effect for Hero
// ═══════════════════════════════════════════
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual && window.innerWidth > 968) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < 800) {
            heroVisual.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
    });
}

// ═══════════════════════════════════════════
//  Typing Effect (اختياري)
// ═══════════════════════════════════════════
class TypeWriter {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.isDeleting = false;
    }

    type() {
        const current = this.text.substring(0, this.index);

        if (this.isDeleting) {
            this.index--;
        } else {
            this.index++;
        }

        this.element.textContent = current;

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.index === this.text.length) {
            setTimeout(() => this.type(), 2000);
            this.isDeleting = true;
            return;
        }

        if (this.isDeleting && this.index === 0) {
            this.isDeleting = false;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ═══════════════════════════════════════════
//  Button Ripple Effect
// ═══════════════════════════════════════════
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        // نضيف animation CSS
        if (!document.getElementById('ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ═══════════════════════════════════════════
//  Detect User Language
// ═══════════════════════════════════════════
const userLang = navigator.language || navigator.userLanguage;
console.log('🌍 User language:', userLang);

// ═══════════════════════════════════════════
//  Welcome Message (Console)
// ═══════════════════════════════════════════
console.log(
    '%c🌍 أُمّة — أول دولة رقمية عربية',
    'color: #D4AF37; font-size: 24px; font-weight: bold; padding: 10px;'
);
console.log(
    '%cمرحباً بك في الموقع الرسمي لتطبيق أُمّة',
    'color: #9E9E9E; font-size: 14px;'
);
console.log(
    '%cGitHub: https://github.com/abdeabdetet662-glitch/Ummah',
    'color: #D4AF37; font-size: 12px;'
);

// ═══════════════════════════════════════════
//  Page Load Animation
// ═══════════════════════════════════════════
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ═══════════════════════════════════════════
//  Active Nav Link on Scroll
// ═══════════════════════════════════════════
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ═══════════════════════════════════════════
//  Easter Egg 🥚
// ═══════════════════════════════════════════
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
                       'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-8);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s linear';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎉 مبروك! اكتشفت السر! أنت مواطن حقيقي في أُمّة!');
        }, 2000);
    }
});

