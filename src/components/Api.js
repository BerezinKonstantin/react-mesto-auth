export class Api {
  constructor(url, id) {
    this.url = url;
    this.id = id;
  }
  _fetch(params) {
    return fetch(this.url, params).then((result) => {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(result.status);
    });
  }
  get() {
    return this._fetch({
      method: "GET",
      headers: {
        authorization: this.id,
      },
    });
  }
  post(body) {
    return this._fetch({
      method: "POST",
      headers: {
        authorization: this.id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  patch(body) {
    return this._fetch({
      method: "PATCH",
      headers: {
        authorization: this.id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  delete() {
    return this._fetch({
      method: "DELETE",
      headers: {
        authorization: this.id,
      },
    });
  }
  put() {
    return this._fetch({
      method: "PUT",
      headers: {
        authorization: this.id,
      },
    });
  }
}
