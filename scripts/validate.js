
function submitForm(event) {
    event.preventDefault();
    console.log('submit'); 
}

function validateInput(form, input, {inputErrorClass, errorClass}) {
    const errorContainer = form.querySelector(`#${input.id}-error`);
    console.log(input.validationMessage)

    if (input.validity.valid) {
        input.classList.remove(inputErrorClass)
        errorContainer.classList.remove(errorClass);
        errorContainer.textContent = " ";
    } else {
        input.classList.add(inputErrorClass)
        errorContainer.classList.add(errorClass);
        errorContainer.textContent = input.validationMessage;
    }
}

function enableValidation({ formSelector, inputSelector, ...rest }) {
    const forms = document.querySelectorAll(formSelector);
    console.log(forms)

    forms.forEach(form => {
        form.addEventListener('submit', submitForm);

        const inputs = form.querySelectorAll(inputSelector);

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateInput(form, input, rest);
            });
        })
    })

     
};

enableValidation( {
    formSelector: '.popup__form',
    inputSelector: '.popup__input-info',
    // errorSelector: '.popup__error',
    inputErrorClass: 'popup__input-info_type_error',
    errorClass: 'popup__error_visible'
});
 





// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
//   }); 