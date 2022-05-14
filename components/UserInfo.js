export default class UserInfo {
  constructor(userSelector, descriptionSelector) {
    this._author = document.querySelector('.profile__text-field_type_author');
    this._description = document.querySelector('.profile__text-field_type_description');
  }

  getUserInfo() {
    return {
      author: this._author.textContent,
      description: this._description.textContent
    }
  }
  setUserInfo(author, description) {
    this._author.textContent = author;
    this._description.textContent = description;

  }
}