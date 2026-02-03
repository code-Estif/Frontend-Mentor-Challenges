const shareButton = document.querySelector(".share-btn");
const articleCard = document.querySelector(".card");
const popup = document.querySelector(".footer__share-popup");

shareButton.addEventListener("click", handleShareButtonClick);

function handleShareButtonClick() {
  const isActive = articleCard.classList.toggle("active");

  shareButton.setAttribute("aria-expanded", isActive);

  popup.setAttribute("aria-hidden", !isActive);
}