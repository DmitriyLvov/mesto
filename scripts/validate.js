const settings = {
  formSelector: '.popup__container_type_form',
  inputSelector: '.popup__text-input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__text-input_type_error',
  errorClass: 'popup__error_visible'
};
const forms = Array.from(document.querySelectorAll(settings.formSelector));

//Функция изменения состояния кнопки подтверждения
function toggleButtonState(form, button, settings) {
  // Если есть хотя бы один невалидный инпут
  if (!form.checkValidity()) {
    // сделай кнопку неактивной
    button.classList.add(settings.inactiveButtonClass);
    button.disabled = true;
  } else {
    // иначе сделай кнопку активной
    button.classList.remove(settings.inactiveButtonClass);
    button.disabled = false;
  }
};
//Функция изменения состояния кнопки подтверждения для внешнего вызова
function toogleButtonStateExternal(form) {
  const button = form.querySelector(settings.submitButtonSelector);
  toggleButtonState(form, button, settings);
}
//Функция очищения всех полей ошибок для внешнего вызова
function clearAllErrorMessagesExternal(form) {
  const inputs = form.querySelectorAll(settings.inputSelector);
  inputs.forEach(input => hideInputError(input, settings))
}

// Функция, которая добавляет класс с ошибкой
function showInputError(input, settings) {
  //Выделение некорректного поля
  input.classList.add(settings.inputErrorClass);
  //Найдем элемент ошибки
  const errorMessage = document.querySelector(`.popup__error_type_${input.id}`);
  //Передадим текст ошибки
  errorMessage.textContent = input.validationMessage;
  //Сделаем видимым сообщение об ошибке
  errorMessage.classList.add(settings.errorClass);
};

// Функция, которая удаляет класс с ошибкой
function hideInputError(input, settings) {
  //Снять выделение некорректного поля
  input.classList.remove(settings.inputErrorClass);
  //Найдем элемент ошибки
  const errorMessage = document.querySelector(`.popup__error_type_${input.id}`);
  //Скроем сообщение об ошибке
  errorMessage.classList.remove(settings.errorClass);
  //Очистим текст ошибки
  errorMessage.textContent = "";
};

// Функция, которая проверяет валидность поля
function handleInput(inputElement, buttonSubmit, formElement, settings) {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(inputElement, settings);
  } else {
    // Если проходит, скроем
    hideInputError(inputElement, settings);
  }
  toggleButtonState(formElement, buttonSubmit, settings);
};

function enableValidation(settings) {
  //Для каждого INPUT каждой формы создаем обработчик
  forms.forEach(formElement => {
    const inputs = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonSubmit = formElement.querySelector(settings.submitButtonSelector);
    //Добавляем события изменения для каждого инпут
    inputs.forEach(inputElement => {
      inputElement.addEventListener('input', () => handleInput(inputElement, buttonSubmit, formElement, settings));
    })
  })
}

enableValidation(settings)