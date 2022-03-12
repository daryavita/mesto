export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._initialCards = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    render() {
        this._initialCards.forEach(card =>
            this._renderer(card))
    }

    addItem(element) {
        this._container.prepend(element);
    }
}
