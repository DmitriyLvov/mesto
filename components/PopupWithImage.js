import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor({ name, path }, popupSelector) {
    super(popupSelector);
    console.log(this._popup)
    this._image = this._popup.querySelector('.popup__image');
    this._path = path;
    this._name = name;
    this._imageDescription = this._popup.querySelector('.popup__description');
  }

  open() {
    //передаем данные о картинке
    this._image.src = this._path;
    this._image.alt = this._name;
    //Заполнение описания
    this._imageDescription.textContent = this._name;
    //Сделать окно видимым
    super.open();
  }
}

export default PopupWithImage;