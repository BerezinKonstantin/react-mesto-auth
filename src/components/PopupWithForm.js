import Popup from "./Popup.js";
import { placeInput, imgSrcInput, nameInput, infoInput } from "./constants.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    this._formValues = {};
    if (this._popup.classList.contains("popup_for_add-card")) {
      this._formValues.name = placeInput.value;
      this._formValues.link = imgSrcInput.value;
    } else if (this._popup.classList.contains("popup_for_edit")) {
      this._formValues.name = nameInput.value;
      this._formValues.info = infoInput.value;
    }
    return this._formValues;
  }
  _setEventListeners() {
    super._setEventListeners();
    this._popup
      .querySelector(".popup__content")
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close();
      });
  }
  //Функция удаления ошибок с инпутов (при залипании)
  clearInputsErrors() {
    const inputs = Array.from(this._popup.querySelectorAll(".popup__input"));
    inputs.forEach((el) => {
      if (el.classList.contains("popup__input_type_error")) {
        el.classList.remove("popup__input_type_error");
      }
    });
    const errorTexts = Array.from(
      this._popup.querySelectorAll(".popup__input-error-text")
    );
    errorTexts.forEach((el) => {
      if (el.classList.contains("popup__input-error-text_active")) {
        el.classList.remove("popup__input-error-text_active");
      }
    });
  }
  //Отключаем кнопку при открытии попапа
  toggleButton() {
    const buttonElement = this._popup.querySelector(".popup__submit-button");
    buttonElement.classList.add("popup__submit-button_inactive");
  }
  close() {
    super.close();
    this._popup.querySelector(".popup__content").reset();
  }
}
