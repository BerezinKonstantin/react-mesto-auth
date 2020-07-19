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
  //Функция удаления ошибок с инпутов (при залипании)
  clearInputsErrors(popupSelector) {
    const inputs = Array.from(
      document.querySelector(popupSelector).querySelectorAll(".popup__input")
    );
    inputs.forEach((element) => {
      if (element.classList.contains("popup__input_type_error")) {
        element.classList.remove("popup__input_type_error");
      }
    });
    const errorTexts = Array.from(
      document
        .querySelector(popupSelector)
        .querySelectorAll(".popup__input-error-text")
    );
    errorTexts.forEach((element) => {
      if (element.classList.contains("popup__input-error-text_active")) {
        element.classList.remove("popup__input-error-text_active");
      }
    });
  }
  //Метод Принудительного отключения кнопки при открытии попапа
  toggleButton(popupSelector) {
    const buttonElement = document
      .querySelector(popupSelector)
      .querySelector(".popup__submit-button");
    buttonElement.classList.add("popup__submit-button_inactive");
    buttonElement.disabled = true;
  }
}
