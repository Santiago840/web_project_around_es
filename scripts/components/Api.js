export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._cardUrl = `${this._baseUrl}/cards/`;
  }

  _validateRequestBody(body) {
    return body !== null ? JSON.stringify(body) : undefined;
  }

  _getRequest(url, method = "GET", body = null) {
    return fetch(url, {
      method: method,
      headers: this._headers,
      body: this._validateRequestBody(body),
    }).then((res) => {
      return res.ok
        ? res.json()
        : Promise.reject(`Something went wrong error: ${res.status}`);
    });
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
}
