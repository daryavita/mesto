import { openPopup } from "./utils.js";
import { popupTypeOpenCard , popupCardImage, popupCardtTitle} from "./constants.js";

export class Card {
    constructor (data, cardTemplateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._template = document.querySelector(cardTemplateSelector).content;
    }

    _deleteCard = (e) => {
        e.target.closest('.card').remove();
    };
    
    _likeCard = (e) => {
        e.target.classList.toggle('card__like_active');
    }

    _handleOpenCard = () => {
        openPopup(popupTypeOpenCard);
        popupCardImage.src = this._link;
        popupCardtTitle.textContent = this._name;
        popupCardImage.alt = this._name.toLowerCase();
    }

    _setEventListeners = () => {
        this._cardDeleteButton.addEventListener('click', this._deleteCard);
        this._cardLikeButton.addEventListener('click', this._likeCard);
        this._cardImage.addEventListener('click', this._handleOpenCard);
    }
  
    createCard = () => {
        this._cardElement = this._template.cloneNode(true);

        this._cardImage = this._cardElement.querySelector('.card__image');
        const cardTitle = this._cardElement.querySelector('.card__title');
        this._cardLikeButton = this._cardElement.querySelector('.card__like');
        this._cardDeleteButton = this._cardElement.querySelector('.card__delete');
    
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name.toLowerCase();
        cardTitle.textContent = this._name;
    
        this._setEventListeners();
       
        return this._cardElement;
    };

}

