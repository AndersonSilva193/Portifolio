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
