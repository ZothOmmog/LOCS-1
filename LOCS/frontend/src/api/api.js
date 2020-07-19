const baseURL = 'http://localhost:4000/';
const POST = 'POST';
const GET = 'GET';

export class FetchInstance {
    constructor() {
        this.baseURL = baseURL;
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
    registration = (nick, mail, pass) => this.go(POST, this.__registrationRoute, this.__bodyRegistration(mail, nick, pass), false);
    getUser = (id) => this.go(POST, this.__getUserRoute, this.__bodyGetUser(id), true);
}

class EventAPI extends FetchInstance {
    __getTagsRoute = 'event/tags';
    __getEventRoute = 'event/info';
    __searchEventsRoute = (pageSize, currentPage) => `event/search/${pageSize}/${currentPage}`;

    __createEventBody = (idAddres, name, info, price, link, tags) => ({
        idAddres: idAddres, 
        name: name, 
        info: info, 
        price: price, 
        link: link, 
        tags: tags
    });
    __getEventBody = (eventId) => ({ idEvent: eventId });
    __searchEventsBody = (query) => ({ word: query });

    getTags = () => this.go(GET, this.__getTagsRoute, null, false);
    getEvents = (currentPage, countEvents) => this.go(GET, `event/list/${countEvents}/${currentPage}`, null, false);
    getEvent = (eventId) => this.go(POST, this.__getEventRoute, this.__getEventBody(eventId), true );
    searchEvents = (pageSize, currentPage, query) => this.go(POST, this.__searchEventsRoute(pageSize, currentPage), this.__searchEventsBody(query));
    
}

class SearchAPI extends FetchInstance {
    __searchUsersByNickRoute = (pageSize, currentPage) => `user/SearchUser/${pageSize}/${currentPage}`;
    __searchOrgRoute = (pageSize, currentPage) => `org/search/${pageSize}/${currentPage}`;
    __searchEventsRoute = (pageSize, currentPage) => `event/search/${pageSize}/${currentPage}`;

    __searchUsersByNickBody = (query) => ({ nick : query });
    __searchOrgBody = (query) => ({ word: query });
    __searchEventsBody = (query) => ({ word: query });

    searchUsersByNick = (query, pageSize, currentPage) => this.go(POST, this.__searchUsersByNickRoute(pageSize, currentPage),this.__searchUsersByNickBody(query), true);
    searchOrganizerByName = (query, pageSize, currentPage) => this.go(POST, this.__searchOrgRoute(pageSize, currentPage), this.__searchOrgBody(query), false);
    searchEventsByName = (query, pageSize, currentPage) => { return this.go(POST, this.__searchEventsRoute(pageSize, currentPage), this.__searchEventsBody(query), false);}
}

export const userAPI = new UserAPI();
export const eventAPI = new EventAPI();
export const searchAPI = new SearchAPI();