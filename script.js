// Navigation mobile, animations et année du footer
 document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  toggle?.addEventListener('click', () => {
    nav?.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', nav?.classList.contains('nav-open') ? 'true' : 'false');
  });
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), {threshold:.12});
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('is-visible'));
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (!entry.isIntersecting) return; const el = entry.target; const target = Number(el.dataset.count); let current = 0; const duration = target > 100 ? 900 : 650; const start = performance.now(); const update = now => { const progress = Math.min((now - start) / duration, 1); current = Math.round(target * (1 - Math.pow(1 - progress, 3))); el.textContent = current.toLocaleString(); if (progress < 1) requestAnimationFrame(update); }; requestAnimationFrame(update); counterObserver.unobserve(el); }), {threshold:.7});
    counters.forEach(counter => counterObserver.observe(counter));
  }
  try { document.querySelectorAll('.project-link').forEach(a => { const current = location.pathname.replace(/\/$/, ''); const target = new URL(a.href, location.origin).pathname.replace(/\/$/, ''); if (current === target) a.classList.add('active'); }); } catch (e) { /* no-op */ }
 });
