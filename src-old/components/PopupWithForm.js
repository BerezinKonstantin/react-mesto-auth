import { Popup } from "./Popup.js";
import { myId } from "../pages/index.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handler = (evt) => {
      evt.preventDefault();
      handleFormSubmit(this._getInputValues());
    };
  }
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._formValues = { owner: {}, likes: [] };
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
      this._formValues.owner._id = myId;
    });
    return this._formValues;
  }
  _setEventListeners() {
    super._setEventListeners();
    this._popup
      .querySelector(".popup__content")
      .addEventListener("submit", this._handler);
  }
  open() {
    super.open();
    this._setEventListeners();
  }
  close() {
    super.close();
    this._popup.querySelector(".popup__content").reset();
    this._popup
      .querySelector(".popup__content")
      .removeEventListener("submit", this._handler);
  }
  renderLoading(isLoading) {
    const openedPopupButton = this._popup.querySelector(
      ".popup__submit-button"
    );
    if (isLoading) {
      openedPopupButton.textContent = "Сохранение...";
    } else {
      openedPopupButton.textContent = openedPopupButton.value;
    }
  }
}
