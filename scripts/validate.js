//Функция показа ошибки для инпута
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
//Функция скрытия ошибки для инпута
const hideInputError = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
};
//Функция проверки инпута на валидность. Скрывает или показывает ошибки для инпутов
const checkInputValidity = (formElement, inputElement, { ...rest }) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, {
      ...rest,
    });
  } else {
    hideInputError(formElement, inputElement, { ...rest });
  }
};
//Метод проверки на НЕвалидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
//Функция переключения кнопки сабмита, в зависимости от валидности. Получает как параметр метод проверки на НЕвалидность
const toggleButtonState = (
  inputList,
  buttonElement,
  { inactiveButtonClass }
) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};
//Функция слушателей проверки валидности инпутов.
const setEventListeners = (
  formElement,
  { inputSelector, submitButtonSelector, ...rest }
) => {
  //Находим инпуты
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  //Находим кнопку сабмита
  const buttonElement = formElement.querySelector(submitButtonSelector);
  //Переключаем состояние кнопки в зависимости от валидности
  toggleButtonState(inputList, buttonElement, { ...rest });
  //Навешиваем на инпуты слушатели проверки валидности и переключателя состояния кнопки
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, { ...rest });
      toggleButtonState(inputList, buttonElement, { ...rest });
    });
  });
};
//Функция валидации. Находит все формы, вешает на них слушатели сабмитов и setEventListeners
const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, { ...rest });
  });
};
enableValidation({
  formSelector: ".popup__content",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error-text_active",
});
