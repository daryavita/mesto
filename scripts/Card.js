export class Card {
    constructor (data, cardTemplateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._template = document.querySelector(cardTemplateSelector).content;
        this._handleCardClick = handleCardClick;
    }

    _deleteCard = (e) => {
        e.target.closest('.card').remove();
    };
    
    _likeCard = (e) => {
        e.target.classList.toggle('card__like_active');
    }

    _setEventListeners = () => {
        this._cardDeleteButton.addEventListener('click', this._deleteCard);
        this._cardLikeButton.addEventListener('click', this._likeCard);
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
          });
      
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

