export default class Section {
  constructor(renderer, sectionSelector) {
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