import { myId } from "../pages/index.js";
export class Card {
  constructor(
    item,
    handleCardClick,
    handlePopupForRemoveCardOpen,
    cardSelector,
    className
  ) {
    this._cardSelector = cardSelector;
    this._link = item.link;
    this._name = item.name;
    this._likes = item.likes;
    this._cardOwnerId = item.owner._id;
    this._cardId = item._id;
    this._className = className;
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
      const getLikeApi = new this._className(
        `https://mesto.nomoreparties.co/v1/cohort-12/cards/likes/${this._cardId}`,
        "89e2c3a3-c362-4c73-9168-38bfd7349e7e"
      );
      getLikeApi
        .put()
        .then((res) => {
          this._likesNumber.textContent = res.likes.length;
        })
        .catch((error) => {
          console.error(error);
        });
    };
    //Метод удаления лайка
    this._deleteLike = () => {
      const deleteLikeApi = new this._className(
        `https://mesto.nomoreparties.co/v1/cohort-12/cards/likes/${this._cardId}`,
        "89e2c3a3-c362-4c73-9168-38bfd7349e7e"
      );
      deleteLikeApi
        .delete()
        .then((res) => {
          this._likesNumber.textContent = res.likes.length;
        })
        .catch((error) => {
          console.error(error);
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
    this._cardPicture = this._element.querySelector(".card__picture");
    this.cardTitle = this._element.querySelector(".card__title");
    this.cardTitle.textContent = this._name;
    this._cardPicture.src = this._link;
    this._cardPicture.alt = this._name;
    this._likesNumber = this._element.querySelector(".card__likes-number");
    this._likeButton = this._element.querySelector(".card__like-button");
    if (this._likes.find((item) => item._id == myId)) {
      this._likeButton.classList.add("card__like-button_active");
    }
    if (this._likes) {
      this._likesNumber.textContent = this._likes.length;
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
    this._cardPicture.addEventListener("click", this._handleCardClick);
  }
}
