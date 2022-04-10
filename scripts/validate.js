const settings = {
  formSelector: '.popup__container_type_form',
  inputSelector: '.popup__text-input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__text-input_type_error',
  errorClass: 'popup__error_visible'
};
const formList = Array.from(document.querySelectorAll(settings.formSelector));

//Функция деактивации кнопки подтверждения
function toggleButtonState(inputList, buttonElement) {
  // Если есть хотя бы один невалидный инпут
  if (inputList.some((inputElement) => !inputElement.validity.valid)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// Функция, которая добавляет класс с ошибкой
function showInputError(formInput) {
  //Выделение некорректного поля
  formInput.classList.add(settings.inputErrorClass);
  //Найдем элемент ошибки
  const errorMessage = document.querySelector(`.popup__error_type_${formInput.id}`);
  //Передадим текст ошибки
  errorMessage.textContent = formInput.validationMessage;
  //Сделаем видимым сообщение об ошибке
  errorMessage.classList.add(settings.errorClass);
};

// Функция, которая удаляет класс с ошибкой
function hideInputError(formInput) {
  //Снять выделение некорректного поля
  formInput.classList.remove(settings.inputErrorClass);
  //Найдем элемент ошибки
  const errorMessage = document.querySelector(`.popup__error_type_${formInput.id}`);
  //Скроем сообщение об ошибке
  errorMessage.classList.remove(settings.errorClass);
  //Очистим текст ошибки
  errorMessage.textContent = "";
};

//Функция, которая удаляет все ошибки перед открытием
function clearAllErrorMessages(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  inputList.forEach(inputItem => hideInputError(inputItem));
}
//Функция валидации формы в момент открытия
function validateForm(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonSubmit = formElement.querySelector(settings.submitButtonSelector);
  inputList.forEach(inputElement => isValid(inputElement, buttonSubmit, inputList));
}

// Функция, которая проверяет валидность поля
function isValid(inputElement, buttonSubmit, inputList) {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(inputElement);
  } else {
    // Если проходит, скроем
    hideInputError(inputElement);
  }
  toggleButtonState(inputList, buttonSubmit);
};

function enableValidation() {
  //Для каждого INPUT каждой формы создаем обработчик
  formList.forEach(formElement => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonSubmit = formElement.querySelector(settings.submitButtonSelector);
    //Добавляем события изменения для каждого инпут
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => isValid(inputElement, buttonSubmit, inputList));
    })
  })
}

enableValidation()