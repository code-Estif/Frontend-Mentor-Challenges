const menuToggle = document.getElementById('menu-toggle');
const menuIcon = document.getElementById('menu-icon');
const overlay = document.getElementById('overlay');

menuToggle.addEventListener('click', () => {
    menuIcon.classList.toggle('open');
    overlay.classList.toggle('active');
    
    document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : 'auto';
});

overlay.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        menuIcon.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});