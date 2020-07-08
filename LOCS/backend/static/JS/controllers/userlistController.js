const path = require('path')
let crypt = require("../scripts/password.js");
var config = require('../configs/config.json');
var DataBase = require('../scripts/DataBase.js');

async function takeObj(token) {
    let data;
    await DataBase.TakeToken(token).then(function(val) {
        data = val;
    });
    return data;
}


exports.postRegistration = async function(request, response) {
    var CreateTime;
    var CheckMail = false;
    var CheckNick = false;

    await DataBase.CheckUser(request.body.Registration.mail).then(function(val) {
        CheckMail = val;
    });


    await DataBase.CheckNick(request.body.Registration.nick).then(function(val) {
        CheckNick = val;
    });

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

        var hash = crypt.hash(request.body.Registration.pas, CreateTime);

        var hashToMail = crypt.hash(request.body.Registration.mail, CreateTime);


        let checkAdd = false;
        await DataBase.AddUser(request.body.Registration.nick, request.body.Registration.mail, hash, "User", null, CreateTime).then(function(val) {
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
        if (checkAdd != -1) {
            var hashToMail = crypt.hash(request.body.Registration.mail, CreateTime);


            await DataBase.addTokenToAccept(hashToMail, checkAdd).then(function(val) {
                checkAdd = val;
                ///создать функцию, которая создает ссылку и  отсылает на почту письмо 
            });
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

exports.postLogin = async function(request, response) {
    var UserId;
    var salt;
    var CreateTime;

    await DataBase.TimeNow().then(function(val) {
        CreateTime = val;
    });
    await DataBase.DateCreate(request.body.Login.mail).then(function(val) {
        salt = val;
    });
    if (!salt) {
        response.json({
            "Login": {
                "Flag": false
            }
        });
    }

    var hash = crypt.hash(request.body.Login.pas, salt);

    await DataBase.LogUser(request.body.Login.mail, hash).then(function(val) {
        UserId = val;
    });

    if (UserId == -1) {
        //неправильные данные для входа
        response.json({
            "Login": {
                "Flag": false
            }
        });

    } else {

        var Role;

        await DataBase.RoleUser(UserId).then(function(val) {
            Role = val;
        });

        if (!Role) {
            response.json({
                "Login": {
                    "Flag": false
                }
            });
        }


        const hashId = crypt.hash(UserId, CreateTime);
        const hashIdR = crypt.hash(Role, CreateTime);

        let ok1;
        let ok2;

        await DataBase.addToken(hashId, UserId).then(function(val) {
            ok1 = val;
        });
        await DataBase.addToken(hashIdR, Role).then(function(val) {
            ok2 = val;
        });

        response.cookie('userRole', hashIdR, { maxAge: config.cookieLive })
        response.cookie('userId', hashId, { maxAge: config.cookieLive }).json({
            "Login": {
                "Flag": true
            }
        });
    }
};

exports.acc = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
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
        console.log(masData);
        let UserMail = masData[0];
        let UserNickname = masData[1];
        let UserPicture = masData[2];
        let UserCity = masData[3];
        let accept = (masData[4] == 't');
        response.json({
            "User": {
                "Mail": UserMail,
                "Nick": UserNickname,
                "City": UserCity,
                "UrlPicture": UserPicture,
                "AcceptMail": accept,
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

exports.logout = async function(request, response) {
    // const userId = request.cookies.userId ? tokensUsers.get(request.cookies.userId) : undefined;
    //const userRole = request.cookies.userRole ? tokensUsers.get(request.cookies.userRole) : undefined;
    try {
        let masData;
        await DataBase.deleteToken(request.cookies.userId).then(function(val) {
            masData = val;
        });

        await DataBase.deleteToken(request.cookies.userRole).then(function(val) {
            masData = val;
        });

        response.clearCookie("userRole");
        response.clearCookie("userId");
        response.clearCookie("whatisname");
        response.json({
            "logout": true
        });
    } catch (e) {
        console.log(e);
        response.json({
            "logout": false
        });
    }
};

exports.searchUser = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        var data;

        await DataBase.datauserlist(request.body.nick).then(function(val) {
            data = val;
        });

        console.log(request.body.nick)
        console.log(data)

        if (!data) {
            response.json([{
                "user": {
                    "id_user": 0,
                    "nickname": "not found"
                }
            }, ]);
        } else {
            response.json(data);
        }
    } else {
        response.json([{
            "user": {
                "id_user": -1,
                "nickname": "user dont sing in"
            }
        }, ]);
    }
};


exports.friendList = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        var data;
        await DataBase.friendList(userId).then(function(val) {
            data = val;
        }).catch(function(er) {
            response.json({ err: "#" + er });
        });

        response.json(data);
    } else {
        response.json({ err: "user dont sing in" });
    }
};

exports.friendListWithLimit = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        let limit = Number(request.params.limit);
        let offset = Number(request.params.offset);
        offset = offset <= 0 ? 1 : offset;
        limit = limit <= 0 ? 1 : limit;
        offset = (offset - 1) * limit;
        var data;
        var count;

        await DataBase.CountfriendListLimit(userId, limit, offset).then(function(val) {
            count = val;
        }).catch(function(er) {
            response.json({ err: "#" + er });
        });

        await DataBase.friendListLimit(userId, limit, offset).then(function(val) {
            data = val;
        }).catch(function(er) {
            response.json({ err: "#" + er });
        });

        response.json({ "count": count[0].count, data });
    } else {
        response.json({ err: "user dont sing in" });
    }
};


exports.searchUserWithLimit = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        var data;
        // let limit = Number(request.params.limit);
        // let offset = Number(request.params.offset);
        // offset = offset <= 0 ? 1 : offset;
        // limit = limit <= 0 ? 1 : limit;
        // offset = (offset - 1) * limit;
        let limit = Number(request.params.limit);
        let offset = Number(request.params.offset);
        offset = offset <= 0 ? 1 : offset;
        limit = limit <= 0 ? 1 : limit;
        offset = (offset - 1) * limit;


        let count;

        await DataBase.Countdatauserlist(request.body.nick, limit, offset).then(function(val) {
            count = val;
        });

        await DataBase.datauserlistLimit(request.body.nick, limit, offset).then(function(val) {
            data = val;
        });

        if (!data) {
            response.json([{
                "user": {
                    "id_user": 0,
                    "nickname": "not found"
                }
            }, ]);
        } else {
            response.json({ "count": count[0].count, data });
        }
    } else {
        response.json([{
            "user": {
                "id_user": -1,
                "nickname": "user dont sing in"
            }
        }, ]);
    }
};

exports.friendRequests = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        var data;
        await DataBase.friendRequests(userId).then(function(val) {
            data = val;
        }).catch(function(er) {
            response.json({ err: "#" + er });
        });
        response.json(data);
    } else {
        response.json({ err: "user dont sing in" });
    }
};

exports.friendRequestsWithLimit = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        let limit = Number(request.params.limit);
        let offset = Number(request.params.offset);
        offset = offset <= 0 ? 1 : offset;
        limit = limit <= 0 ? 1 : limit;
        offset = (offset - 1) * limit;

        var data;
        var count;
        await DataBase.friendRequestsWithLimit(userId, limit, offset).then(function(val) {
            data = val;
        }).catch(function(er) {
            response.json({ err: "#" + er });
        });

        await DataBase.CountfriendRequests(userId, limit, offset).then(function(val) {
            count = val;
        }).catch(function(er) {
            response.json({ err: "#" + er });
        });

        response.json({ "count": count[0].count, data });
    } else {
        response.json({ err: "user dont sing in" });
    }
};


exports.friendRequestsSent = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        var data;
        await DataBase.friendRequestsSent(userId).then(function(val) {
            data = val;
        }).catch(function(er) {
            response.json({ err: "#" + er });
        });
        response.json(data);
    } else {
        response.json({ err: "user dont sing in" });
    }
};

exports.friendRequestsWithLimitSentWithLimit = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        let limit = Number(request.params.limit);
        let offset = Number(request.params.offset);
        offset = offset <= 0 ? 1 : offset;
        limit = limit <= 0 ? 1 : limit;
        offset = (offset - 1) * limit;

        var data;
        var count;

        await DataBase.friendRequestsSentWithLimit(userId, limit, offset).then(function(val) {
            data = val;
        }).catch(function(er) {
            response.json({ err: "#" + er });
        });

        await DataBase.countfriendRequestsSent(userId).then(function(val) {
            count = val;
        }).catch(function(er) {
            response.json({ err: "#" + er });
        });

        response.json({ "count": count[0].count, data });
    } else {
        response.json({ err: "user dont sing in" });
    }
};

exports.addfriend = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    const userid2 = request.body.newFriend ? request.body.newFriend : undefined;
    if (userId) {
        if (userid2 && userId != userid2) {
            let checkAdd = false;
            await DataBase.addFriend(userId, userid2).then(function(val) {
                checkAdd = val;
            });
            if (!checkAdd) {
                response.json({
                    err: "error on AddFriend"
                });
            }
            response.json({
                "add": true
            });
        } else {
            response.json({ err: "error Id on AddFriend" });
        }

    } else {
        response.json({ err: "user dont sing in" });
    }
};


exports.acceptfriend = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    const userid2 = request.body.newFriend ? request.body.newFriend : undefined;
    if (userId) {
        if (userid2 && userId != userid2) {
            let checkAdd = false;
            await DataBase.acceptFriend(userId, userid2).then(function(val) {
                checkAdd = val;
            });
            if (!checkAdd) {
                response.json({
                    err: "error on acceptfriend"
                });
            }
            response.json({
                "accept": true
            });
        } else {
            response.json({ err: "error Id on acceptfriend" });
        }

    } else {
        response.json({ err: "user dont sing in" });
    }
};



exports.deletefriend = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    const userid2 = request.body.friend ? request.body.friend : undefined;
    if (userId) {
        if (userid2 && userId != userid2) {
            let checkAdd = false;
            await DataBase.deleteFriend(userId, userid2).then(function(val) {
                checkAdd = val;
            });
            if (!checkAdd) {
                response.json({
                    err: "error on deleteFriend"
                });
            }
            response.json({
                "accept": true
            });
        } else {
            response.json({ err: "error Id on deleteFriend" });
        }

    } else {
        response.json({ err: "user dont sing in" });
    }
};


exports.UserAccount = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    const userId2 = request.body.user ? request.body.user : undefined;
    if (userId) {
        var data;
        var status;

        await DataBase.friendStatus(userId, userId2).then(function(val) {
            status = val;
        });
        await DataBase.DataUserAccount(userId2).then(function(val) {
            data = val;
        });

        if (!data) {
            response.json({ err: "account search data" });
        }

        let UserMail = data[0];
        let UserNickname = data[1];
        let UserPicture = data[2];
        let UserCity = data[3];

        response.json({
            "Status": status[0].friendstatus,
            "User": {
                "Mail": UserMail,
                "Nick": UserNickname,
                "City": UserCity,
                "UrlPicture": UserPicture,
            }
        });
    } else {
        response.json({ err: "user dont sing in" });
    }
};