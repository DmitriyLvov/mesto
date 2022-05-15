import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithImage from '../components/PopupWithImage.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const popups = document.querySelectorAll('.popup')
const formValidators = {};
//Все элементы Popup для редактирования профиля
const profilePopup = document.querySelector('.popup_type_profile');
const profileEditForm = profilePopup.querySelector('[name = "edit-profile-form"]');
const profileEditButton = document.querySelector('.profile__edit-button');

//Все элементы Popup для создания новой карточки
const cardPopup = document.querySelector('.popup_type_card');
const cardAddForm = cardPopup.querySelector('[name = "add-card-form"]');
const cardAddButton = document.querySelector('.profile__add-button');
const cardName = cardPopup.querySelector('.popup__text-input_type_picture-name');
const cardPath = cardPopup.querySelector('.popup__text-input_type_picture-path');
//Все элементы для создания карточек
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

//Функция открытия Popup для увеличения картинки
const handleCardClick = (name, path) => {
  const imagePopup = new PopupWithImage({ name, path }, '.popup_type_image');
  imagePopup.setEventListeners();
  imagePopup.open();
}

//Функция создания карточки по шаблону
function createCard(card) {
  const newCard = new Card(card.name, card.link, '#card-template', handleCardClick);
  return newCard.getCard();
}

//Создаем карточки из начального массива
const section = new Section({ items: initialCards, renderer: createCard }, '.elements');
section.renderItems();

//Функция добавления новой картинки на страинце
function submitAddCard(evt, formInputs, form) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  const newCard = {
    name: formInputs.name.value,
    link: formInputs.path.value
  }
  section.addItem(createCard(newCard));
  form.close();
}

//Функция создания Popup для добавления картинок
function addNewCardPopup() {
  const formPopup = new PopupWithForm('.popup_type_card', submitAddCard);
  formPopup.setEventListeners();
  //Очистить все поля с ошибками
  formValidators.cardValidator.clearAllErrorMessages();
  //Проверка состояния кнопки активации
  formValidators.cardValidator.toggleButtonState();
  formPopup.open();
}

const userInfo = new UserInfo('.profile__text-field_type_author', '.profile__text-field_type_description');

//Функция открытия Popup для профиля
function editProfilePopup(userInfo) {
  //Создаем Popup с формой для редактирования данных автора
  const formPopup = new PopupWithForm('.popup_type_profile', submitEditForm);
  formPopup.setEventListeners();
  formPopup.setInputsData(userInfo.getUserInfo());
  //Очистить все поля с ошибками
  formValidators.profileValidator.clearAllErrorMessages();
  //Проверка состояния кнопки активации
  formValidators.profileValidator.toggleButtonState();
  formPopup.open();
  formPopup.userInfo = userInfo;
}
//Функция callback для сохранения новых данных автора
const submitEditForm = (evt, formInputs, form) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  //Если данные валидны, то сохраняем их на странице
  if (!Object.values(formInputs).some(input => input.validity.valid === false)) {
    form.userInfo.setUserInfo(formInputs.author.value, formInputs.description.value);
  }
  form.close();
}

//Cоздаем класс для валидации форм
const settings = {
  formSelector: '.popup__container_type_form',
  inputSelector: '.popup__text-input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__text-input_type_error',
  errorClass: 'popup__error_visible'
};

//Валидация формы для редактирования профиля
formValidators.profileValidator = new FormValidator(settings, profileEditForm);
formValidators.profileValidator.enableValidation();
//Обработчик события для кнопки изменения данных автора
profileEditButton.addEventListener('click', () => editProfilePopup(userInfo));

//Валидация формы создания новой карточки
formValidators.cardValidator = new FormValidator(settings, cardAddForm);
formValidators.cardValidator.enableValidation();
//Обработчик события для кноки создания новой карточки
cardAddButton.addEventListener('click', () => addNewCardPopup());