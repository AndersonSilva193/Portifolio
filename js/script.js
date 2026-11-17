const btn = document.getElementById('themeBtn');
const icon = btn.querySelector('img');

function applyTheme(light) {
  document.body.classList.toggle('light', light);
  icon.src = light ? 'img/sun.png' : 'img/dark.png';
}

let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}

applyTheme(saved ? saved === 'light' : window.matchMedia('(prefers-color-scheme: light)').matches);

btn.addEventListener('click', () => {
  const light = !document.body.classList.contains('light');
  applyTheme(light);
  try { localStorage.setItem('theme', light ? 'light' : 'dark'); } catch (e) {}
});

// Menu de seções no celular
const menuBtn = document.getElementById('menuBtn');
const siteMenu = document.getElementById('siteMenu');

function setMenu(open) {
  siteMenu.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Fechar menu de seções' : 'Abrir menu de seções');
}

menuBtn.addEventListener('click', () => {
  setMenu(siteMenu.classList.contains('open') ? false : true);
});

siteMenu.addEventListener('click', (e) => {
  if (e.target.closest('a')) setMenu(false);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && siteMenu.classList.contains('open')) {
    setMenu(false);
    menuBtn.focus();
  }
});
