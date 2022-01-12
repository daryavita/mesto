// профиль
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');

// карточки
const cardList = document.querySelector('.cards-list');
const cardTemplate = document.querySelector('.cards-template').content;
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
        name: 'Великий Новгород',
        link: 'https://images.unsplash.com/photo-1632214298882-03a0aa4bcc90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
    },
    {
        name: 'Уралмаш',
        link: 'https://images.unsplash.com/photo-1604314035762-38a690347d7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80'
    }
];

// попапы
const popup = document.querySelector('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAddCard = document.querySelector('.popup_type_add-card');
const popupTypeOpenCard = document.querySelector('.popup-open-card');
const popupCardImage = document.querySelector('.popup-open-card__image');
const popupCardtTitle = document.querySelector('.popup-open-card__title');

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

function deleteCard(e) {
    e.target.closest('.card').remove();
};

function likeCard(e) {
    e.target.classList.toggle('card__like_active');
}

function createCard (cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    let cardImage = cardElement.querySelector('.card__image');
    let cardTitle = cardElement.querySelector('.card__title');
    const cardLikeButton = cardElement.querySelector('.card__like');
    const cardDeleteButton = cardElement.querySelector('.card__delete');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name.toLowerCase();
    cardTitle.textContent = cardData.name;

    cardDeleteButton.addEventListener('click', deleteCard);
    cardLikeButton.addEventListener('click', likeCard);

    //открытие попапа с картинкой
    cardImage.addEventListener('click', () => {
        togglePopup(popupTypeOpenCard);
        popupCardImage.src = cardData.link;
        popupCardtTitle.textContent = cardData.name;
        popupCardImage.alt = cardData.name.toLowerCase();
    });
    
    cardList.prepend(cardElement);
}; 

editProfileButton.addEventListener('click', editPopup);
editCloseButtonPopup.addEventListener('click', () => togglePopup(popupTypeEdit));
formEditElement.addEventListener('submit', editFormSubmit);
formAddElement.addEventListener('submit', addCardFormSubmit);

addCardProfileButton.addEventListener('click', () => togglePopup(popupTypeAddCard));
addCardCloseButtonPopup.addEventListener('click', () => togglePopup(popupTypeAddCard));
openCardCloseButtonPopup.addEventListener('click', () => togglePopup(popupTypeOpenCard));

initialCards.forEach(createCard);
