import { initialCards, config, cardListSelector, cardTemplateSelector, formEditElement, formAddElement, nameProfileInput, jobProfileInput, editProfileButton, addCardProfileButton, editAvatarButton } from '../utils/constants.js';
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
        console.log('данные профиля', res)
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
                userInfo.setUserInfo(res.name, res.about, res.avatar);
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
                createCard(res);
                const cardElement = createCard(res);
                cardsList.addItem(cardElement);
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
            userInfo.setUserInfo(res.name, res.about, res.avatar);
        })
    }
})



// функции


// function createCard(data) {
//     const card = new Card(data, cardTemplateSelector, handleCardClick, handleDeleteClick, userId, handleLikeClick);
//     const cardElement = card.createCard();
//     return cardElement;
// }

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


// function handleDeleteClick(Id) { //что-то надо с экземпляром класса сделать
//     console.log('handleIndex', id, card)
//    confirmPopup.open();
//    confirmPopup.changeSubmitHandler(() => {
//        api.deleteCardApi(id, card)
//            .then(res => {
//                console.log('data', id, card)
//                // console.log('card', card)
//                // console.log('deleteCard()', deleteCard())
//                card.deleteCard() // нет функции
//                console.log(res)
//            })
//    })
// }


// function handleDeleteClick(id, card) { // работает без класса, нет видит фукцию deleteCard
//      console.log('handle', id, card)
//     confirmPopup.open();
//     confirmPopup.changeSubmitHandler(() => {
//         api.deleteCardApi(id)
//             .then(() => {
//                 card.remove() 
//             })
//     })
// }


// function handleLikeClick(id) {
//     console.log('like')
//     api.addLike(id)
//         .then( res => {
//             // card.setLikes(res.likes)
//             console.log(res)

//         })
// }

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
    formValidators['avatarform'].resetValidation()
})


popupTypeEditForm.setEventListeners();
popupTypeAddCards.setEventListeners();
popupWithImage.setEventListeners();
confirmPopup.setEventListeners();
avatarPopup.setEventListeners();








