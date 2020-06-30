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
        month: a.getMonth(),
        date: a.getDate(),
        hours: a.getHours(),
        minutes: a.getMinutes()
    };

    return datatime;
}


module.exports = {
    'timeConvert': timeConvert,
    'stringToObjectTimeConvert': stringToObjectTimeConvert
};