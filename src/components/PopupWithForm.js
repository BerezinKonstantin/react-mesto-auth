import React from "react";

function PopupWithForm(props) {
  return (
    <section className={`popup popup_for_${props.name} ${props.isOpen}`}>
      <form
        id={`form_for_${props.name}`}
        className="popup__content"
        action="#"
        method="POST"
        noValidate
      >
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <fieldset className="popup__fieldset">{props.children}</fieldset>
        <button
          className="popup__submit-button popup__submit-button_inactive"
          type="submit"
          defaultValue="Сохранить"
        >
          Сохранить
        </button>
      </form>
    </section>
  );
}

export default PopupWithForm;
