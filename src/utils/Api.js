import { token, myCohort, basedUrl } from "../utils/constants";
class Api {
  constructor(token, url) {
    this._token = token;
    this._url = url;
  }
  _fetch(url, params) {
    return fetch(url, params).then((result) => {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(result.status);
    });
  }
  get() {
    return this._fetch(this._url, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    });
  }
}
const getUserApi = new Api(token, `${basedUrl}/${myCohort}/users/me`);
const getCardsApi = new Api(token, `${basedUrl}/${myCohort}/cards`);
export { getUserApi, getCardsApi };
