//Переменные
const popup = document.querySelector(".popup");
const cards = document.querySelector(".cards");
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
//Массив начальных карточек
const initialCards = [
  { name: "Нью-Йорк", link: "pictures/new-york.jpg" },
  { name: "Алтай", link: "pictures/altay.jpg" },
  { name: "Брюгге", link: "pictures/brugge.jpg" },
  { name: "Москва", link: "pictures/msk.jpg" },
  { name: "Новосибирск", link: "pictures/nsk.jpg" },
  { name: "Казань", link: "pictures/kazan.jpg" },
];
// функция открытия 6 начальных карточек из template и массива
function getInitialCards() {
  const cardTemplate = document.querySelector("#card").content;
  initialCards.forEach((element) => {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector(".card__title").textContent = element.name;
    cardElement.querySelector(".card__picture").src = element.link;
    cards.append(cardElement);
  });
  setCardEventListeners();
}
// Обработчик лайка
function handleLike(evt) {
  evt.target.classList.toggle("card__like-button_active");
}
// Обработчик удаления карточки
function handleDeleteCard(evt) {
  evt.target.previousElementSibling.removeEventListener("click", handleLike);
  evt.target
    .closest(".card__delete-button")
    .removeEventListener("click", handleDeleteCard);
  evt.target.closest(".card").remove();
}
//Функция открытия popup for edit
function openPopupForEdit() {
  nameInput.value = profileName.textContent;
  dscrInput.value = profileDescription.textContent;
  popupForEdit.classList.toggle("popup_opened");
}
//Функция отправки формы редактирования
formElementEdit.addEventListener("submit", function (event) {
  event.preventDefault();
  popupForEdit.classList.remove("popup_opened");
  profileName.textContent = nameInput.value;
  profileDescription.textContent = dscrInput.value;
});
//Функция закрытия формы
function handleCloseForm(evt) {
  evt.target.closest(".popup").classList.remove("popup_opened");
}
//Функция открытия popup for card
function openPopupAddCard() {
  popupAddCard.classList.toggle("popup_opened");
}
//Функция отправки формы создания карточки
formElementAddCard.addEventListener("submit", function (event) {
  event.preventDefault();
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__title").textContent = placeInput.value;
  cardElement.querySelector(".card__picture").src = imgSrcInput.value;
  popupAddCard.classList.remove("popup_opened");
  cards.prepend(cardElement);
  setCardEventListeners();
});
//Функция открытия popup с картинкой
cards.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("card__picture")) {
    popupForImage.classList.toggle("popup_opened");
    popupForImage.querySelector(".popup__img-title").textContent =
      evt.target.nextElementSibling.textContent;
    popupForImage.querySelector(".popup__image").src = evt.target.src;
  }
});
// Слушатели
addButton.addEventListener("click", openPopupAddCard);
editButton.addEventListener("click", openPopupForEdit);
document
  .querySelectorAll(".popup__close-button")
  .forEach((closeButton) =>
    closeButton.addEventListener("click", handleCloseForm)
  );
// Устанавливаем слушатели событий для карточек
function setCardEventListeners() {
  document
    .querySelectorAll(".card__like-button")
    .forEach((likeButton) => likeButton.addEventListener("click", handleLike));
  document
    .querySelectorAll(".card__delete-button")
    .forEach((deleteButton) =>
      deleteButton.addEventListener("click", handleDeleteCard)
    );
}
getInitialCards();
