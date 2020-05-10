const baseURL = 'http://localhost:4000/';
const POST = 'POST';
const GET = 'GET';

class FetchInstance {
    constructor(baseURL) {
        this.baseURL = 'http://localhost:4000/';
    }
    
    __forOptionsGet() {
        return { type: GET };
    }

    __forOptionsPost(body) {
        return { type: POST, body: body };
    }
    
    __getOptionsWithCredentails(forOptions) {
        switch(forOptions.type) {
            case GET:
                return { credentials: 'include' };
            case POST:
                return {
                    method: POST,
                    headers: { 'Content-Type': 'application/json;charset=utf-8' },
                    body: JSON.stringify(forOptions.body),
                    credentials: 'include'
                };
            default:
                throw new Error('Ошибка при определении типа запроса');
            
        }
    }

    __getOptions(forOptions) {
        switch(forOptions.type) {
            case POST:
                return {
                    method: POST,
                    headers: { 'Content-Type': 'application/json;charset=utf-8' },
                    body: JSON.stringify(forOptions.body)
                }
            default:
                throw new Error('Ошибка при определении типа запроса');
        }
    }

    async go(type, route, body = null, withCredentails) {
        const url = this.baseURL + route;
        let responce;

        switch(type) {
            case GET:
                if(withCredentails) {
                    responce = await fetch(url, this.__getOptionsWithCredentails(   this.__forOptionsGet() ));
                }
                else {
                    responce = await fetch(url);
                }
                break;
            case POST:
                if(withCredentails) {
                    responce = await fetch(url, this.__getOptionsWithCredentails( this.__forOptionsPost(body) ));
                }
                else {
                    responce = await fetch(url, this.__getOptions( this.__forOptionsPost(body) ));
                }
                break;
            default:
                throw new Error('Ошибка при определении типа запроса');
        }

        return responce.json();
    }
}

class UserAPI extends FetchInstance {
    __bodyLogin = (mail, pass) => ({ Login: { mail: mail, pas: pass } });
    __bodyRegistration = (mail, nick, pass) => ({ Registration: { mail: mail, nick: nick, pas: pass } });
    __bodyGetUser = (id) => ({ user: id });
    
    __loginRoute = 'user/login/postLogin';
    __setMeRoute = 'user';
    __logoutMeRoute = 'user/logout';
    __registrationRoute = 'user/registration/postreg';
    __getUserRoute = 'user/UserAccount';
    
    login = (mail, pass) => this.go(POST, this.__loginRoute,  this.__bodyLogin(mail, pass), true);
    setMe = () => this.go(GET, this.__setMeRoute, null, true);
    logoutMe = () => this.go(GET, this.__logoutMeRoute, null, true);
    registration = (nick, mail, pass) => this.go(POST, this.__registrationRoute, this.__bodyRegistration(nick, mail, pass), false);
    getUser = (id) => this.go(POST, this.__getUserRoute, this.__bodyGetUser(id), true);
}

class EventAPI extends FetchInstance {
    getEvents = (currentPage, countEvents) => this.go(GET, `event?page=${currentPage}&count=${countEvents}`, null, false);
}

class SearchAPI extends FetchInstance {
    bodySearchUsersByNick = (nick) => ({ nick : nick });

    SearchUsersByNick = (nick, pageSize, pageNum) => this.go(POST, `user/SearchUser/${pageSize}/${pageNum}`,this.bodySearchUsersByNick(nick), true);
}

export const userAPI = new UserAPI(baseURL);
export const eventAPI = new EventAPI(baseURL);
export const searchAPI = new SearchAPI(baseURL);