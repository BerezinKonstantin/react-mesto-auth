import React, { useState } from 'react';
import LoginForm from './LoginForm';

function Register(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  function handleChangeEmail(ev) {
    setEmail(ev.target.value);
  }
  function handleChangePassword(ev) {
    setPassword(ev.target.value);
  }
  function handleSubmit(ev) {
    ev.preventDefault();
    props.onRegister({ email, password });
  }

  return (
    <section className='login'>
      <LoginForm
        onSubmit={handleSubmit}
        title='Регистрация'
        buttonTitle='Зарегистрироваться'
      >
        <input
          id='input-email'
          className='login__input login__input_email'
          type='text'
          name='email'
          autoComplete='email'
          defaultValue={email}
          onChange={handleChangeEmail}
          required
          placeholder='Email'
          pattern='/[.a-z0-9_-]+@[а-яА-Яa-z0-9-]+\.[а-яА-Яa-zA-Z]/i'
        />
        <input
          id='input-password'
          className='login__input login__input_password'
          type='password'
          name='password'
          autoComplete='current-password'
          defaultValue={password}
          onChange={handleChangePassword}
          required
          placeholder='Пароль'
          maxLength='20'
          minLength='6'
        />
      </LoginForm>
      <div className='login__signing'>
        <p className='login__sign'>Уже зарегистрированы?&nbsp;</p>
        <a className='login__link' href='/sign-in'>
          Войти
        </a>
      </div>
    </section>
  );
}

export default Register;
