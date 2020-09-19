import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

function Login(props) {
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
    props.onLogin({ email, password });
    
  }

  return (
    <section className='login'>
      <LoginForm onSubmit={handleSubmit} title='Вход' buttonTitle='Войти'>
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
        <p className='login__sign'>Еще не зарегистрированы?&nbsp;</p>
        <Link className='login__link' to='/sign-up'>
          Регистрация
        </Link>
      </div>
    </section>
  );
}

export default Login;
