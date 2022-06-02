export default class UserInfo {
  constructor(userSelector, descriptionSelector, avatarSelector) {
    this._author = document.querySelector(userSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      author: this._author.textContent,
      description: this._description.textContent,
      avatar: this._avatar
    }
  }
  setUserInfo(data) {
    const { name, about } = data;
    this._author.textContent = name;
    this._description.textContent = about;
  }

  setAvatar(url) {
    this._avatar.src = url;
  }
}