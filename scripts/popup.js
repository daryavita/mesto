const popup = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.name-input');
let jobInput = document.querySelector('.job-input');
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');

function togglePopup() {
    popup.classList.toggle('popup_opened');
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

popupEditButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);


function formSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    togglePopup();
}

formElement.addEventListener('submit', formSubmit); 



