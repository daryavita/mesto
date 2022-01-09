
const popup = document.querySelector('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAddCard = document.querySelector('.popup_type_add-card');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardProfileButton = document.querySelector('.profile__add-button');
const editCloseButtonPopup = popupTypeEdit.querySelector('.popup__close');
const addCardCloseButtonPopup = popupTypeAddCard.querySelector('.popup__close');

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input-info_type_name');
let jobInput = document.querySelector('.popup__input-info_type_job');
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');

function togglePopup(popup) {
    popup.classList.toggle('popup_opened');
}

function editPopup() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    togglePopup(popupTypeEdit);
}

function formSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    togglePopup(popupTypeEdit);
}

editProfileButton.addEventListener('click', editPopup);
editCloseButtonPopup.addEventListener('click', () => togglePopup(popupTypeEdit));
formElement.addEventListener('submit', formSubmit);

addCardProfileButton.addEventListener('click', () => togglePopup(popupTypeAddCard));
addCardCloseButtonPopup.addEventListener('click', () => togglePopup(popupTypeAddCard));

const initialCards = [
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
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardList = document.querySelector('.cards-list');
const cardTemplate = document.querySelector('.cards-template').content;

initialCards.forEach(function (cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name.toLowerCase();
    cardTitle.textContent = cardData.name;

    cardList.prepend(cardElement);
});  
