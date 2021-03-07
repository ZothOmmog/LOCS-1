const intiDB = require('./DBinit.js');
let db = intiDB.db;


//проверка, что такое мыло есть
const CheckUser = async (mail) => {
    var data = await db.one("select CheckUser($1);", mail);
    return  data.checkuser;
};

//проверка, что такой ник есть
const CheckNick = async (nick) => {
    var data = await db.one("select CheckNick($1);", nick);
    return  data.checknick;
};

//время бд сейчас
const TimeNow = async () => {
    var data = await db.one("SELECT CURRENT_TIMESTAMP;");
    return  data.current_timestamp;
};

//регистрация нового пользователя
const AddUser = async (nick, mail, hashpas, role, city, createtime) => {
    var data = await db.oneOrNone('select * from  CreateUser($1, $2, $3, $4, $5, $6);', [nick, mail, hashpas, role, city, createtime]);
    return  data.createuser;
};

//Дата создания по почте
const DateCreate = async (mail) => {
    const data = await db.oneOrNone("select DateCreate($1);", [mail]);
    return data.datecreate;
};

//ID авторазации 
const LogUser = async  (mail, hashpas) => {
    const data = await db.oneOrNone("select LogUser($1,$2);", [mail, hashpas]);
    return data.loguser;
};

//Роль пользователя
const RoleUser = async (userId) => {
    const data = await db.oneOrNone("select RoleUser($1);", userId)
    return data.roleuser;
};

//Данные об аккаунте по ID
const DataUserAccount = async (userId, cityId = null) => { 
    const data = await db.oneOrNone("select DataUserAccount($1,$2);", [userId, cityId]);
    if(data == null) return null;
    return data.datauseraccount.result_record;
};

//ID и ник по поиску 
const datauserlist = (nick) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select datauserlist($1) as User;",  nick )
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: datauserlist");
                return;
            });
    });
};

//count(ID и ник по поиску )
const Countdatauserlist = async (nick) => {
    const data = await db.oneOrNone("select count(*) from ( select datauserlist($1) )a;", [nick]);
    return data.count;
};

//ID и ник по поиску с ограничениями 
const datauserlistLimit = async (nick, limit, offset) => {
    const data = await db.manyOrNone("select datauserlistwithlimit($1,$2,$3) as User;", [nick , limit, offset]);  
    return data;
};


//Список друзей
const friendList = (id) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select friendList($1) as friend;", [id])
            .then(data => {
                resolve(data);
            }).catch(function(err) {
                console.log(err);
                reject("ERROR BD: friendList ");
                return;
            });

    });
};


//Список друзей странично
const friendListLimit = async (id, limit, offset) => {
    const data = await db.manyOrNone("select friendListWithLimit($1,$2,$3) as friend;", [id, limit, offset]);
    return data;
};

//Размер списка друзей 
const CountfriendListLimit = async (id) => {
    const data = await db.oneOrNone("select count(*) from (select friendList($1))a;", [id]);
    return data.count;
};

//Список отправленых заявок 
const friendRequestsSent = (id) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select friendRequestsSent($1) as request;", [id])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: friendRequestsSent");
                return;
            });
    });
};

//колличество отправленых заявок 
const countfriendRequestsSent = async (id) => {
    const data = await db.oneOrNone("select count(*) from (select friendRequestsSent($1))a;", [id]);
    return data.count;
};

//Список отправленых заявок странично 
const friendRequestsSentWithLimit = async (id, limit, offset) => {
    const data = await db.manyOrNone("select friendRequestsSentWithLimit($1,$2,$3) as request;", [id, limit, offset]);
    return data;
};

//Список входящих заявок 
let friendRequests = (id) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select friendRequests($1) as request;", [id])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: friendRequests");
                return;
            });
    });
};

//Список входящих заявок (колличество)
const countFriendRequests = async (id) => {
    const data = await db.oneOrNone("select count(*) from (select friendRequests($1))a;", [id]);
    return data.count;
};


//Список входящих заявок  странично
const friendRequestsWithLimit = async (id, limit, offset) => {
    const data = await db.manyOrNone("select friendRequestsWithLimit($1,$2,$3) as request;", [id, limit, offset]);
    return data;
};


//доабвление в друзья
const addFriend = async (id, id2) => {
    const result = await db.result('Call AddFriend($1, $2);', [id, id2]).catch( () =>{ return false;});
    return true;
}

//Подтверждение заявки в друзья (user 1 Подтверждает)
const acceptFriend = async (id, id2) => {
    const result = await db.result('Call AcceptFriend($1, $2);', [id, id2]).catch( () =>{ return false;});
    return true;
}

//Удаление из друзей
let deleteFriend = async (id, id2) => {
    const data = await db.result('Call DeleteFriend($1, $2);', [id, id2]).catch( () =>{ return false;});
    return true;     
}


// Статус друзей. Проверка,  -1 - нет в друзьях, 0 отпралена заявка, 1 - входящая заявка, 2 - в друзьях
const friendStatus = async (id, id2) => {
    const data = await db.oneOrNone("select FriendStatus($1, $2);", [id, id2]);
    return data.friendstatus;
};

///////////////////
//добавить токен
const addToken = async (tok, obj) => {
    const data = await db.result('Call AddToken($1, $2);', [String(tok), String(obj)]).catch( () =>{ return false;});
    return true;
}

//удалить токен
let DeleteToken = async (token) => {
    const data = await db.result('Call DeleteToken($1);', [token]).catch( () =>{ return false;});
     return true;      
}

//изменить роль на организатора в токене
let changeTokenToOrg = (tok) => {
    return new Promise((resolve, reject) => {
        db.result('Call changeTokenToOrg($1);', [tok])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: changeTokenToOrg");
                return;
            });
    })
}

// вернуть токен 
const TakeToken = async (token) => {
    const data = db.oneOrNone("select TakeToken($1);", [token]);
    return data;
};

//добавить токен для создания ссылки подтверждения аккаунта
let addTokenToAccept = async (tok, obj) => {
    var data = await db.result('Call AddTokenToAccept($1, $2);', [String(tok), Number(obj)]).catch( () =>{ return false;});
    return true;
}

//подтв аккаунт
const acceptMail = async (tok) => {
    const data = await db.result('Call acceptMail($1);', [tok]).catch( () =>{ return false;});
    return true;
}

//вернуть токен по id для подтв аккаунт
const returnTokenAcceptMail = async (id) => {
    const data = await db.oneOrNone('select * from returnTokenAcceptMail($1);', [id]);
    if(data == null ) return null;
    return data.returntokenacceptmail;
}

//id тегов по Id евента
const EventTags = async (id) => {
    const data = await db.manyOrNone('select EventTags($1);', [id]);
    return data;
}

//  данные для главной страницы 
const eventShortList = async (limit, offset) => {
    const data = await db.manyOrNone('select eventShortList($1,$2);', [limit, offset]);
    return data;
}

//  колличество данных event для главной страницы 
let countEventShortList = () => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select * from  countEventShortList(); ', [])
            .then(function(data) {
                resolve(data[0].j.count);
            }).catch(function(e) {
                console.log(e);
                reject("ERROR BD: countEventShortList");
                return;
            });
    })
}

// полные данные о событии
const event = async (id) => {
    const data = await db.oneOrNone('select Event($1);', [id]);
    return data;
}

//  тег по id
const tagById = async (id) => {
    const data = await db.oneOrNone('select tagById($1);', [id]);
    return data;
};

// добавить тег 
const addTag = async (title) => {
    const data = await db.result('call addTag($1);', [title]);
    return data;
};

// кол. тегов
let CountTags = () => {
    return new Promise((resolve, reject) => {
        db.oneOrNone('select CountTags();')
            .then(function(data) {
                resolve(data);
            }).catch(function(e) {
                console.log(e);
                reject("ERROR BD: CountTags");
                return;
            });
    })

}

// весь лист тегов странично
const tagsLim = async (limit, offset) => {
    const data = await db.manyOrNone('select Tags($1,$2);', [limit, offset]);
    return data;
}
// поиск евентов 
const searchEvent = async (word, limit, offset) => {
    const data = db.manyOrNone('select searchEvent($1,$2,$3);', [word, limit, offset]);
    return data;
}
//кол поиск евентов 
const countSearchEvent = async (word) => {
    const data = await db.oneOrNone('select countSearchEvent($1);', [ word ]);
    if(data == null) return null;
    return data.countsearchevent;
}

///регистрация организатора 
const registationOrganizer = async (id, info, organizationName, organizationLink, logo) => {
    const data = await db.result('call userToOrganizer($1,$2,$3,$4,$5);', [id, info, organizationName, organizationLink, logo]).catch((e) => {return false;});
    return true;
}

//изменние профиля организатора
const changeDataAboutOrg = async (id, name, info, organizationLink) => {
    const data = await db.result('call changedataaboutorg($1,$2,$3,$4);', [id, name, info, organizationLink]).catch((e) => {return false;});
    return data;
}

//Добавить событие (не учитывает теги, отдельная процедура)
const addEvent = async (name, info, link, ticket_price, id_org, id_address, datatime, publish = true) => {
    const data = await db.oneOrNone('select AddEvent($1, $2,$3,$4,$5,$6,$7,$8);', [name, info, link, ticket_price, id_org, id_address, publish, datatime]);
    if(data == null) return null;
    return data.addevent;
}

//Удалить событие
const deleteEvent = async (idEvent, idOrganizer) => {
    const data = await db.result('Call DeleteEvent($1,$2);', [idEvent, idOrganizer]).catch((e) => {return false;});
    return true;
}

//добавить тег евенту (tag - или название или id)
let addEventTag = (idEvent, tag) => {
    return new Promise((resolve, reject) => {
        db.result('Call AddEventTag($1,$2);', [idEvent, Number.parseInt(tag)])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: AddEventTag");
                return;
            });
    })
}

//добавить массив тегов евенту 
const addEventTagsArray = async (idEvent, arrayTagId) => {
    const data = db.result('Call add_event_tags($1,$2);', [idEvent, arrayTagId]).catch((e) => {return false;});
    return data;
}

//Изменение мероприятия (без тегов)
const changeEvent = async (idev, name, info, link, ticketPrice, idOrg, idAddress, datatime, publish = true) => {
    const data = await db.oneOrNone('select ChangeEvent($1,$2,$3,$4,$5,$6,$7,$8,$9);', [idev, name, info, link, ticketPrice, idOrg, idAddress, datatime, publish]);
    if(data == null) return null;
    return data.changeevent;
}

//удаление тегов у события 
const deleteEventTag = async (id) => {
    const data = await db.result('Call deleteEventTag($1);', [id]).catch((e) => {return false;});
    return true;
}

//данные об организаторе
const organizerData = async (id) => {
    const data = await db.oneOrNone('select  organizerData($1);', [id]);
    if(data == null) return null;
    return data.organizerdata;
}

//данные об мероприятиях для организатора
let organizerEvents = (id) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select   organizerEvents($1);', [id])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: organizerEvents");
                return;
            });
    })
}

//Поиск организаторов странично
const searchOrglimit = async (word, limit, offset) => {
    const data = await db.manyOrNone('select  searchOrg($1,$2,$3);', [word , limit, offset]);
    return data;
}

//Поиск организаторов 
let searchOrg = (word) => {
        return new Promise((resolve, reject) => {
            db.manyOrNone('select   searchOrg($1);', [ word])
                .then(function(data) {
                    resolve(data);
                }).catch(function() {
                    reject("ERROR BD: searchOrg");
                    return;
                });
        })
    }

//кол Поиск организаторов 
const countSearchOrg = async (word) => {
    const data = await db.oneOrNone('select count(*) from  searchOrg($1);', [ word ]);
    if(data == null) return null;
    return data.count;
}

//Статус подписки, Проверка, 0 не подписан, 1 - подписан
const subStatus = async (idOrg, idUser) => {
    const data = db.oneOrNone('select   subStatus($1,$2);', [idOrg, idUser]);
    return data;
}


//Подписка на организатора
const subOrg = async (id_org, id_user) => {
    const data = db.result('Call subOrg($1,$2);', [id_org, id_user]).catch((e) => {return false;});
    return data
}

//список подписчиков организатора странично
const subscribersLimit = async (idOrg, count, start) => {
    const data = await db.manyOrNone('select   subscribers($1,$2,$3);', [idOrg, count, start]);
    return data;
}

//список подписчиков организатора
let subscribers = (idOrg) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select  subscribers($1);', [idOrg])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: subscribers");
                return;
            });
    })
}


//кол подп организатора
const countSubscribers = async (idOrg) => {
    const data = await db.oneOrNone('select count(*) from subscribers($1);', [idOrg]);
    if(data == null) return null;
    return data.count;
}

//кол. подписчиков организатора
const countSub = async (idOrg) => {
    const data = await db.oneOrNone('select count(*) from   subscribers($1);', [idOrg]);
    if(data == null) return null;
    return data.count;
}


//Отписка от организатора
const unSubOrg = async (id_org, id_user) => {
    const data = db.result('Call unSubOrg($1,$2);', [id_org, id_user]).catch( (e) => {return false;});
    return data;
}

//Список подписок
let subList = (id_user) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select subList($1);', [id_user])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: subList");
                return;
            });
    })
}

//кол записей Список подписок
const countSubList = async (id_user) => {
    const data = await db.oneOrNone('select count(*) from subList($1);', [id_user]);
    if(data == null) return null;
    return data.count;  
}

//Список подписок странично
const subListLimit = async (id_user, count, start) => {
    const data = await db.manyOrNone('select subList($1,$2,$3);', [id_user, count, start]);
    return data;
}


//Список событий странично по id организатора
const eventOrgListLimit = async (id_user, count, start) => {
    const data = await db.manyOrNone('select eventOrgListLimit($1,$2,$3);', [id_user, count, start]);
    return data;
}

//Список событий по id организатора
let eventOrgList = (id_user) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select eventOrgList($1);', [id_user])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: eventOrgList");
                return;
            });
    })
}

//кол Список событий по id организатора
const countEventOrgList = async (id_user) => {
    const data = await db.oneOrNone('select count(*) from eventOrgList($1);', [id_user]);
    if(data == null) return null;
    return data.count;
}

//проверка имени организатора
const checkOrganizationName = async (nick) => {
    const data = await db.one("select checkOrg($1);", [nick]);
    if(data == null) return null;
    return data.checkorg;
};

//получение id адреса
const getIdAddress = (street, house) => {
    return new Promise((resolve, reject) => {
        db.one("select getAddress($1,$2);", [street, house])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: getIdAddress");
                return;
            });
    });
};

//получение id адреса, поиск
const searchAddress = async (word) => {
    const data = await db.manyOrNone("select searchAddress($1);", [ word ]);
    return data;
};

//получение id адреса, поиск по адресу и дому
const searchAddressWithHouse = async (word, house) => {
    const data = await db.manyOrNone("select searchAddress($1,$2);", [ word,  house ]);
    return data;
};

////загрузка фото
//загрузка фото лк
const addPhotoAcc = async (id, photo) => {
    const data = await db.result('Call AddPhotoAcc($1, $2);', [id, photo]).catch( (e) => { return false;});
    return true;
};

//загрузка фото организатора
const addPhotoOrg = async (id, photo) => {
    const data = await db.result('Call AddPhotoOrg($1, $2);', [id, photo]).catch( (e) => { return false;});
    console.log(data);
    return true;
};

//загрузка фото события
const addPhotoEvent = async (idOrg, idEvent, photo) => {
    const data = await db.result('Call AddPhotoEvent($1, $2, $3);', [idOrg, idEvent, photo]).catch( (e) => { return false;});
    return true;
};

module.exports = {

    //пользователь
    'CheckUser': CheckUser, //проверка, что такое мыло есть
    'CheckNick': CheckNick, //проверка, что такой ник есть
    'AddUser': AddUser, //регистрация нового пользователя
    'DateCreate': DateCreate, //Дата создания по почте
    'LogUser': LogUser, //ID авторазации 
    'RoleUser': RoleUser, //Роль пользователя
    'DataUserAccount': DataUserAccount, //Данные об аккаунте по ID

    'datauserlist': datauserlist, //ID и ник по поиску 
    'datauserlistLimit': datauserlistLimit, //ID и ник по поиску с ограничениями
    'Countdatauserlist': Countdatauserlist, //count(ID и ник по поиску )

    'friendList': friendList, //Список друзей
    'friendListLimit': friendListLimit, //Список друзей странично
    'CountfriendListLimit': CountfriendListLimit, //Размер списка друзей 

    'friendRequestsWithLimit': friendRequestsWithLimit, //Список входящих заявок постранично 
    'friendRequests': friendRequests, //Список входящих заявок
    'countFriendRequests': countFriendRequests, //Колличество  входящих заявок

    'friendRequestsSent': friendRequestsSent, //Список отправленых заявок 
    'countfriendRequestsSent': countfriendRequestsSent, //Колличество отправленых заявок
    'friendRequestsSentWithLimit': friendRequestsSentWithLimit, //Список отправленых заявок с ограничениями


    'addFriend': addFriend, //доабвление в друзья
    'acceptFriend': acceptFriend, //Подтверждение заявки в друзья (user 1 Подтверждает)
    'deleteFriend': deleteFriend, //Удаление из друзей
    'friendStatus': friendStatus, // Статус друзей. Проверка,  -1 - нет в друзьях, 0 отпралена заявка, 1 - входящая заявка, 2 - в друзьях

    ///бд
    'TimeNow': TimeNow, //время бд сейчас
    'addToken': addToken, //добавить токен
    'TakeToken': TakeToken, //вернуть токен
    'deleteToken': DeleteToken, //удалить токен
    'changeTokenToOrg': changeTokenToOrg, //изменить роль на организатора в токене

    'acceptMail': acceptMail, //подтв аккаунт
    'returnTokenAcceptMail': returnTokenAcceptMail, //вернуть токен по id для подтв аккаунт

    //для админки 
    'addTag': addTag, //добавить тег

    //события 
    'EventTags': EventTags, //Теги по Id евента
    'eventShortList': eventShortList, //  данные для главной страницы 
    'event': event, //полные данные о событии
    'countEventShortList': countEventShortList, //  колличество данных event для главной страницы 

    'CountTags': CountTags, //кол тегов
    'tagsLim': tagsLim, //весь лист тегов странично
    'tagById': tagById, //  тег по id


    'searchEvent': searchEvent, //поиск евентов (без тегов)
    'countSearchEvent': countSearchEvent, //кол поиск евентов 


    //организатор
    'addEvent': addEvent, //создать событие
    'deleteEvent': deleteEvent, //удалить событие
    'addEventTag': addEventTag, //добавить тег евенту
    'addEventTagsArray':addEventTagsArray, ////добавить массив тегов евенту

    'addTokenToAccept': addTokenToAccept, //добавить токен для создания ссылки подтверждения аккаунта


    'registationOrganizer': registationOrganizer, ///регистрация организатора 

    'changeDataAboutOrg': changeDataAboutOrg, //изменние профиля организатора

    'changeEvent': changeEvent, //изменить событие (без тегов)
    'deleteEventTag': deleteEventTag, //удаление тегов у события

    'organizerData': organizerData, //данные об организаторе

    'organizerEvents': organizerEvents, //данные об мероприятиях для организатора
    'searchOrglimit': searchOrglimit, //Поиск организаторов странично
    'subStatus': subStatus, //Статус подписки, Проверка, 0 не подписан, 1 - подписан

    'subscribersLimit': subscribersLimit, //список подписчиков организатора странично
    'countSubscribers': countSubscribers, //кол подп организатора
    'countEventOrgList': countEventOrgList, //кол Список событий по id организатора
    'countSearchOrg': countSearchOrg, // кол Поиск организаторов 

    'countSubList': countSubList, //rол записей Список подписок

    'subscribers': subscribers, //список подписчиков организатора
    'countSub': countSub, //кол. подписчиков организатора

    'getIdAddress': getIdAddress, //получение id адреса
    'searchAddress': searchAddress, //получение id адреса, поиск
    'searchAddressWithHouse' : searchAddressWithHouse, //получение id адреса, поиск по адресу и дому

    //работа с организаторами
    'subList': subList, //Список подписок
    'subListLimit': subListLimit, // Список подписок странично
    'unSubOrg': unSubOrg, //Отписка от организатора
    'subOrg': subOrg, //Подписка на организатора
    'searchOrg': searchOrg, //Поиск организаторов 

    'eventOrgList': eventOrgList, //Список событий по id организатора
    'eventOrgListLimit': eventOrgListLimit, //Список событий странично по id организатора
    'checkOrganizationName': checkOrganizationName, //проверка имени организатора

    //фото
    'addPhotoAcc': addPhotoAcc, //загрузка фото лк
    'addPhotoOrg': addPhotoOrg, //загрузка фото организатора
    'addPhotoEvent': addPhotoEvent, //загрузка фото события
};