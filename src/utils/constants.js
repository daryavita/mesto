export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input-info',
    submitButtonSelector: '.popup__submit',
    inputErrorClass: 'popup__input-info_type_error',
    errorClass: 'popup__error_visible',
    inactiveButtonClass: 'popup__submit_disabled',
};

// карточки
export const cardListSelector = '.cards-list';
export const cardTemplateSelector = '.cards-template';

// инпуты
export const nameProfileInput = document.querySelector('.popup__input-info_type_name');
export const jobProfileInput = document.querySelector('.popup__input-info_type_job');

// кнопки
export const editProfileButton = document.querySelector('.profile__edit-button');
export const addCardProfileButton = document.querySelector('.profile__add-button');
export const editAvatarButton = document.querySelector('.profile__add-avatar-button')