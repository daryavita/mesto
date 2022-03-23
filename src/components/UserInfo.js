export class UserInfo {
    constructor({ profileNameSelector, profileJobSelector, profileAvatarSelector }) {
        this._name = document.querySelector(profileNameSelector);
        this._job = document.querySelector(profileJobSelector);
        this._avatar = document.querySelector(profileAvatarSelector);
    }

    getUserInfo() {
        this._profileInfo = {};
        this._profileInfo.name = this._name.textContent;
        this._profileInfo.job = this._job.textContent;
        this._profileInfo.avatar = this._avatar.src
        return this._profileInfo;
    }

    setUserInfo(name, job, avatar) {
        this._name.textContent = name;
        this._job.textContent = job;
        this._avatar.src = avatar;
    }
}