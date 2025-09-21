// script.js
// GSAP used for hero/timeline/reviews animations + slideshow logic (no build tools needed)

// ---------- CONFIG ----------
const SLIDES = [
  // Unsplash style backgrounds (replace if you want)
  'https://images.unsplash.com/photo-1518972559570-0f6b87bd2e7d?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526403224735-1b4d4fbb2d41?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581579180299-1d4e9cb8f4f6?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555514099-86b5f9a98f3c?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1591012911206-3ff94f5b5c6b?w=1920&q=80&auto=format&fit=crop'
];
const SLIDE_INTERVAL = 5000; // ms

// ---------- SLIDESHOW ----------
function createSlides() {
  const container = document.querySelector('.hero-slideshow');
  SLIDES.forEach((url, idx) => {
    const s = document.createElement('div');
    s.className = 'slide';
    s.style.backgroundImage = `linear-gradient(rgba(3,6,10,0.18), rgba(3,6,12,0.28)), url('${url}')`;
    if (idx === 0) s.classList.add('active');
    container.appendChild(s);
  });
}

let currentSlide = 0;
let slideTimer = null;
function startSlideshow() {
  const slides = Array.from(document.querySelectorAll('.hero-slideshow .slide'));
  slideTimer = setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, SLIDE_INTERVAL);
}

// ---------- GSAP ANIMATIONS ----------
function setupGSAP() {
  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance
  const heroTl = gsap.timeline();
  heroTl.from('.eyebrow', { y: -12, opacity: 0, duration: .6, ease: 'power2.out' })
        .from('.hero-title', { y: 20, opacity: 0, duration: .8, ease: 'power3.out' }, '-=.2')
        .from('.hero-sub', { y: 12, opacity: 0, duration: .6 }, '-=.3')
        .from('.hero-actions .btn', { scale: 0.95, opacity: 0, stagger: .12, duration: .45 }, '-=.2')
        .from('.hero-stats div', { y: 10, opacity: 0, stagger: .12, duration: .4 }, '-=.4');

  // Timeline items reveal + draw animated path effect
  const items = gsap.utils.toArray('.timeline-item');
  items.forEach((el, i) => {
    gsap.fromTo(el, { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: .9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%' , toggleActions: 'play none none reverse' },
      delay: i * 0.12
    });
  });

  // Slight parallax card pop on why visual
  gsap.to('.card.big', { y: -6, rotation: -1, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.card.med', { y: -10, rotation: .6, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.card.small', { y: -4, rotation: -0.6, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  // Reviews slide in timeline
  gsap.from('.rev-card', {
    y: 20, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: '.reviews-section', start: 'top 80%' }
  });
}

// ---------- REVIEWS SLIDER (simple, accessible) ----------
function setupReviews() {
  const track = document.querySelector('.rev-track');
  const prev = document.querySelector('.rev-prev');
  const next = document.querySelector('.rev-next');
  const cards = Array.from(track.children);
  let index = 0;

  function update() {
    const w = cards[0].getBoundingClientRect().width + 18; // gap
    track.style.transform = `translateX(-${index * w}px)`;
  }

  prev.addEventListener('click', () => {
    index = Math.max(0, index - 1); update();
  });
  next.addEventListener('click', () => {
    index = Math.min(cards.length - 1, index + 1); update();
  });

  // auto-advance
  setInterval(() => { index = (index + 1) % cards.length; update(); }, 6000);
  window.addEventListener('resize', update);
  update();
}

// ---------- NAV TOGGLE (mobile) ----------
function setupNavToggle() {
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? 'none' : 'flex';
  });
  // hide nav on small screens initially
  if (window.innerWidth < 720) nav.style.display = 'none';
}

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  createSlides();
  startSlideshow();
  setupGSAP();
  setupReviews();
  setupNavToggle();
});
