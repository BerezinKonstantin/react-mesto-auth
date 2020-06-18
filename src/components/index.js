import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import {
  initialCards,
  validationData,
  nameInput,
  infoInput,
  editButton,
  addButton,
} from "./constants.js";
import "../pages/index.css";

//Метод открытия Попапа по клику на карточку
function handleCardClick(item) {
  console.log(item);
  const popupWithImage = new PopupWithImage(".popup_for_image", { item });
  popupWithImage.open();
}
//Метод отправки формы для добавления каротчки
function handleAddCardFormSubmit(item) {
  const card = new Card({ item }, handleCardClick, "#card");
  const cardElement = card.generateCard();
  getInitialCards.addItem(cardElement);
}
//Метод отправки формы для редактирования информации
function handleEditFormSubmit({ name, info }) {
  const newUserInfo = new UserInfo({
    userNameSelector: ".profile__name",
    userInfoSelector: ".profile__description",
  });
  newUserInfo.getUserInfo();
  newUserInfo.setUserInfo({ name, info });
}
//метод добавления информации о пользователе
const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userInfoSelector: ".profile__description",
});
//Функция открытия попапа для редактирования профиля
function openPopupForEdit() {
  const popupForEdit = new PopupWithForm(
    ".popup_for_edit",
    handleEditFormSubmit
  );
  userInfo.getUserInfo();
  nameInput.value = userInfo.getUserInfo().name;
  infoInput.value = userInfo.getUserInfo().info;
  popupForEdit.clearInputsErrors();
  popupForEdit.toggleButton();
  popupForEdit.open();
}
//Функция открытия попапа для создания карточки
function openPopupForAddCard() {
  const popupForAddCard = new PopupWithForm(
    ".popup_for_add-card",
    handleAddCardFormSubmit
  );
  popupForAddCard.clearInputsErrors();
  popupForAddCard.toggleButton();
  popupForAddCard.open();
}
// функция добавления 6 начальных карточек
const getInitialCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card({ item }, handleCardClick, "#card");
      const cardElement = card.generateCard();
      getInitialCards.addItem(cardElement);
    },
  },
  ".cards"
);
// Функция валидации форм
function getValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__content"));
  formList.forEach((form) => {
    const formValidator = new FormValidator(validationData, form);
    formValidator.enableValidation();
  });
}
// Слушатели
addButton.addEventListener("click", openPopupForAddCard);
editButton.addEventListener("click", openPopupForEdit);

getInitialCards.renderItems();
getValidation();
