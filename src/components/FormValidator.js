export class FormValidator {
  constructor(data, form) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._form = form;
  }
  // Публичный метод валидирования форм - навешиваем на форму слушатели
  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
  //Функция слушателей проверки валидности инпутов.
  _setEventListeners() {
    //Находим инпуты
    const inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    //Находим кнопку сабмита
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    //Переключаем состояние кнопки в зависимости от валидности
    this._toggleButtonState(inputList, buttonElement);
    //Навешиваем на инпуты слушатели проверки валидности и переключателя состояния кнопки
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  //Функция переключения кнопки сабмита, в зависимости от валидности. Получает как параметр метод проверки на НЕвалидность
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", "disabled");
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }
  //Метод проверки на НЕвалидность
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  //Функция проверки инпута на валидность. Скрывает или показывает ошибки для инпутов
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  //Функция показа ошибки для инпута
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  //Функция скрытия ошибки для инпута
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }
}
