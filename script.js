const editButton = document.querySelector(".edit-button");
const closeButton = document.querySelector(".popup__close-button");
const popup = document.querySelector(".popup");
const openPopup = function () {
  popup.classList.add("popup_opened");
};
const closePopup = function () {
  popup.classList.remove("popup_opened");
};
editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const formElement = document.querySelector(".popup__content");
const nameInput = document.querySelector(".popup__input_name");
const jobInput = document.querySelector(".popup__input_description");
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.getAttribute("value");
  jobInput.getAttribute("value");
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}
formElement.addEventListener("submit", formSubmitHandler);
