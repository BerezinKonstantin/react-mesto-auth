import { handleCardClick } from "../pages/index.js";
export const handleLike = (event) => {
  event.target.classList.toggle("card__like-button_active");
};
//Метод удаления карточки и слушателей
export const handleDeleteCard = (event) => {
  const deletedCard = event.target.closest(".card");
  deletedCard
    .querySelector(".card__like-button")
    .removeEventListener("click", handleLike);
  event.target.removeEventListener("click", handleDeleteCard);
  deletedCard
    .querySelector(".card__picture")
    .removeEventListener("click", handleCardClick);
  deletedCard.remove();
};
//Метод закрытия попапа по ESC
export const handleEscClose = (event) => {
  if (event.key === "Escape") {
    document.querySelector(".popup_opened").classList.remove("popup_opened");
    document.removeEventListener("keyup", handleEscClose);
  }
};
//Функция закрытия попапа кликом по оверлею
export const setListenerClickClose = (event) => {
  if (event.target.classList.contains("popup_opened")) {
    document.removeEventListener("keyup", handleEscClose);
    event.target.classList.remove("popup_opened");
  }
};
//Функция удаления ошибок с инпутов (при залипании)
export function clearInputsErrors(popupSelector) {
  const inputs = Array.from(
    document.querySelector(popupSelector).querySelectorAll(".popup__input")
  );
  inputs.forEach((element) => {
    if (element.classList.contains("popup__input_type_error")) {
      element.classList.remove("popup__input_type_error");
    }
  });
  const errorTexts = Array.from(
    document
      .querySelector(popupSelector)
      .querySelectorAll(".popup__input-error-text")
  );
  errorTexts.forEach((element) => {
    if (element.classList.contains("popup__input-error-text_active")) {
      element.classList.remove("popup__input-error-text_active");
    }
  });
}
//Метод отключения кнопки при открытии попапа
export function toggleButton(popupSelector) {
  const buttonElement = document
    .querySelector(popupSelector)
    .querySelector(".popup__submit-button");
  buttonElement.classList.add("popup__submit-button_inactive");
  buttonElement.disabled = true;
}
