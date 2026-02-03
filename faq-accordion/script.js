const faqButtons = document.querySelectorAll('.faq-question');

faqButtons.forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';

    faqButtons.forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
      btn.nextElementSibling.hidden = true;
    });

    if (!expanded) {
      button.setAttribute('aria-expanded', 'true');
      button.nextElementSibling.hidden = false;
    }
  });
});
