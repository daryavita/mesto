export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Великий Новгород',
        link: 'https://images.unsplash.com/photo-1632214298882-03a0aa4bcc90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
    },
    {
        name: 'Уралмаш',
        link: 'https://images.unsplash.com/photo-1604314035762-38a690347d7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80'
    }
];

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

// попапы
export const popupTypeEdit = document.querySelector('.popup_type_edit');
export const popupTypeAddCard = document.querySelector('.popup_type_add-card');

// формы
export const formEditElement = popupTypeEdit.querySelector('.popup__form');
export const formAddElement = popupTypeAddCard.querySelector('.popup__form');

// инпуты
export const nameProfileInput = document.querySelector('.popup__input-info_type_name');
export const jobProfileInput = document.querySelector('.popup__input-info_type_job');

// кнопки
export const editProfileButton = document.querySelector('.profile__edit-button');
export const addCardProfileButton = document.querySelector('.profile__add-button');