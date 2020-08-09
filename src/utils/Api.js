import { token, myCohort, basedUrl } from "../utils/constants";

export default class Api {
  constructor() {
    this._token = token;
  }
  _fetch(url, params) {
    return fetch(url, params).then((result) => {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(result.status);
    });
  }
  //Получение информации о массиве карточек
  getCardsApi() {
    return this._fetch(`${basedUrl}/${myCohort}/cards`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    });
  }
  //Получение информации о пользователе
  getUserInfoApi() {
    return this._fetch(`${basedUrl}/${myCohort}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    });
  }
  // Метод изменения инфо о юзере
  setUserInfo(body) {
    return this._fetch(`${basedUrl}/${myCohort}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  //Метод изменения аватара пользователя
  setUserAvatar(body) {
    return this._fetch(`${basedUrl}/${myCohort}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  //Метод постановки-удалкения лайка
  changeLikeCardStatus(cardId, likeStatus) {
    return this._fetch(`${basedUrl}/${myCohort}/cards/likes/${cardId}`, {
      method: `${likeStatus ? "PUT" : "DELETE"}`,
      headers: {
        authorization: this._token,
      },
    });
  }
  //Метод удаления карточки
  deleteCardApi(cardId) {
    return this._fetch(`${basedUrl}/${myCohort}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    });
  }
  //Метод отправки формы для добавления каротчки
  postCard(card) {
    return this._fetch(`${basedUrl}/${myCohort}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    });
  }
}
