const express = require("express");

const app = express();
const session = require('express-session');
const userlistRouter = require("./static/JS/routes/userlistRouter.js");
const mainRouter = require("./static/JS/routes/mainRouter.js");
const eventRouter = require("./static/JS/routes/eventRouter.js");

let pgp = require("pg-promise")( /*options*/ );
let db = pgp("postgres://postgres:123@localhost:5432/LocsBD_Dev");

app.use(express.static('static'));
//module.exports = db;




app.use(function(request, response, next) {
    /*
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
    console.log(data);
    console.log(data + request.url + "\n");*/

    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    key: 'whatisname',
    secret: 'xiaomitopzasvoidengi1488'
}))

app.use("/event", eventRouter);
app.use("/user", userlistRouter);
app.use("/$", mainRouter);





app.use(function(req, res, next) {
    res.status(404).send("Not Found");

});
app.listen(3000);