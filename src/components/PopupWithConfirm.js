import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
    constructor({ popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
    }

    changeSubmitHandler(newSubmitHundler) {
        this._handleFormSubmit = newSubmitHundler;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
        })
    }
}