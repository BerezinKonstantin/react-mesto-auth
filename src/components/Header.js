import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import headerLogo from '../pictures/logo.svg';

function Header(props) {
  const location = useLocation();
  const link = `${location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;
  const title = `${location.pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;

  return (
    <header className='header'>
      <img className='logo' src={headerLogo} alt='Логотип Mesto' />
      {!props.loggedIn && (
        <Link className='header__link link' to={link}>
          {title}
        </Link>
      )}
      {props.loggedIn && (
        <div className='header__nav'>
          <span className='header__email'>{props.email}</span>
          <button className='header__button' onClick={props.onSignOut}>
            Выйти
          </button>
        </div>
      )}
    </header>
  );
}
 
export default Header;
