let User = require("../models/userlist.js");
const path = require('path')
    //const { body, validationResult } = require('express-validator');
    //const { sanitizeBody } = require('express-validator');
let pgp = require("pg-promise")( /*options*/ );
let db = pgp("postgres://postgres:123@localhost:5432/LocsBD_Dev");

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
                CreateTime = String(data[0].current_timestamp) + "1";
                console.log(CreateTime);
            })
            .catch(function(error) {
                CreateTime = String("ERROR:", error);
            });
        ///тут где-то функция для хеш пароля
        db.result('Call CreateUser($1, $2, $3, $4, $5, $6);', [request.body.nick, request.body.mail, request.body.pas, "User", 1, CreateTime])
            .then(data => {
                console.log(data);
            }).catch(function(error) {
                console.log("ERROR:", error);
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

    await db.many("select LogUser($1,$2);", [request.body.mail, request.body.password])
        .then(function(data) {
            UserId = data[0].loguser;
        }).catch(function(error) {
            console.log("ERROR:", error);
        });
    if (UserId == -1) {
        console.log("неправильные данные для входа");
        response.redirect("/user/login");
    } else {
        console.log("Вошел user id -", UserId);
        request.session.user_id_log = UserId;
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