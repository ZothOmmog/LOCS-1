const path = require('path')
const fs = require("fs");
var DataBase = require('../scripts/DataBase.js');

async function takeObj(token) {
    let data;
    await DataBase.TakeToken(token).then(function(val) {
        data = val;
    });
    return data;
}


exports.uploadPhotoAcc = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        let filedata = request.file;
        //console.log(filedata);
        if (filedata.mimetype == -1) {
            response.json({ errFormat: "фото (png, jpg, jpeg) должно быть не больше 6 мб" });
            return;
        }
        if (!filedata) {
            response.json({ err: "Error loading file" });
        } else {
            try {
                const namePhoto = String(userId) + String(Date.now());
                await fs.writeFileSync("../uploads/profile/" + namePhoto, filedata.buffer, "binary");
                let data;
                await DataBase.addPhotoAcc(userId, namePhoto).then(function(val) {
                    data = val;
                }).catch(function(er) {
                    response.json({ err: "#error DataBase" });
                });
                if (data == true) {
                    response.json({ load: true });
                } else {
                    response.json({ err: "Error writing file" });
                }
            } catch {
                response.json({ err: "Error writing file" });
            }
        }
    } else {
        response.json({ err: "did not login" });
    }
};

exports.uploadPhotoOrg = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
        if (Role == 2) {
            let filedata = request.file;
            filedata.filename = Date.now();
            // console.log(filedata);
            if (filedata.mimetype == -1) {
                response.json({ errFormat: "фото (png, jpg, jpeg) должно быть не больше 6 мб" });
                return;
            }
            if (!filedata) {
                response.json({ err: "Error loading file" });
            } else {
                try {
                    const namePhoto = String(userId) + String(Date.now());
                    await fs.writeFileSync("../uploads/organizer/" + namePhoto, filedata.buffer, "binary");
                    let data;
                    await DataBase.addPhotoOrg(userId, namePhoto).then(function(val) {
                        data = val;
                    }).catch(function(er) {
                        response.json({ err: "#error DataBase" });
                    });
                    if (data == true) {
                        response.json({ load: true });
                    } else {
                        response.json({ err: "Error writing file" });
                    }
                } catch {
                    response.json({ err: "Error writing file" });
                }
            }
        } else {
            response.json({ err: "not have permissons" });
        }
    } else {
        response.json({ err: "did not login" });
    }
};

exports.uploadPhotoEvent = async function(request, response) {
    const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
    if (userId) {
        const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
        if (Role == 2) {
            let filedata = request.file;
            filedata.filename = Date.now();
            //console.log(request);
            //console.log(filedata);
            if (filedata.mimetype == -1) {
                response.json({ errFormat: "фото (png, jpg, jpeg) должно быть не больше 6 мб" });
                return;
            }
            if (!filedata) {
                response.json({ err: "Error loading file" });
            } else {
                try {
                    const namePhoto = String(userId) + String(Date.now());
                    await fs.writeFileSync("../uploads/event/" + namePhoto, filedata.buffer, "binary");
                    let data;
                    let idEvent = request.params.event;
                    await DataBase.addPhotoEvent(userId, idEvent, namePhoto).then(function(val) {
                        data = val;
                    }).catch(function(er) {
                        response.json({ err: "#error DataBase" });
                    });

                    if (data == true) {
                        response.json({ load: true });
                    } else {
                        response.json({ err: "Error writing file" });
                    }
                } catch {
                    response.json({ err: "Error writing file" });
                }
            }
        } else {
            response.json({ err: "not have permissons" });
        }
    } else {
        response.json({ err: "did not login" });
    }
};