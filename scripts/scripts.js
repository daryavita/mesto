// профиль
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

// карточки
const cardList = document.querySelector('.cards-list');
const cardTemplate = document.querySelector('.cards-template').content;

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


function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeEscPopup);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEscPopup);
}

function closeOverlay(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target)
    }
}

function closeEscPopup(evt) {
    if (evt.keyCode === 27) {
        const popupOpened = document.querySelector('.popup_opened')
        closePopup(popupOpened)
    } 
}

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

function deleteCard(e) {
    e.target.closest('.card').remove();
};

function likeCard(e) {
    e.target.classList.toggle('card__like_active');
}

function createCard(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeButton = cardElement.querySelector('.card__like');
    const cardDeleteButton = cardElement.querySelector('.card__delete');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name.toLowerCase();
    cardTitle.textContent = cardData.name;

    cardDeleteButton.addEventListener('click', deleteCard);
    cardLikeButton.addEventListener('click', likeCard);

    //открытие попапа с картинкой
    cardImage.addEventListener('click', () => {
        openPopup(popupTypeOpenCard);
        popupCardImage.src = cardData.link;
        popupCardtTitle.textContent = cardData.name;
        popupCardImage.alt = cardData.name.toLowerCase();
    });
   
    return cardElement 
};

function renderCard(cardData) {
    const cardElement = createCard(cardData)
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
