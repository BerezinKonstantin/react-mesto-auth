import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  //Используем хук "ref" для доступа к полю ввода
  const inputForAvatar = React.useRef();
  function handleSubmit(ev) {
    ev.preventDefault();
    // Передаём значение инпута во внешний обработчик
    props.onUpdateAvatar({
      avatar: inputForAvatar.current.value,
    });
  }
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="add-avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-avatar-src"
        className="popup__input popup__input_avatar-src"
        type="url"
        ref={inputForAvatar}
        name="avatar"
        defaultValue=""
        required
        placeholder="Ссылка на аватар"
      />
      <span id="input-avatar-src-error" className="popup__input-error-text">
        Необходимо заполнить данное поле
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
