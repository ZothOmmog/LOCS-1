const DataBase = require('../scripts/adminDataBase.js');
const funcs = require('../scripts/funcs.js');
const takeObj = funcs.takeObj;
const path = require('path')
const crypt = require("../scripts/password.js");
const config = require('../configs/config.json');

//организатор юзер
exports.getUsers = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 0) {

                let limit = Number(request.params.limit);
                let offset = Number(request.params.offset);
        
                offset = offset <= 0 ? 1 : offset;
                limit = limit <= 0 ? 1 : limit;
                offset = (offset - 1) * limit;

                const users = await DataBase.getUsers(limit, offset);
                let mas = [];
                for (i in users) {
                    mas.push(users[i].all_user_admin);
                }
                response.json(mas);

            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.getOrganization = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 0) {

                let limit = Number(request.params.limit);
                let offset = Number(request.params.offset);
        
                offset = offset <= 0 ? 1 : offset;
                limit = limit <= 0 ? 1 : limit;
                offset = (offset - 1) * limit;

                const orgs = await DataBase.getOrganization(limit, offset);
                let mas = []
                for (i in orgs) {
                    mas.push(orgs[i].all_org_admin);
                }
                response.json(mas);

            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.banUser = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 0) {
                const id = Number(request.body.id ? request.body.id  : 0);
                const reason = request.body.reason ? request.body.reason : "";
                const result = await DataBase.banStatusAccount(id, true, reason);
                //TO DO : высылается письмо на почту 
                if(result) {
                    response.status(200).end("banned");
                } else {
                    response.status(400).end();
                }
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.unbanUser = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 0) {
                const id = Number(request.body.id ? request.body.id  : 0);
                const result = await DataBase.banStatusAccount(id, false);
                if(result) {
                    response.status(200).end("unbanned");
                } else {
                    response.status(400).end();
                }
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

//адрес
exports.getAddress = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 0) {
                let limit = Number(request.params.limit);
                let offset = Number(request.params.offset);
                offset = offset <= 0 ? 1 : offset;
                limit = limit <= 0 ? 1 : limit;
                offset = (offset - 1) * limit;

                const addressDB = await DataBase.getaddress(limit, offset);
                var address = []
                for (i in addressDB) {
                    address.push(addressDB[i].getaddress);
                }
                response.json(address);
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }

};

exports.createAddress = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 0) {
                const street = request.body.street;
                const house = request.body.house;
                const latitude = parseFloat(request.body.latitude);
                const longitude = parseFloat(request.body.longitude);
                const id_city = request.body.id_city;
                const deleted = request.body.deleted;
                if (street == null || house == null || latitude == null || longitude == null || id_city == null || deleted == null) {
                    response.status(400).end();
                    return;
                }
                const result = await DataBase.addAddress(street, house, latitude, longitude, id_city, deleted);
                if(result) {
                    response.status(200).end();
                } else {
                    response.status(400).end();
                }
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }

};

exports.changeAddress = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 0) {
                const id = Number(request.params.id);
                const street = request.body.street;
                const house = request.body.house;
                const latitude = request.body.latitude;
                const longitude = request.body.longitude;
                const id_city = request.body.id_city;
                const deleted = request.body.deleted;
                if (id == null || street == null || house == null || latitude == null || longitude == null || id_city == null || deleted == null) {
                    response.status(400).end();
                    return;
                }
                const result = await DataBase.updateAddress(id, street, house, latitude, longitude, id_city, deleted);
                if(result) {
                    response.status(200).end();
                } else {
                    response.status(400).end();
                }
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }

};

exports.deleteAddress = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 0) {
                let id = Number(request.params.id);
                if (id == null) {
                    response.status(400).end();
                    return;
                }
                const result = await DataBase.deleteAddress(id);
                if(result) {
                    response.status(200).end("deleted");
                } else {
                    response.status(400).end();
                }
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }

};

//Город
exports.getCity = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 0) {
                let limit = Number(request.params.limit);
                let offset = Number(request.params.offset);
                offset = offset <= 0 ? 1 : offset;
                limit = limit <= 0 ? 1 : limit;
                offset = (offset - 1) * limit;
                const citysArray = await DataBase.сitys(limit, offset);
                var tags = []
                for (i in citysArray) {
                    tags.push(citysArray[i].citys);
                }
                response.json(tags);
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }

};

exports.createCity = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 0) {
                const title = request.body.title;
                const deleted = request.body.deleted;
                if (title == null || deleted == null) {
                    response.status(400).end();
                    return;
                }
                const result = await DataBase.addCity(title, deleted);
                if(result){
                    response.status(200).end();
                } else {
                    response.status(400).end();
                }
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }

};

exports.changeCity = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 0) {
                const id = Number(request.params.id);
                const title = request.body.title;
                const deleted = request.body.deleted;
                if (id == null || title == null || deleted == null) {
                    response.status(400).end();
                    return;
                }
                const result = await DataBase.updateCity(id, title, deleted);
                if(result){
                    response.status(200).end();
                } else {
                    response.status(400).end();
                }
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }

};

exports.deleteCity = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 0) {
                const id = Number(request.params.id);
                if (id == null) {
                    response.status(400).end();
                    return;
                }
                const result = await DataBase.deleteCity(id);
                if(result){
                    response.status(200).end("deleted");
                } else {
                    response.status(400).end();
                }
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }

};

//теги
exports.changeTag = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 0) {
                const id = Number(request.params.id);
                const title = request.body.title;
                const deleted = request.body.deleted;
                const accept = request.body.accept;
                if (id == null  || title == null || accept == null || deleted == null) {
                    response.status(400).end();
                    return;
                }
                const result = await DataBase.updateTagsAdmin(id, title, deleted, accept, 0);
                if(result){
                    response.status(200).end();
                } else {
                    response.status(400).end();
                }
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }

};

exports.addTag = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 0) {
                const title = request.body.title;
                const deleted = request.body.deleted;
                const accept = request.body.accept;
                if ( title == null || accept == null || deleted == null) {
                    response.status(400).end();
                    return;
                }
                const result = await DataBase.addTagsAdmin(title, deleted, accept, 0);
                if(result){
                    response.status(200).end();
                } else {
                    response.status(400).end();
                }
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }

};

exports.getTags = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 0) {
                let limit = Number(request.params.limit);
                let offset = Number(request.params.offset);
                offset = offset <= 0 ? 1 : offset;
                limit = limit <= 0 ? 1 : limit;
                offset = (offset - 1) * limit;
                const result = await DataBase.getTags(limit, offset);
                let tags = []
                for (i in result) {
                    tags.push(result[i].gettags);
                }
                response.json(tags);
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }

};

exports.deleteTag = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 0) {
                const id = Number(request.params.id);
                if (id == null) {
                    response.status(400).end();
                    return;
                }
                const result = await DataBase.deleteTag(id);
                if(result) {
                    response.status(200).end();
                } else {
                    response.status(400).end();
                }
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }

};

exports.acceptTag = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 0) {
                const idTag = Number(request.params.id);
                if (idTag == null) {
                    response.status(400).end();
                    return;
                }
                const result = await DataBase.acceptTag(idTag);
                if(result) {
                    response.status(200).end();
                } else {
                    response.status(400).end();
                }
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }

};

exports.getTag = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 0) {
                let limit = Number(request.params.limit);
                let offset = Number(request.params.offset);
                offset = offset <= 0 ? 1 : offset;
                limit = limit <= 0 ? 1 : limit;
                offset = (offset - 1) * limit;
                const result = await DataBase.getTags(limit, offset);
                let tags = []
                for (i in result) {
                    tags.push(result[i].gettags);
                }
                response.json(tags);
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }

};

//ивент
exports.getEvents = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 0) {
                let limit = Number(request.params.limit);
                let offset = Number(request.params.offset);
        
                offset = offset <= 0 ? 1 : offset;
                limit = limit <= 0 ? 1 : limit;
                offset = (offset - 1) * limit;
                const result = await DataBase.getEvents(limit, offset);
                let events = []
                for (i in result) {
                    events.push(result[i].events);
                }
                response.json(events);
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }

};

exports.publishEvent = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 0) {
                const id = Number(request.body.id);
                if (id == null) {
                    response.status(400).end();
                    return;
                }
                const result = await DataBase.publishEvent(id, true);
                console.log(id);
                if(result) {
                    response.status(200).end();
                } else {
                    response.status(400).end();
                }
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.unpublishEvent = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 0) {
                const id = Number(request.body.id);
                if (id == null) {
                    response.status(400).end();
                    return;
                }
                const result = await DataBase.publishEvent(id, false);
                if(result) {
                    response.status(200).end("unpublish");
                } else {
                    response.status(400).end();
                }
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }
};

exports.deleteEvent = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = await funcs.getRole(userId);
            if (Role == 0) {
                const id = Number(request.body.id);
                if (id == null) {
                    response.status(400).end();
                    return;
                }
                const result = await DataBase.deleteEvent(id);
                if(result) {
                    response.status(200).end("deleted");
                } else {
                    response.status(400).end();
                }
            } else {
                response.status(403).end("have not permissions");
            }
        } else {
            response.status(401).end();
        }
    } catch (err) {
        next({err : err, code : 500});
    }

};