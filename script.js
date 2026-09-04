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
});
