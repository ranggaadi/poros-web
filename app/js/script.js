function hamburger() {
  let menu = document.getElementById('hamburger-menu');
  let hamburger = document.getElementById('js-hamburger');
  menu.classList.toggle('hamburger-active');
  hamburger.classList.toggle('is-active');
}

document.addEventListener('scroll', function () {
  let top = window.pageYOffset || document.documentElement.scrollTop;
  let navbar = document.getElementById('navbar');
  if (top > 10) {
    navbar.classList.add('box-shadow-1');
  } else {
    navbar.classList.remove('box-shadow-1');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  let menuLink = document.querySelectorAll('.navbar-nav a');
  let hamburgerLink = document.querySelectorAll('.hamburger-menu-container a');
  [...menuLink].filter(menu => menu.href == window.location.href)[0].classList.add('active-link');
  [...hamburgerLink].filter(menu => menu.href == window.location.href)[0].classList.add('active-link');
});
