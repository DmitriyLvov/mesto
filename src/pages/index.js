import './index.css';
import { initialCards } from '../utils/constants/InitialCards';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithImage from '../components/PopupWithImage.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Popup from '../components/Popup.js'
import UserInfo from "../components/UserInfo.js";

//Данные для авторизации
const cohort = "cohort-42";
const token = 'c56e30dc-2883-4270-a59e-b2f7bae969c6';

const formValidators = {};
//Все элементы Popup для редактирования профиля
const profilePopup = document.querySelector('.popup_type_profile');
const profileEditForm = profilePopup.querySelector('[name = "edit-profile-form"]');
const profileEditButton = document.querySelector('.profile__edit-button');

//Все элементы Popup для создания новой карточки
const cardPopup = document.querySelector('.popup_type_card');
const cardAddForm = cardPopup.querySelector('[name = "add-card-form"]');
const cardAddButton = document.querySelector('.profile__add-button');
//Создаем Попап для просмотра изображений
const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();


//Функция создания карточки по шаблону
function createCard(card) {
  const newCard = new Card(card.name, card.link, '#card-template', (name, path) => imagePopup.open(name, path));
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
function addNewCardPopup(cardPopup) {
  //Очистить все поля с ошибками
  formValidators.cardValidator.clearAllErrorMessages();
  //Проверка состояния кнопки активации
  formValidators.cardValidator.toggleButtonState();
  cardPopup.open();
}

const userInfo = new UserInfo('.profile__text-field_type_author', '.profile__text-field_type_description');

//Функция открытия Popup для профиля
function editProfilePopup(userInfo, formPopup) {
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

//Функция подтверждения удаления
const submitDeleteCard = () => {

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

//Создаем Popup с формой для редактирования данных автора
const authorPopup = new PopupWithForm('.popup_type_profile', submitEditForm);
authorPopup.setEventListeners();
//Обработчик события для кнопки изменения данных автора
profileEditButton.addEventListener('click', () => editProfilePopup(userInfo, authorPopup));

//Создаем Popup для добавления новой картинки
const newCardPopup = new PopupWithForm('.popup_type_card', submitAddCard);
newCardPopup.setEventListeners();

//Валидация формы создания новой карточки
formValidators.cardValidator = new FormValidator(settings, cardAddForm);
formValidators.cardValidator.enableValidation();
//Обработчик события для кноки создания новой карточки
cardAddButton.addEventListener('click', () => addNewCardPopup(newCardPopup));

const confirmingPopup = new Popup('.popup_type_confirm');
//console.log(confirmingPopup);
//confirmingPopup.open();