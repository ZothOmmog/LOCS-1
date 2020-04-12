let User = require("../models/userlist.js");
const path = require('path')
let crypt = require("../scripts/password.js");
let tokensUsers = new Map();
var config = require('../scripts/config.json');
var DataBase = require('../scripts/DataBase.js');
//const session = require('express-session');

// exports.registration = function(request, response) {
//     response.sendFile(path.resolve('static/html/registration.html'))
// };

exports.postRegistration = async function(request, response) {
    var CreateTime;
    var CheckMail = false;
    var CheckNick = false;

    await DataBase.CheckUser(request.body.Registration.mail).then(function(val) {
        CheckMail = val;
    });
    // await db.many("select CheckUser($1);", request.body.Registration.mail)
    //     .then(function(data) {
    //         CheckMail = data[0].checkuser;
    //     })

    await DataBase.CheckNick(request.body.Registration.nick).then(function(val) {
        CheckNick = val;
    });
    // await db.many("select CheckNick($1);", request.body.Registration.nick)
    //     .then(function(data) {
    //         CheckNick = data[0].checknick;
    //     })



    if (CheckMail == true & CheckNick == true) {
        await DataBase.TimeNow().then(function(val) {
            CreateTime = val;
        });
        if (!CreateTime) {
            response.json({
                "Login": {
                    "NickNameFlag": CheckNick,
                    "MailFlag": CheckMail
                }
            });
        }
        // await db.many("SELECT CURRENT_TIMESTAMP;")
        //     .then(function(data) {
        //         CreateTime = String(data[0].current_timestamp);
        //     })
        //     .catch(function(error) {
        //         response.json({
        //             "Login": {
        //                 "NickNameFlag": false,
        //                 "MailFlag": false
        //             }
        //         });
        //     });

        var hash = crypt.hash(request.body.Registration.pas, CreateTime);
        let checkAdd = false;
        await DataBase.AddUser(request.body.Registration.nick, request.body.Registration.mail, hash, "User", 1, CreateTime).then(function(val) {
            checkAdd = val;
        });
        if (!checkAdd) {
            response.json({
                "Login": {
                    "NickNameFlag": false,
                    "MailFlag": false
                }
            });
        }


        // db.result('Call CreateUser($1, $2, $3, $4, $5, $6);', [request.body.Registration.nick, request.body.Registration.mail, hash, "User", 1, CreateTime])
        //     .then(data => {}).catch(function(error) {});

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
    var UserId;
    var salt = "";
    //console.log(await DataBase.DateCreate(request.body.Login.mail));
    // DataBase.DateCreate(request.body.Login.mail).then(function(value) {
    //     console.log("##############3");
    //     console.log(value);
    // }).catch(function(error) {
    //     console.log(error);
    // });

    await DataBase.DateCreate(request.body.Login.mail).then(function(val) {
        salt = val;
    });

    console.log(salt);
    if (!salt) {
        response.json({
            "Login": {
                "Flag": false
            }
        });
    }

    // await db.many("select DateCreate($1);", [request.body.Login.mail])
    //     .then(function(data) {
    //         salt = data[0].datecreate;
    //     }).catch(function(error) {
    //         console.log("1");
    //         response.json({
    //             "Login": {
    //                 "Flag": false
    //             }
    //         });
    //     });

    var hash = crypt.hash(request.body.Login.pas, salt);

    await DataBase.LogUser(request.body.Login.mail, hash).then(function(val) {
        UserId = val;
    });

    console.log(UserId);
    // await db.many("select LogUser($1,$2);", [request.body.Login.mail, hash])
    //     .then(function(data) {
    //         UserId = data[0].loguser;
    //     }).catch(function(error) {
    //         console.log("12");
    //         response.json({
    //             "Login": {
    //                 "Flag": false
    //             }
    //         });
    //     });

    if (UserId == -1) {
        //неправильные данные для входа
        response.json({
            "Login": {
                "Flag": false
            }
        });

    } else {

        request.session.user_id_log = UserId;
        var Role;

        await DataBase.RoleUser(UserId).then(function(val) {
            Role = val;
        });

        // await db.many("select RoleUser($1);", UserId)
        //     .then(function(data) {
        //         Role = data[0].roleuser;
        //     }).catch(function(error) {
        //         console.log("13");
        //         response.json({
        //             "Login": {
        //                 "Flag": false
        //             }
        //         });
        //     });

        if (!Role) {
            response.json({
                "Login": {
                    "Flag": false
                }
            });
        }
        console.log(Role);
        request.session.user_role = Role;

        const hashId = crypt.hash(UserId, hash); //сделай вторым аргументом что-нибудь другое, наверно.
        tokensUsers.set(hashId, UserId);

        response.cookie('userId', hashId, { maxAge: config.cookieLive }).json({
            "Login": {
                "Flag": true
            }
        });
    }
};

exports.acc = async function(request, response) {
    const userId = request.cookies.userId ? tokensUsers.get(request.cookies.userId) : undefined;

    if (userId) {
        var masData;
        await DataBase.DataUserAccount(userId).then(function(val) {
            masData = val;
        });
        if (!masData) {
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
        // await db.many("select DataUserAccount($1);", userId)
        //     .then(function(data) {
        //         let strData = String(data[0].datauseraccount).replace(")", "");
        //         strData = strData.replace("(", "");
        //         masData = strData.split(',')
        //     }).catch(function(error) {
        //         response.json({
        //             "User": {
        //                 "Mail": "",
        //                 "Nick": "",
        //                 "City": "",
        //                 "UrlPicture": "",
        //                 "Auth": false
        //             }
        //         });
        //     });
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
                "Auth": true
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
            console.log(err);
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
    var data;
    data = DataBase.datauserlist(request.body.nick);
    if (!data) {
        response.json([{
            "user": {
                "id_user": -1,
                "nickname": error
            }
        }, ]);
    } else {
        response.json(data);
    }
    // db.many("select datauserlist($1) as User;", "%" + request.body.nick + "%")
    //     .then(function(data) {
    //         response.json(data);
    //     }).catch(function(error) {
    //         response.json([{
    //             "user": {
    //                 "id_user": -1,
    //                 "nickname": error
    //             }
    //         }, ]);
    //     });
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