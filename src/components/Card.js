export class Card {
    constructor(data, cardTemplateSelector, handleCardClick, handleDeleteClick, userId, handleLikeClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardId = data._id;
        this._userId = userId;
        this._ownerId = data.owner._id;
        this._template = document.querySelector(cardTemplateSelector).content;
        this._cardElement = this._template.cloneNode(true);
        this._card = this._cardElement.querySelector('.card')
        this._likeCount = this._card.querySelector('.card__like-count');
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }

    deleteCard() {
        this._card.remove();
    };

    _likeCard() {
        this._cardLikeButton.classList.add('card__like_active');
    }

    _likeCardDisabled() {
        this._cardLikeButton.classList.remove('card__like_active');
    }

    isLicked() {
        const userHasLikedCard = this._likes.find(user => user._id === this._userId)
        return userHasLikedCard
    }

    setLikes(countLikes) {
        this._likes = countLikes;
        this._likeCount.textContent = this._likes.length;

        if (this.isLicked()) {
            this._likeCard()
        } else {
            this._likeCardDisabled()
        }

    }

    _setEventListeners = () => {
        this._cardDeleteButton.addEventListener('click', () => this._handleDeleteClick(this._cardId))
        this._cardLikeButton.addEventListener('click', () => this._handleLikeClick(this._cardId));
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });
        this.setLikes(this._likes)
    }

    createCard = () => {
        this._cardImage = this._cardElement.querySelector('.card__image');
        const cardTitle = this._cardElement.querySelector('.card__title');
        this._cardLikeButton = this._cardElement.querySelector('.card__like');
        this._cardDeleteButton = this._cardElement.querySelector('.card__delete');

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name.toLowerCase();
        cardTitle.textContent = this._name;

        this._setEventListeners();

        if (this._ownerId !== this._userId) {
            this._cardDeleteButton.style.display = 'none'
        }

        return this._cardElement;

    };

}

