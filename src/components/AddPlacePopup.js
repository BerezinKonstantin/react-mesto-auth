import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState();
  const [link, setLink] = React.useState();
  function handleChangeName(ev) {
    setName(ev.target.value);
  }
  function handleChangeLink(ev) {
    setLink(ev.target.value);
  }
  function handleSubmit(ev) {
    ev.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: name,
      link: link,
    });
  }
  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-place-name"
        className="popup__input popup__input_place-name"
        type="text"
        name="name"
        onChange={handleChangeName}
        defaultValue={name}
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
        onChange={handleChangeLink}
        defaultValue={link}
        required
        placeholder="Ссылка на картинку"
      />
      <span id="input-img-src-error" className="popup__input-error-text">
        Необходимо заполнить данное поле
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
