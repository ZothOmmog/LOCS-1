const express = require("express");
const eventController = require("../controllers/eventController.js");
const eventRouter = express.Router();


eventRouter.get("/list/:limit/:offset", eventController.shortList);

eventRouter.post("/info", eventController.event);

eventRouter.get("/tags/:limit/:offset", eventController.tagsLim);

eventRouter.get("/tags$", eventController.tags);


eventRouter.post("/search/:limit/:offset", eventController.search);
module.exports = eventRouter;