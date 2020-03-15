let User = require("../models/userlist.js");
const path = require('path')
    //const { body, validationResult } = require('express-validator');
    //const { sanitizeBody } = require('express-validator');

exports.registration = function(request, response) {
    response.sendFile(path.resolve('static/html/registration.html'))
};
exports.postRegistration = function(request, response) {
    console.log("$$$$");
    console.log(request.body.mail);
    console.log(request.body.nick);
    console.log(request.body.pas);
    console.log(request.body.acpas);
    response.redirect("/user");
};

exports.login = function(request, response) {
    response.sendFile(path.resolve('static/html/login.html'))
};

exports.postLogin = function(request, response) {
    console.log("$$$$");
    console.log(request.body.mail);
    console.log(request.body.password);
    response.redirect("/user");
};