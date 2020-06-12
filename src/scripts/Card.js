import { openAndClosePopup } from "./index.js";
//Переменные для открытия Попапа с картинкой
const popupForImage = document.querySelector(".popup_for_image");
const popupImgTitle = document.querySelector(".popup__img-title");
const popupImage = document.querySelector(".popup__image");
//Класс карточки
export class Card {
  constructor(item, cardSelector) {
    this._cardSelector = cardSelector;
    this._link = item.link;
    this._name = item.name;
  }
  // получаем разметку (шаблон) карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }
  //Сборка карточки
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__picture").src = this._link;
    this._element.querySelector(".card__picture").alt = this._name;
    this._setListenersForCard();
    return this._element;
  }
  //Метод навески слушателей на карточку
  _setListenersForCard() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLike();
      });
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    this._element
      .querySelector(".card__picture")
      .addEventListener("click", () => {
        openPopupForImage(this._link, this._name);
      });
  }
  // Метод лайка
  _handleLike() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }
  //Метод удаления карточки и слушателей
  _handleDeleteCard() {
    this._element
      .querySelector(".card__like-button")
      .removeEventListener("click", () => {
        this._handleLike();
      });
    this._element
      .querySelector(".card__delete-button")
      .removeEventListener("click", () => {
        this._handleDeleteCard();
      });
    this._element
      .querySelector(".card__picture")
      .removeEventListener("click", () => {
        openPopupForImage();
      });
    this._element.remove();
  }
}
//Функция открытия попапа с картинкой
function openPopupForImage(link, name) {
  popupImgTitle.textContent = name;
  popupImage.src = link;
  popupImage.alt = name;
  openAndClosePopup(popupForImage);
}
