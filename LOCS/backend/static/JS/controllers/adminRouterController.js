const path = require('path')
let crypt = require("../scripts/password.js");
var config = require('../configs/config.json');
var DataBase = require('../scripts/adminDataBase.js');
const funcs = require('../scripts/funcs.js');



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