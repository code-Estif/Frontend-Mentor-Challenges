document.addEventListener('DOMContentLoaded', function () {
  const menuBtn = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('menu-close');
  const overlay = document.getElementById('menu-overlay');
  const mobileNav = document.getElementById('mobile-nav');

  // Mobile menu functionality
  function openMenu() {
    mobileNav.classList.add('open');
    overlay.classList.add('open');
    menuBtn.style.display = 'none';
    closeBtn.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileNav.classList.remove('open');
    overlay.classList.remove('open');
    menuBtn.style.display = 'block';
    closeBtn.style.display = 'none';
    document.body.style.overflow = '';
  }

  if (menuBtn && mobileNav && closeBtn && overlay) {
    menuBtn.style.display = 'block';
    closeBtn.style.display = 'none';
    
    menuBtn.addEventListener('click', function (e) {
      openMenu();
      e.stopPropagation();
    });
    
    closeBtn.addEventListener('click', function (e) {
      closeMenu();
      e.stopPropagation();
    });
    
    overlay.addEventListener('click', function () {
      closeMenu();
    });
    
    mobileNav.addEventListener('click', function (e) {
      e.stopPropagation();
    });
    
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  // Desktop dropdown functionality
  document.querySelectorAll('.dropdown-item').forEach(function (item) {
    const navLink = item.querySelector('.nav-link');
    const dropdownMenu = item.querySelector('.dropdown-menu');
    
    if (navLink && dropdownMenu) {
      // Click to toggle
      navLink.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Close all other dropdowns
        document.querySelectorAll('.dropdown-menu.show').forEach(function (menu) {
          if (menu !== dropdownMenu) {
            menu.classList.remove('show');
          }
        });
        
        // Toggle current dropdown
        dropdownMenu.classList.toggle('show');
      });
    }
  });

  // Mobile dropdown functionality
  document.querySelectorAll('.mobile-dropdown-item').forEach(function (item) {
    const trigger = item.querySelector('div');
    const dropdownMenu = item.querySelector('.mobile-dropdown-menu');
    
    if (trigger && dropdownMenu) {
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        
        // Toggle current dropdown
        const isOpen = dropdownMenu.style.display === 'block';
        dropdownMenu.style.display = isOpen ? 'none' : 'block';
        
        // Rotate arrow
        const arrow = trigger.querySelector('.mobile-dropdown-arrow');
        if (arrow) {
          arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        }
      });
    }
  });

  // Close dropdowns when clicking outside
  document.body.addEventListener('click', function () {
    document.querySelectorAll('.dropdown-menu.show').forEach(function (menu) {
      menu.classList.remove('show');
    });
  });

  // Prevent dropdown clicks from closing the dropdown
  document.querySelectorAll('.dropdown-menu').forEach(function (menu) {
    menu.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  });

  // Mobile dropdown menu clicks
  document.querySelectorAll('.mobile-dropdown-menu').forEach(function (menu) {
    menu.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  });

  // Mobile action buttons
  document.querySelector('.mobile-login-btn')?.addEventListener('click', function () {
    closeMenu();
  });

  document.querySelector('.mobile-register-btn')?.addEventListener('click', function () {
    closeMenu();
  });
});