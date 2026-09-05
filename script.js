// Petit JS pour le toggle du menu mobile et l'année du footer
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  toggle?.addEventListener('click', () => {
    if(!nav) return;
    nav.style.display = (nav.style.display === 'flex' || nav.style.display === 'block') ? 'none' : 'flex';
  });

  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  // Highlight project link whose href matches current path
  try {
    const projectLinks = document.querySelectorAll('.project-link');
    const currentPath = location.pathname.replace(/\/$/, '');
    projectLinks.forEach(a => {
      const hrefPath = new URL(a.href, location.origin).pathname.replace(/\/$/, '');
      if (hrefPath === currentPath) a.classList.add('active');
    });
  } catch (e) {
    // ignore if URL parsing fails in some contexts
    console.error(e);
  }
});
