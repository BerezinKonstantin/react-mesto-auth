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
const popupForImage = document.querySelector(".popup_for_image");
const cardTemplate = document.querySelector("#card").content;
const popupImgTitle = document.querySelector(".popup__img-title");
const popupImage = document.querySelector(".popup__image");
//Массив начальных карточек
const initialCards = [
  { name: "Нью-Йорк", link: "pictures/new-york.jpg" },
  { name: "Алтай", link: "pictures/altay.jpg" },
  { name: "Брюгге", link: "pictures/brugge.jpg" },
  { name: "Москва", link: "pictures/msk.jpg" },
  { name: "Новосибирск", link: "pictures/nsk.jpg" },
  { name: "Казань", link: "pictures/kazan.jpg" },
];
function setListenersSubmitBtn() {
  formElementAddCard.addEventListener("submit", getNewCard);
  formElementEdit.addEventListener("submit", setProfileInfo);
}
function deleteListenersSubmitBtn() {
  formElementAddCard.removeEventListener("submit", getNewCard);
  formElementEdit.removeEventListener("submit", setProfileInfo);
}
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
function openAndClosePopup(element) {
  handleClosingListener(element);
  deleteListenersSubmitBtn();
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
function toggleButton(popupForm, boolean) {
  const buttonElement = popupForm.querySelector(".popup__submit-button");
  if (boolean) {
    buttonElement.classList.add("popup__submit-button_inactive");
  }
}
//Функция открытия попапа для редактирования профиля
function openPopupForEdit() {
  nameInput.value = profileName.textContent;
  dscrInput.value = profileDescription.textContent;
  clearInputs(popupForEdit);
  toggleButton(popupForEdit, true);
  openAndClosePopup(popupForEdit);
}
//Функция открытия попапа для создания карточки
function openPopupAddCard() {
  formElementAddCard.reset();
  clearInputs(popupAddCard);
  toggleButton(popupAddCard, true);
  openAndClosePopup(popupAddCard);
}
//Функция открытия popup с картинкой
function openPopupForImage(evt) {
  popupImgTitle.textContent = evt.target.alt;
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  openAndClosePopup(popupForImage);
}
// Обработчик лайка
function handleLike(evt) {
  evt.target.classList.toggle("card__like-button_active");
}
// Обработчик удаления карточки
function handleDeleteCard(evt) {
  const deletedCard = evt.target.closest(".card");
  deletedCard
    .querySelector(".card__like-button")
    .removeEventListener("click", handleLike);
  deletedCard
    .querySelector(".card__delete-button")
    .removeEventListener("click", handleDeleteCard);
  deletedCard
    .querySelector(".card__picture")
    .removeEventListener("click", openPopupForImage);
  deletedCard.remove();
}
// Устанавливаем слушатели событий для карточек
function setListenersForCard(element) {
  element
    .querySelector(".card__like-button")
    .addEventListener("click", handleLike);
  element
    .querySelector(".card__delete-button")
    .addEventListener("click", handleDeleteCard);
  element
    .querySelector(".card__picture")
    .addEventListener("click", openPopupForImage);
}
//Функция закрытия формы
function handleCloseForm(evt) {
  openAndClosePopup(evt.target.closest(".popup"));
}
//Сборка карточки
function setCard(element) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__title").textContent = element.name;
  cardElement.querySelector(".card__picture").src = element.link;
  cardElement.querySelector(".card__picture").alt = element.name;
  setListenersForCard(cardElement);
  return cardElement;
}
//Добавление карточки в разметку
function getCard(element) {
  cards.prepend(setCard(element));
}
// функция открытия 6 начальных карточек из template и массива
function getInitialCards() {
  initialCards.forEach((el) => {
    getCard(el);
  });
}
//Функция отправки формы создания карточки
function getNewCard(event) {
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
// Слушатели
addButton.addEventListener("click", openPopupAddCard);
editButton.addEventListener("click", openPopupForEdit);
closeButton.forEach((element) =>
  element.addEventListener("click", handleCloseForm)
);

getInitialCards();
