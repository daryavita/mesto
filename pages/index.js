import { initialCards, config } from '../utils/constants.js';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { Section } from '../scripts/Section.js'
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { UserInfo } from '../scripts/UserInfo.js';


// карточки
const cardListSelector = '.cards-list';
const cardTemplateSelector = '.cards-template';

// попапы
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAddCard = document.querySelector('.popup_type_add-card');

// формы
const formEditElement = popupTypeEdit.querySelector('.popup__form');
const formAddElement = popupTypeAddCard.querySelector('.popup__form');

// инпуты
const nameProfileInput = document.querySelector('.popup__input-info_type_name');
const jobProfileInput = document.querySelector('.popup__input-info_type_job');

// кнопки
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardProfileButton = document.querySelector('.profile__add-button');

// валидация
const editFormValidation = new FormValidator(config, formEditElement);
const addCardFormValidation = new FormValidator(config, formAddElement);

editFormValidation.enableValidation();
addCardFormValidation.enableValidation();

// форма профиля
const popupTypeEditForm = new PopupWithForm({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: (data) => {
        userInfo.setUserInfo({ name: data.name, job: data.job });
    }
})

const userInfo = new UserInfo({
    profileNameSelector: '.profile__title',
    profileJobSelector: '.profile__subtitle'
})

popupTypeEditForm.setEventListeners();

editProfileButton.addEventListener('click', () => {
    popupTypeEditForm.open();
    nameProfileInput.value = userInfo.getUserInfo().name;
    jobProfileInput.value = userInfo.getUserInfo().job;
});

// отрисовка карточек и форма добавления

function createCard(data) {
    const card = new Card(data, cardTemplateSelector, handleCardClick);
    const cardElement = card.createCard();
    return cardElement;
}

const cardsList = new Section({
    items: initialCards,
    renderer: (data) => {
        createCard(data);
        const cardElement = createCard(data);
        cardsList.addItem(cardElement);
    },
}, cardListSelector
);

cardsList.render();

const popupTypeAddCards = new PopupWithForm({
    popupSelector: '.popup_type_add-card',
    handleFormSubmit: (data) => {
        createCard(data);
        const cardElement = createCard(data);
        cardsList.addItem(cardElement);
    }
})

popupTypeAddCards.setEventListeners();

addCardProfileButton.addEventListener('click', () => {
    popupTypeAddCards.open();
});

const popupWithImage = new PopupWithImage('.popup-open-card');

function handleCardClick(name, link) {
    popupWithImage.open(name, link)
}

popupWithImage.setEventListeners();








