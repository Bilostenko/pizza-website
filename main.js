// sticky navbar
window.addEventListener('scroll', function () {
  const stickyNav = document.querySelector('.sticky');
  const stickyOffsetTop = stickyNav.offsetTop;

  if (window.pageYOffset > stickyOffsetTop) {
      stickyNav.classList.add('fixed');
  } else {
      stickyNav.classList.remove('fixed');
  }
});