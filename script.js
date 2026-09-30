// Navigation mobile, animations et année du footer
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');

  // Mobile nav toggle
  toggle?.addEventListener('click', () => {
    nav?.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', nav?.classList.contains('nav-open') ? 'true' : 'false');
  });

  // Footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Reveal on scroll -- support both legacy .reveal and new .reveal-on-scroll
  const revealItems = document.querySelectorAll('.reveal-on-scroll, .reveal');
  if ('IntersectionObserver' in window && revealItems.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item, i) => {
      // staggered delay for nicer effect
      item.style.transitionDelay = `${i * 60}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  // Counters (data-count) - animate when visible
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count || 0);
        let current = 0;
        const step = Math.max(1, Math.floor(target / 60));
        const interval = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = String(target);
            clearInterval(interval);
          } else {
            el.textContent = String(current);
          }
        }, 12);
        obs.unobserve(el);
      });
    }, { threshold: 0.2 });

    counters.forEach(c => counterObserver.observe(c));
  } else {
    counters.forEach(c => { c.textContent = c.dataset.count || c.textContent; });
  }

  // Highlight current project link if any
  try {
    document.querySelectorAll('.project-link').forEach(a => {
      const current = location.pathname.replace(/\/$/, '');
      const target = new URL(a.href, location.origin).pathname.replace(/\/$/, '');
      if (current === target) a.classList.add('active');
    });
  } catch (e) {
    // ignore
  }
});
