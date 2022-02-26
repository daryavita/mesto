export const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeEscPopup);
}

export const closePopup = (popup)  => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEscPopup);
}

export const closeOverlay = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target)
    }
}

export const closeEscPopup = (evt) => {
    if (evt.keyCode === 27) {
        const popupOpened = document.querySelector('.popup_opened')
        closePopup(popupOpened)
    } 
}