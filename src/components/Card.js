import { myId } from "../pages/index.js";
import { Api } from "../components/Api.js";

export class Card {
  constructor(
    { item },
    handleCardClick,
    handlePopupForRemoveCardOpen,
    cardSelector
  ) {
    this._cardSelector = cardSelector;
    this._link = item.link;
    this._name = item.name;
    this._likes = item.likes;
    this._cardOwnerId = item.owner._id;
    this._cardId = item._id;
    //Метод переключения лайка
    this._handleLike = (event) => {
      if (!event.target.classList.contains("card__like-button_active")) {
        this._getLike();
      } else {
        this._deleteLike();
      }
      event.target.classList.toggle("card__like-button_active");
    };
    //Метод постановки лайка
    this._getLike = () => {
      const getLikeApi = new Api(
        `https://mesto.nomoreparties.co/v1/cohort-12/cards/likes/${this._cardId}`
      );
      getLikeApi.put().then((res) => {
        this.likesNumber.textContent = res.likes.length;
      });
    };
    //Метод удаления лайка
    this._deleteLike = () => {
      const deleteLikeApi = new Api(
        `https://mesto.nomoreparties.co/v1/cohort-12/cards/likes/${this._cardId}`
      );
      deleteLikeApi.delete().then((res) => {
        this.likesNumber.textContent = res.likes.length;
      });
    };
    this._handlePopupForRemoveCardOpen = (event) => {
      handlePopupForRemoveCardOpen(event, this._cardId);
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
    };
  }
  _getLike() {}
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
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this.cardPicture = this._element.querySelector(".card__picture");
    this.cardTitle = this._element.querySelector(".card__title");
    this.cardTitle.textContent = this._name;
    this.cardPicture.src = this._link;
    this.cardPicture.alt = this._name;
    this.likesNumber = this._element.querySelector(".card__likes-number");
    this.likeButton = this._element.querySelector(".card__like-button");
    if (this._likes.find((item) => item._id == myId)) {
      this.likeButton.classList.add("card__like-button_active");
    }
    if (this._likes) {
      this.likesNumber.textContent = this._likes.length;
    }
    if (this._cardOwnerId !== myId) {
      this._deleteButton.style.display = "none";
    }
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
      .addEventListener("click", this._handlePopupForRemoveCardOpen);
    this.cardPicture.addEventListener("click", this._handleCardClick);
  }
}
