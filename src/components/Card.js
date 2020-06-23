export class Card {
  constructor({ item }, handleCardClick, cardSelector) {
    this._cardSelector = cardSelector;
        this._link = item.imgSrc;
    this._name = item.placeName;
    //Метод лайка
    this._handleLike = (event) => {
      event.target.classList.toggle("card__like-button_active");
    };
    //Метод удаления карточки и слушателей
    this._handleDeleteCard = (event) => {
      const deletedCard = event.target.closest(".card");
      deletedCard
        .querySelector(".card__like-button")
        .removeEventListener("click", this._handleLike);
      event.target.removeEventListener("click", this._handleDeleteCard);
      deletedCard
        .querySelector(".card__picture")
        .removeEventListener("click", this._handleCardClick);
      deletedCard.remove();
    };
    this._handleCardClick = () => {
      handleCardClick(this._getCardValues());
    }
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
    this.cardTitle = this._element.querySelector(".card__title");
    this.cardTitle.textContent = this._name;
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
      .addEventListener("click", this._handleLike);
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", this._handleDeleteCard);
    this.cardPicture.addEventListener("click", this._handleCardClick);
  }
}
