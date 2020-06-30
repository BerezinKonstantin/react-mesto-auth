export class Api {
  constructor(url) {
    this.url = url;
  }
  _fetch(params) {
    return fetch(this.url, params)
      .then((result) => {
        if (result.ok) {
          return result.json();
        }
        return Promise.reject(result.status);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  get() {
    return this._fetch({
      method: "GET",
      headers: {
        authorization: "89e2c3a3-c362-4c73-9168-38bfd7349e7e",
      },
    });
  }
  post(body) {
    return this._fetch({
      method: "POST",
      headers: {
        authorization: "89e2c3a3-c362-4c73-9168-38bfd7349e7e",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  patch(body) {
    return this._fetch({
      method: "PATCH",
      headers: {
        authorization: "89e2c3a3-c362-4c73-9168-38bfd7349e7e",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  delete() {
    return this._fetch({
      method: "DELETE",
      headers: {
        authorization: "89e2c3a3-c362-4c73-9168-38bfd7349e7e",
      },
    });
  }
  put() {
    return this._fetch({
      method: "PUT",
      headers: {
        authorization: "89e2c3a3-c362-4c73-9168-38bfd7349e7e",
      },
    });
  }
}
