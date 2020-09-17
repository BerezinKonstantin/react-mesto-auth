import React, { useContext, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  function handleChangeName(ev) {
    setName(ev.target.value);
  }
  function handleChangeDescription(ev) {
    setDescription(ev.target.value);
  }
  function handleSubmit(ev) {
    ev.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='edit'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id='input-name'
        className='popup__input popup__input_name'
        type='text'
        name='name'
        defaultValue={name}
        onChange={handleChangeName}
        required
        placeholder='Имя'
        pattern='[A-Za-zА-Яа-яЁё -]{2,40}'
      />
      <span id='input-name-error' className='popup__input-error-text'>
        Необходимо заполнить данное поле
      </span>
      <input
        id='input-dscr'
        className='popup__input popup__input_description'
        type='text'
        name='info'
        defaultValue={description}
        onChange={handleChangeDescription}
        required
        placeholder='О себе'
        maxLength='200'
        minLength='2'
      />
      <span id='input-dscr-error' className='popup__input-error-text'>
        Необходимо заполнить данное поле
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
