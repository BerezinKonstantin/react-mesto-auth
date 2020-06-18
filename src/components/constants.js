export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const placeInput = document.querySelector(".popup__input_place-name");
export const imgSrcInput = document.querySelector(".popup__input_img-src");
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
  { name: "Нью-Йорк", link: newYork },
  { name: "Алтай", link: altay },
  { name: "Брюгге", link: brugge },
  { name: "Москва", link: msk },
  { name: "Новосибирск", link: nsk },
  { name: "Казань", link: kazan },
];
//Объект со значениями, передаваемыми в FormValidator
export const validationData = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error-text_active",
};
