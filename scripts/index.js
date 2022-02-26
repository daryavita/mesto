import { initialCards, popupTypeOpenCard, enableValidation} from './constants.js';
import { Card } from './Card.js';
import { openPopup, closePopup, closeEscPopup, closeOverlay } from './utils.js';
import { FormValidator } from './FormValidator.js';

// профиль
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

// карточки
const cardList = document.querySelector('.cards-list');
const cardTemplate = document.querySelector('.cards-template').content;
const cardTemplateSelector = '.cards-template'

// попапы
const popup = document.querySelector('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAddCard = document.querySelector('.popup_type_add-card');

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
const editCloseButtonPopup = popupTypeEdit.querySelector('.popup__close');
const addCardCloseButtonPopup = popupTypeAddCard.querySelector('.popup__close');
const openCardCloseButtonPopup = popupTypeOpenCard.querySelector('.popup__close');

// валидация

const editFormValidation = new FormValidator(enableValidation, formEditElement);
const addCardFormValidation = new FormValidator(enableValidation, formAddElement);

editFormValidation.enableValidation();
addCardFormValidation.enableValidation();

function editPopup() {
    nameProfileInput.value = nameProfile.textContent;
    jobProfileInput.value = jobProfile.textContent;
    openPopup(popupTypeEdit);
}

function editFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameProfileInput.value;
    jobProfile.textContent = jobProfileInput.value;
    closePopup(popupTypeEdit);
}

function addCardFormSubmit(evt) {
    evt.preventDefault();
    renderCard({
        name: nameCardInput.value,
        link: linkCardInput.value
    });
    closePopup(popupTypeAddCard);
    formAddElement.reset();
}

function renderCard(data) {
    const card = new Card(data, cardTemplateSelector);
    const cardElement = card.createCard();
    cardList.prepend(cardElement);
}

// открытие и закрытие попапа профиля
editProfileButton.addEventListener('click', editPopup);
popupTypeEdit.addEventListener('click', (evt) => closeOverlay(evt, popupTypeEdit));
editCloseButtonPopup.addEventListener('click', () => closePopup(popupTypeEdit));

// открытие и закрытие попапа добавления карточек
addCardProfileButton.addEventListener('click', () => openPopup(popupTypeAddCard));
popupTypeAddCard.addEventListener('click', (evt) => closeOverlay(evt, popupTypeAddCard));
addCardCloseButtonPopup.addEventListener('click', () => closePopup(popupTypeAddCard));

// закрытие открытых карточек
popupTypeOpenCard.addEventListener('click', (evt) => closeOverlay(evt, popupTypeOpenCard));
openCardCloseButtonPopup.addEventListener('click', () => closePopup(popupTypeOpenCard));

//сабмиты попапов
formEditElement.addEventListener('submit', editFormSubmit);
formAddElement.addEventListener('submit', addCardFormSubmit);

initialCards.forEach(renderCard);
