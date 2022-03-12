import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupCardImage = this._popup.querySelector('.popup-open-card__image');
        this._popupCardTitle = this._popup.querySelector('.popup-open-card__title');
    }

    open(name, link) {
        this._popupCardImage.src = link;
        this._popupCardTitle.textContent = name;
        this._popupCardImage.alt = name.toLowerCase();
        super.open();
    }
}