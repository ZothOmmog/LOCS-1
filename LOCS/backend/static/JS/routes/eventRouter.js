const express = require("express");
const eventController = require("../controllers/eventController.js");
const eventRouter = express.Router();


eventRouter.get("/list/:limit/:offset", eventController.shortList); //укороченный список для главной страницы

eventRouter.post("/info", eventController.event); // конкретный ивент

eventRouter.get("/tag/:id", eventController.tagById); //тег по id

eventRouter.get("/tag$", eventController.tag); //все теги 
eventRouter.post("/tag$", eventController.addTag); //добавить тег

eventRouter.put("/tag/:id", eventController.acceptTag); //подтвердить тег (только организатор)
eventRouter.delete("/tag/:id", eventController.deleteTag); //удалить тег (только организатор)

eventRouter.post("/search/:limit/:offset", eventController.search);
module.exports = eventRouter;