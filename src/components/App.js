import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import ProtectedRoute from './ProtectedRoute';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Api from '../utils/Api';
import * as Auth from '../utils/auth';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState();
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState({});
  const history = useHistory();
  const api = new Api();
  // Метод для выбора текущей карточки
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  // Метод постановки-удаления лайка
  function handleCardLike(card) {
    //Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((el) => el._id === currentUser._id);
    //Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        //Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((cardEl) =>
          cardEl._id === card._id ? newCard : cardEl
        );
        //Обновляем стейт
        setCards(newCards);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // Метод удаления карточки
  function handleCardDelete(card) {
    //Отправляем запрос в API данные удаляемой карточки
    api
      .deleteCardApi(card._id)
      .then(() => {
        const newCards = cards.filter((cardEl) => card._id !== cardEl._id);
        setCards(newCards);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // Метод сабмита формы добавления карточки
  function handleAddPlaceSubmit(card) {
    api
      .postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(handleCloseAllPopups())
      .catch((error) => {
        console.error(error);
      });
  }
  // Методы открытия всплывающих окон
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleInfoToolTipOpen() {
    setIsInfoToolTipOpen(true);
  }
  // Метод закрытия всплывающих окон
  function handleCloseAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard();
  }
  //Обновление информации о пользователе
  function handleUpdateUser(body) {
    api
      .setUserInfo(body)
      .then((result) => {
        setCurrentUser(result);
      })
      .then(handleCloseAllPopups())
      .catch((error) => {
        console.error(error);
      });
  }
  //Обновление аватара
  function handleUpdateAvatar(body) {
    api
      .setUserAvatar(body)
      .then((result) => {
        setCurrentUser(result);
      })
      .then(handleCloseAllPopups())
      .catch((error) => {
        console.error(error);
      });
  }
  //Методы для регистрации и аутентификаци
  //Установка переменной "Лог-ин"
  function handleLogin() {
    setLoggedIn(true);
  }
  //Выход из аккаунта
  function onSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    history.push('/sign-in');
  }
  // Авторизация пользователя
  function onLogin({ email, password }) {
    Auth.authorize({ email, password })
      .then((data) => {
        if (data && data.token) {
          handleLogin();
          history.push('/');
          return;
        }
      })
      .then(() => {
        handleInfoToolTipOpen();
      })
      .catch((err) => console.log(err));
  }
  // Регистрация пользователя
  function onRegister({ email, password }) {
    Auth.register({ email, password })
      .then((res) => {
        if (res.statusCode !== 400) {
          history.push('/sign-in');
          return;
        } else {
          history.push('/sign-up');
          return;
        }
      })
      .catch((err) => console.log(err));
  }
  // Метод проверки токена на наличие (если есть - переход на основную страницу)
  function checkToken() {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token');
      Auth.checkToken(token).then((res) => {
        if (res) {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          history.push('/');
        }
      });
    }
  }
  // Запрос на получение карточек при загрузке страницы
  useEffect(() => {
    const api = new Api();
    api
      .getCardsApi()
      .then((result) => {
        setCards(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // Запрос на получение информации о юзере при загрузке страницы
  useEffect(() => {
    const api = new Api();
    api
      .getUserInfoApi()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // Проверка токена при загрузке страницы
  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header loggedIn={loggedIn} email={userEmail} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path='/'
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={loggedIn}
          />
          <Route path='/sign-up'>
            <Register onRegister={onRegister} />
          </Route>
          <Route path='/sign-in'>
            <Login onLogin={onLogin} />
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleCloseAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup card={selectedCard} onClose={handleCloseAllPopups} />
        <InfoTooltip
          onClose={handleCloseAllPopups}
          isOpen={isInfoToolTipOpen}
          loggedIn={loggedIn}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
