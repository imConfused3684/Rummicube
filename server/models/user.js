class User {
    constructor(login, password) {
        this.login = login;
        this.password = password;
        this.wins = 0; // Corrected to this.wins
    }
}

module.exports = User;
