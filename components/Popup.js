export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.setEventListeners();
  }
  open() {
    this._popup.classList.add('popup_opened');
    //Добавить событие на закрытие popup по клавише ESC

  }
  close() {
    this._popup.classList.remove('popup_opened');
    //Удалить событие на закрытие popup по клавише ESC
    this._removeEventListeners();
  }
  _handleEscClose(evt) {
    const key = evt.code;
    if (key === 'Escape') {
      this.close();
    }
  }
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      //Если нажали ЛКМ
      if (evt.which === 1) {
        if (evt.target.classList.contains('popup_opened')) {
          //Если кликнули на overlay
          this.close();
        }
        if (evt.target.classList.contains('popup__close-button')) {
          //Если кликнули на кнопку закрытия
          this.close();
        }
      }
    })

    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  _removeEventListeners() {
    this._popup.removeEventListener('mousedown', (evt) => {
      //Если нажали ЛКМ
      if (evt.which === 1) {
        if (evt.target.classList.contains('popup_opened')) {
          //Если кликнули на overlay
          this.close();
        }
        if (evt.target.classList.contains('popup__close-button')) {
          //Если кликнули на кнопку закрытия
          this.close();
        }
      }
    })

    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
  }
}