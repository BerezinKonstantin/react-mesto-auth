import React from 'react';

function InfoTooltip(props) {
  let popupOpened = null;
  
  if (props.isOpen) {
    popupOpened = 'popup_opened';
  }
  function haldleCloseTip() {
    props.onClose();
    popupOpened = null;
  }
  return (
    <section className={`popup popup_for_info-tool-tip ${popupOpened}`}>
      {popupOpened && (
        <div className='popup__content popup__info-tool-tip-content'>
          <img
            className='popup__info-tool-tip-icon'
            src={props.infoIcon}
            alt='Иконка'
          />
          <p className='popup__info-tool-tip-text'>{props.infoText}</p>
          <button
            className='popup__close-button'
            onClick={haldleCloseTip}
          ></button>
        </div>
      )}
    </section>
  );
}

export default InfoTooltip;
