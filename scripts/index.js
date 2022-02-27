import { initialCards, config } from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// профиль
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

// карточки
const cardList = document.querySelector('.cards-list');
const cardTemplateSelector = '.cards-template'
const popupCardImage = document.querySelector('.popup-open-card__image');
const popupCardtTitle = document.querySelector('.popup-open-card__title');

// попапы
const popups = document.querySelectorAll('.popup')
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAddCard = document.querySelector('.popup_type_add-card');
const popupTypeOpenCard = document.querySelector('.popup-open-card');

// формы
const formEditElement = popupTypeEdit.querySelector('.popup__form');
const formAddElement = popupTypeAddCard.querySelector('.popup__form');

// инпуты
const nameProfileInput = document.querySelector('.popup__input-info_type_name');
const jobProfileInput = document.querySelector('.popup__input-info_type_job');
const nameCardInput = document.querySelector('.popup__input-info_type_name-card');
const linkCardInput = document.querySelector('.popup__input-info_type_link-card');

// кнопки
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardProfileButton = document.querySelector('.profile__add-button');

// валидация

const editFormValidation = new FormValidator(config, formEditElement);
const addCardFormValidation = new FormValidator(config, formAddElement);

editFormValidation.enableValidation();
addCardFormValidation.enableValidation();


const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscKey);
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscKey);
}

const handleEscKey = (evt) => {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector('.popup_opened')
        closePopup(popupOpened)
    }
}

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    })
})

function openProfilePopup() {
    nameProfileInput.value = nameProfile.textContent;
    jobProfileInput.value = jobProfile.textContent;
    openPopup(popupTypeEdit);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameProfileInput.value;
    jobProfile.textContent = jobProfileInput.value;
    closePopup(popupTypeEdit);
}

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    renderCard({
        name: nameCardInput.value,
        link: linkCardInput.value
    });
    closePopup(popupTypeAddCard);
    formAddElement.reset();
}

function handleCardClick(name, link) {
    popupCardImage.src = link;
    popupCardtTitle.textContent = name;
    popupCardImage.alt = name.toLowerCase();
    openPopup(popupTypeOpenCard);
}

function createCard(data) {
    const card = new Card(data, cardTemplateSelector, handleCardClick);
    const cardElement = card.createCard();
    return cardElement;
}

function renderCard(data) {
    const cardElement = createCard(data);
    cardList.prepend(cardElement);
}

editProfileButton.addEventListener('click', openProfilePopup);
addCardProfileButton.addEventListener('click', () => openPopup(popupTypeAddCard));

//сабмиты попапов
formEditElement.addEventListener('submit', handleProfileFormSubmit);
formAddElement.addEventListener('submit', handleAddCardFormSubmit);

initialCards.forEach(renderCard);
