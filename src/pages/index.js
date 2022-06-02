import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithImage from '../components/PopupWithImage.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { Api } from '../components/Api';
import PopupWithConfirm from '../components/PopupWithConfirm';

//Данные для авторизации
const cohort = "cohort-42";
const token = 'd74ffdad-4b6e-4d97-9e8c-b8d87caa6667';
//Переменная для ID пользователя
let userId;
//Сохранение всех валидаторов в одном объекте
const formValidators = {};
//Редактирование аватара
const avatar = document.querySelector('.avatar__layout');
const avatarImage = document.querySelector('.avatar__image');
const avatarElement = document.querySelector('.popup_type_avatar');
const avatarEditForm = avatarElement.querySelector('[name = "avatar-form"]');

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
//Создаем Попап для подтверждения удаления картинок
const confirmPopup = new PopupWithConfirm('.popup_type_confirm');
confirmPopup.setEventListeners();

//Объявляем класс для передачи информации на сервер
const api = new Api(cohort, token);

//Функция удаления карточки
function handleRemoveCard(cardId, confirmPopup, api, cardElement) {
  confirmPopup.changeSubmitFunction((evt) => {
    confirmPopup.changeSubmitButtonText('Удаление...');
    evt.preventDefault();
    api.removeCard(cardId)
      .then(res => {
        cardElement.remove();
        confirmPopup.close();
      })
      .catch(err => {
        //Если ошибка
        console.log((`Ошибка удаления карточки: ${err}`)); // выведем ошибку в консоль
      });

  })
  confirmPopup.open();
}

//Функция like для карточки
function handleLikeCard(cardId, api, isLiked, likePictureRendering) {
  if (!isLiked) {
    api.addLike(cardId)
      .then(res => likePictureRendering())
      .catch(err => {
        console.log(`Ошибка создания лайка: ${err}`)
      })
  } else {
    api.removeLike(cardId)
      .then(res => likePictureRendering())
      .catch(err => {
        console.log(`Ошибка удаления лайка: ${err}`)
      })
  }
}

//Функция создания карточки по шаблону
function createCard(card, userId) {
  const newCard = new Card(card,
    (cardElement) => handleRemoveCard(card._id, confirmPopup, api, cardElement),
    (isLiked, likePictureRendering) => handleLikeCard(card._id, api, isLiked, likePictureRendering),
    userId,
    '#card-template',
    (name, path) => imagePopup.open(name, path));
  return newCard.getCard();
}

//Функция открытия Popup для добавления картинок
function addNewCardPopup(cardPopup) {
  //Очистить все поля с ошибками
  formValidators.cardValidator.clearAllErrorMessages();
  //Проверка состояния кнопки активации
  formValidators.cardValidator.toggleButtonState();
  cardPopup.open();
}

//Функция добавления новой картинки на страинце
function submitAddCard(evt, formInputs, form) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  form.changeSubmitButtonText('Сохранение...');
  const newCard = {
    name: formInputs.name.value,
    link: formInputs.path.value
  }
  api.addNewCard(newCard)
    .then(res => {
      section.addItem(createCard(res, userId));
      form.close();
    })
    .catch(err => {
      console.log(`Ошибка добавления новой карточки: ${err}`);
    });
}

const userInfo = new UserInfo('.profile__text-field_type_author', '.profile__text-field_type_description', '.avatar__image');
const section = new Section(createCard, '.elements');

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

//Функция для сохранения новых данных автора
const submitEditForm = (evt, formInputs, form) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  form.changeSubmitButtonText('Сохранение...')
    //Если данные валидны, то сохраняем их на странице
  if (!Object.values(formInputs).some(input => input.validity.valid === false)) {
    api.setUserInfo({ name: formInputs.author.value, about: formInputs.description.value })
      .then(res => {
        form.userInfo.setUserInfo(res)
        form.close();
      })
      .catch(err => {
        console.log(`Ошибка сохранения данных пользователя: ${err}`);
      });
  }
}

//Функция открытия попап для изменения аватара
const editAvatarPopup = (avatarPopup) => {
  formValidators.avatarValidator.clearAllErrorMessages();
  formValidators.avatarValidator.toggleButtonState();
  avatarPopup.open();
}

//Функция для сохранения аватара
const saveAvatar = (evt, formInputs, form) => {
  evt.preventDefault();
  form.changeSubmitButtonText('Сохранение...');
  //Если данные валидны, то сохраняем их на странице
  if (!Object.values(formInputs).some(input => input.validity.valid === false)) {
    api.setAvatar(formInputs.url.value)
      .then(res => {
        avatarImage.src = res.avatar;
        form.close();
      })
      .catch(err => {
        console.log(`Ошибка сохранения аватара: ${err}`);
      });
  }
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

//Запрос с сервера и отрисовка информации на старте страницы
Promise.all([api.getAuthorInfo(), api.getCards()])
  .then(results => {
    userInfo.setUserInfo(results[0]);
    userId = results[0]._id;
    avatarImage.src = results[0].avatar;
    section.renderItems(results[1], userId)
  })

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

formValidators.avatarValidator = new FormValidator(settings, avatarEditForm);
formValidators.avatarValidator.enableValidation();
const avatarPopup = new PopupWithForm('.popup_type_avatar', saveAvatar, "avatar");
avatarPopup.setEventListeners();
avatar.addEventListener('click', () => editAvatarPopup(avatarPopup));