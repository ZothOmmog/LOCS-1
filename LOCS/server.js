const express = require("express");
const app = express();
app.use(express.static('static'));

app.use(function(request, response, next) {

    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
    console.log(data);
    console.log(data + request.url + "\n");
    next();
});
app.get("/", function(request, response) {

    response.sendFile(__dirname + "/static/map.html");
});
app.get("/about", function(request, response) {

    response.send("<h1>О сайте</h1>");
});
app.get("/contact", function(request, response) {

    response.send("<h1>Контакты</h1>");
});

app.listen(3000);