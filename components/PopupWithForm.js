import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__container_type_form");
    this._handleSubmit = handleSubmit;
    //console.log(this._form)
    //this._getInputValues();
  }

  _getInputValues() {
    const inputs = {};
    Array.from(this._form).forEach(element => {
      //console.log(element.nodeName);
      //console.log(element.id);
      if (element.nodeName === "INPUT") {
        inputs[element.id] = element;
      }
    })
    return inputs;
  }


  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => this._handleSubmit(evt, this._getInputValues()))
      //console.log(this)
      //this.addEventListener('submit', () => {})
  }

  close() {
    super.close();
    this._form.reset();
  }

}

export default PopupWithForm;