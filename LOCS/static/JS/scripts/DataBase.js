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

module.exports = {
    'CheckUser': CheckUser,
    'CheckNick': CheckNick,
    'TimeNow': TimeNow,
    'AddUser': AddUser,
    'DateCreate': DateCreate,
    'LogUser': LogUser,
    'RoleUser': RoleUser,
    'DataUserAccount': DataUserAccount,
    'datauserlist': datauserlist,
    'friendList': friendList,
    'friendRequestsSent': friendRequestsSent,
    'friendRequests': friendRequests
};