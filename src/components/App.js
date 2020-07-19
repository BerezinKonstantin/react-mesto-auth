import React from "react";
import "./App.css";

function App() {
  return (
    <div className="page">
      <header className="header">
        <img className="logo" src="pictures/logo.svg" alt="Логотип" />
      </header>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-wrapper">
            <img
              className="profile__avatar"
              src="#"
              alt="Аватар пользователя"
            />
          </div>
          <div className="profile__info">
            <div className="profile__info-shell">
              <h1 className="profile__name"></h1>
              <button className="profile__edit-button" type="button"></button>
            </div>
            <p className="profile__description"></p>
          </div>
          <button className="profile__add-button" type="button"></button>
        </section>
        <ul className="cards"></ul>
      </main>
      <footer className="footer">
        <p className="footer__copyright">&copy; 2020 Mesto Russia</p>
      </footer>
      <section className="popup popup_for_edit">
        <form
          id="form_for_edit"
          className="popup__content"
          action="#"
          method="POST"
          noValidate
        >
          <button className="popup__close-button" type="button"></button>
          <h2 className="popup__title">Редактировать профиль</h2>
          <fieldset className="popup__fieldset">
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
          </fieldset>
          <button
            className="popup__submit-button popup__submit-button_inactive"
            type="submit"
            defaultValue="Сохранить"
          >
            Сохранить
          </button>
        </form>
      </section>
      <section className="popup popup_for_add-card">
        <form
          id="form_for_add-card"
          className="popup__content"
          action="#"
          method="POST"
          noValidate
        >
          <button className="popup__close-button" type="button"></button>
          <h2 className="popup__title">Новое место</h2>
          <fieldset className="popup__fieldset">
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
            <span
              id="input-place-name-error"
              className="popup__input-error-text"
            >
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
          </fieldset>
          <button
            className="popup__submit-button"
            type="submit"
            defaultValue="Создать"
          >
            Создать
          </button>
        </form>
      </section>
      <section className="popup popup_for_remove-card">
        <form
          id="form_for_remove-card"
          className="popup__content"
          action="#"
          method="POST"
          noValidate
        >
          <button className="popup__close-button" type="button"></button>
          <h2 className="popup__title">Вы уверены?</h2>
          <button className="popup__submit-button" type="submit" value="">
            Да
          </button>
        </form>
      </section>
      <section className="popup popup_for_add-avatar">
        <form
          id="form_for_add-avatar"
          className="popup__content"
          action="#"
          method="POST"
          noValidate
        >
          <button className="popup__close-button" type="button"></button>
          <h2 className="popup__title">Обновить аватар</h2>
          <fieldset className="popup__fieldset">
            <input
              id="input-avatar-src"
              className="popup__input popup__input_avatar-src"
              type="url"
              name="avatar"
              defaultValue=""
              required
              placeholder="Ссылка на аватар"
            />
            <span
              id="input-avatar-src-error"
              className="popup__input-error-text"
            >
              Необходимо заполнить данное поле
            </span>
          </fieldset>
          <button
            className="popup__submit-button"
            type="submit"
            defaultValue="Сохранить"
          >
            Сохранить
          </button>
        </form>
      </section>
      <section className="popup popup_for_image">
        <div className="popup__img-wrapper">
          <img className="popup__image" src="#" alt="Фото места" />
          <p className="popup__img-title"></p>
          <button className="popup__close-button"></button>
        </div>
      </section>
      <template id="card">
        <li className="card">
          <img className="card__picture" src="#" alt="Фото места" />
          <h2 className="card__title"></h2>
          <div className="card__like-wrapper">
            <button className="card__like-button" type="button"></button>
            <p className="card__likes-number">0</p>
          </div>
          <button className="card__delete-button" type="button"></button>
        </li>
      </template>
    </div>
  );
}

export default App;
