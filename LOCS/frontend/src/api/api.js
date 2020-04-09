const baseURL = 'http://localhost:4000/';

export const userAPI = {
    login(mail, pass) {
        return fetch(baseURL + `user/login/postLogin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ Login: { Mail: mail, Password: pass } }),
            credentials: 'include'
        })
            .then(responce => responce.json());
    },

    setMe() {
        return fetch(baseURL + 'user/login/me', { credentials: "include" })
            .then(res => res.json());
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