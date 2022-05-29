export class Api {

  constructor(cohortId, token) {
    this._cohortId = cohortId;
    this._token = token;
  }

  getAuthorInfo = () => {
    //Запрос данных с сервера
    fetch(`https://nomoreparties.co/v1/${this._cohortId}/users/me`, {
        headers: {
          authorization: this._token
        }
      })
      .then(res => {
        return res => res.json()
      })
  }
  if (res.ok) {
    .then(res => console.log(res))
  }

  getCards = () => {
    //Запрос карточек с сервера
    fetch(`https://nomoreparties.co/v1/${this._cohortId}/cards`, {
        headers: {
          authorization: this._token
        }
      })
      .then(res => res.json())
      .then(res => console.log(res))
  }
}