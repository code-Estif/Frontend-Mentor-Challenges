(function () {
    const form = document.getElementById('contact-form');
    const toast = document.getElementById('success-toast');

    function setError(fieldId, message) {
      const field = document.getElementById(fieldId);
      field.classList.add('error');
      const hint = field.querySelector('.hint');
      if (hint) hint.textContent = message || '';
    }

    function clearError(fieldId) {
      const field = document.getElementById(fieldId);
      field.classList.remove('error');
      const hint = field.querySelector('.hint');
      if (hint) hint.textContent = '';
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      ['first-name-field','last-name-field','email-field','query-type-field','message-field','consent-field']
        .forEach(clearError);

      let hasError = false;

      const firstName = document.getElementById('first-name');
      if (!firstName.value.trim()) { setError('first-name-field', 'This field is required'); hasError = true; }

      const lastName = document.getElementById('last-name');
      if (!lastName.value.trim()) { setError('last-name-field', 'This field is required'); hasError = true; }

      const email = document.getElementById('email');
      if (!email.value.trim()) { setError('email-field', 'This field is required'); hasError = true; }
      else if (!isValidEmail(email.value.trim())) { setError('email-field', 'Please enter a valid email address'); hasError = true; }

      const querySelected = document.querySelector('input[name="queryType"]:checked');
      if (!querySelected) { setError('query-type-field', 'Please select a query type'); hasError = true; }

      const message = document.getElementById('message');
      if (!message.value.trim()) { setError('message-field', 'This field is required'); hasError = true; }

      const consent = document.getElementById('consent');
      if (!consent.checked) { setError('consent-field', 'To submit this form, please consent to being contacted'); hasError = true; }

      if (hasError) return;

      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
      form.reset();
    });
  })();