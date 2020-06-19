export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._setEventListeners();
  }
  //Метод закрытия попапа по ESC
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
  //Метод закрытия попапа кликом по оверлею
  _handleOverlayClickClose(event) {
    if (event.target.classList.contains("popup_opened")) {
      this.close();
    }
  }
  // Метод навески слушателей закрытия попапа
  _setEventListeners() {
    this._popup
      .querySelector(".popup__close-button")
      .addEventListener("mouseup", () => {
        this.close();
      });
    document.addEventListener("keyup", () => {
      this._handleEscClose(event);
    });
    document.addEventListener("mouseup", () => {
      this._handleOverlayClickClose(event);
    });
  }
  // Метод открытия попапа
  open() {
    this._popup.classList.add("popup_opened");
  }
  // Метод закрытия попапа
  close() {
    this._popup.classList.remove("popup_opened");
    this._popup
      .querySelector(".popup__close-button")
      .removeEventListener("mouseup", () => {
        this.close();
      });
    document.removeEventListener("keyup", () => {
      this._handleEscClose(event);
    });
    document.removeEventListener("mouseup", () => {
      this._handleOverlayClickClose(event);
    });
  }
}
