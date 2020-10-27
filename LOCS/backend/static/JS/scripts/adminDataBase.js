const intiDB = require('./DBinit.js');
let db = intiDB.db;


//организатор
let getOrganization= (limit, offset) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select all_org_admin($1,$2);', [limit, offset])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR admin BD: all_org_admin");
                return;
            });
    })
};

let banStatusAccount = (id, status, reason = null) => {
    return new Promise((resolve, reject) => {
        db.result('Call ban_Status_Account($1,$2,$3);', [id, status, reason])
            .then(function(data) {
                resolve(true);
            }).catch(function(val) {
               // console.log(val);
                reject("ERROR admin BD: banStatusAccount");
                return;
            });
    })
};



//адрес 
let getaddress = (limit, offset) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select getaddress($1,$2);',  [limit, offset])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR admin BD: getaddress");
                return;
            });
    })
};
let addAddress = (street, house, latitude, longitude, id_district, deleted) => {
    return new Promise((resolve, reject) => {
        db.result('Call AddAddress($1,$2,$3,$4,$5,$6);', [street, house, latitude, longitude, id_district, deleted])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR admin BD: AddAddress");
                return;
            });
    })
};
let updateAddress = (id, street, house, latitude, longitude, id_district, deleted) => {
    return new Promise((resolve, reject) => {
        db.result('Call updateAddress($1,$2,$3,$4,$5,$6,$7);', [id, street, house, latitude, longitude, id_district, deleted])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR admin BD: updateAddress");
                return;
            });
    })
};

let deleteAddress = (id) => {
    return new Promise((resolve, reject) => {
        db.result('Call deleteAddress($1);', [id])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR admin BD: deleteAddress");
                return;
            });
    })
};

//район 
let districts = (limit, offset) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select districts($1,$2);' , [limit, offset])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR admin BD: districts");
                return;
            });
    })
};
let addDistrict = (title, id_city, deleted) => {
    return new Promise((resolve, reject) => {
        db.result('Call AddDistrict($1,$2,$3);', [title, id_city, deleted])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR admin BD: AddDistrict");
                return;
            });
    })
};
let updateDistrict = (id, title, id_city, deleted) => {
    return new Promise((resolve, reject) => {
        db.result('Call UpdateDistrict($1,$2,$3,$4);', [id, title, id_city, deleted])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR admin BD: UpdateDistrict");
                return;
            });
    })
};
let deleteDistrict = (id) => {
    return new Promise((resolve, reject) => {
        db.result('Call DeleteDistrict($1);', [id])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR admin BD: DeleteDistrict");
                return;
            });
    })
};

//город
let сitys = (limit, offset) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select Citys($1,$2);', [limit, offset])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR admin BD: Citys");
                return;
            });
    })
};
let addCity = (title, deleted) => {
    return new Promise((resolve, reject) => {
        db.result('Call AddCity($1,$2);', [title, deleted])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR admin BD: AddCity");
                return;
            });
    })
};
let updateCity = (id, title, deleted) => {
    return new Promise((resolve, reject) => {
        db.result('Call UpdateCity($1,$2,$3);', [id, title, deleted])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR admin BD: UpdateCity");
                return;
            });
    })
};
let deleteCity = (id) => {
    return new Promise((resolve, reject) => {
        db.result('Call DeleteCity($1);', [id])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR admin BD: DeleteCity");
                return;
            });
    })
};

//теги

let getTags = (limit, offset) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select GetTags($1,$2);', [limit, offset])
            .then(function(data) {
                resolve(data);
            }).catch(function(e) {
                reject("ERROR admin BD: GetTags");
                return;
            });
    })
};
let addTagsAdmin = (title, deleted, accept, countevents) => {
    return new Promise((resolve, reject) => {
        db.result('Call AddTagsAdmin($1,$2,$3,$4);', [title, deleted, accept, countevents])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR admin BD: AddTagsAdmin");
                return;
            });
    })
};
let updateTagsAdmin = (id, title, deleted, accept, countevents) => {
    return new Promise((resolve, reject) => {
        db.result('Call UpdateTagsAdmin($1,$2,$3,$4,$5);', [id, title, deleted, accept, countevents])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR admin BD: UpdateTagsAdmin");
                return;
            });
    })
};



// подтв. тег 
let acceptTag = (id) => {
    return new Promise((resolve, reject) => {
        db.result('call acceptTag($1);', [id])
            .then(function(data) {
                resolve(data);
            }).catch(function(e) {
                console.log(e);
                reject("ERROR admin BD: acceptTag");
                return;
            });
    })
};


// удалить тег по id
let deleteTag = (id) => {
    return new Promise((resolve, reject) => {
        db.result('call deleteTag($1);', [id])
            .then(function(data) {
                resolve(data);
            }).catch(function(e) {
                console.log(e);
                reject("ERROR admin BD: deleteTag");
                return;
            });
    })

};

//ивент

let getEvents = (limit, offset) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select events($1,$2);', [limit, offset])
            .then(function(data) {
                resolve(data);
            }).catch(function(e) {
                reject("ERROR admin BD:  getEvents");
                return;
            });
    })
};

let deleteEvent = (id) => {
    return new Promise((resolve, reject) => {
        db.result('call Delete_event($1);', [id])
            .then(function(data) {
                resolve(data);
            }).catch(function(e) {
                console.log(e);
                reject("ERROR admin BD: deleteEvent");
                return;
            });
    })
};

let publishEvent = (id, status) => {
    return new Promise((resolve, reject) => {
        db.result('call published_event($1,$2);', [id,status])
            .then(function(data) {
                resolve(data);
            }).catch(function(e) {
                console.log(e);
                reject("ERROR admin BD: publishEvent");
                return;
            });
    })
};


module.exports = {
    //адрес
    'getaddress': getaddress,
    'addAddress': addAddress,
    'updateAddress': updateAddress,
    'deleteAddress': deleteAddress,
    //район
    'districts': districts,
    'addDistrict': addDistrict,
    'updateDistrict': updateDistrict,
    'deleteDistrict': deleteDistrict,
    //город
    'сitys': сitys,
    'addCity': addCity,
    'updateCity': updateCity,
    'deleteCity': deleteCity,
    //теги
    'getTags': getTags,
    'addTagsAdmin': addTagsAdmin,
    'updateTagsAdmin': updateTagsAdmin,
    'acceptTag': acceptTag, // подтв. тег
    'deleteTag': deleteTag, //удалить тег
    //организатор 
    'getOrganization': getOrganization,
    'banStatusAccount' : banStatusAccount,
    //ивент
    'deleteEvent' : deleteEvent,
    'publishEvent' : publishEvent,
    'getEvents' : getEvents,
};