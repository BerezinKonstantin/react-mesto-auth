import { handleEscClose, setListenerClickClose } from "../utils/utils.js";
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handlerClose = () => {
      this.close();
    };
  }
  // Метод навески слушателя закрытия попапа
  _setEventListeners() {
    this._popup
      .querySelector(".popup__close-button")
      .addEventListener("mouseup", this._handlerClose);
    document.addEventListener("keyup", handleEscClose);
    this._popup.addEventListener("mouseup", setListenerClickClose);
  }
  // Метод открытия попапа
  open() {
    this._popup.classList.add("popup_opened");
    this._setEventListeners();
  }
  // Метод закрытия попапа
  close() {
    this._popup.classList.remove("popup_opened");
    this._popup
      .querySelector(".popup__close-button")
      .removeEventListener("mouseup", this._handlerClose);
    document.removeEventListener("keyup", handleEscClose);
    this._popup.removeEventListener("mouseup", setListenerClickClose);
  }
}
