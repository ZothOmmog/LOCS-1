const path = require('path')
let crypt = require("../scripts/password.js");
var config = require('../configs/config.json');
var DataBase = require('../scripts/DataBase.js');
const funcs = require('../scripts/funcs.js');
const { isNull } = require('util');
const takeObj = funcs.takeObj;
// async function takeObj(token) {
//     let data;
//     await DataBase.TakeToken(token).then(function(val) {
//         data = val;
//     });
//     return data;
// }


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
        var Events = [];
        var eventList = [];
        await DataBase.eventShortList(limit, offset).then(function(val) {
            Events = val;
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
            let date = Events[i].eventshortlist.datatime == null ? null : funcs.getDateOnlyString(Events[i].eventshortlist.datatime);
            var a = {
                id: Events[i].eventshortlist.id,
                name: Events[i].eventshortlist.name,
                date: date,
                idAddress: Events[i].eventshortlist.id_address,
                image: Events[i].eventshortlist.image,
                tags: masTags,
            };
            eventList.push(a);
        };
        response.json(eventList);
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
        var eventList;
        var count;
        var events = [];
        await DataBase.searchEvent(word, limit, offset).then(function(val) {
            eventList = val;
        });
        await DataBase.countSearchEvent(word).then(function(val) {
            count = val;
        });
        for (i in eventList) {
            var tags;
            await DataBase.EventTags(eventList[i].searchevent.id).then(function(val) {
                tags = val;
            });
            var masTags = [];
            for (j in tags) {
                masTags.push(tags[j].eventtags.id);
            };
            eventList[i].searchevent.tags = masTags;
            events.push(eventList[i].searchevent);
        };
        response.json({ "count": count, events });
    } catch (err) {
        response.status(500).end(err);
    }
};


exports.addTag = async function(request, response) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            var word = request.body.title;
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