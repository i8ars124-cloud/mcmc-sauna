  const btn = document.querySelector('.hamburger-morph');
  const nav = document.querySelector('.nav-morph');

  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    nav.classList.toggle('active');
  });