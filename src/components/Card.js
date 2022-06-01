export class Card {
  _cardItem;
  _cardPicture;

  constructor(card, removeFunction, likeFunction, userID, templateSelector, scalePictureFunction) {
    const { name, link, likes, owner, _id } = card;
    owner._id === userID ? this._canRemove = true : this._canRemove = false;
    this._id = _id;
    const cardTemplate = document.querySelector(templateSelector).content;
    this._cardItem = cardTemplate.querySelector('.elements__item').cloneNode(true);
    //Передаем имя и путь для экземпляра
    this._cardItem.querySelector('.elements__title').textContent = name;
    this._cardPircture = this._cardItem.querySelector('.elements__image');
    this._cardPircture.src = link;
    this._cardPircture.alt = name;
    this._cardLikeCounter = this._cardItem.querySelector('.elements__like-counter');
    this._cardLikeCounter.textContent = likes.length;
    this._cardLikeButton = this._cardItem.querySelector('.elements__like');
    this._cardDeleteButton = this._cardItem.querySelector('.elements__delete-button');
    //Удаление картинок доступно только для экземпляров собственного авторства
    if (this._canRemove) {
      this._cardDeleteButton.classList.remove('elements__delete-button_hidden')
    }
    this._scalePictureFunction = scalePictureFunction;
    this._removeCard = () => removeFunction(this._cardItem);
    //Определяем, есть ли лайк на карточке
    likes.some(like => like._id === userID) ? this._liked = true : this._liked = false;
    if (this._liked) {
      this._cardLikeButton.classList.add('elements__like_actived');
    }
    this._likeFunction = likeFunction;
    this._setEventListeners();
  }

  getCard = () => {
    return this._cardItem;
  }

  _likePicture = () => {
    this._likeFunction(this._liked);
    this._cardLikeButton.classList.toggle('elements__like_actived');
    this._liked ? this._cardLikeCounter.textContent-- : this._cardLikeCounter.textContent++;
    this._liked = !this._liked;
  }
  _scalePicture = () => {
    this._scalePictureFunction(this._cardPircture.alt, this._cardPircture.src);
  }

  _setEventListeners = () => {
    //Добавляем событие открытия изображения на все окно
    this._cardPircture.addEventListener('click', this._scalePicture);
    //Добавляем событие для лайка
    this._cardLikeButton.addEventListener('click', this._likePicture);
    //Добавляем событие удаления карточки
    this._cardDeleteButton.addEventListener('click', this._removeCard);
  }
}