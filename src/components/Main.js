import React from "react";
import Card from "./Card";
import { getUserApi, getCardsApi } from "../utils/Api";

function Main(props) {
  const [userAvatar, setUserAvatar] = React.useState();
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    getUserApi
      .get()
      .then((result) => {
        setUserAvatar(result.avatar);
        setUserName(result.name);
        setUserDescription(result.about);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  React.useEffect(() => {
    getCardsApi
      .get()
      .then((result) => {
        setCards(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrapper" onClick={props.onEditAvatar}>
          <img
            className="profile__avatar"
            src={userAvatar}
            alt="Аватар пользователя"
          />
        </div>
        <div className="profile__info">
          <div className="profile__info-shell">
            <h1 className="profile__name">{userName}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <ul className="cards">
        {cards.map((card) => (
          <Card card={card} key={card._id} onCardClick={props.onCardClick} />
        ))}
      </ul>
    </main>
  );
}

export default Main;
