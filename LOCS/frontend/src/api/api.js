const baseURL = 'http://localhost:4000/';

export const userAPI = {
    async login(mail, pass) {
        const responce = await fetch(baseURL + `user/login/postLogin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ Login: { mail: mail, pas: pass } }),
            credentials: 'include'
        });

        return responce.json();
    },

    async setMe() {
        const responce = await fetch(baseURL + 'user', { credentials: 'include' });

        return responce.json();
    },

    async logoutMe() {
        const response = await fetch(baseURL + 'user/logout');
        return response.json();
    },

    async registration(nick, mail, pass) {
        const response = await fetch(baseURL + `user/registration/postreg`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                Registration: {
                    mail: mail, nick: nick, pas: pass
                }
            }),
        });

        const isReg = await response.json();

        return isReg;
    }
}

export const eventAPI = {
    getEvents(currentPage, countEvents) {
        fetch(baseURL + `event?page=${currentPage}&count=${countEvents}`)
            .then(response => response.json())
            .then(response => {
                this.props.setEvents(response.events, response.countEvents);
            })
            .catch(error => alert(error));
    }
}