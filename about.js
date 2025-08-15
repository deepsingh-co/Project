// Reveal elements on scroll
function reveal() {
  const els = document.querySelectorAll('.fade-in, .slide-left, .slide-right');
  const trigger = window.innerHeight - 60;
  els.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < trigger) el.classList.add('visible');
  });
}
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);
