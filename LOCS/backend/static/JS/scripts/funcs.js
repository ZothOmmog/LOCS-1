const DataBase = require('./DataBase.js');

function timeConvert(timestamp) {

    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var a = new Date(timestamp * 1000);

    var year = a.getFullYear();
    var month = a.getMonth();
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();


    var formattedTime = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':00';

    return formattedTime;
}

function stringToObjectTimeConvert(str) {
    var a = new Date(str);
    let datatime = {
        year: a.getFullYear(),
        month: a.getMonth() + 1,
        date: a.getDate(),
        hours: a.getHours(),
        minutes: a.getMinutes()
    };
    return datatime;
}

function getDateOnlyString(str) {
    var a = new Date(str);
    let date = a.getDate() + "-" + (a.getMonth() + 1) + "-" + a.getFullYear();
    return date;
}


async function takeObj(token) {
    let data;
    await DataBase.TakeToken(token).then(function(val) {
        data = val;
    });
    return data;
}

module.exports = {
    'timeConvert': timeConvert,
    'stringToObjectTimeConvert': stringToObjectTimeConvert,
    'takeObj': takeObj,
    'getDateOnlyString': getDateOnlyString
};