import React from "react";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
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
        <button className="card__like-button" type="button"></button>
        <p className="card__likes-number">{props.card.likes.length}</p>
      </div>
      <button className="card__delete-button" type="button"></button>
    </li>
  );
}

export default Card;
