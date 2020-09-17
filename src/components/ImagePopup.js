import React from 'react';

function ImagePopup(props) {
  let popupOpened;
  let srcLink;
  let cardName;
  if (props.card) {
    popupOpened = 'popup_opened';
    srcLink = props.card.link;
    cardName = props.card.name;
  }

  return (
    <section className={`popup popup_for_image ${popupOpened}`}>
      <div className='popup__img-wrapper'>
        <img className='popup__image' src={srcLink} alt='Фото места' />
        <p className='popup__img-title'>{cardName}</p>
        <button
          className='popup__close-button'
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
