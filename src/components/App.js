import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState();
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCloseAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard();
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        title="Редактировать профиль"
        name="edit"
        isOpen={isEditProfilePopupOpen}
        onClose={handleCloseAllPopups}
      >
        <input
          id="input-name"
          className="popup__input popup__input_name"
          type="text"
          name="name"
          defaultValue=""
          required
          placeholder="Имя"
          pattern="[A-Za-zА-Яа-яЁё -]{2,40}"
        />
        <span id="input-name-error" className="popup__input-error-text">
          Необходимо заполнить данное поле
        </span>
        <input
          id="input-dscr"
          className="popup__input popup__input_description"
          type="text"
          name="info"
          defaultValue=""
          required
          placeholder="О себе"
          maxLength="200"
          minLength="2"
        />
        <span id="input-dscr-error" className="popup__input-error-text">
          Необходимо заполнить данное поле
        </span>
      </PopupWithForm>
      <PopupWithForm
        title="Новое место"
        name="add-card"
        isOpen={isAddPlacePopupOpen}
        onClose={handleCloseAllPopups}
      >
        <input
          id="input-place-name"
          className="popup__input popup__input_place-name"
          type="text"
          name="name"
          defaultValue=""
          required
          placeholder="Название"
          minLength="1"
          maxLength="30"
        />
        <span id="input-place-name-error" className="popup__input-error-text">
          Необходимо заполнить данное поле
        </span>
        <input
          id="input-img-src"
          className="popup__input popup__input_img-src"
          type="url"
          name="link"
          defaultValue=""
          required
          placeholder="Ссылка на картинку"
        />
        <span id="input-img-src-error" className="popup__input-error-text">
          Необходимо заполнить данное поле
        </span>
      </PopupWithForm>
      <PopupWithForm
        title="Обновить аватар"
        name="add-avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={handleCloseAllPopups}
      >
        <input
          id="input-avatar-src"
          className="popup__input popup__input_avatar-src"
          type="url"
          name="avatar"
          defaultValue=""
          required
          placeholder="Ссылка на аватар"
        />
        <span id="input-avatar-src-error" className="popup__input-error-text">
          Необходимо заполнить данное поле
        </span>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={handleCloseAllPopups} />
    </div>
  );
}

export default App;
