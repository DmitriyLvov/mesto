import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._imageDescription = this._popup.querySelector('.popup__description');
  }

  open = (name, path) => {
    //передаем данные о картинке
    this._image.src = path;
    this._image.alt = name;
    //Заполнение описания
    this._imageDescription.textContent = name;
    //Сделать окно видимым
    super.open();
  }
}

export default PopupWithImage;