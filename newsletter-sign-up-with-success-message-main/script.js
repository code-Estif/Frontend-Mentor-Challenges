const signupForm = document.querySelector('.signup-form');
const emailInput = document.getElementById('email');
const errorMessage = document.querySelector('.error-message');
const card = document.querySelector('.card');
const successCard = document.querySelector('.success-card');
const dismissButton = document.querySelector('.btn-dismiss');
const userEmailDisplay = document.querySelector('.user-email');

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function showError() {
    emailInput.classList.add('error');
    errorMessage.textContent = 'Valid email required';
    errorMessage.classList.add('active');
}

function clearError() {
    emailInput.classList.remove('error');
    errorMessage.classList.remove('active');
}

function showSuccess(email) {
    card.classList.add('hidden');
    userEmailDisplay.textContent = email;
    successCard.classList.remove('hidden');
}

function resetForm() {
    successCard.classList.add('hidden');
    card.classList.remove('hidden');
    emailInput.value = '';
    clearError();
}

signupForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = emailInput.value.trim();

    if (isValidEmail(email)) {
        clearError();
        showSuccess(email);
    } else {
        showError();
    }
});

emailInput.addEventListener('input', function () {
    if (emailInput.classList.contains('error')) {
        clearError();
    }
});

dismissButton.addEventListener('click', function () {
    resetForm();
});

dismissButton.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        resetForm();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    card.classList.remove('hidden');
    successCard.classList.add('hidden');
    emailInput.value = '';
    clearError();
    emailInput.focus();
});