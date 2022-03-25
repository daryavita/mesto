export class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    render(items) {
        items.reverse();
        items.forEach((card) => {
            this._renderer(card);
        })
    }

    addItem(element) {
        this._container.prepend(element);
    }
}
