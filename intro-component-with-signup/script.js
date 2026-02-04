let firstName = document.getElementById("firstname");
let lastName = document.getElementById("lastname");
let email = document.getElementById("email");
let password = document.getElementById("password");
let submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", function() {
    validateInput(firstName);
    validateInput(lastName);
    validateEmail(email);
    validateInput(password);
});
firstName.addEventListener("blur", function() {
    validateInput(firstName);
});
lastName.addEventListener("blur", function() {
    validateInput(lastName);
});
email.addEventListener("blur", function() {
    validateEmail(email);
});
password.addEventListener("blur", function() {
    validateInput(password);
});

function validateInput(input) {
    let inputArea = input.parentElement;
    let errorMessage = inputArea.querySelector(".error-message");
    if (input.value.trim() === "") {
        inputArea.classList.add("hasError");
        errorMessage.textContent = `${input.placeholder} cannot be empty`;
    } else {
        inputArea.classList.remove("hasError");
        errorMessage.textContent = "";
    }
}

function validateEmail(input) {
    let inputArea = input.parentElement;
    let errorMessage = inputArea.querySelector(".error-message");
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.value.trim() === "") {
        inputArea.classList.add("hasError");
        errorMessage.textContent = `${input.placeholder} cannot be empty`;
    } else if (!emailPattern.test(input.value.trim())) {
        inputArea.classList.add("hasError");
        errorMessage.textContent = "Looks like this is not an email";
    } else {
        inputArea.classList.remove("hasError");
        errorMessage.textContent = "";
    }
}