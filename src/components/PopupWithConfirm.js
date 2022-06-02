import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__container_type_form');
    this._submitButton = this._form.querySelector('.popup__submit-button');
    this._originalSubmitText = this._submitButton.textContent;
  }


  changeSubmitFunction = (newSubmitFunction) => {
    if (this._handleSubmit) {
      this._form.removeEventListener('submit', this._handleSubmit);
    }
    this._form.addEventListener('submit', newSubmitFunction);
    this._handleSubmit = newSubmitFunction;
  }

}