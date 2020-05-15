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

        } else {
            response.json({ err: "do not have permissions" });
        }
    } else {
        response.json({ err: "user dont sing in" });
    };
};

// exports.delete = async function(request, response) {
//     const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
//     if (userId) {
//         const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
//         //организатор или админ
//         if (Role == 2 || Role == 0) {
//             let idEvent = request.params.idEvent;
//             var Check;
//             await DataBase.deleteEvent(idEvent).then(function(val) {
//                 Check = val;
//             });
//             response.json({ "Deleted": true });
//         } else {
//             response.json({ err: "do not have permissions" });
//         }
//     } else {
//         response.json({ err: "user dont sing in" });
//     }
// };