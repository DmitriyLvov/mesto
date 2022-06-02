import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__container');
    this._handleSubmit = (evt) => handleSubmit(evt, this._getInputValues(), this);
    this._submitButton = this._form.querySelector('.popup__submit-button');
    this._originalSubmitText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputs = {};
    Array.from(this._form).forEach(element => {
      if (element.nodeName === 'INPUT') {
        inputs[element.id] = element.value;
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
      //Если инпут существует, то передаем значение
      if (input) {
        input.value = inputData[1];
      }
    })
  }

  close() {
    super.close();
    this._form.reset();
  }

}

export default PopupWithForm;