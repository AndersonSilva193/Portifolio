
const btn = document.getElementById('themeBtn');

btn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  btn.innerHTML =
    document.body.classList.contains('light') ? '<img src="img/sun.png" alt="Sol" width="25" height="25">' : '<img src="img/dark.png" alt="Lua" width="25" height="25">';
});