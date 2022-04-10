//Все элементы Popup для редактирования профиля
const profilePopup = document.querySelector('.popup_type_profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const author = document.querySelector('.profile__text-field_type_author');
const authorInput = profilePopup.querySelector('.popup__text-input_type_author');
const description = document.querySelector('.profile__text-field_type_description');
const descriptionInput = profilePopup.querySelector('.popup__text-input_type_description');
const profilePopupCloseButton = profilePopup.querySelector('.popup__close-button');
const profilePopupConfirmButton = profilePopup.querySelector('.popup__submit-button');
//Все элементы Popup для создания новой карточки
const cardPopup = document.querySelector('.popup_type_card');
const cardAddButton = document.querySelector('.profile__add-button');
const cardName = cardPopup.querySelector('.popup__text-input_type_picture-name');
const cardPath = cardPopup.querySelector('.popup__text-input_type_picture-path');
const cardPopupCloseButton = cardPopup.querySelector('.popup__close-button');
const cardPopupConfirmButton = cardPopup.querySelector('.popup__submit-button');
//Все элементы POPUP для просмотра картинки во весь экран
const imagePopup = document.querySelector('.popup_type_image');
const image = imagePopup.querySelector('.popup__image');
const imageDescription = imagePopup.querySelector('.popup__description');
const imagePopupСloseButton = imagePopup.querySelector('.popup__close-button');
//Все элементы для создания карточек
const cardTemplate = document.querySelector('#card-template').content;
const cardField = document.querySelector('.elements');
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//Функция закрытия POPUP
function closePopup(itemPopup) {
  itemPopup.classList.remove('popup_opened');
  const formPopup = itemPopup.querySelector('.popup__container_type_form');
  if (formPopup !== null) {
    //Очищаем поля формы после закрытия
    formPopup.reset();
  }
  //Добавить событие на закрытие popup по клавише ESC
  document.removeEventListener('keydown', closePopupWhenPressEsc);
  //Добавить событие на закрытие popup при клике на overlay
  document.removeEventListener('mousedown', closePopupWhenClickOnOverlay);
}
//Функция закрытия POPUP при нажатии на ESC
function closePopupWhenPressEsc(evt) {
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
//Функция закрытия POPUP при клике на overlay
function closePopupWhenClickOnOverlay(evt) {
  const elementUnderClick = evt.target;
  //Проверяем элемент на принадлежность к overlay
  if (elementUnderClick.classList.contains('popup') && evt.which === 1) {
    closePopup(elementUnderClick);
  }
}
//Функция открытия POPUP
function openPopup(itemPopup) {
  const formPopup = itemPopup.querySelector('.popup__container_type_form');
  if (formPopup !== null) {
    //Проверяем текущие значения для активации кнопки подтвердить
    toogleButtonStateExternal(formPopup);
    //Очищаем все ошибки от предыдущего вызова
    clearAllErrorMessagesExternal(formPopup);
  }
  //Добавить событие на закрытие popup по клавише ESC
  document.addEventListener('keydown', closePopupWhenPressEsc);
  //Добавить событие на закрытие popup при клике на overlay
  document.addEventListener('mousedown', closePopupWhenClickOnOverlay);
  itemPopup.classList.add('popup_opened');
}
//Функция открытия Popup для профиля
function editProfilePopup() {
  //Присвоить значения полям
  authorInput.value = author.textContent;
  descriptionInput.value = description.textContent;
  //Сделать форму видимой
  openPopup(profilePopup);
}

//Функция создания Popup для добавления картинок
function addNewCardPopup() {
  //Сделать форму видимой
  openPopup(cardPopup);
}

//Функция открытия Popup для увеличения картинки
function scalePicture(name, path) {
  //передаем данные о картинке
  image.src = path;
  image.alt = name;
  //Заполнение описания
  imageDescription.textContent = name;
  //Обработчик событий для закрытия от нажатия ESC
  document.addEventListener('keydown', closePopupWhenPressEsc);
  //Сделать окно видимым
  openPopup(imagePopup);
}

//Функция создания карточки по шаблону
function createCard(name, path) {
  const cardItem = cardTemplate.querySelector('.elements__item').cloneNode(true);
  //Передаем имя и путь для экземпляра
  cardItem.querySelector('.elements__title').textContent = name;
  const cardPircture = cardItem.querySelector('.elements__image');
  cardPircture.src = path;
  cardPircture.alt = name;
  //Добавляем событие открытия изображения на все окно
  cardPircture.addEventListener('click', () => scalePicture(name, path));
  //Добавляем событие для лайка
  const cardLikeButton = cardItem.querySelector('.elements__like');
  cardLikeButton.addEventListener('click', () => cardLikeButton.classList.toggle('elements__like_actived'));
  //Добавляем событие удаления карточки
  const cardDeleteButton = cardItem.querySelector('.elements__delete-button');
  cardDeleteButton.addEventListener('click', () => cardItem.remove());
  return cardItem;
}
//Создаем карточки из начального массива
initialCards.forEach(card => cardField.prepend(createCard(card.name, card.link)));

//Обработчик события для кнопки изменения данных автора
profileEditButton.addEventListener('click', editProfilePopup);

//Обработчик события submit для формы редактирования профиля
const profileEditForm = profilePopup.querySelector('[name = "edit-profile-form"]');
profileEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  if (authorInput.validity.valid && descriptionInput.validity.valid) {
    author.textContent = authorInput.value;
    description.textContent = descriptionInput.value;
    //Закрываем окно
    closePopup(profilePopup);
  }
});

//Обработчик события закрытия окна profile popup
profilePopupCloseButton.addEventListener('click', () => closePopup(profilePopup));

//Обработчик события для кноки создания новой карточки
cardAddButton.addEventListener('click', addNewCardPopup);

//Обработчик события submit для кнопки подтверждения новой карточки
const cardAddForm = cardPopup.querySelector('[name = "add-card-form"]');
cardAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  cardField.prepend(createCard(cardName.value, cardPath.value));
  //Закрываем окно
  closePopup(cardPopup);
});

//Обработчик события закрытия окна card Popup
cardPopupCloseButton.addEventListener('click', () => closePopup(cardPopup));

//Обработчик события закрытия окна image Popup
imagePopupСloseButton.addEventListener('click', () => closePopup(imagePopup))