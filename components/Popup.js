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
    document.removeEventListener('keydown', closePopupWhenPressEsc);
  }
  _handleEscClose() {
    const key = evt.code;
    if (key === 'Escape') {
      //Ищем открытый popup
      const popupOpened = document.querySelector('.popup_opened');
      //Если popup открыт, то закрываем его
      if (popupOpened !== null) {
        closePopup(popupOpened);
      }
    }
  }
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      //Если нажали ЛКМ
      if (evt.which === 1) {
        if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close-button')) {
          closePopup(popup);
        }
      }
    })
  }
}