const shareButton = document.querySelector(".share-btn");
const articleCard = document.querySelector(".card");
const sharePopup = document.querySelector(".share-popup");

if (shareButton && articleCard && sharePopup) {
  shareButton.addEventListener("click", handleShareClick);

  function handleShareClick(e) {
    e.preventDefault();
    const isActive = articleCard.classList.toggle("active");

    shareButton.setAttribute("aria-expanded", isActive);
    sharePopup.setAttribute("aria-hidden", !isActive);
  }

  // Close when clicking outside (optional UX improvement)
  document.addEventListener("click", function (e) {
    if (
      articleCard.classList.contains("active") &&
      !articleCard.contains(e.target)
    ) {
      articleCard.classList.remove("active");
      shareButton.setAttribute("aria-expanded", "false");
      sharePopup.setAttribute("aria-hidden", "true");
    }
  });
}