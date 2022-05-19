import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__container_type_form');
    this._handleSubmit = (evt) => handleSubmit(evt, this._getInputValues(), this);
    //console.log(this._form)
    //this._getInputValues();
  }

  _getInputValues() {
    const inputs = {};
    Array.from(this._form).forEach(element => {
      //console.log(element.nodeName);
      //console.log(element.id);
      if (element.nodeName === 'INPUT') {
        inputs[element.id] = element;
      }
    })
    return inputs;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit);
  }

  setInputsData = (data) => {
    Object.entries(data).forEach(inputData => {
      //Выполняем поиск нужного input
      const input = this._form.querySelector(`.popup__text-input_type_${inputData[0]}`);
      //Передаем значение
      input.value = inputData[1];
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;