//Переменные
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const popup = document.querySelector(".popup");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const formElement = document.querySelector(".popup__content");
const nameInput = document.querySelector(".popup__input_name");
const jobInput = document.querySelector(".popup__input_description");
//Функция открытия- закрытия ПопАпа
const openAndClosePopup = function () {
  popup.classList.toggle("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};
//Функция отправки формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  openAndClosePopup();
}
//Слушатели
formElement.addEventListener("submit", formSubmitHandler);
editButton.addEventListener("click", openAndClosePopup);
closeButton.addEventListener("click", openAndClosePopup);
