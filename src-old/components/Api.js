export class Api {
  constructor(token) {
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
  get(url) {
    return this._fetch(url, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    });
  }
  post(url,body) {
    return this._fetch(url, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  patch(url, body) {
    return this._fetch(url, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  delete(url) {
    return this._fetch(url, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    });
  }
  put(url) {
    return this._fetch(url, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    });
  }
}
