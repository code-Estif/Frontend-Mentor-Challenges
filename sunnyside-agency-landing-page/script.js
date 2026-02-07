
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.body;

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  
  if (mobileMenu.classList.contains('active')) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = '';
  }
});

const mobileMenuLinks = document.querySelectorAll('.mobile-menu-nav a, .mobile-menu-nav .contact-btn');
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    body.style.overflow = '';
  });
});

document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    mobileMenu.classList.remove('active');
    body.style.overflow = '';
  }
});