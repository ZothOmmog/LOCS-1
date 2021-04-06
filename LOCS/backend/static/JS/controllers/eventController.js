const path = require('path')
let crypt = require("../scripts/password.js");
var config = require('../configs/config.json');
var DataBase = require('../scripts/DataBase.js');
const funcs = require('../scripts/funcs.js');
const takeObj = funcs.takeObj;

exports.event = async function(request, response,next)  {
    try {
        var idEvent = Number(request.body.idEvent);
        const event = await DataBase.event(idEvent);
        if(event == null){
            next({err : 'event by id not found', code : 400}).end();
        }
        const tags = await DataBase.EventTags(idEvent);
        let masTags = [];
        for (j in tags) {
            masTags.push(tags[j].eventtags.id);
        };
        event.event.tags = masTags;
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const statusVisit = await DataBase.userVisitStatus(userId, idEvent);
            event.event.statusVisit = statusVisit;
        }
        response.json(event.event);
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.shortList = async function(request, response, next) {
    try {
        let limit = Number(request.params.limit);
        let offset = Number(request.params.offset);

        offset = offset <= 0 ? 1 : offset;
        limit = limit <= 0 ? 1 : limit;
        offset = (offset - 1) * limit;

        let eventList = [];

        const events = await DataBase.eventShortList(limit, offset);

        for (i in events) {
            const tags = await DataBase.EventTags(events[i].eventshortlist.id);
            var masTags = [];
            for (j in tags) {
                masTags.push(tags[j].eventtags.id);
            };
            let date = events[i].eventshortlist.datatime == null ? null : funcs.getDateOnlyString(events[i].eventshortlist.datatime);
            let a = {
                id: events[i].eventshortlist.id,
                name: events[i].eventshortlist.name,
                date: date,
                idAddress: events[i].eventshortlist.id_address,
                image: events[i].eventshortlist.image,
                tags: masTags,
            };
            eventList.push(a);
        };
        response.json(eventList);
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.search = async function(request, response, next) {
    try {
        let limit = Number(request.params.limit);
        let offset = Number(request.params.offset);

        offset = offset <= 0 ? 1 : offset;
        limit = limit <= 0 ? 1 : limit;
        offset = (offset - 1) * limit;

        const word = request.body.word ? request.body.word  : undefined;
        const tags = request.body.tags ? request.body.tags  : undefined;
        const dateFrom = request.body.dateFrom  ? request.body.dateFrom  : undefined;
        const dateTo = request.body.dateTo ? request.body.dateTo  : undefined;
        if(word == undefined && tags == undefined && dateFrom== undefined && dateTo == undefined ) {
            response.json( [] );
            return;
        }
        let events = [];
        const eventList = await DataBase.searchEvent(word, limit, offset, dateFrom, dateTo, tags);

        for (i in eventList) {
            let tags = await DataBase.EventTags(eventList[i].searchevent.id);
            let masTags = [];
            for (j in tags) {
                masTags.push(tags[j].eventtags.id);
            };
            eventList[i].searchevent.tags = masTags;
            events.push(eventList[i].searchevent);
        };
        response.json( events );
    } catch (err) {

        next({err : err, code : 500});
    }
};

exports.addTag = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const word = request.body.title;
            if (word == null) {
                response.status(400).end("");
                return;
            }
            const tags = await DataBase.addTag(word);
            if(tags) {
                response.status(200).end("added");
            } else {
                response.status(400).end();
            }

        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }

};

exports.tag = async function(request, response, next) {
    try {
        let limit = Number(request.params.limit);
        let offset = Number(request.params.offset);

        offset = offset <= 0 ? 1 : offset;
        limit = limit <= 0 ? 1 : limit;
        offset = (offset - 1) * limit;

        const tags = await DataBase.tagsLim(limit, offset);

        let masTags = [];
        for (j in tags) {
            masTags.push({ "id": tags[j].tags.id, "title": tags[j].tags.title });
        };
        response.json(masTags);
    } catch (err) {
        next({err : err, code : 500});
    }

};

exports.tagById = async function(request, response, next) {
    try {
        let id = Number(request.params.id);
        const tags = await DataBase.tagById(id);

        if (tags != null) {
            response.json({ "id": tags.tagbyid.id, "title": tags.tagbyid.title });
        } else {
            response.json({});
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};