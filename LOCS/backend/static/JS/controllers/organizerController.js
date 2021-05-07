var DataBase = require('../scripts/DataBase.js');
const funcs = require('../scripts/funcs.js');
const takeObj = funcs.takeObj;

exports.personAccount = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 2 || Role == 0) {
                const countSub = await DataBase.countSub(userId);
                const data = await DataBase.organizerData(userId);
                if (data && countSub) {
                    data.countSub = countSub;
                    response.json({ data });
                } else {
                    response.status(400).end("acc error");
                }
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            return response.status(401).end();
        };
    } catch(err){
        next({err : err, code : 500});
    }
};

exports.delete = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            //организатор или админ
            if (Role == 2 || Role == 0) {
                    let idEvent = request.body.idEvent;
                    const Check = await DataBase.deleteEvent(idEvent, userId);
                    if (Check) {
                        const status = await DataBase.deleteEventTag(idEvent);
                        response.status(200).end("has been deleted");
                    } else {
                        response.status(400).end("Deleted");
                    }
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            return response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.searchLimit = async function(request, response, next) {
    try {
        const word = request.body.word;
        let limit = Number(request.params.limit);
        let offset = Number(request.params.offset);
        offset = offset <= 0 ? 1 : offset;
        limit = limit <= 0 ? 1 : limit;
        offset = (offset - 1) * limit;
        const count = await DataBase.countSearchOrg(word);
        const data = await DataBase.searchOrglimit(word, limit, offset);
        let users = []
        for (i in data) {
            users.push(data[i].searchorg);
        }
        response.json({ count, users });
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.mySubscribersLimit = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 2 || Role == 0) {
                const count = await DataBase.countSubscribers(userId);
                let limit = Number(request.params.limit);
                let offset = Number(request.params.offset);
                offset = offset <= 0 ? 1 : offset;
                limit = limit <= 0 ? 1 : limit;
                offset = (offset - 1) * limit;
                const data = await DataBase.subscribersLimit(userId, limit, offset);
                let subscribers = []
                for (i in data) {
                    subscribers.push(data[i].subscribers);
                }
                response.json({ count, subscribers });
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            return response.status(401).end();
        };
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.subscribersLimit = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const orgId = request.body.org;
            let limit = Number(request.params.limit);
            let offset = Number(request.params.offset);
            offset = offset <= 0 ? 1 : offset;
            limit = limit <= 0 ? 1 : limit;
            offset = (offset - 1) * limit;
            const count = await DataBase.countSubscribers(orgId);
            const data = await DataBase.subscribersLimit(orgId, limit, offset);
            let users = [];
            for (i in data) {
                users.push(data[i].subscribers);
            }
            response.json({ count, users });
        } else {
            return response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.userVisitList = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            let limit = Number(request.params.limit);
            let offset = Number(request.params.offset);
            offset = offset <= 0 ? 1 : offset;
            limit = limit <= 0 ? 1 : limit;
            offset = (offset - 1) * limit;
            const data = await DataBase.userVisitList(userId, limit, offset);
            let events = [];
            for (i in data) {
                events.push(data[i].user_visit_list);
            }
            response.json( events );
        } else {
            return response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.organizerAccount = async function(request, response, next) {
    try {
        const orgId = request.body.org;
        const countSub = await DataBase.countSub(orgId);
        const data = await DataBase.organizerData(orgId);
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (orgId && data) {
            if (userId) {
                const statusSub = await DataBase.subStatus(orgId, userId);
                if (countSub) {
                    data.count = countSub;
                } 
                data.Status = statusSub.substatus;
            }
            response.json({ data });
        } else {
            response.status(400).end("acc or org error");
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.subscribe = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const orgId = request.body.org;
            const check = await DataBase.subOrg(orgId, userId);
            if (check) {
                response.status(200).end("has been subscribe");
            } else {
                response.status(400).end("err subscribe");
            }
        } else {
            return response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.unSubscribe = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const orgId = request.body.org;
            const check = await DataBase.unSubOrg(orgId, userId);
            if (check) {
                response.status(200).end("has been unsubscribe");
            } else {
                response.status(500).end("err in subscribe");
            }
        } else {
            return response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500}).end();
    }
};

exports.subscribeUserListLimit = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            let count;
            let data;
            let limit = Number(request.params.limit);
            let offset = Number(request.params.offset);
            offset = offset <= 0 ? 1 : offset;
            limit = limit <= 0 ? 1 : limit;
            offset = (offset - 1) * limit;
            const user = request.body.user ? request.body.user : undefined;
            if (user) {
                count = await DataBase.countSubList(user);
                data = await DataBase.subListLimit(user, limit, offset);
            } else {
                count = await DataBase.countSubList(userId);
                data = await DataBase.subListLimit(userId, limit, offset);
            }
            if (data) {
                let sublist = [];
                for (i in data) {
                    sublist.push(data[i].sublist);
                }
                response.json({ count, sublist });
            } else {
                response.status(500).end("user in list sub list");
            }
        } else {
            return response.status(401).end();
        }
    } catch (err) {
         next({err : err, code : 500});
    }
};

exports.myEventsListLimit = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            let limit = Number(request.params.limit);
            let offset = Number(request.params.offset);
            offset = offset <= 0 ? 1 : offset;
            limit = limit <= 0 ? 1 : limit;
            offset = (offset - 1) * limit;
            const count = await DataBase.countEventOrgList(userId);
            const data = await DataBase.eventOrgListLimit(userId, limit, offset);
            if (data) {
                let events = []
                for (i in data) {
                    events.push(data[i].eventorglistlimit);
                }
                response.json({ count, events });
            } else {
                response.status(500).end("user in list sub list");
            }
        } else {
            return response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.eventsListLimit = async function(request, response, next) {
    try {
        let limit = Number(request.params.limit);
        let offset = Number(request.params.offset);
        offset = offset <= 0 ? 1 : offset;
        limit = limit <= 0 ? 1 : limit;
        offset = (offset - 1) * limit;
        const orgId = request.body.org;
        const count = await DataBase.countEventOrgList(orgId);
        const data = await DataBase.eventOrgListLimit(orgId, limit, offset);
        if (data) {
            let events = [];
            for (i in data) {
                events.push(data[i].eventorglistlimit);
            }
            response.json({ count, events });
        } else {
            response.status(500).end("user in list sub list");
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.registration = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 1 || Role == 0) {
                const info = request.body.info;
                const organizationName = request.body.organizationName;
                const organizationLink = request.body.organizationLink;
                const logo = request.body.logo;
                const checkName = await DataBase.checkOrganizationName(organizationName);
                if (checkName == 1) {
                    const data = await DataBase.registationOrganizer(userId, info, organizationName, organizationLink, logo);
                    if (data) {
                        response.status(200).end("has been registration, re-login to your account");
                    } else {
                        response.status(500).end("error registationOrganizer");
                    }
                } else {
                    response.status(400).end("nickname is taken");
                }
            } else {
                response.status(400).end("the user is already an organizer");
            }
        } else {
            return response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.createEvent = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 2 || Role == 0) {
                const idAddress = request.body.idAddress;
                const name = request.body.name;
                const info = request.body.info;
                const link = request.body.link;
                const price = request.body.price == undefined ? 0 : request.body.price;
                const datatime = request.body.timestamp;
                const idEvent = await DataBase.addEvent(name, info, link, price, userId, idAddress, datatime);
                if (idEvent) {
                    const tags = request.body.tags;
                    const check = await DataBase.addEventTagsArray(idEvent, tags);
                    if (check) {
                        response.status(200).end("has been created");
                    } else {
                        response.status(500).end("create add tags failed");
                    }
                } else {
                    response.status(500).end("create event failed");
                }
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            return response.status(401).end();
        };
    } catch (err) {
        next({err : err, code : 500}); 
    }
};

exports.searchAddress = async function(request, response, next) {
    try {
        const word = request.body.word;
        const splitWords = word.split(' ').filter(n => n);
        let data;
        if(splitWords.length == 1) {
            data = await DataBase.searchAddress(word);
        } else {
            const endWord = splitWords[splitWords.length - 1];
            splitWords.splice(splitWords.length - 1, 1);
            const halfWord = splitWords.join(' ');
            data = await DataBase.searchAddressWithHouse(halfWord, endWord);
        }
        let address = [];
        for (i in data) {
            address.push(data[i].searchaddress);
        }
        response.json(address);
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.changeEvent = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 2 || Role == 0) {
                const idAddress = request.body.idAddress;
                const name = request.body.name;
                const info = request.body.info;
                const link = request.body.link;
                const price = request.body.price  == undefined ? 0 : request.body.price;
                const idEvent = request.body.idEvent;
                const tags = request.body.tags;
                const timestamp = request.body.timestamp;
                const check = await DataBase.changeEvent(idEvent, name, info, link, price, userId, idAddress, timestamp);
                if (check == 1) {
                    const checkDeleteTag = await DataBase.deleteEventTag(idEvent);
                    const checkAddTag = await DataBase.addEventTagsArray(idEvent, tags);
                    if (checkDeleteTag && checkAddTag) {
                        response.status(200).end("has been change");
                    } else {
                        response.status(500).end("error to change tags");
                    }
                } else {
                    response.status(400).end("error to change event");
                }
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            return response.status(401).end();
        };
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.changeOrgAcc = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 2) {
                const orgName = request.body.orgName;
                const info = request.body.info;
                const link = request.body.link;
                const check = await DataBase.changeDataAboutOrg(userId, orgName, info, link);
                if (check) {
                    response.status(200).end("has been changed");
                } else {
                    response.status(400).end("org name is already use");
                }
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            return response.status(401).end();
        };
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.visitEvent = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        const eventId = request.body.eventId;
        if (userId && eventId) {
            const check = await DataBase.visitEvent(userId, eventId);
            if (check) {
                response.status(200).end();
            } else {
                response.status(400).end();
            }
        } else {
            response.status(403).end("have not permissions");
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.notvisitEvent = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        const eventId = request.body.eventId;
        if (userId && eventId) {
            const check = await DataBase.notVisitEvent(userId, eventId);
            if (check) {
                response.status(200).end();
            } else {
                response.status(400).end();
            }
        } else {
            response.status(403).end("have not permissions");
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};