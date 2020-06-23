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
  popupForEditSelector,
  popupForAddCardSelector,
  formForEdit,
  formForAddCard,
  cardsSelector,
  popupWithImageSelector,
  profileDscrSelector,
  profileNameSelector,
} from "../utils/constants.js";
import "./index.css";
//Метод открытия Попапа по клику на карточку
const handleCardClick = (item) => {
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
  userInfo.setUserInfo({ name, info });
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
  cardsSelector
);
//Методы создания обьекта класса
const editFormValidator = new FormValidator(validationData, formForEdit);
const addCardFormValidator = new FormValidator(validationData, formForAddCard);
const userInfo = new UserInfo({
  userNameSelector: profileNameSelector,
  userInfoSelector: profileDscrSelector,
});
const popupWithImage = new PopupWithImage(popupWithImageSelector);
const popupForEdit = new PopupWithForm(
  popupForEditSelector,
  handleEditFormSubmit
);
const popupForAddCard = new PopupWithForm(
  popupForAddCardSelector,
  handleAddCardFormSubmit
);
// Слушатели
addButton.addEventListener("click", openPopupForAddCard);
editButton.addEventListener("click", openPopupForEdit);
//Обьявление функций
getInitialCards.renderItems();
