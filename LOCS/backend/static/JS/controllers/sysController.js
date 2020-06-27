const path = require('path')
let crypt = require("../scripts/password.js");
var config = require('../configs/config.json');
var DataBase = require('../scripts/DataBase.js');
//const multer = require("multer");

async function takeObj(token) {
    let data;
    await DataBase.TakeToken(token).then(function(val) {
        data = val;
    });
    return data;
}


exports.uploadPhoto = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        let type = Number(request.params.type);

        if (type == 1) {
            let filedata = request.file;

            console.log(filedata);
            if (!filedata) {
                response.send("Ошибка при загрузке файла");
            } else {
                response.send("Файл загружен");
            }
        }
    }
};


// exports.mySubscribersLimit = async function(request, response) {
//     const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
//     if (userId) {
//         const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
//         if (Role == 2 || Role == 0) {
//             let count;
//             await DataBase.countSubscribers(userId).then(function(val) {
//                 count = val;
//             });

//             let limit = Number(request.params.limit);
//             let offset = Number(request.params.offset);
//             offset = offset <= 0 ? 1 : offset;
//             limit = limit <= 0 ? 1 : limit;
//             offset = (offset - 1) * limit;
//             let data;
//             await DataBase.subscribersLimit(userId, limit, offset).then(function(val) {
//                 data = val;
//             }).catch(function() {
//                 data = { "err": "sub org error" }
//             });

//             response.json({ "count": count, data });

//         } else {
//             response.json({ err: "do not have permissions" });
//         }
//     } else {
//         response.json({ err: "user dont sing in" });
//     };
//};