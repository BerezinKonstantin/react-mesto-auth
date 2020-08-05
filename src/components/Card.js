import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((el) => el._id === currentUser._id);
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  // Переменная, задающая css класс кнопки удаления, в зависимости от владения карточкой
  const cardDeleteButtonClassName = `${
    isOwn
      ? "card__delete-button"
      : "card__delete-button card__delete-button_hidden"
  }`;
  // Переменная, задающая css класс кнопки лайка, в зависимости от того, поставлен ли уже лайк
  const cardLikeButtonClassName = `${
    isLiked ? "card__like-button card__like-button_active" : "card__like-button"
  }`;
  return (
    <li className="card">
      <img
        className="card__picture"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <h2 className="card__title">{props.card.name}</h2>
      <div className="card__like-wrapper">
        <button
          className={cardLikeButtonClassName}
          type="button"
          onClick={handleLikeClick}
        ></button>
        <p className="card__likes-number">{props.card.likes.length}</p>
      </div>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}

export default Card;
