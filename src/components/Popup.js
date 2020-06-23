export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    //Метод закрытия попапа по ESC
    this._handleEscClose = (event) => {
      if (event.key === "Escape") {
        document
          .querySelector(".popup_opened")
          .classList.remove("popup_opened");
        document.removeEventListener("keyup", this._handleEscClose);
      }
    };
    //Функция закрытия попапа кликом по оверлею
    this._handleClickClose = (event) => {
      if (event.target.classList.contains("popup_opened")) {
        document.removeEventListener("keyup", this._handleEscClose);
        event.target.classList.remove("popup_opened");
      }
    };
    this._handlerClose = () => {
      this.close();
    };
  }
  // Метод навески слушателя закрытия попапа
  _setEventListeners() {
    this._popup
      .querySelector(".popup__close-button")
      .addEventListener("mouseup", this._handlerClose);
    document.addEventListener("keyup", this._handleEscClose);
    this._popup.addEventListener("mouseup", this._handleClickClose);
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
    document.removeEventListener("keyup", this._handleEscClose);
    this._popup.removeEventListener("mouseup", this._handleClickClose);
  }
}
