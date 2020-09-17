import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='content'>
      <>
        <section className='profile'>
          <div className='profile__avatar-wrapper' onClick={props.onEditAvatar}>
            <img
              className='profile__avatar'
              src={currentUser.avatar}
              alt='Аватар пользователя'
            />
          </div>
          <div className='profile__info'>
            <div className='profile__info-shell'>
              <h1 className='profile__name'>{currentUser.name}</h1>
              <button
                className='profile__edit-button'
                type='button'
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className='profile__description'>{currentUser.about}</p>
          </div>
          <button
            className='profile__add-button'
            type='button'
            onClick={props.onAddPlace}
          ></button>
        </section>
        <ul className='cards'>
          {props.cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </>
    </main>
  );
}

export default Main;
