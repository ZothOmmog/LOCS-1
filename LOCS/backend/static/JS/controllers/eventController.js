const path = require('path')
let crypt = require("../scripts/password.js");
var config = require('../configs/config.json');
var DataBase = require('../scripts/DataBase.js');
const funcs = require('../scripts/funcs.js');
const { isNull } = require('util');


async function takeObj(token) {
    let data;
    await DataBase.TakeToken(token).then(function(val) {
        data = val;
    });
    return data;
}


exports.event = async function(request, response) {
    try {
        var idEvent = request.body.idEvent;
        var tags;
        var event;
        await DataBase.EventTags(idEvent).then(function(val) {
            tags = val;
        });
        await DataBase.event(idEvent).then(function(val) {
            event = val;
        });
        var masTags = [];
        for (j in tags) {
            masTags.push(tags[j].eventtags.id);
        };
        event.event.datatime = funcs.stringToObjectTimeConvert(event.event.datatime);
        event.event.tags = masTags;
        response.json(event.event);
    } catch (err) {
        response.status(500).end(err);
    }
};

exports.shortList = async function(request, response) {
    try {
        let limit = Number(request.params.limit);
        let offset = Number(request.params.offset);
        offset = offset <= 0 ? 1 : offset;
        limit = limit <= 0 ? 1 : limit;
        offset = (offset - 1) * limit;
        var Events;
        var count;
        await DataBase.eventShortList(limit, offset).then(function(val) {
            Events = val;
        });
        await DataBase.countEventShortList().then(function(val) {
            count = val;
        });
        for (i in Events) {
            var tags;
            await DataBase.EventTags(Events[i].eventshortlist.id).then(function(val) {
                tags = val;
            });
            var masTags = [];
            for (j in tags) {
                masTags.push(tags[j].eventtags.id);
            };
            Events[i].tags = masTags;
        };
        response.json({ "count": count, Events });
    } catch (err) {
        response.status(500).end(err);
    }
};

exports.search = async function(request, response) {
    try {
        let limit = Number(request.params.limit);
        let offset = Number(request.params.offset);
        offset = offset <= 0 ? 1 : offset;
        limit = limit <= 0 ? 1 : limit;
        offset = (offset - 1) * limit;
        var word = request.body.word;
        var Events;
        var count;
        await DataBase.searchEvent(word, limit, offset).then(function(val) {
            Events = val;
        });
        await DataBase.countSearchEvent(word).then(function(val) {
            count = val;
        });
        for (i in Events) {
            var tags;
            await DataBase.EventTags(Events[i].searchevent.id).then(function(val) {
                tags = val;
            });
            var masTags = [];
            for (j in tags) {
                masTags.push(tags[j].eventtags.title);
            };
            Events[i].tags = masTags;
        };
        response.json({ "count": count, Events });
    } catch (err) {
        response.status(500).end(err);
    }
};


exports.addTag = async function(request, response) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            var word = request.body.word;
            if (word == null) {
                response.status(400).end("");
                return;
            }
            var tags;
            await DataBase.addTag(word).then(function(val) {
                tags = val;
                response.status(200).end("added");
            }).catch(function(val) {
                check = false;
                console.log(val);
                response.status(500).end(val);
            });
        } else {
            response.status(401).end();
        }
    } catch (err) {
        response.status(500).end(err);
    }

};

exports.deleteTag = async function(request, response) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                let idTag = Number(request.params.id);
                await DataBase.deleteTag(idTag).then(function(val) {
                    tags = val;
                    response.status(200).end("deleted");
                }).catch(function(val) {
                    check = false;
                    console.log(val);
                    response.status(500).end(val);
                });
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        response.status(500).end(err);
    }

};

exports.acceptTag = async function(request, response) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                let idTag = Number(request.params.id);
                await DataBase.acceptTag(idTag).then(function(val) {
                    tags = val;
                    response.status(200).end("accept");
                }).catch(function(val) {
                    check = false;
                    console.log(val);
                    response.status(500).end(val);
                });
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        response.status(500).end(err);
    }

};


exports.tag = async function(request, response) {
    try {
        var tags;
        await DataBase.tags().then(function(val) {
            tags = val;
        });
        var masTags = [];
        for (j in tags) {
            masTags.push({ "id": tags[j].tags.id, "title": tags[j].tags.title });
        };
        response.json(masTags);
    } catch (err) {
        response.status(500).end(err);
    }

};
exports.tagById = async function(request, response) {
    try {
        let id = Number(request.params.id);
        var tags;
        await DataBase.tagById(id).then(function(val) {
            tags = val;
        });
        if (tags != null) {
            response.json({ "id": tags.tagbyid.id, "title": tags.tagbyid.title });
        } else {
            response.json({});
        }
    } catch (err) {
        response.status(500).end(err);
    }
};