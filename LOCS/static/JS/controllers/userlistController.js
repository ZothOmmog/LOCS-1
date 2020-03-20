let User = require("../models/userlist.js");
const path = require('path')
    //const { body, validationResult } = require('express-validator');
    //const { sanitizeBody } = require('express-validator');
let pgp = require("pg-promise")( /*options*/ );
let db = pgp("postgres://postgres:123@localhost:5432/LocsBD_Dev");





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

exports.postLogin = function(request, response) {
    console.log("$$$$");
    console.log(request.body.mail);
    console.log(request.body.password);
    response.redirect("/user");
};

exports.acc = function(request, response) {
    // request.session.user_id_log = 'id';

    // if (request.session.user_id_log) {
    //     response.send(request.session.user_id_log);
    // } else {
    //     response.send("aaaaaaaaaaaaaaaaaa");
    // }
    response.send("account place");
};