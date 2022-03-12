import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__input-info');

        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
            this._formValues[input.link] = input.value;
            this._formValues[input.job] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        })
    }

    close() {
        super.close();
        this._form.reset();
    }
}