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

exports.personAccount = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
        if (Role == 2 || Role == 0) {
            let data;
            let countSub;

            await DataBase.countSub(userId).then(function(val) {
                countSub = val;
            }).catch(function() { data = false });

            await DataBase.organizerData(userId).then(function(val) {
                data = val;
            }).catch(function() { data = false });

            if (data && countSub) {
                response.json({ 'count': countSub.count, data });
            } else {
                response.json({ err: "acc error" });
            }

        } else {
            response.json({ err: "do not have permissions" });
        }
    } else {
        response.json({ err: "user dont sing in" });
    };
};

exports.delete = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
        //организатор или админ
        if (Role == 2 || Role == 0) {
            let idEvent = request.body.idEvent;
            var Check;

            await DataBase.deleteEvent(idEvent, userId).then(function(val) {
                Check = val;
            }).catch(function() { Check = false });

            if (Check) {
                await DataBase.deleteEventTag(idEvent).then(function(val) {
                    Check = val;
                });
                response.json({ "Deleted": true });
            } else {
                response.json({ "Deleted": false });
            }
        } else {
            response.json({ err: "do not have permissions" });
        }
    } else {
        response.json({ err: "user dont sing in" });
    }
};

exports.search = async function(request, response) {
    let word = request.body.word;
    let data;
    await DataBase.searchOrg(word).then(function(val) {
        data = val;
    }).catch(function() {
        data = { "err": "search error" }
    });
    response.json(data);
};

exports.searchLimit = async function(request, response) {
    let word = request.body.word;

    let limit = Number(request.params.limit);
    let offset = Number(request.params.offset);
    offset = offset <= 0 ? 1 : offset;
    limit = limit <= 0 ? 1 : limit;
    offset = (offset - 1) * limit;

    let data;
    await DataBase.searchOrglimit(word, limit, offset).then(function(val) {
        data = val;
    }).catch(function() {
        data = { "err": "search error" }
    });
    response.json(data);
};

exports.mySubscribers = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
        if (Role == 2 || Role == 0) {
            let data;
            await DataBase.subscribers(userId).then(function(val) {
                data = val;
            }).catch(function() {
                data = { "err": "sub org error" }
            });
            response.json(data);
        } else {
            response.json({ err: "do not have permissions" });
        }
    } else {
        response.json({ err: "user dont sing in" });
    };
};



exports.mySubscribersLimit = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
        if (Role == 2 || Role == 0) {
            let limit = Number(request.params.limit);
            let offset = Number(request.params.offset);
            offset = offset <= 0 ? 1 : offset;
            limit = limit <= 0 ? 1 : limit;
            offset = (offset - 1) * limit;
            let data;
            await DataBase.subscribersLimit(userId, limit, offset).then(function(val) {
                data = val;
            }).catch(function() {
                data = { "err": "sub org error" }
            });
            response.json(data);
        } else {
            response.json({ err: "do not have permissions" });
        }
    } else {
        response.json({ err: "user dont sing in" });
    };
};


exports.subscribers = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        let orgId = request.body.org;
        let data;
        await DataBase.subscribers(orgId).then(function(val) {
            data = val;
        }).catch(function() {
            data = { "err": "sub org error" }
        });
        response.json(data);
    } else {
        response.json({ err: "user dont sing in" });
    }
};



exports.subscribersLimit = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        let orgId = request.body.org;
        let limit = Number(request.params.limit);
        let offset = Number(request.params.offset);
        offset = offset <= 0 ? 1 : offset;
        limit = limit <= 0 ? 1 : limit;
        offset = (offset - 1) * limit;

        let data;
        await DataBase.subscribersLimit(orgId, limit, offset).then(function(val) {
            data = val;
        }).catch(function() {
            data = { "err": "sub org error" }
        });
        response.json(data);
    } else {
        response.json({ err: "user dont sing in" });
    }

};


exports.organizerAccount = async function(request, response) {
    let orgId = request.body.org;
    let data;
    let countSub;
    let statusSub;

    await DataBase.countSub(orgId).then(function(val) {
        countSub = val;
    }).catch(function() { data = false });

    await DataBase.organizerData(orgId).then(function(val) {
        data = val;
    }).catch(function() { data = false });

    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        await DataBase.subStatus(orgId, userId).then(function(val) {
            statusSub = val;
        });
        data.Status = statusSub.substatus;
    }



    if (data && countSub) {
        response.json({ 'count': countSub.count, data });
    } else {
        response.json({ err: "acc error" });
    }

};

exports.subscribe = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        let check;
        let orgId = request.body.org;
        await DataBase.subOrg(orgId, userId).then(function(val) {
            check = val;
        });
        if (check) {
            response.json({ subscribe: true });
        } else {
            response.json({ err: "err in subscribe" });
        }

    } else {
        response.json({ err: "user dont sing in" });
    }

};

exports.unSubscribe = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        let check;
        let orgId = request.body.org;
        await DataBase.unSubOrg(orgId, userId).then(function(val) {
            check = val;
        });
        if (check) {
            response.json({ unSubscribe: true });
        } else {
            response.json({ err: "err in unSubscribe" });
        }

    } else {
        response.json({ err: "user dont sing in" });
    }

};

exports.mySubscribeList = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        let data;

        await DataBase.subList(userId).then(function(val) {
            data = val;
        });
        if (data) {
            response.json(data);
        } else {
            response.json({ err: "user  in list sub list" });
        }

    } else {
        response.json({ err: "user dont sing in" });
    }

};

exports.mySubscribeListLimit = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {

        let data;
        let limit = Number(request.params.limit);
        let offset = Number(request.params.offset);
        offset = offset <= 0 ? 1 : offset;
        limit = limit <= 0 ? 1 : limit;
        offset = (offset - 1) * limit;

        await DataBase.subListLimit(userId, limit, offset).then(function(val) {
            data = val;
        });
        if (data) {
            response.json(data);
        } else {
            response.json({ err: "user  in list sub list" });
        }

    } else {
        response.json({ err: "user dont sing in" });
    }

};


exports.subscribeUserList = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        let data;
        let user = request.body.user;
        await DataBase.subList(user).then(function(val) {
            data = val;
        });
        if (data) {
            response.json(data);
        } else {
            response.json({ err: "user  in list sub list" });
        }

    } else {
        response.json({ err: "user dont sing in" });
    }

};


exports.subscribeUserListLimit = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {

        let data;
        let limit = Number(request.params.limit);
        let offset = Number(request.params.offset);
        offset = offset <= 0 ? 1 : offset;
        limit = limit <= 0 ? 1 : limit;
        offset = (offset - 1) * limit;

        let user = request.body.user;
        await DataBase.subListLimit(user, limit, offset).then(function(val) {
            data = val;
        });
        if (data) {
            response.json(data);
        } else {
            response.json({ err: "user  in list sub list" });
        }

    } else {
        response.json({ err: "user dont sing in" });
    }

};



exports.myEventsList = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        let data;

        await DataBase.eventOrgList(userId).then(function(val) {
            data = val;
        });

        if (data) {
            response.json(data);
        } else {
            response.json({ err: "user  in list sub list" });
        }

    } else {
        response.json({ err: "user dont sing in" });
    }

};

exports.myEventsListLimit = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {

        let limit = Number(request.params.limit);
        let offset = Number(request.params.offset);
        offset = offset <= 0 ? 1 : offset;
        limit = limit <= 0 ? 1 : limit;
        offset = (offset - 1) * limit;

        let data;

        await DataBase.eventOrgListLimit(userId, limit, offset).then(function(val) {
            data = val;
        });

        if (data) {
            response.json(data);
        } else {
            response.json({ err: "user  in list sub list" });
        }

    } else {
        response.json({ err: "user dont sing in" });
    }

};



exports.eventsList = async function(request, response) {
    let orgId = request.body.org;
    let data;
    await DataBase.eventOrgList(orgId).then(function(val) {
        data = val;
    });

    if (data) {
        response.json(data);
    } else {
        response.json({ err: "user  in list sub list" });
    }


};

exports.eventsListLimit = async function(request, response) {

    let limit = Number(request.params.limit);
    let offset = Number(request.params.offset);
    offset = offset <= 0 ? 1 : offset;
    limit = limit <= 0 ? 1 : limit;
    offset = (offset - 1) * limit;
    let orgId = request.body.org;
    let data;
    await DataBase.eventOrgListLimit(orgId, limit, offset).then(function(val) {
        data = val;
    });

    if (data) {
        response.json(data);
    } else {
        response.json({ err: "user  in list sub list" });
    }
};

exports.registration = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
        if (Role == -1 || Role == 0) {
            let checkName;

            let info = request.body.info;
            let organizationName = request.body.organizationName;
            let organizationLink = request.body.organizationLink;
            let logo = request.body.logo;

            await DataBase.checkOrganizationName(organizationName).then(function(val) {
                checkName = val;
            });

            if (val == 1) {
                let data;
                await DataBase.registationOrganizer(userId, info, organizationName, organizationLink, logo).then(function(val) {
                    data = val;
                }).catch(function(e) {
                    console.log(e);
                    data = false;
                });
                if (data) {
                    await DataBase.changeTokenToOrg(request.cookies.userRole).then(function(val) {
                        data = val;
                    });
                    response.json({ reg: true });
                } else {
                    response.json({ err: "error registationOrganizer" });
                }
            } else {
                response.json({ err: "nickname is taken" });
            }
        } else {
            response.json({ err: "the user is already an organizer" });
        }
    } else {
        response.json({ err: "user dont sing in" });
    }

};