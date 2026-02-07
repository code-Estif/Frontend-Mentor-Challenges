const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileOverlay = document.querySelector('.mobile-overlay');
const body = document.body;
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function toggleMenu() {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  
  menuToggle.setAttribute('aria-expanded', !isExpanded);
  mobileMenu.setAttribute('aria-hidden', isExpanded);
  mobileOverlay.setAttribute('aria-hidden', isExpanded);
  
  if (!isExpanded) {
    body.classList.add('menu-open');
  } else {
    body.classList.remove('menu-open');
  }
}

menuToggle.addEventListener('click', toggleMenu);

mobileOverlay.addEventListener('click', toggleMenu);

mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenu.getAttribute('aria-hidden') === 'false') {
      toggleMenu();
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.getAttribute('aria-hidden') === 'false') {
    toggleMenu();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768 && mobileMenu.getAttribute('aria-hidden') === 'false') {
    toggleMenu();
  }
});