export class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._userData = {
      name: this._name.textContent,
      about: this._about.textContent
    };
    return this._userData;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this.setUserAvatar(data);
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar
  }
}
