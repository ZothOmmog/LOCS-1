const path = require('path')


exports.mainPage = function(request, response) {
    response.sendFile(path.resolve('static/html/map.html'))
};