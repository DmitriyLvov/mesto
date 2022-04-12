const popups = document.querySelectorAll('.popup')
//Все элементы Popup для редактирования профиля
const profilePopup = document.querySelector('.popup_type_profile');
const profileEditForm = profilePopup.querySelector('[name = "edit-profile-form"]');
const profileEditButton = document.querySelector('.profile__edit-button');
const author = document.querySelector('.profile__text-field_type_author');
const authorInput = profilePopup.querySelector('.popup__text-input_type_author');
const description = document.querySelector('.profile__text-field_type_description');
const descriptionInput = profilePopup.querySelector('.popup__text-input_type_description');
const profilePopupCloseButton = profilePopup.querySelector('.popup__close-button');
const profilePopupConfirmButton = profilePopup.querySelector('.popup__submit-button');
//Все элементы Popup для создания новой карточки
const cardPopup = document.querySelector('.popup_type_card');
const cardAddForm = cardPopup.querySelector('[name = "add-card-form"]');
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
  //Удалить событие на закрытие popup по клавише ESC
  document.removeEventListener('keydown', closePopupWhenPressEsc);
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
//Функция открытия POPUP
function openPopup(itemPopup) {
  //Добавить событие на закрытие popup по клавише ESC
  document.addEventListener('keydown', closePopupWhenPressEsc);
  //Добавить событие на закрытие popup при клике на overlay
  //document.addEventListener('mousedown', closePopupWhenClickOnOverlay);
  itemPopup.classList.add('popup_opened');
}
//Функция открытия Popup для профиля
function editProfilePopup() {
  //Присвоить значения полям
  authorInput.value = author.textContent;
  descriptionInput.value = description.textContent;
  //Очистить все поля с ошибками
  clearAllErrorMessagesExternal(profileEditForm);
  //Проверка состояния кнопки активации
  toogleButtonStateExternal(profileEditForm);
  //Сделать форму видимой
  openPopup(profilePopup);
}

//Функция создания Popup для добавления картинок
function addNewCardPopup() {
  //Проверка состояния кнопки активации
  toogleButtonStateExternal(cardAddForm);
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

profileEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  if (authorInput.validity.valid && descriptionInput.validity.valid) {
    author.textContent = authorInput.value;
    description.textContent = descriptionInput.value;
    //Закрываем окно
    closePopup(profilePopup);
    //Очищаем форму
    profileEditForm.reset();
  }
});

//Обработчик события для кноки создания новой карточки
cardAddButton.addEventListener('click', addNewCardPopup);

//Обработчик события submit для кнопки подтверждения новой карточки
cardAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  cardField.prepend(createCard(cardName.value, cardPath.value));
  //Закрываем окно
  closePopup(cardPopup);
  //Очищаем форму
  cardAddForm.reset();
});
//Добавление событий закрытия popup по клику на оверлей и нажатию на
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
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
})