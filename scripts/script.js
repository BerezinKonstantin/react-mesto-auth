//Переменные
const page = document.querySelector(".page");
const cards = document.querySelector(".cards");
const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const addButton = document.querySelector(".profile__add-button");
//Массив начальных карточек
const initialCards = [
  {
    name: "Нью-Йорк",
    link: "pictures/new-york.jpg",
  },
  {
    name: "Алтай",
    link: "pictures/altay.jpg",
  },
  {
    name: "Брюгге",
    link: "pictures/brugge.jpg",
  },
  {
    name: "Москва",
    link: "pictures/msk.jpg",
  },
  {
    name: "Новосибирск",
    link: "pictures/nsk.jpg",
  },
  {
    name: "Казань",
    link: "pictures/kazan.jpg",
  },
];
//функция открытия 6 начальных карточек из template и массива
function getInitialCards() {
  const cardTemplate = document.querySelector("#card").content;
  initialCards.forEach((element) => {
    const cardElement = cardTemplate.cloneNode(true);
    // Передаем карточке значения из массива
    cardElement.querySelector(".card__title").textContent = element.name;
    cardElement.querySelector(".card__picture").src = element.link;
    cardElement.querySelector(".card__picture").alt = "Фото места";
    // Функция лайк
    cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("card__like-button_active");
      });
    // Функция удаления карточки
    cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", function (evt) {
        evt.target.closest(".card").remove();
      });
    cards.append(cardElement);
  });
}
getInitialCards();
//Функция открытия popup для профиля из template
function popupEditProfile() {
  const popupTemplate = document.querySelector("#popup-form").content;
  const popupElement = popupTemplate.cloneNode(true);
  const closeButton = popupElement.querySelector(".popup__close-button");
  const nameInput = popupElement.querySelector(".popup__input_first");
  const jobInput = popupElement.querySelector(".popup__input_second");
  const formElement = popupElement.querySelector(".popup__content");
  //Передаем текстовые значения в popup
  popupElement.querySelector(".popup__title").textContent =
    "Редактировать профиль";
  popupElement.querySelector(".popup__submit-button").textContent = "Сохранить";
  //Передаем значения для первого input
  nameInput.placeholder = "Имя";
  nameInput.value = profileName.textContent;
  nameInput.name = "name";
  //Передаем значения для второго input
  jobInput.placeholder = "О себе";
  jobInput.value = profileDescription.textContent;
  jobInput.name = "description";
  //Создаем popup
  page.append(popupElement);
  //Функция отправки формы
  formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    const popupItem = formElement.closest(".popup");
    popupItem.remove();
  });
  //Функция закрытия формы
  closeButton.addEventListener("click", function () {
    const popupItem = closeButton.closest(".popup");
    popupItem.remove();
  });
}
//Функция открытия popup для картинок из template
function popupAddCard() {
  const popupTemplate = document.querySelector("#popup-form").content;
  const popupElement = popupTemplate.cloneNode(true);
  const closeButton = popupElement.querySelector(".popup__close-button");
  const placeInput = popupElement.querySelector(".popup__input_first");
  const imgSrcInput = popupElement.querySelector(".popup__input_second");
  const formElement = popupElement.querySelector(".popup__content");
  //Передаем текстовые значения в popup
  popupElement.querySelector(".popup__title").textContent = "Новое место";
  popupElement.querySelector(".popup__submit-button").textContent = "Создать";
  //Передаем значения для первого input
  placeInput.placeholder = "Название";
  placeInput.value = "";
  placeInput.name = "place_name";
  //Передаем значения для второго input
  imgSrcInput.placeholder = "Ссылка на картинку";
  imgSrcInput.value = "";
  imgSrcInput.name = "img_src";
  imgSrcInput.type = "url";
  //Создаем popup
  page.append(popupElement);
  //Функция отправки формы
  formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    const cardTemplate = document.querySelector("#card").content;
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector(".card__title").textContent = placeInput.value;
    cardElement.querySelector(".card__picture").src = imgSrcInput.value;
    // Функция лайк
    cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("card__like-button_active");
      });
    // Функция удаления карточки
    cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", function (evt) {
        evt.target.closest(".card").remove();
      });
    cards.prepend(cardElement);
    const popupItem = formElement.closest(".popup");
    popupItem.remove();
  });
  //Функция закрытия формы
  closeButton.addEventListener("click", function () {
    const popupItem = closeButton.closest(".popup");
    popupItem.remove();
  });
}

//Слушатели
addButton.addEventListener("click", popupAddCard);
editButton.addEventListener("click", popupEditProfile);
