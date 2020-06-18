export class Card {
  constructor({ item }, handleCardClick, cardSelector) {
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
  // Получаем значения из карточки
  _getCardValues() {
    this._cardValues = {};
    this._cardValues.link = this._link;
    this._cardValues.name = this._name;
    console.log(this._cardValues);
    return this._cardValues;
  }
  // Метод лайка
  _handleLike() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
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
        this._handleCardClick(this._getCardValues());
      });
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
        this._handleCardClick();
      });
    this._element.remove();
  }
}
