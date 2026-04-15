export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._cardUrl = `${this._baseUrl}/cards/`;
  }

  _getRequest(url, method = "GET", body = null) {
    const options = { headers: this._headers, method: method };
    if (body) {
      options.body = JSON.stringify(body);
    }
    return fetch(url, options).then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialData() {
  return Promise.all([
    this.getUserInfo(),
    this.getInitialCards(),
  ]);
}

  getUserInfo() {
    return this._getRequest(this._userUrl);
  }

  getInitialCards() {
    return this._getRequest(this._cardUrl);
  }

  updateUserInfo(body) {
    return this._getRequest(this._userUrl, "PATCH", body);
  }

  addCard(body) {
    return this._getRequest(this._cardUrl, "POST", body);
  }

  updateCard(body) {
    return this._getRequest(this._cardUrl, "PATCH", body);
  }

  deleteCard(id) {
    return this._getRequest(`${this._cardUrl}${id}`, "DELETE");
  }

  updateLike(id) {
    return this._getRequest(`${this._cardUrl}${id}/likes`, "PUT");
  }

  deleteLike(id) {
    return this._getRequest(`${this._cardUrl}${id}/likes`, "DELETE");
  }

  updateUserImage(body) {
    return this._getRequest(`${this._userUrl}/avatar`, "PATCH", body);
  }
}
