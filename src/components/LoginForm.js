import React from 'react';

function LoginForm(props) {
  
  return (
    <form
      id='login_form'
      className='login__form'
      action='#'
      method='POST'
      noValidate
      onSubmit={props.onSubmit}
    >
      <div>
        <h2 className='login__title'>{props.title}</h2>
        <fieldset className='login__fieldset'>{props.children}</fieldset>
      </div>
      <button className='login__submit-button ' type='submit'>
        {props.buttonTitle}
      </button>
    </form>
  );
}

export default LoginForm;
