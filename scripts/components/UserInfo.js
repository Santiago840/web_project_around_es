export default class UserInfo {
  constructor({ selectorName, selectorJob }) {
    this._name = document.querySelector(selectorName);
    this._job = document.querySelector(selectorJob);
  }

  getUserInfo() {
    return { name: this._name.textContent, job: this._job.textContent };
  }

  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
