import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__container_type_form");
    //console.log(this._form)
    //this._getInputValues();
  }

  _getInputValues() {
    //Вернуть объект
    Array.from(this._form).forEach(element => {
      //console.log(element.nodeName);
      //console.log(element.id);
      if (element.nodeName === "INPUT") {
        this._inputs[element.id]
      }
    })
  }

  setEventListeners() {
    super.setEventListeners();
  }

}

export default PopupWithForm;