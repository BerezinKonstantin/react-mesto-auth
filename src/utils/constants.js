export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const nameInput = document.querySelector(".popup__input_name");
export const infoInput = document.querySelector(".popup__input_description");

//Массив начальных карточек
import newYork from "../pictures/new-york.jpg";
import altay from "../pictures/altay.jpg";
import brugge from "../pictures/brugge.jpg";
import msk from "../pictures/msk.jpg";
import nsk from "../pictures/nsk.jpg";
import kazan from "../pictures/kazan.jpg";
export const initialCards = [
  { placeName: "Нью-Йорк", imgSrc: newYork },
  { placeName: "Алтай", imgSrc: altay },
  { placeName: "Брюгге", imgSrc: brugge },
  { placeName: "Москва", imgSrc: msk },
  { placeName: "Новосибирск", imgSrc: nsk },
  { placeName: "Казань", imgSrc: kazan },
];
//Объект со значениями, передаваемыми в FormValidator
export const validationData = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error-text_active",
};
