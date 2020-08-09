const express = require("express");
const eventController = require("../controllers/eventController.js");
const eventRouter = express.Router();


eventRouter.get("/list/:limit/:offset", eventController.shortList); //укороченный список для главной страницы

eventRouter.post("/info", eventController.event); // конкретный ивент

eventRouter.get("/tags/:id", eventController.tagById); //тег по id

eventRouter.get("/tags$", eventController.tags); //все теги 


eventRouter.post("/search/:limit/:offset", eventController.search);
module.exports = eventRouter;