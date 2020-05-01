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
//Массив начальных карточек
const initialCards = [
  { name: "Нью-Йорк", link: "pictures/new-york.jpg" },
  { name: "Алтай", link: "pictures/altay.jpg" },
  { name: "Брюгге", link: "pictures/brugge.jpg" },
  { name: "Москва", link: "pictures/msk.jpg" },
  { name: "Новосибирск", link: "pictures/nsk.jpg" },
  { name: "Казань", link: "pictures/kazan.jpg" },
];
//Функция открытия popup
function openAndClosePopup(element) {
  element.classList.toggle("popup_opened");
}
//Функция открытия popup for edit
function openPopupForEdit() {
  nameInput.value = profileName.textContent;
  dscrInput.value = profileDescription.textContent;
  openAndClosePopup(popupForEdit);
}
//Функция открытия popup for card
function openPopupAddCard() {
  openAndClosePopup(popupAddCard);
}
//Функция открытия popup с картинкой
function openPopupForImage(evt) {
  openAndClosePopup(popupForImage);
  popupForImage.querySelector(".popup__img-title").textContent =
    evt.target.nextElementSibling.textContent;
  popupForImage.querySelector(".popup__image").src = evt.target.src;
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
function setListnersForCard(element) {
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
function getCard(element) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__title").textContent = element.name;
  cardElement.querySelector(".card__picture").src = element.link;
  setListnersForCard(cardElement);
  cards.prepend(cardElement);
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
  const newCard = [{ name: placeInput.value, link: imgSrcInput.value }];
  for (let el = 0; el < 1; el += 1) {
    getCard(newCard[el]);
  }
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
formElementAddCard.addEventListener("submit", getNewCard);
formElementEdit.addEventListener("submit", setProfileInfo);

getInitialCards();
