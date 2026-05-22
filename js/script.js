/* ── Current year ───────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Theme toggle (persisted in localStorage) ───────── */
const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');

const stored = localStorage.getItem('theme');
if (stored === 'light' || stored === 'dark') {
  root.setAttribute('data-theme', stored);
}

themeToggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ── Scroll-reveal (with stagger) ──────────────────── */
// Tag obvious elements as reveal targets if they aren't already.
const autoTargets = document.querySelectorAll('.card, .proj-card, .section-title, .tl-item, .info-block, .stat-card, .principle');
autoTargets.forEach((el) => el.classList.add('reveal'));

// Group consecutive reveal siblings so we can stagger them.
const revealEls = document.querySelectorAll('.reveal');
revealEls.forEach((el) => {
  // index among reveal siblings under the same parent for staggered delay
  const siblings = Array.from(el.parentElement?.children || []).filter((c) => c.classList?.contains('reveal'));
  const idx = siblings.indexOf(el);
  if (idx >= 0) el.style.setProperty('--reveal-i', idx);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
revealEls.forEach((el) => observer.observe(el));

/* ── Subtle nav-pill shrink on scroll ──────────────── */
const navPill = document.querySelector('.nav-pill');
if (navPill) {
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (Math.abs(y - lastY) < 6) return;
    navPill.classList.toggle('nav-pill--scrolled', y > 40);
    lastY = y;
  }, { passive: true });
}
