/* =========================================================
   PARCOURS — animations dynamiques
   À coller dans script.js (fonctionne uniquement sur parcours.html,
   les sélecteurs ne matchent rien sur les autres pages donc pas de risque).
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.journey-item');
  const line = document.querySelector('.journey-line-fill');
  const list = document.querySelector('.journey-list');

  if (!items.length) return;

  /* 1) Apparition progressive des cartes au scroll */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // petit décalage pour un effet "cascade"
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, i * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    items.forEach((item) => observer.observe(item));
  } else {
    // Fallback : navigateurs sans IntersectionObserver
    items.forEach((item) => item.classList.add('is-visible'));
  }

  /* 2) Ligne de progression qui se remplit selon la position de scroll */
  if (line && list) {
    const updateLineProgress = () => {
      const rect = list.getBoundingClientRect();
      const viewportH = window.innerHeight;

      // Progression : de 0% quand le haut de la liste entre dans l'écran
      // à 100% quand le bas de la liste atteint le milieu de l'écran.
      const start = viewportH * 0.85;
      const end = viewportH * 0.4;
      const total = rect.height + (start - end);
      const scrolled = start - rect.top;

      let percent = (scrolled / total) * 100;
      percent = Math.max(0, Math.min(100, percent));

      line.style.height = percent + '%';
    };

    updateLineProgress();
    window.addEventListener('scroll', updateLineProgress, { passive: true });
    window.addEventListener('resize', updateLineProgress);
  }
});
