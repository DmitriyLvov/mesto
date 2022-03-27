//Функция сохранения при изменении данных автора
function formSubmitAuthorHandler(authorValue, descriptionValue) {
  author.textContent = authorValue;
  desc.textContent = descriptionValue;
}

//Функция плавного закрытия
function smoothClosePopup(popupItem, popupType) {

  //Анимация плавного закрывания для контейнера
  const container = popupItem.querySelector('.popup__container');
  //Анимация плавного закрывания для заднего фона

  switch (popupType) {
    case "image":
      {
        popupItem.classList.add('popup_closing_image');
        break;
      }
    case "form":
      {
        popupItem.classList.add('popup_closing_form');
        break;
      }
  }

  container.classList.add('popup__container_closing');

  //Операция удаления элемента после отработки всех анимаций
  setTimeout(() => popupItem.remove(), 300);
}

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

  cardField.prepend(cardItem);
}

initialCards.forEach(card => createCardByTemplate(card.name, card.link));

//Создание POP-UP формы по шаблону
const page = document.querySelector('.root');
const popupFormTemplate = document.querySelector('#popup-form-template').content;

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
    let formElement = popupItem.querySelector('[name = "edit-form"]');
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
      submitFunction(field1Input.value, field2Input.value);
      //Закрываем окно для сохранения
      smoothClosePopup(popupItem, "form")
    });
    page.append(popupItem);
  }
  //Создание POP-UP изображения по шаблону
const popupImageTemplate = document.querySelector('#popup-image-template').content;

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
const editButton = document.querySelector('.profile__edit-button');
const author = document.querySelector('.profile__text-field_type_author');
const desc = document.querySelector('.profile__text-field_type_description');
editButton.addEventListener('click', () => createPopupFormTemplate("Редактировать профиль",
  author.textContent, desc.textContent, "Имя", "Описание", formSubmitAuthorHandler, "Сохранить"));

//Обработчик событий для кноки создания новой картинки
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', () => createPopupFormTemplate("Новое место", "",
  "", "Название", "Ссылка на картинку", createCardByTemplate, "Создать"));