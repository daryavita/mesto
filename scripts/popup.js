// профиль
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');

// карточки
const cardList = document.querySelector('.cards-list');
const cardTemplate = document.querySelector('.cards-template').content;

// попапы
const popup = document.querySelector('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAddCard = document.querySelector('.popup_type_add-card');
const popupTypeOpenCard = document.querySelector('.popup-open-card');
const openCardImage = document.querySelector('.popup-open-card__image');
const openCardtTitle = document.querySelector('.popup-open-card__title');

// формы
let formEditElement = popupTypeEdit.querySelector('.popup__form');
let formAddElement = popupTypeAddCard.querySelector('.popup__form');

// инпуты
let nameProfileInput = document.querySelector('.popup__input-info_type_name');
let jobProfileInput = document.querySelector('.popup__input-info_type_job');
let nameCardInput = document.querySelector('.popup__input-info_type_name-card');
let linkCardInput = document.querySelector('.popup__input-info_type_link-card');

// кнопки
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardProfileButton = document.querySelector('.profile__add-button');
const editCloseButtonPopup = popupTypeEdit.querySelector('.popup__close');
const addCardCloseButtonPopup = popupTypeAddCard.querySelector('.popup__close');
const openCardCloseButtonPopup = popupTypeOpenCard.querySelector('.popup__close');


function togglePopup(popup) {
    popup.classList.toggle('popup_opened');
}

function editPopup() {
    nameProfileInput.value = nameProfile.textContent;
    jobProfileInput.value = jobProfile.textContent;
    togglePopup(popupTypeEdit);
}

function editFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameProfileInput.value;
    jobProfile.textContent = jobProfileInput.value;
    togglePopup(popupTypeEdit);
}

function addCardFormSubmit(evt) {
    evt.preventDefault();
    createCard({
        name: nameCardInput.value,
        link: linkCardInput.value
    });
    togglePopup(popupTypeAddCard);
    formAddElement.reset();
}

editProfileButton.addEventListener('click', editPopup);
editCloseButtonPopup.addEventListener('click', () => togglePopup(popupTypeEdit));
formEditElement.addEventListener('submit', editFormSubmit);
formAddElement.addEventListener('submit', addCardFormSubmit);

addCardProfileButton.addEventListener('click', () => togglePopup(popupTypeAddCard));
addCardCloseButtonPopup.addEventListener('click', () => togglePopup(popupTypeAddCard));
openCardCloseButtonPopup.addEventListener('click', () => togglePopup(popupTypeOpenCard));

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



function createCard (cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const card = cardElement.querySelector('.card');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeButton = cardElement.querySelector('.card__like');
    const cardDeleteButton = cardElement.querySelector('.card__delete');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name.toLowerCase();
    cardTitle.textContent = cardData.name;

    cardDeleteButton.addEventListener('click', () => {
        card.remove();
    });

    cardLikeButton.addEventListener('click', () => {
        cardLikeButton.classList.toggle('card__like_active');
    })

    cardImage.addEventListener('click', () => togglePopup(popupTypeOpenCard));
    
    openCardImage.src = cardImage.src;
    openCardtTitle.textContent = cardTitle.textContent


    console.log(openCardImage.src);

    cardList.prepend(cardElement);
};  


initialCards.forEach(createCard);
