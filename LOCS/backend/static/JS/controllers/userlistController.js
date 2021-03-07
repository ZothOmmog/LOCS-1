const path = require('path')
const crypt = require("../scripts/password.js");
const config = require('../configs/config.json');
const DataBase = require('../scripts/DataBase.js');
const funcs = require('../scripts/funcs.js');
const takeObj = funcs.takeObj;

exports.postRegistration = async function(request, response, next) {
    try {   
        const checkMail = await DataBase.CheckUser(request.body.mail);  
        const checkNick = await DataBase.CheckNick(request.body.nick);  

        if (checkMail == true && checkNick == true) {
            const createTime = await DataBase.TimeNow();  
            if (!createTime) {
                response.status(500).end("time error");
            }
            const hash = crypt.hash(request.body.pas, createTime);
            const checkAdd  = await DataBase.AddUser(request.body.nick, request.body.mail, hash, "User", null, createTime);

            if (!checkAdd) {
                response.status(500).end("dont added");
            }
            if (checkAdd != -1) {
                const hashToMail = crypt.hash(request.body.mail, createTime);

                //To do: создать функцию, которая создает ссылку и  отсылает на почту письмо 
                const tokenToAcceptAccount = await DataBase.addTokenToAccept(hashToMail, checkAdd);

                response.status(200).end();
            } else {
                response.status(400).end();
            }
        } else {
            response.status(400).end( JSON.stringify({ "checkMail" : checkMail, "checkNick" : checkNick}));
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.postLogin = async function(request, response, next) {
    try {
        const createTime = await DataBase.TimeNow();  
        const salt = await DataBase.DateCreate(request.body.mail);

        if (!salt) {
            response.status(400).end();
        }

        var hash = crypt.hash(request.body.pas, salt);
        const userId = await DataBase.LogUser(request.body.mail, hash);

        if (userId == -1) {
            response.status(400).end();
        } else {
            const role = await funcs.getRole(userId);
            if (role == 0 || role == 1 || role == 2) {
                const hashUserId = crypt.hash(userId, createTime);
                const hashIdRole = crypt.hash(role, createTime);
  
                const statusTokenUser = await DataBase.addToken(hashUserId, userId); 
                const statusTokenRole = await DataBase.addToken(hashIdRole, role); 

                response.cookie('userRole', role, { maxAge: config.cookieLive });
                response.cookie('userId', hashUserId, { maxAge: config.cookieLive });
                response.status(200).end("login");
            } else {
                response.status(500).end("role error");
            }
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.acc = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const accountData = await DataBase.DataUserAccount(userId);
            if (!accountData) {
                return response.status(401).end();
            }
            response.json({
                "mail": accountData.loginacc,
                "nick": accountData.nicknameacc,
                "city": accountData.cityacc,
                "urlPicture": accountData.pictureacc,
                "acceptMail": accountData.confirmed
            });
        } else {
            return response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.logout = async function(request, response, next) {
    try {
        const status = await DataBase.deleteToken(request.cookies.userId);
        response.clearCookie("userRole");
        response.clearCookie("userId");
        response.status(200).end("logout");
    } catch (err) {
       next({err : err, code : 500}); 
    }
};

exports.friendListWithLimit = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            let limit = Number(request.params.limit);
            let offset = Number(request.params.offset);

            offset = offset <= 0 ? 1 : offset;
            limit = limit <= 0 ? 1 : limit;
            offset = (offset - 1) * limit;

            const count = await DataBase.CountfriendListLimit(userId);
            const usersNotFormated = await DataBase.friendListLimit(userId, limit, offset);
            let users = [];
                for (i in usersNotFormated) {
                    users.push(usersNotFormated[i].friend);
                }
                response.json({ count, users });
        } else {
            return response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.searchUserWithLimit = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            let limit = Number(request.params.limit);
            let offset = Number(request.params.offset);

            offset = offset <= 0 ? 1 : offset;
            limit = limit <= 0 ? 1 : limit;
            offset = (offset - 1) * limit;

            const nickname = String(request.body.nick);
            const count = await DataBase.Countdatauserlist(nickname, limit, offset);
            const data = await DataBase.datauserlistLimit(nickname, limit, offset);

            if (!data) {
                response.status(400).end(er);
            } else {
                let users = [];
                for (i in data) {
                    users.push(data[i].user);
                }
                response.json({ count, users });
            }
        } else {
            return response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.friendRequestsWithLimit = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {

            let limit = Number(request.params.limit);
            let offset = Number(request.params.offset);

            offset = offset <= 0 ? 1 : offset;
            limit = limit <= 0 ? 1 : limit;
            offset = (offset - 1) * limit;

            const data = await DataBase.friendRequestsWithLimit(userId, limit, offset);
            const count = await DataBase.countFriendRequests(userId, limit, offset);
            console.log(count);
            var users = [];
            for (i in data) {
                users.push(data[i].request);
            }
            response.json({ count, users });
        } else {
            return response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.friendRequestsWithLimitSentWithLimit = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            let limit = Number(request.params.limit);
            let offset = Number(request.params.offset);

            offset = offset <= 0 ? 1 : offset;
            limit = limit <= 0 ? 1 : limit;
            offset = (offset - 1) * limit;

            const data = await DataBase.friendRequestsSentWithLimit(userId, limit, offset);
            const count = await DataBase.countfriendRequestsSent(userId);
            let users = [];
            for (i in data) {
                users.push(data[i].request);
            }
            response.json({ count, data });
        } else {
            return response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.addfriend = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        const userIdFriend = request.body.newFriend ? request.body.newFriend : undefined;
        if (userId) {
            if (userIdFriend && userId != userIdFriend) {
                const checkAdd = await DataBase.addFriend(userId, userIdFriend); 
                if (!checkAdd) {
                    response.status(500).end("error on AddFriend");
                }
                response.status(200).end("added");
            } else {
                response.status(400).end("error on AddFriend");
            }
        } else {
            return response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.acceptfriend = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        const userIdFriend = request.body.newFriend ? request.body.newFriend : undefined;
        if (userId) {
            if (userIdFriend && userId != userIdFriend) {
                const checkAdd = await DataBase.acceptFriend(userId, userIdFriend);
                if (!checkAdd) {
                    response.status(500).end("error on acceptfriend");
                }
                response.status(200).end("accept");
            } else {
                response.status(400).end("error Id on acceptfriend");
            }
        } else {
            return response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.deletefriend = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        const userIdFriend = request.body.friend ? request.body.friend : undefined;
        if (userId) {
            if (userIdFriend && userId != userIdFriend) {
                const checkAdd = await DataBase.deleteFriend(userId, userIdFriend);
                if (!checkAdd) {
                    response.status(500).end("error on deleteFriend");
                }
                response.status(200).end("accept");
            } else {
                response.status(400).end("error Id on deleteFriend");
            }
        } else {
            return response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.UserAccount = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        const userIdUser = request.body.user ? request.body.user : undefined;
        if (userId) {
            if(!userIdUser || userId == userIdUser){
                return response.status(400).end("bad id user");
            }
            const status = await DataBase.friendStatus(userId, userIdUser);
            const accountData = await DataBase.DataUserAccount(userIdUser);
            if (!accountData || !status) {
                response.status(400).end("account search data");
            }
            
            response.json({
                "Status": status,
                "User": {
                    "mail": accountData.loginacc,
                    "nick": accountData.nicknameacc,
                    "city": accountData.cityacc,
                    "urlPicture": accountData.pictureacc
                }
            });
        } else {
            return response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};