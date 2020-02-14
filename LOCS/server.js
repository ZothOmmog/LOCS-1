const express = require("express");
const app = express();
app.use(express.static('static'));
const bodyParser = require("body-parser");
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({ extended: false });

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
app.get("/", function(request, response) {

    response.sendFile(__dirname + "/static/map.html");
});
app.get("/create_events", function(request, response) {

    response.sendFile(__dirname + "/static/event_form.html");
});
app.post("/create_events/new", urlencodedParser, function(request, response) {

    response.redirect("..");
    console.log(request.body.event_name);
    console.log(request.body.event_tag);
    console.log(request.body.evet_info);
});

app.listen(3000);