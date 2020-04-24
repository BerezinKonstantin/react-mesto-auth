//Переменные
const page = document.querySelector(".page");
const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const addButton = document.querySelector(".profile__add-button");
//Функция открытия popup из template для профиля
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

//Функция открытия popup из template для картинок
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
    //Сюда добавить создание новой карточки
    //placeInput.textContent = новая карточка название.value;
    //imgSrcInput.textContent = фоновое изображение;
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
