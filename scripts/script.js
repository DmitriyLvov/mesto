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
//Функция создания Popup для профиля
function editProfile() {
  //Сделать форму видимой
  openPopup(profilePopup);
  //Присвоить значения полям
  authorInput.value = author.textContent;
  descInput.value = desc.textContent;
  //Сделать процедуру закрытия окна
  const closeButton = profilePopup.querySelector('.popup__close-button');
  closeButton.addEventListener('click', closePopup);
  //Создание события submit
  const formElement = profilePopup.querySelector('[name = "edit-form"]');
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    author.textContent = authorInput.value;
    desc.textContent = descInput.value;
    //Закрываем окно
    closePopup(evt);
  });
}

//Функция создания Popup для добавления картинок
function createNewCard(evt) {
  //Сделать форму видимой
  openPopup(cardPopup);
  //Сделать процедуру закрытия окна
  const closeButton = cardPopup.querySelector('.popup__close-button');
  closeButton.addEventListener('click', closePopup);
  //Создание события submit
  const formElement = profilePopup.querySelector('[name = "edit-form"]');
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    //Закрываем окно
    closePopup(evt);
  });
}

//Функция создания карточки по шаблону
function createCardFromData(name, path) {
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
  image.addEventListener('click', () => createPopupImageTemplate(name, path));
  return cardItem;
}

initialCards.forEach(card => cardField.prepend(createCardFromData(card.name, card.link)));

const createPopupFormTemplate = (title, value1, value2, placeHolder1, placeHolder2, submitFunction, confirmButtonContent) => {
  const popupItem = popupFormTemplate.querySelector('.popup').cloneNode(true);
  //Заполнение заголовка
  const titleItem = popupItem.querySelector('.popup__title');
  titleItem.textContent = title;
  //Заполнение полей ПОП-АПа
  const field1Input = popupItem.querySelector('.popup__text-input_type_author');
  const field2Input = popupItem.querySelector('.popup__text-input_type_description');
  field1Input.value = value1;
  field1Input.placeholder = placeHolder1;
  field2Input.value = value2;
  field2Input.placeholder = placeHolder2;
  //Создание кнопки закрытия
  const closeButton = popupItem.querySelector('.popup__close-button');
  closeButton.addEventListener('click', () => smoothClosePopup(popupItem, "form"));
  //Измение надписи кнопки подтверждения
  const confirmButton = popupItem.querySelector('.popup__submit-button');
  confirmButton.textContent = confirmButtonContent;
  //Создание события submit
  const formElement = popupItem.querySelector('[name = "edit-form"]');
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    submitFunction(field1Input.value, field2Input.value);
    //Закрываем окно для сохранения
    smoothClosePopup(popupItem, "form")
  });
  page.append(popupItem);
}
//Создание POP-UP изображения по шаблону


const createPopupImageTemplate = (name, path) => {
  const popupImage = popupImageTemplate.querySelector('.popup').cloneNode(true);
  //Событие закрытия картинки
  const closeButton = popupImage.querySelector('.popup__close-button');
  closeButton.addEventListener('click', () => smoothClosePopup(popupImage, "image"));
  //Присваивание пути до картинки
  const imageSrc = popupImage.querySelector('.popup__image');
  imageSrc.src = path;
  //Заполнение описания
  const imageDesc = popupImage.querySelector('.popup__description');
  imageDesc.textContent = name;
  page.append(popupImage);
}
//Обработчик события для кнопки изменения данных автора

editProfileButton.addEventListener('click', editProfile);

//Обработчик событий для кноки создания новой карточки
addButton.addEventListener('click', createNewCard)
