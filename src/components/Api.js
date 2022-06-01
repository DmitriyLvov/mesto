export class Api {

  constructor(cohortId, token) {
    this._cohortId = cohortId;
    this._token = token;
  }

  getAuthorInfo = () => {
    //Запрос данных с сервера
    return fetch(`https://nomoreparties.co/v1/${this._cohortId}/users/me`, {
        headers: {
          authorization: this._token
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        //Если ошибка
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  getCards = () => {
    //Запрос карточек с сервера
    return fetch(`https://nomoreparties.co/v1/${this._cohortId}/cards`, {
        headers: {
          authorization: this._token
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        //Если ошибка
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  setUserInfo = (data) => {
    const { name, about } = data;
    return fetch(`https://nomoreparties.co/v1/${this._cohortId}/users/me`, {
        method: "PATCH",
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          about
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        //Если ошибка
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  addNewCard = (data) => {
    const { name, link } = data;
    return fetch(`https://nomoreparties.co/v1/${this._cohortId}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      //Если ошибка
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  removeCard = (card_id) => {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${card_id}`, {
        method: "DELETE",
        headers: {
          authorization: this._token
        }
      })
      .then(res => {
        if (res.ok) {
          return res;
        }
        //Если ошибка
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  addLike = (card_id) => {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${card_id}/likes`, {
        method: "PUT",
        headers: {
          authorization: this._token
        }
      })
      .then(res => {
        if (res.ok) {
          return res;
        }
        //Если ошибка
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  removeLike = (card_id) => {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${card_id}/likes`, {
        method: "DELETE",
        headers: {
          authorization: this._token
        }
      })
      .then(res => {
        if (res.ok) {
          return res;
        }
        //Если ошибка
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  setAvatar = (avatar) => {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      //Если ошибка
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
}