const path = require('path')
let pgp = require("pg-promise")( /*options*/ );


exports.create = function(request, response) {
    if (request.session.user_id_log != null & request.session.user_role == 2) {
        response.sendFile(path.resolve('static/html/event_form.html'))
    } else {
        //тут помжно добавить ссылку на форму, чтобы user стал organizer
        console.log("Переход на страницу login");
        response.redirect("/user/login");
    }
};