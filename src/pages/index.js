import { initialCards, config, cardListSelector, cardTemplateSelector, formEditElement, formAddElement, nameProfileInput, jobProfileInput, editProfileButton, addCardProfileButton } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

import '../pages/index.css'

// валидация

const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

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
    const {name, job} = userInfo.getUserInfo()
    nameProfileInput.value = name;
    jobProfileInput.value = job; 
    formValidators['editform'].resetValidation()
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
    popupTypeAddCards.resetValidation()
});

const popupWithImage = new PopupWithImage('.popup-open-card');

function handleCardClick(name, link) {
    popupWithImage.open(name, link)
}

popupWithImage.setEventListeners();








