let User = require("../models/userlist.js");
const path = require('path')
let pgp = require("pg-promise")( /*options*/ );
let db = pgp("postgres://postgres:123@localhost:5432/LocsBD_Dev");

let crypt = require("../scripts/password.js");

const session = require('express-session');


// exports.registration = function(request, response) {
//     response.sendFile(path.resolve('static/html/registration.html'))
// };


exports.postRegistration = async function(request, response) {
    var CreateTime;
    var CheckMail = false;
    var CheckNick = false;
    await db.many("select CheckUser($1);", request.body.Registration.mail)
        .then(function(data) {
            CheckMail = data[0].checkuser;
        })
    await db.many("select CheckNick($1);", request.body.Registration.nick)
        .then(function(data) {
            CheckNick = data[0].checknick;
        })

    console.log(request.body.Registration.mail);
    if (CheckMail == true & CheckNick == true) {
        await db.many("SELECT CURRENT_TIMESTAMP;")
            .then(function(data) {
                CreateTime = String(data[0].current_timestamp);
            })
            .catch(function(error) {
                CreateTime = String("ERROR:", error);
                response.json({
                    "Login": {
                        "NickNameFlag": false,
                        "MailFlag": false
                    }
                });
            });

        var hash = crypt.hash(request.body.Registration.pas, CreateTime);

        console.log(request.body.Registration.pas);
        console.log(CreateTime);
        console.log(hash);


        db.result('Call CreateUser($1, $2, $3, $4, $5, $6);', [request.body.Registration.nick, request.body.Registration.mail, hash, "User", 1, CreateTime])
            .then(data => {}).catch(function(error) {});


        response.json({
            "Login": {
                "NickNameFlag": CheckNick,
                "MailFlag": CheckMail
            }
        });


    } else {
        //отвечаем, что данные не корректны 
        response.json({
            "Login": {
                "NickNameFlag": CheckNick,
                "MailFlag": CheckMail
            }
        });
    }

};

// exports.login = function(request, response) {
//     response.sendFile(path.resolve('static/html/login.html'))
// };

exports.postLogin = async function(request, response) {

    var UserId = false;
    var salt = "";
    await db.many("select DateCreate($1);", [request.body.Login.mail])
        .then(function(data) {
            salt = data[0].datecreate;
        }).catch(function(error) {
            console.log("1");
            response.json({
                "Login": {
                    "Flag": false
                }
            });
        });

    var hash = crypt.hash(request.body.Login.pas, salt);

    await db.many("select LogUser($1,$2);", [request.body.Login.mail, hash])
        .then(function(data) {
            UserId = data[0].loguser;
        }).catch(function(error) {
            console.log("12");
            response.json({
                "Login": {
                    "Flag": false
                }
            });
        });
    if (UserId == -1) {
        console.log("122");
        //неправильные данные для входа
        response.json({
            "Login": {
                "Flag": false
            }
        });

    } else {

        request.session.user_id_log = UserId;
        var Role;
        await db.many("select RoleUser($1);", UserId)
            .then(function(data) {
                Role = data[0].roleuser;
            }).catch(function(error) {
                console.log("13");
                response.json({
                    "Login": {
                        "Flag": false
                    }
                });
            });
        console.log(Role);
        request.session.user_role = Role;
        response.json({
            "Login": {
                "Flag": true
            }
        });
    }
};

exports.acc = async function(request, response) {
    if (request.session.user_id_log != null) {
        var masData;
        await db.many("select DataUserAccount($1);", request.session.user_id_log)
            .then(function(data) {
                let strData = String(data[0].datauseraccount).replace(")", "");
                strData = strData.replace("(", "");
                masData = strData.split(',')
            }).catch(function(error) {
                response.json({
                    "User": {
                        "Mail": "",
                        "Nick": "",
                        "City": "",
                        "UrlPicture": "",
                        "Auth": false
                    }
                });
            });
        let UserMail = masData[0];
        let UserNickname = masData[1];
        let UserPicture = masData[2];
        let UserCity = masData[3];

        response.json({
            "User": {
                "Mail": UserMail,
                "Nick": UserNickname,
                "City": UserCity,
                "UrlPicture": UserPicture,
                "Auth": false
            }
        });
    } else {
        //Переход на страницу login
        response.json({
            "User": {
                "Mail": "",
                "Nick": "",
                "City": "",
                "UrlPicture": "",
                "Auth": false
            }
        });
    }
};

exports.logout = function(request, response) {
    request.session.destroy((err) => {
        if (err) {
            response.json({
                "logout": false
            });
        }
        response.json({
            "logout": true
        });
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