import { Card } from "../scripts/Card.js";
import { FormValidator } from "./FormValidator.js";

const popups = document.querySelectorAll('.popup')
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
//Все элементы POPUP для просмотра картинки во весь экран
const imagePopup = document.querySelector('.popup_type_image');
const image = imagePopup.querySelector('.popup__image');
const imageDescription = imagePopup.querySelector('.popup__description');
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
function editProfilePopup(validator) {
  //Присвоить значения полям
  authorInput.value = author.textContent;
  descriptionInput.value = description.textContent;
  //Очистить все поля с ошибками
  validator.clearAllErrorMessages();
  //Проверка состояния кнопки активации
  validator.toggleButtonState();
  //Сделать форму видимой
  openPopup(profilePopup);
}

//Функция создания Popup для добавления картинок
function addNewCardPopup(validator) {
  //Проверка состояния кнопки активации
  validator.toggleButtonState();
  //Сделать форму видимой
  openPopup(cardPopup);
}

//Функция открытия Popup для увеличения картинки
const scalePicture = (name, path) => {
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
  const newCard = new Card(name, path, '#card-template', scalePicture);
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
// const formValidator = new FormValidator(settings);

//Создаем карточки из начального массива
initialCards.forEach(card => cardField.prepend(createCard(card.name, card.link)));

//Валидация формы для редактирования профиля
const profileFormValidator = new FormValidator(settings, profileEditForm);
profileFormValidator.enableValidation();
//Обработчик события для кнопки изменения данных автора
profileEditButton.addEventListener('click', () => editProfilePopup(profileFormValidator));

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

//Валидация формы создания новой карточки
const addCardFormValidator = new FormValidator(settings, cardAddForm);
addCardFormValidator.enableValidation();
//Обработчик события для кноки создания новой карточки
cardAddButton.addEventListener('click', () => addNewCardPopup(addCardFormValidator));

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