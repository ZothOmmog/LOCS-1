let pgp = require("pg-promise")( /*options*/ );
let db = pgp("postgres://postgres:123@localhost:5432/LocsBD_Dev");


//проверка, что такое мыло есть
const CheckUser = (mail) => {
    return new Promise((resolve, reject) => {
        db.many("select CheckUser($1);", mail)
            .then(function(data) {
                resolve(data[0].checkuser);
            }).catch(function() {
                reject("ERROR BD: DateCreate");
                return;
            });
    });
};

//проверка, что такой ник есть
const CheckNick = (nick) => {
    return new Promise((resolve, reject) => {
        db.many("select CheckNick($1);", nick)
            .then(function(data) {
                resolve(data[0].checknick);
            }).catch(function() {
                reject("ERROR BD: CheckNick");
                return;
            });
    });
};

//время бд сейчас
const TimeNow = () => {
    return new Promise((resolve, reject) => {
        db.many("SELECT CURRENT_TIMESTAMP;")
            .then(function(data) {
                resolve(String(data[0].current_timestamp));
            }).catch(function() {
                reject("ERROR BD: TimeNow");
                return;
            });
    });
};
//регистрация нового пользователя
const AddUser = (nick, mail, hashpas, role, city, createtime) => {
    return new Promise((resolve, reject) => {
        db.result('Call CreateUser($1, $2, $3, $4, $5, $6);', [nick, mail, hashpas, role, city, createtime])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: TimeNow");
                return;
            });
    });
};

//Дата создания по почте

const DateCreate = (mail) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select DateCreate($1);", [mail])
            .then(function(data) {
                resolve(data[0].datecreate);
            }).catch(function() {
                reject("ERROR BD: DateCreate");
                return;
            });
    });
};

//ID авторазации 
const LogUser = (mail, hashpas) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select LogUser($1,$2);", [mail, hashpas])
            .then(function(data) {
                resolve(data[0].loguser);
            }).catch(function() {
                reject("ERROR BD: LogUser");
                return;
            });
    });
};

//Роль пользователя
const RoleUser = (UserId) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select RoleUser($1);", UserId)
            .then(function(data) {
                resolve(data[0].roleuser);
            }).catch(function() {
                reject("ERROR BD: RoleUser");
                return;
            });
    });
};

//Данные об аккаунте по ID

const DataUserAccount = (userId) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select DataUserAccount($1);", userId)
            .then(function(data) {

                let strData = String(data[0].datauseraccount).replace(")", "");
                strData = strData.replace("(", "");
                resolve(strData.split(','));

            }).catch(function() {
                reject("ERROR BD: DataUserAccount");
                return;
            });
    });
};


//ID и ник по поиску 
const datauserlist = (nick) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select datauserlist($1) as User;", "%" + nick + "%")
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: datauserlist");
                return;
            });
    });
};

//ID и ник по поиску с ограничениями 
const datauserlistLimit = (nick, limit, offset) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select datauserlistwithlimit($1,$2,$3) as User;", ["%" + nick + "%", limit, offset])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: datauserlist");
                return;
            });
    });
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
const friendListLimit = (id, limit, offset) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select friendListWithLimit($1,$2,$3) as friend;", [id, limit, offset])
            .then(data => {
                resolve(data);
            }).catch(function(err) {
                console.log(err);
                reject("ERROR BD: friendList ");
                return;
            });

    });
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


//Список входящих заявок  странично
let friendRequestsWithLimit = (id, limit, offset) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select friendRequestsWithLimit($1,$2,$3) as request;", [id, limit, offset])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: friendRequestsWithLimit");
                return;
            });
    });
};


//доабвление в друзья
let addFriend = (id, id2) => {
    return new Promise((resolve, reject) => {
        db.result('Call AddFriend($1, $2);', [id, id2])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: AddFriend");
                return;
            });
    })
}

//Подтверждение заявки в друзья (user 1 Подтверждает)
let acceptFriend = (id, id2) => {
    return new Promise((resolve, reject) => {
        db.result('Call AcceptFriend($1, $2);', [id, id2])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: AcceptFriend");
                return;
            });
    })
}

//Удаление из друзей
let deleteFriend = (id, id2) => {
    return new Promise((resolve, reject) => {
        db.result('Call DeleteFriend($1, $2);', [id, id2])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: DeleteFriend");
                return;
            });
    })
}


// Статус друзей. Проверка,  -1 - нет в друзьях, 0 отпралена заявка, 1 - входящая заявка, 2 - в друзьях
let friendStatus = (id, id2) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select FriendStatus($1);", [id, id2])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: FriendStatus");
                return;
            });
    });
};

///////////////////
//Добавить район
let addDistrict = (title, id_city) => {
    return new Promise((resolve, reject) => {
        db.result('Call AddDistrict($1, $2);', [title, id_city])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: AddDistrict");
                return;
            });
    })
}

//Добавить адрес
let addAddress = (street, house, latitude, longitude, idDistrict) => {
    return new Promise((resolve, reject) => {
        db.result('Call AddAddress($1, $2,$3,$4,$5);', [street, house, latitude, longitude, idDistrict])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: AddAddress");
                return;
            });
    })
}


///////////////////
//Добавить событие (не учитывает теги, отдельная процедура)
let addEvent = (name, info, link, ticket_price, id_org, id_address, publish = false) => {
    return new Promise((resolve, reject) => {
        db.result('Call AddEvent($1, $2,$3,$4,$5,$6,$7);', [name, info, link, ticket_price, id_org, id_address, publish])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: AddEvent");
                return;
            });
    })
}

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
    'friendList': friendList, //Список друзей
    'friendListLimit': friendListLimit, //Список друзей странично
    'friendRequestsWithLimit': friendRequestsWithLimit, //Список входящих заявок постранично 
    'friendRequests': friendRequests, //Список входящих заявок

    'friendRequestsSent': friendRequestsSent, //Список отправленых заявок 




    'addFriend': addFriend, //доабвление в друзья
    'acceptFriend': acceptFriend, //Подтверждение заявки в друзья (user 1 Подтверждает)
    'deleteFriend': deleteFriend, //Удаление из друзей
    'friendStatus': friendStatus, // Статус друзей. Проверка,  -1 - нет в друзьях, 0 отпралена заявка, 1 - входящая заявка, 2 - в друзьях

    ///бд
    'TimeNow': TimeNow, //время бд сейчас

    //для админки 
    'addDistrict': addDistrict, //Добавить район
    'addAddress': addAddress, //Добавить адрес


    //события 
    'addEvent': addEvent,
};