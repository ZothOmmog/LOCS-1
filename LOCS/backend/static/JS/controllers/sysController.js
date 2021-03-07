const path = require('path')
const fs = require("fs");
var DataBase = require('../scripts/DataBase.js');
const funcs = require('../scripts/funcs.js');
const takeObj = funcs.takeObj;

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
                    const mimetype = filedata.mimetype.replace("image/",".");
                    const namePhoto = String(userId) + String(Date.now()) + mimetype;
                    await fs.writeFileSync("../uploads/profile/" + namePhoto, filedata.buffer, "binary");
                    const data = await DataBase.addPhotoAcc(userId, namePhoto);
                    if (data) {
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
            const Role = await funcs.getRole(userId);
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
                        const mimetype = filedata.mimetype.replace("image/",".");
                        const namePhoto = String(userId) + String(Date.now()) + mimetype;
                        await fs.writeFileSync("../uploads/organizer/" + namePhoto, filedata.buffer, "binary");
                        const data = await DataBase.addPhotoOrg(userId, namePhoto);
                        if (data) {
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
            const Role = await funcs.getRole(userId);
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
                        const mimetype = filedata.mimetype.replace("image/",".");
                        const namePhoto = String(userId) + String(Date.now()) + mimetype;
                        await fs.writeFileSync("../uploads/event/" + namePhoto, filedata.buffer, "binary");
                        let idEvent = request.params.event;
                        const data = await DataBase.addPhotoEvent(userId, idEvent, namePhoto); 
                        if (data) {
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
        const data = await DataBase.acceptMail(hash);
        if(data) {
            response.status(200).end("accept");
        } else {
            response.status(400).end();
        }
    } catch (err) {
        response.status(500).end(err);
    }

};
exports.forwardMail = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const token = await DataBase.returnTokenAcceptMail(userId); 
            console.log(token);
            ///функция для отправки mail
            response.status(200).end("has been send");
        } else {
            return response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};