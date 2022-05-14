import { Card } from "../scripts/Card.js";
import { FormValidator } from "./FormValidator.js";
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
const author = document.querySelector('.profile__text-field_type_author');
const authorInput = profilePopup.querySelector('.popup__text-input_type_author');
const description = document.querySelector('.profile__text-field_type_description');
const descriptionInput = profilePopup.querySelector('.popup__text-input_type_description');
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

const user = new UserInfo("test", "test");

//Функция открытия Popup для профиля
function editProfilePopup(user) {
  //Создаем Popup с формой для редактирования данных автора
  const formPopup = new PopupWithForm('.popup_type_profile', submitEditForm);
  console.log(formPopup)
  formPopup.setEventListeners();
  formPopup.open();
  formPopup.user = user;

  // //Присвоить значения полям
  // authorInput.value = author.textContent;
  // descriptionInput.value = description.textContent;
  // //Очистить все поля с ошибками
  // formValidators.profileValidator.clearAllErrorMessages();
  // //Проверка состояния кнопки активации
  // formValidators.profileValidator.toggleButtonState();
  // //Сделать форму видимой
  // openPopup(profilePopup);
}

function submitEditForm(evt, formInputs) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  console.log(formInputs);

  console.log(this.user);
  if (!Object.values(formInputs).some(input => input.validity.valid === false)) {
    this.user.setUserInfo("111", "333");

  }

  this.close();
  // if (authorInput.validity.valid && descriptionInput.validity.valid) {
  //   author.textContent = authorInput.value;
  //   description.textContent = descriptionInput.value;
  //   //Закрываем окно
  //   closePopup(profilePopup);
  // }
}

//Функция создания Popup для добавления картинок
function addNewCardPopup() {
  //Проверка состояния кнопки активации
  formValidators.cardValidator.toggleButtonState();
  //Сделать форму видимой
  openPopup(cardPopup);
}

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
//Cоздаем класс для валидации форм
const settings = {
  formSelector: '.popup__container_type_form',
  inputSelector: '.popup__text-input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__text-input_type_error',
  errorClass: 'popup__error_visible'
};

//Создаем карточки из начального массива
//initialCards.forEach(card => cardField.prepend(createCard(card.name, card.link)));
const section = new Section({ items: initialCards, renderer: createCard }, '.elements');
section.renderItems();

//Валидация формы для редактирования профиля
formValidators.profileValidator = new FormValidator(settings, profileEditForm);
formValidators.profileValidator.enableValidation();
//Обработчик события для кнопки изменения данных автора
profileEditButton.addEventListener('click', () => editProfilePopup(user));

//Обработчик события submit для формы редактирования профиля
// profileEditForm.addEventListener('submit', (evt) => {
//   evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
//   if (authorInput.validity.valid && descriptionInput.validity.valid) {
//     author.textContent = authorInput.value;
//     description.textContent = descriptionInput.value;
//     //Закрываем окно
//     closePopup(profilePopup);
//   }
// });



//Валидация формы создания новой карточки
formValidators.cardValidator = new FormValidator(settings, cardAddForm);
formValidators.cardValidator.enableValidation();
//Обработчик события для кноки создания новой карточки
cardAddButton.addEventListener('click', () => addNewCardPopup());

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
// popups.forEach((popup) => {
//   popup.addEventListener('mousedown', (evt) => {
//     //Если нажали ЛКМ
//     if (evt.which === 1) {
//       if (evt.target.classList.contains('popup_opened')) {
//         closePopup(popup);
//       }
//       if (evt.target.classList.contains('popup__close-button')) {
//         closePopup(popup);
//       }
//     }
//   })
// })

//const formPopup = new PopupWithForm('.popup_type_profile', "");