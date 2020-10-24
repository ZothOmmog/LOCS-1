const path = require('path')
const crypt = require("../scripts/password.js");
const config = require('../configs/config.json');
const DataBase = require('../scripts/adminDataBase.js');
const funcs = require('../scripts/funcs.js');
const takeObj = funcs.takeObj;

//адрес
exports.getAddress = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {

            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {

                await DataBase.getaddress().then(function(val) {
                    var tags = []
                    for (i in val) {
                        tags.push(val[i].getaddress);
                    }
                    response.json(tags);
                }).catch(function(val) {
                    next({err : val, code : 500}).end();
                });

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
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                let street = request.body.street;
                let house = request.body.house;
                let latitude = request.body.latitude;
                let longitude = request.body.longitude;
                let id_district = request.body.id_district;
                let deleted = request.body.deleted;
                if (street == null || house == null || latitude == null || longitude == null || id_district == null || deleted == null) {
                    response.status(400).end();
                    return;
                }
                await DataBase.addAddress(street, house, latitude, longitude, id_district, deleted).then(function(val) {
                    response.json(val);
                }).catch(function(val) {
                    next({err : val, code : 500}).end();
                });
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
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                let id = Number(request.params.id);
                let street = request.body.street;
                let house = request.body.house;
                let latitude = request.body.latitude;
                let longitude = request.body.longitude;
                let id_district = request.body.id_district;
                let deleted = request.body.deleted;
                if (id == null || street == null || house == null || latitude == null || longitude == null || id_district == null || deleted == null) {
                    response.status(400).end();
                    return;
                }
                await DataBase.updateAddress(id, street, house, latitude, longitude, id_district, deleted).then(function(val) {
                    response.json(val);
                }).catch(function(val) {
                    next({err : val, code : 500}).end();
                });
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
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                let id = Number(request.params.id);
                if (id == null) {
                    response.status(400).end();
                    return;
                }
                await DataBase.deleteAddress(id).then(function(val) {
                    tags = val;
                    response.status(200).end("deleted");
                }).catch(function(val) {
                    next({err : val, code : 500}).end();
                });
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
//район
exports.getDistrict = async function(request, response, next) {
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
                    next({err : val, code : 500}).end();
                });
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

exports.createDistrict = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                let title = request.body.title;
                let id_city = request.body.id_city;
                let deleted = request.body.deleted;
                if (title == null || id_city == null || deleted == null) {
                    response.status(400).end();
                    return;
                }
                await DataBase.addDistrict(title, id_city, deleted).then(function(val) {
                    response.json(val);
                }).catch(function(val) {
                    next({err : val, code : 500}).end();
                });
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

exports.changeDistrict = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                let id = Number(request.params.id);
                let title = request.body.title;
                let id_city = request.body.id_city;
                let deleted = request.body.deleted;
                if (id == null || title == null || id_city == null || deleted == null) {
                    response.status(400).end();
                    return;
                }
                await DataBase.updateDistrict(id, title, id_city, deleted).then(function(val) {
                    response.json(val);
                }).catch(function(val) {
                    next({err : val, code : 500}).end();
                });
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

exports.deleteDistrict = async function(request, response, next) {
    try {
        const userId = request.cookies.userId ? await takeObj(request.cookies.userId).then(function(val) { return val.taketoken; }) : undefined;
        if (userId) {
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                let id = Number(request.params.id);
                if (id == null) {
                    response.status(400).end();
                    return;
                }
                await DataBase.deleteDistrict(id).then(function(val) {
                    tags = val;
                    response.status(200).end("deleted");
                }).catch(function(val) {
                    next({err : val, code : 500}).end();
                });
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
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                await DataBase.сitys().then(function(val) {
                    var tags = []
                    for (i in val) {
                        tags.push(val[i].citys);
                    }
                    response.json(tags);
                }).catch(function(val) {
                    next({err : val, code : 500}).end();
                });
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
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                let title = request.body.title;
                let deleted = request.body.deleted;
                if (title == null || deleted == null) {
                    response.status(400).end();
                    return;
                }
                await DataBase.addCity(title, deleted).then(function(val) {
                    response.json(val);
                }).catch(function(val) {
                    next({err : val, code : 500}).end();
                });

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
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                let id = Number(request.params.id);
                let title = request.body.title;
                let deleted = request.body.deleted;
                if (id == null || title == null || deleted == null) {
                    response.status(400).end();
                    return;
                }

                await DataBase.updateCity(id, title, deleted).then(function(val) {
                    response.json(val);
                }).catch(function(val) {
                    next({err : val, code : 500}).end();
                });

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
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                let id = Number(request.params.id);
                if (id == null) {
                    response.status(400).end();
                    return;
                }
                await DataBase.deleteCity(id).then(function(val) {
                    response.status(200).end("deleted");
                }).catch(function(val) {
                    next({err : val, code : 500}).end();
                });
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
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                let id = Number(request.params.id);
                let title = request.body.title;
                let deleted = request.body.deleted;
                let accept = request.body.accept;
                let countevents = request.body.countevents;
                if (id == null || countevents == null || title == null || accept == null || deleted == null) {
                    response.status(400).end();
                    return;
                }
                await DataBase.updateTagsAdmin(id, title, deleted, accept, countevents).then(function(val) {
                    response.json(val);
                }).catch(function(val) {
                    next({err : val, code : 500}).end();
                });

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
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                let title = request.body.title;
                let deleted = request.body.deleted;
                let accept = request.body.accept;
                let countevents = request.body.countevents;
                if (countevents == null || title == null || accept == null || deleted == null) {
                    response.status(400).end();
                    return;
                }
                await DataBase.addTagsAdmin(title, deleted, accept, countevents).then(function(val) {
                    response.json(val);
                }).catch(function(val) {
                    next({err : val, code : 500}).end();
                });

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
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {

                await DataBase.getTags().then(function(val) {
                    var tags = []
                    for (i in val) {
                        tags.push(val[i].gettags);
                    }
                    response.json(tags);
                }).catch(function(val) {
                   next({err : val, code : 500}).end();
                });
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
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                let id = Number(request.params.id);
                if (id == null) {
                    response.status(400).end();
                    return;
                }
                await DataBase.deleteTag(id).then(function(val) {
                    tags = val;
                    response.status(200).end("deleted");
                }).catch(function(val) {
                    next({err : val, code : 500}).end();
                });
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
            const Role = request.cookies.userRole ? await takeObj(request.cookies.userRole).then(function(val) { return val.taketoken; }) : undefined;
            if (Role == 0) {
                let idTag = Number(request.params.id);
                if (id == null) {
                    response.status(400).end();
                    return;
                }

                await DataBase.acceptTag(idTag).then(function(val) {
                    tags = val;
                    response.status(200).end("accept");
                }).catch(function(val) {
                    next({err : val, code : 500}).end();
                });

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