import Popup from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(item) {
    super.open();
    this._link = item.link;
    this._name = item.name;
    this.cardPicture = this._popup.querySelector(".popup__image");
    this._popup.querySelector(".popup__img-title").textContent = this._name;
    this.cardPicture.src = this._link;
    this.cardPicture.alt = this._name;
  }
}
