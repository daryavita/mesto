import { config, cardListSelector, cardTemplateSelector, nameProfileInput, jobProfileInput, editProfileButton, addCardProfileButton, editAvatarButton } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { api } from '../components/Api.js';

import '../pages/index.css'

//api
let userId

api.getProfile()
    .then(res => {
        userInfo.setUserInfo(res.name, res.about, res.avatar)
        userId = res._id
    })

api.getInitialCards()
    .then(initialCards => {
        initialCards.forEach(data => {
            createCard(data);
            const cardElement = createCard(data);
            cardsList.addItem(cardElement);
        })
    })

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

// экземпляры классов

const popupTypeEditForm = new PopupWithForm({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: (data) => {
        api.editProfile(data.name, data.job)
            .then(res => {
                changeTextButton({ popupSelector: '.popup_type_edit', isLoading: true })
                userInfo.setUserInfo(res.name, res.about, res.avatar);
            })
            .finally(() => {
                changeTextButton({ popupSelector: '.popup_type_edit', isLoading: false })
                popupTypeEditForm.close()
            })
    }
})

const userInfo = new UserInfo({
    profileNameSelector: '.profile__title',
    profileJobSelector: '.profile__subtitle',
    profileAvatarSelector: '.profile__avatar'
})

const cardsList = new Section({
    items: [],
    renderer: (data) => {
        createCard(data);
        const cardElement = createCard(data);
        cardsList.addItem(cardElement);
    },
}, cardListSelector);

const popupTypeAddCards = new PopupWithForm({
    popupSelector: '.popup_type_add-card',
    handleFormSubmit: (data) => {
        api.addCard(data.name, data.link)
            .then(res => {
                changeTextButton({ popupSelector: '.popup_type_add-card', isLoading: true })
                createCard(res);
                const cardElement = createCard(res);
                cardsList.addItem(cardElement);
            })
            .finally(() => {
                changeTextButton({ popupSelector: '.popup_type_add-card', isLoading: false })
                popupTypeAddCards.close()
            })
    }
})

const popupWithImage = new PopupWithImage('.popup-open-card');
const confirmPopup = new PopupWithForm({ popupSelector: '.popup_type_delete-card' })
const avatarPopup = new PopupWithForm({
    popupSelector: '.popup_type_new-avatar',
    handleFormSubmit: (data) => {
        api.editAvatar(data.avatar)
            .then(res => {
                changeTextButton({ popupSelector: '.popup_type_new-avatar', isLoading: true })
                userInfo.setUserInfo(res.name, res.about, res.avatar);
            })
            .finally(() => {
                changeTextButton({ popupSelector: '.popup_type_new-avatar', isLoading: false })
                avatarPopup.close()
            })
    }
})

// функции

cardsList.render();

function createCard(data) {
    const card = new Card(
        data,
        cardTemplateSelector,
        handleCardClick,
        (id) => {
            confirmPopup.open();
            confirmPopup.changeSubmitHandler(() => {
                api.deleteCardApi(id)
                    .then(res => {
                        card.deleteCard()
                        confirmPopup.close()
                    })
            })
        },
        userId,
        (id) => {
            if (card.isLicked()) {
                api.deleteLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
            } else {
                api.addLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
            }
        }
    );
    const cardElement = card.createCard();
    return cardElement;
}

function changeTextButton({ popupSelector, isLoading }) {
    const popup = document.querySelector(popupSelector)
    const button = popup.querySelector('.popup__submit')
    if (isLoading) {
        button.textContent = 'Сохранение...'
    } else {
        button.textContent = 'Сохранить'
    }
}

function handleCardClick(name, link) {
    popupWithImage.open(name, link)
}

//вызовы

editProfileButton.addEventListener('click', () => {
    popupTypeEditForm.open();
    const { name, job } = userInfo.getUserInfo()
    nameProfileInput.value = name;
    jobProfileInput.value = job;
    formValidators['editform'].resetValidation()
});

addCardProfileButton.addEventListener('click', () => {
    popupTypeAddCards.open();
    formValidators['addform'].resetValidation()
});

editAvatarButton.addEventListener('click', () => {
    avatarPopup.open();
})

popupTypeEditForm.setEventListeners();
popupTypeAddCards.setEventListeners();
popupWithImage.setEventListeners();
confirmPopup.setEventListeners();
avatarPopup.setEventListeners();








