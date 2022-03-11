export class UserInfo {
    constructor({ profileNameSelector, profileJobSelector }) {
        this._name = document.querySelector(profileNameSelector);
        this._job = document.querySelector(profileJobSelector);
    }

    getUserInfo() {
        this._profileInfo = {};
        this._profileInfo.name = this._name.textContent;
        this._profileInfo.job = this._job.textContent;
        return this._profileInfo;
    }

    setUserInfo({ name, job }) {
        this._name.textContent = name;
        this._job.textContent = job;
    }
}