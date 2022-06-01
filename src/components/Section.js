export default class Section {
  constructor({ items, renderer }, sectionSelector) {
    this._items = items;
    this._renderer = renderer;
    this._section = document.querySelector(sectionSelector);
  }

  renderItems(images, userID) {
    images.forEach(image => {
      const element = this._renderer(image, userID);
      this._section.prepend(element);
    })
  }

  addItem = (element) => {
    this._section.prepend(element);
  }
}