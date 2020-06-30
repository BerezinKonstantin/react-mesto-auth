import { Popup } from "./Popup.js";
export class PopupForRemoveCard extends Popup {
  constructor(popupSelector, deletedItem, handleFormSubmit) {
    super(popupSelector);
    this._handler = (evt) => {
      evt.preventDefault();
      handleFormSubmit(deletedItem);
      this.close();
    };
    this._setEventListeners();
  }
  _setEventListeners() {
    super._setEventListeners();
    this._popup
      .querySelector(".popup__content")
      .addEventListener("submit", this._handler);
  }
  close() {
    super.close();
    this._popup
      .querySelector(".popup__content")
      .removeEventListener("submit", this._handler);
  }
}
