const path = require('path')
const fs = require("fs");
var DataBase = require('../scripts/DataBase.js');
const funcs = require('../scripts/funcs.js');
const takeObj = funcs.takeObj;
// async function takeObj(token) {
//     let data;
//     await DataBase.TakeToken(token).then(function(val) {
//         data = val;
//     });
//     return data;
// }


exports.uploadPhotoAcc = async function(request, response, next) {
try {
        if (request.file == undefined) {
            response.status(400).end("нет файла");
            return;
        }
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            let filedata = request.file;
            if (filedata.mimetype == -1) {
                response.status(400).end("фото (png, jpg, jpeg) должно быть не больше 6 мб");
                return;
            }
            if (!filedata) {
                response.status(400).end("Error loading file");
            } else {
                try {
                    const namePhoto = String(userId) + String(Date.now());
                    await fs.writeFileSync("../uploads/profile/" + namePhoto, filedata.buffer, "binary");
                    let data;
                    await DataBase.addPhotoAcc(userId, namePhoto).then(function(val) {
                        data = val;

                    }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

                    if (data == true) {
                        response.status(200).end("has been loaded");
                    } else {
                        response.status(500).end("Error writing file");
                    }
                } catch {
                    response.status(500).end("Error writing file");
                }
            }
        } else {
            return response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.uploadPhotoOrg = async function(request, response, next) {
    try {
        if (request.file == undefined) {
            response.status(400).end("нет файла");
            return;
        }
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 2) {
                let filedata = request.file;
                filedata.filename = Date.now();
                if (filedata.mimetype == -1) {
                    response.status(400).end("фото (png, jpg, jpeg) должно быть не больше 6 мб");
                    return;
                }
                if (!filedata) {
                    response.status(400).end("Error loading file");
                } else {
                    try {
                        const namePhoto = String(userId) + String(Date.now());
                        await fs.writeFileSync("../uploads/organizer/" + namePhoto, filedata.buffer, "binary");
                        let data;
                        await DataBase.addPhotoOrg(userId, namePhoto).then(function(val) {
                            data = val;
                        }).catch(function(err) {  next({err : err, code : 500}).end(); }); 
                        if (data == true) {
                            response.status(200).end("has been loaded");
                        } else {
                            response.status(500).end("Error writing file");
                        }
                    } catch {
                        response.status(500).end("Error writing file");
                    }
                }
            } else {
                response.status(401).end();
            }
        } else {
            return response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500}); 
    }
};

exports.uploadPhotoEvent = async function(request, response, next) {
    try {
        if (request.file == undefined) {
            response.status(400).end("нет файла");
            return;
        }
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 2) {
                let filedata = request.file;
                filedata.filename = Date.now();

                if (filedata.mimetype == -1) {
                    response.status(400).end("фото (png, jpg, jpeg) должно быть не больше 6 мб");
                    return;
                }
                if (!filedata) {
                    response.status(400).end("Error loading file");
                    return;
                } else {
                    try {
                        const namePhoto = String(userId) + String(Date.now());
                        await fs.writeFileSync("../uploads/event/" + namePhoto, filedata.buffer, "binary");
                        let data;
                        let idEvent = request.params.event;
                        await DataBase.addPhotoEvent(userId, idEvent, namePhoto).then(function(val) {
                            data = val;
                        }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

                        if (data == true) {
                            response.status(200).end("has been loaded");
                        } else {
                            response.status(500).end("Error writing file");
                        }
                    } catch {
                        response.status(500).end("Error writing file");
                    }
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

exports.acceptAccount = async function(request, response, next) {
    try {
        const hash = request.params.hash;
        await DataBase.acceptMail(hash).then(function(val) {
            data = val;
            response.status(200).end("accept");
        }).catch(function(err) {  next({err : err, code : 500}).end(); }); 
    } catch (err) {
        response.status(500).end(err);
    }

};
exports.forwardMail = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            await DataBase.returnTokenAcceptMail(userId).then(function(val) {
                console.log(val);
                ///вызов функции для создания и отправки ссылки 

                response.status(200).end("has been send");
            }).catch(function(err) {  next({err : err, code : 500}).end(); }); 

        } else {
            return response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};