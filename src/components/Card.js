import { handleLike, handleDeleteCard } from "../utils/utils.js";
//import { handleCardClicka} from "../pages/index.js"
export class Card {
  constructor({ item }, handleCardClick, cardSelector) {
    this._cardSelector = cardSelector;
    this._handler = () => {
      handleCardClick(this._getCardValues());
    }
    this._link = item.imgSrc;
    this._name = item.placeName;
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
    this.cardPicture = this._element.querySelector(".card__picture");
    this._element.querySelector(".card__title").textContent = this._name;
    this.cardPicture.src = this._link;
    this.cardPicture.alt = this._name;
    this._setListenersForCard();
    return this._element;
  }
  // Получаем значения из карточки
  _getCardValues() {
    this._cardValues = {};
    this._cardValues.link = this._link;
    this._cardValues.name = this._name;
    return this._cardValues;
  }
  //Метод навески слушателей на карточку
  _setListenersForCard() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", handleLike);
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", handleDeleteCard);
    this.cardPicture.addEventListener("click", this._handler);
  }
}
