const path = require('path')
const crypt = require("../scripts/password.js");
const config = require('../configs/config.json');
const DataBase = require('../scripts/adminDataBase.js');
const funcs = require('../scripts/funcs.js');
const takeObj = funcs.takeObj;

//район
exports.getDistrict = async function(request, response) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                await DataBase.districts().then(function(val) {
                    var tags = []
                    for (i in val) {
                        tags.push(val[i].districts);
                    }
                    response.json(tags);
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

exports.createDistrict = async function(request, response) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                let title = request.body.title;
                let id_city = request.body.id_city;
                let deleted = request.body.deleted;
                await DataBase.addDistrict(title, id_city, deleted).then(function(val) {
                    response.json(val);
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

//Город
exports.getCity = async function(request, response) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                await DataBase.сitys().then(function(val) {
                    var tags = []
                    for (i in val) {
                        tags.push(val[i].citys);
                    }
                    response.json(tags);
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

exports.createCity = async function(request, response) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                let title = request.body.title;
                let deleted = request.body.deleted;
                await DataBase.addCity(title, deleted).then(function(val) {
                    response.json(val);
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

exports.changeCity = async function(request, response) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                let id = Number(request.params.id);
                let title = request.body.title;
                let deleted = request.body.deleted;
                await DataBase.updateCity(id, title, deleted).then(function(val) {
                    response.json(val);
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

exports.deleteCity = async function(request, response) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                let id = Number(request.params.id);
                await DataBase.deleteCity(id).then(function(val) {
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
//теги
exports.changeTag = async function(request, response) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                let id = Number(request.params.id);
                let title = request.body.title;
                let deleted = request.body.deleted;
                let accept = request.body.accept;
                let countevents = request.body.countevents;
                await DataBase.updateTagsAdmin(id, title, deleted, accept, countevents).then(function(val) {
                    response.json(val);
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

exports.addTag = async function(request, response) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                let title = request.body.title;
                let deleted = request.body.deleted;
                let accept = request.body.accept;
                let countevents = request.body.countevents;
                await DataBase.addTagsAdmin(title, deleted, accept, countevents).then(function(val) {
                    response.json(val);
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

exports.getTag = async function(request, response) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                await DataBase.getTags().then(function(val) {
                    var tags = []
                    for (i in val) {
                        tags.push(val[i].gettags);
                    }
                    response.json(tags);
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