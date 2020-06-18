import Popup from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector, { item }) {
    super(popupSelector);
    this._link = item.link;
    this._name = item.name;
  }
  open() {
    super.open();
    this._popup.querySelector(".popup__img-title").textContent = this._name;
    this._popup.querySelector(".popup__image").src = this._link;
    this._popup.querySelector(".popup__image").alt = this._name;
  }
}
