// Находим форму в DOM
//let formElement = document.querySelector('.popup__container');
let formElement = document.querySelector('[name = "edit-form"]');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__text-input_type_author');
let jobInput = document.querySelector('.popup__text-input_type_description');

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
//Создание карточки по шаблону
const cardTemplate = document.querySelector('#card-template').content;
const cardField = document.querySelector('.elements');

const createCardByTemplate = (name, path) => {
  const cardItem = cardTemplate.querySelector('.elements__item').cloneNode(true);
  cardItem.querySelector('.elements__title').textContent = name;
  cardItem.querySelector('.elements__image').src = path;
  cardField.append(cardItem);
}

initialCards.forEach(card => createCardByTemplate(card.name, card.link));

// Выберите элементы, куда должны быть вставлены значения полей
const desc = document.querySelector('.profile__text-field_type_description');
const author = document.querySelector('.profile__text-field_type_author');


const showPopupHandler = () => {
  const popup = document.querySelector('.popup');
  popup.classList.add('popup_opened');
  nameInput.value = author.textContent;
  jobInput.value = desc.textContent;
}

const closePopupHandler = (e) => {
  e.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
}

const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', showPopupHandler);

const closeButton = document.querySelector('.popup__close');
closeButton.addEventListener('click', closePopupHandler);




// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получите значение полей jobInput и nameInput из свойства value
  let name = nameInput.value;
  let job = jobInput.value;

  // Вставьте новые значения с помощью textContent
  desc.textContent = job;
  author.textContent = name;
  //Закрываем окно для сохранения
  closePopupHandler(evt);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

formElement.addEventListener('submit', formSubmitHandler);