const users = [];

module.exports = class User {

    constructor(login, hashpass) {
        this.login = login;
        this.hashpass = hashpass;
    }
    save() {
        users.push(this);
    }
    static getAll() {
        return users;
    }
}