import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import newYork from "../pictures/new-york.jpg";
import altay from "../pictures/new-york.jpg";
import brugge from "../pictures/brugge.jpg";
import msk from "../pictures/msk.jpg";
import nsk from "../pictures/nsk.jpg";
import kazan from "../pictures/kazan.jpg";
import "../pages/index.css"
//Переменные
const cards = document.querySelector(".cards");
const closeButton = document.querySelectorAll(".popup__close-button");
const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const addButton = document.querySelector(".profile__add-button");
const nameInput = document.querySelector(".popup__input_name");
const dscrInput = document.querySelector(".popup__input_description");
const placeInput = document.querySelector(".popup__input_place-name");
const imgSrcInput = document.querySelector(".popup__input_img-src");
const popupForEdit = document.querySelector(".popup_for_edit");
const formElementEdit = document.querySelector(
  ".popup_for_edit .popup__content"
);
const popupAddCard = document.querySelector(".popup_for_add-card");
const formElementAddCard = document.querySelector(
  ".popup_for_add-card .popup__content"
);
//Массив начальных карточек
const initialCards = [
  { name: "Нью-Йорк", link: newYork },
  { name: "Алтай", link: altay },
  { name: "Брюгге", link: brugge },
  { name: "Москва", link: msk },
  { name: "Новосибирск", link: nsk },
  { name: "Казань", link: kazan },
];
//Переменная со значениями, передаваемыми в FormValidator
const validationData = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error-text_active",
};
//Функция закрытия попапа по ESC
function setListenerEscClose(event) {
  if (event.key === "Escape") {
    const closingElement = document.querySelector(".popup_opened");
    closingElement.classList.remove("popup_opened");
  }
}
//Функция закрытия попапа кликом по оверлею
function setListenerClickClose(event) {
  if (event.target.classList.contains("popup_opened")) {
    event.target.classList.remove("popup_opened");
  }
}
//Метод навески и удаления слушателей закрытия по ESC и оверлею
function handleClosingListener(element) {
  if (!element.classList.contains("popup_opened")) {
    document.addEventListener("keyup", setListenerEscClose);
    document.addEventListener("mouseup", setListenerClickClose);
  }
  if (element.classList.contains("popup_opened")) {
    document.removeEventListener("keyup", setListenerEscClose);
    document.removeEventListener("mouseup", setListenerClickClose);
  }
}
//Функция открытия-закрытия popup
export function openAndClosePopup(element) {
  handleClosingListener(element);
  element.classList.toggle("popup_opened");
}
//Функция удаления ошибок с инпутов (при залипании)
function clearInputs(popupForm) {
  const inputs = Array.from(popupForm.querySelectorAll(".popup__input"));
  inputs.forEach((el) => {
    if (el.classList.contains("popup__input_type_error")) {
      el.classList.remove("popup__input_type_error");
    }
  });
  const errorTexts = Array.from(
    popupForm.querySelectorAll(".popup__input-error-text")
  );
  errorTexts.forEach((el) => {
    if (el.classList.contains("popup__input-error-text_active")) {
      el.classList.remove("popup__input-error-text_active");
    }
  });
}
//Отключаем кнопку при открытии попапа
function toggleButton(popupForm) {
  const buttonElement = popupForm.querySelector(".popup__submit-button");
  buttonElement.classList.add("popup__submit-button_inactive");
}
//Функция открытия попапа для редактирования профиля
function openPopupForEdit() {
  nameInput.value = profileName.textContent;
  dscrInput.value = profileDescription.textContent;
  clearInputs(popupForEdit);
  toggleButton(popupForEdit);
  openAndClosePopup(popupForEdit);
}
//Функция открытия попапа для создания карточки
function openPopupAddCard() {
  formElementAddCard.reset();
  clearInputs(popupAddCard);
  toggleButton(popupAddCard);
  openAndClosePopup(popupAddCard);
}
//Функция закрытия формы
function handleCloseForm(evt) {
  openAndClosePopup(evt.target.closest(".popup"));
}
//Добавление карточки в html
function getCard(item) {
  const card = new Card(item, "#card");
  const cardElement = card.generateCard();
  cards.prepend(cardElement);
}
// функция добавления 6 начальных карточек из template и массива
function getInitialCards() {
  initialCards.forEach((item) => {
    getCard(item);
  });
}
//Функция отправки формы создания карточки
function pullNewCard(event) {
  event.preventDefault();
  const newCard = { name: placeInput.value, link: imgSrcInput.value };
  getCard(newCard);
  openAndClosePopup(popupAddCard);
}
//Функция отправки формы редактирования
function setProfileInfo(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = dscrInput.value;
  openAndClosePopup(popupForEdit);
}
// Функция валидации форм
function getValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__content"));
  formList.forEach((form) => {
    const formValidator = new FormValidator(validationData, form);
    formValidator.enableValidation();
  });
}
// Слушатели
addButton.addEventListener("click", openPopupAddCard);
editButton.addEventListener("click", openPopupForEdit);
closeButton.forEach((element) =>
  element.addEventListener("click", handleCloseForm)
);
formElementAddCard.addEventListener("submit", pullNewCard);
formElementEdit.addEventListener("submit", setProfileInfo);
getInitialCards();
getValidation();
