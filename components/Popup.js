export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  open() {
    this._popup.classList.add('popup_opened');
    //Добавить событие на закрытие popup по клавише ESC
    document.addEventListener('keydown', _handleEscClose);
  }
  close() {
    this._popup.classList.remove('popup_opened');
    //Удалить событие на закрытие popup по клавише ESC
    document.removeEventListener('keydown', _handleEscClose);
  }
  _handleEscClose() {
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
  }
}