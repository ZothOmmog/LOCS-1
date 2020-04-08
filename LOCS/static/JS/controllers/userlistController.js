let User = require("../models/userlist.js");
const path = require('path')
let pgp = require("pg-promise")( /*options*/ );
let db = pgp("postgres://postgres:123@localhost:5432/LocsBD_Dev");

let crypt = require("../scripts/password.js");

const session = require('express-session');


exports.registration = function(request, response) {
    response.sendFile(path.resolve('static/html/registration.html'))
};
exports.postRegistration = async function(request, response) {
    ///тут берем время (+хэш с солью), данные из формы и заполняем userlsit и visitor
    var CreateTime;
    var CheckMail = false;
    var CheckNick = false;

    await db.many("select CheckUser($1);", request.body.mail)
        .then(function(data) {
            CheckMail = data[0].checkuser;
        })
    await db.many("select CheckNick($1);", request.body.nick)
        .then(function(data) {
            CheckNick = data[0].checknick;
        })


    if (CheckMail == true & CheckNick == true) {
        await db.many("SELECT CURRENT_TIMESTAMP;")
            .then(function(data) {
                CreateTime = String(data[0].current_timestamp);
            })
            .catch(function(error) {
                CreateTime = String("ERROR:", error);
            });


        ///тут где-то функция для хеш пароля
        var hash = crypt.hash(request.body.pas, CreateTime);
        console.log(CreateTime);
        console.log(hash);
        console.log(request.body.password);
        console.log("++++");

        db.result('Call CreateUser($1, $2, $3, $4, $5, $6);', [request.body.nick, request.body.mail, hash, "User", 1, CreateTime])
            .then(data => {}).catch(function(error) {
                console.log("ERROR:", error);
                response.redirect("/user/registration");
            });
        response.redirect("/user");
    } else {
        console.log('ПОЛЬЗОВАТЕЛЬ УЖЕ ЕСТЬ В БАЗЕ')
        response.redirect("/user/registration");
    }

};

exports.login = function(request, response) {
    response.sendFile(path.resolve('static/html/login.html'))
};

exports.postLogin = async function(request, response) {

    var UserId = false;
    var salt = "";
    await db.many("select DateCreate($1);", [request.body.mail])
        .then(function(data) {
            salt = data[0].datecreate;
        }).catch(function(error) {
            console.log("ERROR:", error);
        });


    var hash = crypt.hash(request.body.password, salt);
    console.log(request.body.password);
    console.log(salt);
    console.log(hash);
    console.log("++++");
    await db.many("select LogUser($1,$2);", [request.body.mail, hash])
        .then(function(data) {
            UserId = data[0].loguser;
        }).catch(function(error) {
            console.log("ERROR:", error);
        });
    if (UserId == -1) {
        console.log("неправильные данные для входа");
        response.redirect("/user/login");
    } else {
        request.session.user_id_log = UserId;
        var Role;
        await db.many("select RoleUser($1);", UserId)
            .then(function(data) {
                Role = data[0].roleuser;
            }).catch(function(error) {
                console.log("ERROR:", error);
            });
        request.session.user_role = Role;
        console.log("Вошел user id -", UserId, "Роль ", Role);
        response.redirect("/user");
    }
};

exports.acc = async function(request, response) {
    if (request.session.user_id_log != null) {
        console.log("кабинет user - ", request.session.user_id_log);
        var masData;
        await db.many("select DataUserAccount($1);", request.session.user_id_log)
            .then(function(data) {
                let strData = String(data[0].datauseraccount).replace(")", "");
                strData = strData.replace("(", "");
                masData = strData.split(',')
            }).catch(function(error) {
                console.log("ERROR:", error);
            });
        let UserMail = masData[0];
        let UserNickname = masData[1];
        let UserPicture = masData[2];
        let UserCity = masData[3];
        // response.sendFile(path.resolve('static/html/account.html'), { mail: UserMail })
        response.send("<p> почта -" + UserMail + "</p>" + "<p> ник - " + UserNickname + "</p>" + "<p> город - " + UserPicture + "</p>");
    } else {
        console.log("Переход на страницу login");
        response.redirect("/user/login");
    }
};

exports.logout = function(request, response) {
    request.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        response.redirect('/');
    });
};

exports.searchUser = function(request, response) {
    db.many("select datauserlist($1) as User;", "%" + request.body.nick + "%")
        .then(function(data) {
            response.json(data);
        }).catch(function(error) {
            response.json([{
                "user": {
                    "id_user": -1,
                    "nickname": error
                }
            }, ]);
        });
};

// exports.friendList = function(request, response) {
//     if (request.session.user_id_log != null) {
//         db.many("select friendList($1);",  request.session.user_id_log )
//             .then(function(data) {
//                 response.json(data);
//             }).catch(function(error) {
//                 response.json({ user: -1, friend: -1 });
//             });
//     } else {
//         response.json({ user: -1, friend: -1 });
//     }
// };