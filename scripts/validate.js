
function submitForm(event) {
    event.preventDefault();
    console.log('submit'); 
}

function showError (input, errorContainer, {inputErrorClass, errorClass}) {
    input.classList.add(inputErrorClass)
    errorContainer.classList.add(errorClass);
    errorContainer.textContent = input.validationMessage;
}

function hideError (input, errorContainer, {inputErrorClass, errorClass}) {
    input.classList.remove(inputErrorClass)
    errorContainer.classList.remove(errorClass);
    errorContainer.textContent = " ";
}

function toggleButton (form, {submitButtonSelector, inactiveButtonClass}) {
    const button = form.querySelector(submitButtonSelector);
    const isFormValid = form.checkValidity()

    if (isFormValid) {
        button.classList.remove(inactiveButtonClass);
        button.removeAttribute('disabled');
    } else {
        button.classList.add(inactiveButtonClass);
        button.setAttribute('disabled', 'disabled');
    }
}

function validateInput(form, input, classes) {
    const errorContainer = form.querySelector(`#${input.id}-error`);

    if (input.validity.valid) {
        hideError(input, errorContainer, classes);
    } else {
        showError(input, errorContainer, classes);
    }

    toggleButton(form, classes)
}


function enableValidation({ formSelector, inputSelector, ...rest }) {
    const forms = document.querySelectorAll(formSelector);

    forms.forEach(form => {
        form.addEventListener('submit', submitForm);

        const inputs = form.querySelectorAll(inputSelector);

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateInput(form, input, rest);
            });
        })

        toggleButton(form, rest);
    })
};

enableValidation( {
    formSelector: '.popup__form',
    inputSelector: '.popup__input-info',
    submitButtonSelector: '.popup__submit',
    inputErrorClass: 'popup__input-info_type_error',
    errorClass: 'popup__error_visible',
    inactiveButtonClass: 'popup__submit_disabled',
});