export class Card {
  _cardItem;
  _cardPicture;

  constructor(imageName, imagePath, templateSelector, scalePictureFunction) {
    const cardTemplate = document.querySelector(templateSelector).content;
    this._cardItem = cardTemplate.querySelector('.elements__item').cloneNode(true);
    //Передаем имя и путь для экземпляра
    this._cardItem.querySelector('.elements__title').textContent = imageName;
    this._cardPircture = this._cardItem.querySelector('.elements__image');
    this._cardPircture.src = imagePath;
    this._cardPircture.alt = imageName;
    this._scalePictureFunction = scalePictureFunction;
    this._cardLikeButton = this._cardItem.querySelector('.elements__like');
    this._setEventListeners();
  }

  getCard = () => {
    return this._cardItem;
  }
  _setEventListeners = () => {
    //Добавляем событие открытия изображения на все окно
    this._cardPircture.addEventListener('click',
      () => this._scalePictureFunction(this._cardPircture.alt, this._cardPircture.src));
    //Добавляем событие для лайка
    this._cardLikeButton.addEventListener('click', () => this._cardLikeButton.classList.toggle('elements__like_actived'));
    //Добавляем событие удаления карточки
    const cardDeleteButton = this._cardItem.querySelector('.elements__delete-button');
    cardDeleteButton.addEventListener('click', () => this._cardItem.remove());
  }
}