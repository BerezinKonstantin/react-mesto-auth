import Popup from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handler = (evt) => {
      evt.preventDefault();
      handleFormSubmit(this._getInputValues());
      this.close();
    }
    this._setEventListeners();
  }
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  _setEventListeners() {
    super._setEventListeners();
    this._popup
      .querySelector(".popup__content")
      .addEventListener("submit", this._handler);
  }
  close() {
    super.close();
    this._popup.querySelector(".popup__content").reset();
    this._popup
      .querySelector(".popup__content")
      .removeEventListener("submit", this._handler);
  }
}
