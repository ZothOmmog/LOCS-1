const intiDB = require('./DBinit.js');
let db = intiDB.db;

//организатор
const getOrganization = async (limit, offset) => {
    const data = await db.manyOrNone('select all_org_admin($1,$2);', [limit, offset]);
    return data;
};

const getUsers = async (limit, offset) => {
    const data = await db.manyOrNone('select all_user_admin($1,$2);', [limit, offset]);
    return data;
};

const banStatusAccount = async (id, status, reason = null) => {
    const data = await db.result('Call ban_Status_Account($1,$2,$3);', [id, status, reason]).catch((e) => {return false;});
    return data;
};

//адрес 
const getaddress = async (limit, offset) => {
    const data = await db.manyOrNone('select getaddress($1,$2);',  [limit, offset]);
    return data;
};
const addAddress = async (street, house, latitude, longitude, id_city, deleted) => {
    const data = await db.result('Call AddAddress($1,$2,$3,$4,$5,$6);', [street, house, latitude, longitude, id_city, deleted]).catch((e) => {return false;});
    return data;
};
const updateAddress = async (id, street, house, latitude, longitude, id_city, deleted) => {
    const data = await db.result('Call updateAddress($1,$2,$3,$4,$5,$6,$7);', [id, street, house, latitude, longitude, id_city, deleted]).catch((e) => {return false;});
    return data;
};

const deleteAddress = async (id) => {
    const data = await db.result('Call deleteAddress($1);', [id]).catch((e) => {return false;});
    return data;
};

//город
const сitys = async (limit, offset) => {
    const data = await db.manyOrNone('select Citys($1,$2);', [limit, offset]);
    return data;
};
const addCity = async (title, deleted) => {
    const data = await db.result('Call AddCity($1,$2);', [title, deleted]).catch((e) => {return false;});
    return data;
};
const updateCity = async (id, title, deleted) => {
    const data = await db.result('Call UpdateCity($1,$2,$3);', [id, title, deleted]).catch((e) => {return false;});
    return data;
};
const deleteCity = async (id) => {
    const data = await db.result('Call DeleteCity($1);', [id]).catch((e) => {return false;});
    return data;
};

//теги
const getTags = async (limit, offset) => {
    const data = await db.manyOrNone('select GetTags($1,$2);', [limit, offset]);
    return data;
};
const addTagsAdmin = async (title, deleted, accept, countevents) => {
    const data = await db.result('Call AddTagsAdmin($1,$2,$3,$4);', [title, deleted, accept, countevents]).catch((e) => {return false;});
    return data;
};
const updateTagsAdmin = async (id, title, deleted, accept, countevents) => {
    const data = await db.result('Call UpdateTagsAdmin($1,$2,$3,$4,$5);', [id, title, deleted, accept, countevents]).catch((e) => {return false;});
    return data;
};

// подтв. тег 
const acceptTag = async (id) => {
    const data = await db.result('call acceptTag($1);', [id]).catch((e) => {return false;});
    return data;
};

// удалить тег по id
const deleteTag = async (id) => {
    const data = await db.result('call deleteTag($1);', [id]).catch((e) => {return false;});
    return data;
};

//ивент
const getEvents = async (limit, offset) => {
    const data = await db.manyOrNone('select events($1,$2);', [limit, offset]);
    return data;
};

const deleteEvent = async (id) => {
    const data = await db.result('call Delete_event($1);', [id]).catch((e) => {return false;});
    return data;
};

const publishEvent = async  (id, status) => {
    const data = await db.result('call published_event($1,$2);', [id,status]).catch((e) => {return false;});
    return data;
};


module.exports = {
    //адрес
    'getaddress': getaddress,
    'addAddress': addAddress,
    'updateAddress': updateAddress,
    'deleteAddress': deleteAddress,
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
    'getUsers' : getUsers,
    'banStatusAccount' : banStatusAccount,
    //ивент
    'deleteEvent' : deleteEvent,
    'publishEvent' : publishEvent,
    'getEvents' : getEvents,
};