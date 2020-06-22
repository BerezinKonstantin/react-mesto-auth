import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import {
  initialCards,
  validationData,
  nameInput,
  infoInput,
  editButton,
  addButton,
} from "../utils/constants.js";
import { toggleButton, clearInputsErrors } from "../utils/utils.js";
import "./index.css";
//Метод открытия Попапа по клику на карточку
export const handleCardClick = (item) => {
  popupWithImage.open(item);
};
//Метод отправки формы для добавления каротчки
function handleAddCardFormSubmit(item) {
  const card = new Card({ item }, handleCardClick, "#card");
  const cardElement = card.generateCard();
  getInitialCards.addItem(cardElement);
}
//Метод отправки формы для редактирования информации
function handleEditFormSubmit({ name, info }) {
  userInfo.getUserInfo();
  userInfo.setUserInfo({ name, info });
}
//Функция открытия попапа для редактирования профиля
function openPopupForEdit() {
  userInfo.getUserInfo();
  nameInput.value = userInfo.getUserInfo().name;
  infoInput.value = userInfo.getUserInfo().info;
  clearInputsErrors(".popup_for_edit");
  toggleButton(".popup_for_edit");
  popupForEdit.open();
}
//Функция открытия попапа для создания карточки
function openPopupForAddCard() {
  clearInputsErrors(".popup_for_add-card");
  toggleButton(".popup_for_add-card");
  popupForAddCard.open();
}
// Функция валидации форм
function getValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__content"));
  formList.forEach((form) => {
    const formValidator = new FormValidator(validationData, form);
    formValidator.enableValidation();
  });
}
// Метод добавления 6 начальных карточек
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
//Методы создания обьекта класса
const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userInfoSelector: ".profile__description",
});
const popupWithImage = new PopupWithImage(".popup_for_image");
const popupForEdit = new PopupWithForm(".popup_for_edit", handleEditFormSubmit);
const popupForAddCard = new PopupWithForm(
  ".popup_for_add-card",
  handleAddCardFormSubmit
);
// Слушатели
addButton.addEventListener("click", openPopupForAddCard);
editButton.addEventListener("click", openPopupForEdit);
//Обьявдение функций
getInitialCards.renderItems();
getValidation();
