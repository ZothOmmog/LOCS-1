const path = require('path')
let crypt = require("../scripts/password.js");
var config = require('../configs/config.json');
var DataBase = require('../scripts/DataBase.js');

exports.create = function(request, response) {

};

exports.change = function(request, response) {

};

exports.delete = function(request, response) {

};


exports.event = function(request, response) {

};


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