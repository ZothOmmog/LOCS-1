const express = require("express");
const config = require('./static/JS/configs/config.json');
const app = express();
const session = require('express-session');

const userlistRouter = require("./static/JS/routes/userlistRouter.js");
const eventRouter = require("./static/JS/routes/eventRouter.js");
const organizerRouter = require("./static/JS/routes/organizerRouter.js");
const sysRouter = require("./static/JS/routes/sysRouter.js");

const cookieParser = require('cookie-parser');
const cors = require('cors');

const corsOptions = {
    credentials: true,
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};


app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static('static'));

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
    //, { maxAge: config.cookieLive }

app.use("/event", eventRouter);
app.use("/org", organizerRouter);
app.use("/user", userlistRouter);
app.use("/sys", sysRouter);





app.use(function(req, res, next) {
    res.status(404).send("Not Found");

});

app.listen(4000);