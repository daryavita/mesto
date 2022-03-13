export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._inputSelector = settings.inputSelector;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._button = this._form.querySelector(this._submitButtonSelector);
        this._inputs = this._form.querySelectorAll(this._inputSelector);
    }

    _showError = (input, errorContainer) => {
        input.classList.add(this._inputErrorClass);
        errorContainer.classList.add(this._errorClass);
        errorContainer.textContent = input.validationMessage;
    }

    _hideError = (input, errorContainer) => {
        console.log('hide', errorContainer) // undefined
        
        input.classList.remove(this._inputErrorClass);
        errorContainer.classList.remove(this._errorClass);
        errorContainer.textContent = " ";
    }

    _enableSubmitButton = () => {
        this._button.classList.remove(this._inactiveButtonClass);
        this._button.removeAttribute('disabled');
    }

    _disableSubmitButton = () => {
        this._button.classList.add(this._inactiveButtonClass);
        this._button.setAttribute('disabled', 'disabled');
    }

    resetValidation(input) {
        this._toggleButton();

        const errorContainer = this._form.querySelector(`#${input.id}-error`);
  
        this._inputs.forEach((input) => {
          this._hideError(input, errorContainer)
        });
    }

    _toggleButton = () => {
        const isFormValid = this._form.checkValidity();

        if (isFormValid) {
            this._enableSubmitButton();
        } else {
            this._disableSubmitButton();
        }
    }

    _validateInput = (input) => {
        const errorContainer = this._form.querySelector(`#${input.id}-error`);

        if (input.validity.valid) {
            this._hideError(input, errorContainer);
        } else {
            this._showError(input, errorContainer);
        }

        this._toggleButton();
    }

    enableValidation() {

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._inputs.forEach(input => {
            input.addEventListener('input', () => {
                this._validateInput(input);
            });
        });

        this._form.addEventListener('reset', () => this._disableSubmitButton());

        this._toggleButton();
    }
}