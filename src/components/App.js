import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState();
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const api = new Api();
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCloseAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard();
  }
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
  //Функция постановки-удаления лайка
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
  //Функция удаления карточки
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
  //Функция сабмита формы добавления карточки
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
  React.useEffect(() => {
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
  React.useEffect(() => {
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
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
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
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
