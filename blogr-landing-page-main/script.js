document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav__item");
  const menu = document.getElementById("menu");
  const menuOpenBtn = document.getElementById("menu-open");
  const menuCloseBtn = document.getElementById("menu-close");

  if (navItems.length) {
    document.addEventListener("click", (event) => {
      const activeItem = document.querySelector(".nav__item--active");
      const clickedItem = event.target.closest(".nav__item");

      // Menu-items logica
      if (clickedItem && clickedItem.querySelector(".dropdown")) {
        if (clickedItem === activeItem) {
          activeItem.classList.remove("nav__item--active");
        } else {
          activeItem?.classList.remove("nav__item--active");
          clickedItem.classList.add("nav__item--active");
        }
        return;
      }

      // Klik buiten dropdown-menu
      if (!event.target.closest(".dropdown")) {
        activeItem?.classList.remove("nav__item--active");
      }
    });
  }

  if (menuOpenBtn && menuCloseBtn && menu) {
    const toggleMenu = (open) => {
      menu.classList.toggle("nav--open", open);
      setTimeout(
        () => {
          menuOpenBtn.style.display = open ? "none" : "block";
          menuCloseBtn.style.display = open ? "block" : "none";
        },
        open ? 500 : 200
      );
    };

    menuOpenBtn.addEventListener("click", () => toggleMenu(true));
    menuCloseBtn.addEventListener("click", () => toggleMenu(false));

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        menuOpenBtn.style.display = "none";
        menuCloseBtn.style.display = "none";
      } else {
        toggleMenu(menu.classList.contains("nav--open"));
      }
    });
  }
});