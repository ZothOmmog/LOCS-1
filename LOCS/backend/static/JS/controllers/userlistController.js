const path = require('path')
let crypt = require("../scripts/password.js");
var config = require('../configs/config.json');
var DataBase = require('../scripts/DataBase.js');
const funcs = require('../scripts/funcs.js');
const takeObj = funcs.takeObj;

// async function takeObj(token) {
//     let data;
//     await DataBase.TakeToken(token).then(function(val) {
//         data = val;
//     });
//     return data;
// }


exports.postRegistration = async function(request, response, next) {

    try {
        var CreateTime;
        var CheckMail = false;
        var CheckNick = false;
        await DataBase.CheckUser(request.body.mail).then(function(val) {
            CheckMail = val;
        }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

        await DataBase.CheckNick(request.body.nick).then(function(val) {
            CheckNick = val;
        }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

        if (CheckMail == true && CheckNick == true) {
            await DataBase.TimeNow().then(function(val) {
                CreateTime = val;
            }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

            if (!CreateTime) {
                response.status(500).end("time error");
            }
            var hash = crypt.hash(request.body.pas, CreateTime);
            var hashToMail = crypt.hash(request.body.mail, CreateTime);
            let checkAdd = false;
            await DataBase.AddUser(request.body.nick, request.body.mail, hash, "User", null, CreateTime).then(function(val) {
                checkAdd = val;
            }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

            if (!checkAdd) {
                response.status(500).end("dont added");
            }
            if (checkAdd != -1) {
                var hashToMail = crypt.hash(request.body.mail, CreateTime);
                await DataBase.addTokenToAccept(hashToMail, checkAdd).then(function(val) {
                    checkAdd = val;
                    ///создать функцию, которая создает ссылку и  отсылает на почту письмо 
                }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

                response.status(200).end();
            } else {
                response.status(400).end();
            }
        } else {
            response.status(400).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }

};

exports.postLogin = async function(request, response, next) {
    try {
        var UserId;
        var salt;
        var CreateTime;
        await DataBase.TimeNow().then(function(val) {
            CreateTime = val;
        }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

        await DataBase.DateCreate(request.body.mail).then(function(val) {
            salt = val;
        }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

        if (!salt) {
            response.status(400).end();
        }
        var hash = crypt.hash(request.body.pas, salt);
        await DataBase.LogUser(request.body.mail, hash).then(function(val) {
            UserId = val;
        }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

        if (UserId == -1) {
            //неправильные данные для входа
            response.status(400).end();
        } else {
            var Role;
            await DataBase.RoleUser(UserId).then(function(val) {
                Role = val;
            }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

            if (Role == 0 || Role == 1 || Role == 2) {
                const hashId = crypt.hash(UserId, CreateTime);
                const hashIdR = crypt.hash(Role, CreateTime);
                let ok1;
                let ok2;
                await DataBase.addToken(hashId, UserId).then(function(val) {
                    ok1 = val;
                }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

                await DataBase.addToken(hashIdR, Role).then(function(val) {
                    ok2 = val;
                }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

                response.cookie('userRole', hashIdR, { maxAge: config.cookieLive });
                response.cookie('userId', hashId, { maxAge: config.cookieLive });
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
            var masData;
            await DataBase.DataUserAccount(userId).then(function(val) {
                masData = val;
            }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

            if (!masData) {
                return response.status(401).end();
            }
            let UserMail = masData[0];
            let UserNickname = masData[1];
            let UserPicture = masData[2];
            let UserCity = masData[3];
            let accept = (masData[4] == 't');
            response.json({
                "mail": UserMail,
                "nick": UserNickname,
                "city": UserCity,
                "urlPicture": UserPicture,
                "acceptMail": accept
            });
        } else {
            //Переход на страницу login
            return response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.logout = async function(request, response, next) {
    try {
        let masData;
        await DataBase.deleteToken(request.cookies.userId).then(function(val) {
            masData = val;
        }).catch(function(err) {  next({err : err, code : 500}); }); 

        await DataBase.deleteToken(request.cookies.userRole).then(function(val) {
            masData = val;
        }).catch(function(err) {  next({err : err, code : 500}); }); 

        response.clearCookie("userRole");
        response.clearCookie("userId");
        response.clearCookie("whatisname");
        response.status(200).end("logout");
    } catch (err) {
       next({err : err, code : 500}); 
    }

};

exports.searchUser = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            var data;
            await DataBase.datauserlist(request.body.nick).then(function(val) {
                data = val;
            }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

            if (!data) {
                response.status(400).end("not found");
            } else {
                response.json(data);
            }
        } else {
            return response.status(401).end();
        }
    } catch (err) {
      next({err : err, code : 500}).end();
    }
};


exports.friendList = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            var data;
            await DataBase.friendList(userId).then(function(val) {
                data = val;
            }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

            response.json(data);
        } else {
            return response.status(401).end();
        }
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
            var data;
            var count;
            await DataBase.CountfriendListLimit(userId).then(function(val) {
                count = val;
            }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

            await DataBase.friendListLimit(userId, limit, offset).then(function(val) {
                let users = [];
                for (i in val) {
                    users.push(val[i].friend);
                }
                response.json({ count, users });
            }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

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
            var data;
            let limit = Number(request.params.limit);
            let offset = Number(request.params.offset);
            offset = offset <= 0 ? 1 : offset;
            limit = limit <= 0 ? 1 : limit;
            offset = (offset - 1) * limit;
            let count;
            await DataBase.Countdatauserlist(request.body.nick, limit, offset).then(function(val) {
                count = val;
            }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

            await DataBase.datauserlistLimit(request.body.nick, limit, offset).then(function(val) {
                data = val;
            }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

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

exports.friendRequests = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            var data;
            await DataBase.friendRequests(userId).then(function(val) {
                data = val;
            }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

            response.json(data);
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
            var data;
            var count;
            await DataBase.friendRequestsWithLimit(userId, limit, offset).then(function(val) {
                data = val;
            }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

            await DataBase.CountfriendRequests(userId, limit, offset).then(function(val) {
                count = val;
            }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

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


exports.friendRequestsSent = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            var data;
            await DataBase.friendRequestsSent(userId).then(function(val) {
                data = val;
            }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

            response.json(data);
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
            var data;
            var count;
            await DataBase.friendRequestsSentWithLimit(userId, limit, offset).then(function(val) {
                data = val;
            }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

            await DataBase.countfriendRequestsSent(userId).then(function(val) {
                count = val;
            }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

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
        const userid2 = request.body.newFriend ? request.body.newFriend : undefined;
        if (userId) {
            if (userid2 && userId != userid2) {
                let checkAdd = false;
                await DataBase.addFriend(userId, userid2).then(function(val) {
                    checkAdd = val;
                }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

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
        const userid2 = request.body.newFriend ? request.body.newFriend : undefined;
        if (userId) {
            if (userid2 && userId != userid2) {
                let checkAdd = false;
                await DataBase.acceptFriend(userId, userid2).then(function(val) {
                    checkAdd = val;
                }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

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
        const userid2 = request.body.friend ? request.body.friend : undefined;
        if (userId) {
            if (userid2 && userId != userid2) {
                let checkAdd = false;
                await DataBase.deleteFriend(userId, userid2).then(function(val) {
                    checkAdd = val;
                }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

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
        const userId2 = request.body.user ? request.body.user : undefined;
        if (userId) {
            var data;
            var status;
            await DataBase.friendStatus(userId, userId2).then(function(val) {
                status = val;
            }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

            await DataBase.DataUserAccount(userId2).then(function(val) {
                data = val;
            }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

            if (!data) {
                response.status(500).end("account search data");
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
            return response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};