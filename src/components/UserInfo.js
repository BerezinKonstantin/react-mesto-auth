export class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
  }
  getUserInfo() {
    this._userInfoValues = {};
    this._userInfoValues.name = document.querySelector(
      this._userNameSelector
    ).textContent;
    this._userInfoValues.info = document.querySelector(
      this._userInfoSelector
    ).textContent;
    return this._userInfoValues;
  }
  setUserInfo({ name, info }) {
    document.querySelector(this._userNameSelector).textContent = name;
    document.querySelector(this._userInfoSelector).textContent = info;
  }
}
