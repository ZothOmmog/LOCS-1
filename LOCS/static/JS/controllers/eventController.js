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


exports.create = function(request, response) {

};

exports.change = function(request, response) {

};

exports.delete = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
        //организатор или админ
        if (Role == 2 || Role == 0) {
            let idEvent = request.params.idEvent;
            var Check;
            await DataBase.deleteEvent(idEvent).then(function(val) {
                Check = val;
            });
            response.json({ "Deleted": true });
        } else {
            response.json({ err: "do not have permissions" });
        }
    } else {
        response.json({ err: "user dont sing in" });
    }
};


exports.event = function(request, response) {

};

//надо подумать о фильтре по тегам 
exports.shortList = async function(request, response) {

    let limit = request.params.limit;
    let offset = (request.params.offset - 1) * limit;
    offset = offset <= 0 ? 1 : offset;
    limit = limit <= 0 ? 1 : limit;


    var Events;
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
            masTags.push(tags[j].eventtags.title);
        };
        Events[i].tags = masTags;
    };

    response.json(Events);
};

exports.search = function(request, response) {

};