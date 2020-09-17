import React from 'react';
import SucsessIcon from '../pictures/SucsessIcon.svg';
import ErrIcon from '../pictures/ErrIcon.svg';

function InfoTooltip(props) {
  let popupOpened;
  let srcIcon;
  let infoText;
  if (props.isOpen) {
    popupOpened = 'popup_opened';
  }
  if (props.loggedIn) {
    srcIcon = SucsessIcon;
    infoText = 'Вы успешно зарегистрировались!';
  } else {
    srcIcon = ErrIcon;
    infoText = ' Что-то пошло не так! Попробуйте ещё раз.';
  }
  function haldleCloseTip() {
    props.onClose();
    popupOpened = null;
  }
  return (
    <section className={`popup popup_for_info-tool-tip ${popupOpened}`}>
      <div className='popup__content popup__info-tool-tip-content'>
        <img className='popup__info-tool-tip-icon' src={srcIcon} alt='Иконка' />
        <p className='popup__info-tool-tip-text'>{infoText}</p>
        <button
          className='popup__close-button'
          onClick={haldleCloseTip}
        ></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
