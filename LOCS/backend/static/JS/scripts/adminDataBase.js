const intiDB = require('./DBinit.js');
let db = intiDB.db;

////
//Добавить район
let addDistrict = (title, id_city) => {
    return new Promise((resolve, reject) => {
        db.result('Call AddDistrict($1, $2);', [title, id_city])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: AddDistrict");
                return;
            });
    })
};

//Добавить адрес
let addAddress = (street, house, latitude, longitude, idDistrict) => {
    return new Promise((resolve, reject) => {
        db.result('Call AddAddress($1, $2,$3,$4,$5);', [street, house, latitude, longitude, idDistrict])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: AddAddress");
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

// добавить тег //change
let addTag = (title) => {
    return new Promise((resolve, reject) => {
        db.result('call addTag($1);', [title])
            .then(function(data) {
                resolve(data);
            }).catch(function(e) {
                console.log(e);
                reject("ERROR BD: addTag");
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

module.exports = {
    'addDistrict': addDistrict, //Добавить район
    'addAddress': addAddress, //Добавить адрес
    'addTag': addTag, //добавить тег
    'acceptTag': acceptTag, // подтв. тег
    'deleteTag': deleteTag, //удалить тег
};