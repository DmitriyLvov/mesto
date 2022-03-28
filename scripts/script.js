// Находим поля формы в DOM для сохранения имени и описания должности
const nameInput = document.querySelector('.popup__text-input_type_author');
const jobInput = document.querySelector('.popup__text-input_type_description');
//Все элементы Popup для редактирования профиля
const profilePopup = document.querySelector('.popup_type_profile');
const editProfileButton = document.querySelector('.profile__edit-button');
const author = document.querySelector('.profile__text-field_type_author');
const authorInput = document.querySelector('.popup__text-input_type_author');
const desc = document.querySelector('.profile__text-field_type_description');
const descInput = document.querySelector('.popup__text-input_type_description');
//Все элементы Popup для создания новой карточки
const cardPopup = document.querySelector('.popup_type_card');
const addButton = document.querySelector('.profile__add-button');
const pictureName = document.querySelector('.popup__text-input_type_picture-name');
const picturePath = document.querySelector('.popup__text-input_type_picture-path');
//Все элементы POPUP для просмотра картинки во весь экран
const imagePopup = document.querySelector('.popup_type_image');
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

//Функция открытия POPUP
function openPopup(itemPopup) {
  itemPopup.classList.add('popup_opened');
}
//Функция закрытия POPUP
function closePopup(evt) {
  //Кнопка close
  const closeButton = evt.currentTarget;
  const popup = closeButton.closest('.popup');
  popup.classList.remove('popup_opened');
}
//Функция открытия Popup для профиля
function editProfilePopup() {
  //Сделать форму видимой
  openPopup(profilePopup);
  //Присвоить значения полям
  authorInput.value = author.textContent;
  descInput.value = desc.textContent;
  //Сделать процедуру закрытия окна
  const closeButton = profilePopup.querySelector('.popup__close-button');
  closeButton.addEventListener('click', closePopup);
}

//Функция создания Popup для добавления картинок
function addNewCardPopup() {
  //Сделать форму видимой
  openPopup(cardPopup);
  //Сделать процедуру закрытия окна
  const closeButton = cardPopup.querySelector('.popup__close-button');
  closeButton.addEventListener('click', closePopup);
}

//Функция открытия Popup для увеличения картинки
function scalePicture(name, path) {
  //Сделать окно видимым
  openPopup(imagePopup);
  //Созбытие закрытия окна
  const closeButton = imagePopup.querySelector('.popup__close-button');
  closeButton.addEventListener('click', closePopup);
  //передаем данные о картинке
  const imageSrc = imagePopup.querySelector('.popup__image');
  imageSrc.src = path;
  //Заполнение описания
  const imageDesc = imagePopup.querySelector('.popup__description');
  imageDesc.textContent = name;
}

//Функция создания карточки по шаблону
function createCard(name, path) {
  const cardItem = cardTemplate.querySelector('.elements__item').cloneNode(true);
  //Передаем имя и путь для экземпляра
  cardItem.querySelector('.elements__title').textContent = name;
  cardItem.querySelector('.elements__image').src = path;
  //Добавляем событие для лайка
  const likeButton = cardItem.querySelector('.elements__like');
  likeButton.addEventListener('click', () => likeButton.classList.toggle('elements__like_actived'));
  //Добавляем событие удаления карточки
  const deleteButton = cardItem.querySelector('.elements__delete-button');
  deleteButton.addEventListener('click', () => cardItem.remove());
  //Добавляем событие открытия изображения на все окно
  const image = cardItem.querySelector('.elements__image');
  image.addEventListener('click', () => scalePicture(name, path));
  return cardItem;
}
//Создаем карточки из начального массива
initialCards.forEach(card => cardField.prepend(createCard(card.name, card.link)));

//Обработчик события для кнопки изменения данных автора
editProfileButton.addEventListener('click', editProfilePopup);

//Создание события submit для формы редактирования профиля
const editProfileForm = profilePopup.querySelector('[name = "edit-profile-form"]');
editProfileForm.addEventListener('submit', (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  author.textContent = authorInput.value;
  desc.textContent = descInput.value;
  //Закрываем окно
  closePopup(evt);
  //Удаляем событие после отработки события
});

//Обработчик событий для кноки создания новой карточки
addButton.addEventListener('click', addNewCardPopup);

//Создание события submit для кнопки подтверждения новой карточки
const addCardForm = cardPopup.querySelector('[name = "add-card-form"]');
addCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  cardField.prepend(createCard(pictureName.value, picturePath.value));
  //Очищаем поля для следующей карточки
  pictureName.value = "";
  picturePath.value = "";
  //Закрываем окно
  closePopup(evt);
});