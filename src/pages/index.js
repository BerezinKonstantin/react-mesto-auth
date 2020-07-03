import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupForRemoveCard } from "../components/PopupForRemoveCard.js";
import { Api } from "../components/Api.js";
import {
  avatar,
  validationData,
  nameInput,
  infoInput,
  editButton,
  addButton,
  popupForEditSelector,
  popupForAddCardSelector,
  formForEdit,
  formForAddCard,
  formForEditAvatar,
  cardsSelector,
  popupWithImageSelector,
  profileDscrSelector,
  profileNameSelector,
  popupForEditAvatarSelector,
  popupForRemoveCardSelector,
  editAvatarButton,
  token,
  myCohort,
  basedUrl,
} from "../utils/constants.js";
import "./index.css";
let initialCards;
let cardElement;
export let myId;
const api = new Api(token);
//Функция удаления лайка
function deleteLike() {
  api
    .delete(`${basedUrl}/${myCohort}/cards/likes/${this._cardId}`)
    .then((res) => {
      this._likesNumber.textContent = res.likes.length;
    })
    .catch((error) => {
      console.error(error);
    });
}
//Метод постановки лайка
function putLike() {
  api
    .put(`${basedUrl}/${myCohort}/cards/likes/${this._cardId}`)
    .then((res) => {
      this._likesNumber.textContent = res.likes.length;
    })
    .catch((error) => {
      console.error(error);
    });
}
//Метод открытия Попапа по клику на карточку
const handleCardClick = (item) => {
  popupWithImage.open(item);
};
const handlePopupForRemoveCardOpen = (event, _id) => {
  const deletedCard = event.target.parentNode;
  deletedCard._id = _id;
  function handleRemoveCardFormSubmit(deletedItem) {
    api
      .delete(`${basedUrl}/${myCohort}/cards/${deletedCard._id}`)
      .then(() => {
        deletedItem.remove();
      })
      .then(() => {
        popupForRemoveCard.close();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const popupForRemoveCard = new PopupForRemoveCard(
    popupForRemoveCardSelector,
    deletedCard,
    handleRemoveCardFormSubmit
  );
  popupForRemoveCard.open();
};
//Метод отправки формы для редактирования информации
function handleEditFormSubmit({ name, info }) {
  popupForEdit.renderLoading(true);
  patchUserInfo(name, info)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
    })
    .then(() => {
      popupForEdit.close();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      popupForEdit.renderLoading(false);
    });
}
//Функция получения элемента карточки
function getNewCard(cardItem) {
  const card = new Card(
    cardItem,
    handleCardClick,
    handlePopupForRemoveCardOpen,
    "#card",
    deleteLike,
    putLike
  );
  return (cardElement = card.generateCard());
}
//Метод отправки формы для добавления каротчки
function handleAddCardFormSubmit(item) {
  popupForAddCard.renderLoading(true);
  //Отправка данных API
  api
    .post(`${basedUrl}/${myCohort}/cards`, { name: item.name, link: item.link })
    .then((result) => {
      getNewCard(result);
      initialCards.prependItem(cardElement);
    })
    .then(() => {
      popupForAddCard.close();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      popupForAddCard.renderLoading(false);
    });
}
//Метод отправки аватара
function handleAvatarFormSubmit(item) {
  popupForEditAvatar.renderLoading(true);
  api
    .patch(`${basedUrl}/${myCohort}/users/me/avatar`, { avatar: item.avatar })
    .then((res) => {
      avatar.src = res.avatar;
    })
    .then(() => {
      popupForEditAvatar.close();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      popupForEditAvatar.renderLoading(false);
    });
}
//Функция открытия попапа для редактирования профиля
function openPopupForEdit() {
  const userInfoItem = userInfo.getUserInfo();
  nameInput.value = userInfoItem.name;
  infoInput.value = userInfoItem.info;
  editFormValidator.enableValidation();
  editFormValidator.clearInputsErrors(popupForEditSelector);
  editFormValidator.toggleButton(popupForEditSelector);
  popupForEdit.open();
}
//Функция открытия попапа для создания карточки
function openPopupForAddCard() {
  addCardFormValidator.enableValidation();
  addCardFormValidator.clearInputsErrors(popupForAddCardSelector);
  addCardFormValidator.toggleButton(popupForAddCardSelector);
  popupForAddCard.open();
}
//Функция открытия попапа для добавления аватара
function openPopupForEditAvatar() {
  editAvatarFormValidator.enableValidation();
  editAvatarFormValidator.clearInputsErrors(popupForEditAvatarSelector);
  editAvatarFormValidator.toggleButton(popupForEditAvatarSelector);
  popupForEditAvatar.open();
}
//Методы создания обьектов класса
const editFormValidator = new FormValidator(validationData, formForEdit);
const addCardFormValidator = new FormValidator(validationData, formForAddCard);
const editAvatarFormValidator = new FormValidator(
  validationData,
  formForEditAvatar
);
const userInfo = new UserInfo({
  userNameSelector: profileNameSelector,
  userInfoSelector: profileDscrSelector,
});
const popupWithImage = new PopupWithImage(popupWithImageSelector);
const popupForEditAvatar = new PopupWithForm(
  popupForEditAvatarSelector,
  handleAvatarFormSubmit
);
const popupForEdit = new PopupWithForm(
  popupForEditSelector,
  handleEditFormSubmit
);
const popupForAddCard = new PopupWithForm(
  popupForAddCardSelector,
  handleAddCardFormSubmit
);
// Метод получения инфо о юзере
function getUserInfo() {
  return api.get(`${basedUrl}/${myCohort}/users/me`);
}
// Метод изменения инфо о юзере
function patchUserInfo(name, info) {
  return api.patch(`${basedUrl}/${myCohort}/users/me`, {
    name: name,
    about: info,
  });
}
// Метод добавления 6 начальных карточек
function getCardsApi() {
  return api.get(`${basedUrl}/${myCohort}/cards`);
}
function getCards() {
  getCardsApi()
    .then((result) => {
      initialCards = new Section(
        {
          items: result,
          renderer: (item) => {
            getNewCard(item);
            initialCards.appendItem(cardElement);
          },
        },
        cardsSelector
      );
      return initialCards;
    })
    .then((initialCards) => {
      initialCards.renderItems();
    })
    .catch((error) => {
      console.error(error);
    });
}
//Обьявление функций
getUserInfo()
  .then((result) => {
    document.querySelector(profileNameSelector).textContent = result.name;
    document.querySelector(profileDscrSelector).textContent = result.about;
    avatar.src = result.avatar;
    myId = result._id;
  })
  .catch((error) => {
    console.error(error);
  });
getCards();
// Слушатели
addButton.addEventListener("click", openPopupForAddCard);
editButton.addEventListener("click", openPopupForEdit);
editAvatarButton.addEventListener("click", openPopupForEditAvatar);
