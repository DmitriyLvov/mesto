export default class UserInfo {
  constructor(userSelector, descriptionSelector) {
    this._author = document.querySelector(userSelector);
    this._description = document.querySelector(descriptionSelector);
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