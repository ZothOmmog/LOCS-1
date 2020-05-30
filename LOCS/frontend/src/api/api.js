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
    getEvents = (currentPage, countEvents) => {
        return [
            {
                id: 1,
                name: 'Dance Walking 2020',
                type: '#Танцы',
                info: 'Мы приглашаем ВСЕХ-ВСЕХ на необычную прогулку по городу. Мы будем перемещаться все вместе по заранее выбранному маршруту, ТАНЦУЯ! Музыка будет звучать у каждого из плеера с общим плейлистом. Dance Walking - это простое и вдохновляющее танцевальное действие, в котором может участвовать каждый. Это возможность провести время легко и с удовольствием под открытым небом, наполняясь энергией полного вдоха. Возможность почувствовать свободу и сопричастность с другими в этом неординарном действе, встряхнуться от обыденности жизни и поделиться своим настроением с окружающими.'
            },
            {
                id: 2,
                name: 'Stand-Up On Tour',
                type: '#Концерты',
                info: `
                Концерт Алексея Квашонкина и Александра Малого, резидентов Stand-Up Club #1, в рамках большого тура.

4 июня в 19.00 ПЕРЕНОС КОНЦЕРТА (дата уточняется)
Театр КТО (ул. Тургенева, 9А)
18+

----------------------------------------------------------------------------
Кирилл Селегей отправляется в тур! Крутой молодой комик из московского Stand-up Club #1 приезжает в ваш город с интеллигентным и ироничным юмором про актуальные, но понятные всем вещи.
                `
            }
        ]
        // this.go(GET, `event?page=${currentPage}&count=${countEvents}`, null, false);
    };
}

class SearchAPI extends FetchInstance {
    bodySearchUsersByNick = (nick) => ({ nick : nick });

    SearchUsersByNick = (nick, pageSize, pageNum) => this.go(POST, `user/SearchUser/${pageSize}/${pageNum}`,this.bodySearchUsersByNick(nick), true);
}

export const userAPI = new UserAPI();
export const eventAPI = new EventAPI();
export const searchAPI = new SearchAPI();