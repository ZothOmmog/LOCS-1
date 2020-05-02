let User = require("../models/userlist.js");
const path = require('path')
let crypt = require("../scripts/password.js");
let tokensUsers = new Map();
var config = require('../configs/config.json');
var DataBase = require('../scripts/DataBase.js');


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

    console.log(UserId);

    if (UserId == -1) {
        //неправильные данные для входа
        response.json({
            "Login": {
                "Flag": false
            }
        });

    } else {

        //request.session.user_id_log = UserId;
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
        //console.log(Role);
        //request.session.user_role = Role;

        const hashId = crypt.hash(UserId, CreateTime); //сделай вторым аргументом что-нибудь другое, наверно.
        const hashIdR = crypt.hash(Role, CreateTime);

        tokensUsers.set(hashId, UserId);
        tokensUsers.set(hashIdR, Role);

        response.cookie('userRole', hashIdR, { maxAge: config.cookieLive })
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
    const userId = request.cookies.userId ? tokensUsers.get(request.cookies.userId) : undefined;
    const userRole = request.cookies.userRole ? tokensUsers.get(request.cookies.userRole) : undefined;
    try {
        response.clearCookie("userRole");
        response.clearCookie("userId");
        response.clearCookie("whatisname");
        tokensUsers.delete(userId);
        tokensUsers.delete(userRole);
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
    const userId = request.cookies.userId ? tokensUsers.get(request.cookies.userId) : undefined;
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
    const userId = request.cookies.userId ? tokensUsers.get(request.cookies.userId) : undefined;
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
    const userId = request.cookies.userId ? tokensUsers.get(request.cookies.userId) : undefined;
    if (userId) {
        let limit = request.params.limit;
        let offset = (request.params.offset - 1) * limit;
        offset = offset <= 0 ? 1 : offset;
        limit = limit <= 0 ? 1 : limit;
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
    const userId = request.cookies.userId ? tokensUsers.get(request.cookies.userId) : undefined;
    if (userId) {
        var data;
        let limit = request.params.limit;
        let offset = (request.params.offset - 1) * limit;
        offset = offset <= 0 ? 1 : offset;
        limit = limit <= 0 ? 1 : limit;
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
    const userId = request.cookies.userId ? tokensUsers.get(request.cookies.userId) : undefined;
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
    const userId = request.cookies.userId ? tokensUsers.get(request.cookies.userId) : undefined;
    if (userId) {
        let limit = request.params.limit;
        let offset = (request.params.offset - 1) * limit;
        offset = offset <= 0 ? 1 : offset;
        limit = limit <= 0 ? 1 : limit;
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
    const userId = request.cookies.userId ? tokensUsers.get(request.cookies.userId) : undefined;
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
    const userId = request.cookies.userId ? tokensUsers.get(request.cookies.userId) : undefined;
    if (userId) {
        let limit = request.params.limit;
        let offset = (request.params.offset - 1) * limit;
        offset = offset <= 0 ? 1 : offset;
        limit = limit <= 0 ? 1 : limit;
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
    const userId = request.cookies.userId ? tokensUsers.get(request.cookies.userId) : undefined;
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
    const userId = request.cookies.userId ? tokensUsers.get(request.cookies.userId) : undefined;
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
    const userId = request.cookies.userId ? tokensUsers.get(request.cookies.userId) : undefined;
    const userid2 = request.body.newFriend ? request.body.newFriend : undefined;
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
    const userId = request.cookies.userId ? tokensUsers.get(request.cookies.userId) : undefined;
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