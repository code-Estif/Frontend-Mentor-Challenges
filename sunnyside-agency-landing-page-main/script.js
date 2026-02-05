// Mobile menu toggle functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.body;

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  
  // Prevent body scroll when menu is open
  if (mobileMenu.classList.contains('active')) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = '';
  }
});

// Close menu when clicking on a link
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-nav a, .mobile-menu-nav .contact-btn');
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    body.style.overflow = '';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    mobileMenu.classList.remove('active');
    body.style.overflow = '';
  }
});