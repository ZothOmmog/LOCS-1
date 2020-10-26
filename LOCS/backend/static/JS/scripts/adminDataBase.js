const intiDB = require('./DBinit.js');
let db = intiDB.db;


//организатор
let getOrganization= (limit, offset) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select all_org_admin($1,$2);', [limit, offset])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: all_org_admin");
                return;
            });
    })
};

let banStatusOrganization = (id, status) => {
    return new Promise((resolve, reject) => {
        db.result('Call ban_unban_org($1,$2);', [id, status])
            .then(function(data) {
                resolve(true);
            }).catch(function(val) {
               // console.log(val);
                reject("ERROR BD: banStatusOrganization");
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
                reject("ERROR BD: getaddress");
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
                reject("ERROR BD: AddAddress");
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
                reject("ERROR BD: updateAddress");
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
                reject("ERROR BD: deleteAddress");
                return;
            });
    })
};

//район 
let districts = () => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select districts();')
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: districts");
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
                reject("ERROR BD: AddDistrict");
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
                reject("ERROR BD: UpdateDistrict");
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
                reject("ERROR BD: DeleteDistrict");
                return;
            });
    })
};

//город
let сitys = () => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select Citys();')
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: Citys");
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
                reject("ERROR BD: AddCity");
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
                reject("ERROR BD: UpdateCity");
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
                reject("ERROR BD: DeleteCity");
                return;
            });
    })
};

//теги

let getTags = () => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select GetTags();')
            .then(function(data) {
                resolve(data);
            }).catch(function(e) {
                reject("ERROR BD: GetTags");
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
                reject("ERROR BD: AddTagsAdmin");
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
                reject("ERROR BD: UpdateTagsAdmin");
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
                reject("ERROR BD: acceptTag");
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
                reject("ERROR BD: deleteTag");
                return;
            });
    })

};

////



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
    'banStatusOrganization' : banStatusOrganization,
};