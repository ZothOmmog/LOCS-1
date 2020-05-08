const express = require("express");
const eventController = require("../controllers/eventController.js");
const eventRouter = express.Router();

eventRouter.use("/create$", eventController.create);

eventRouter.get("/list/:limit/:offset", eventController.shortList);

eventRouter.get("/delete/:idEvent", eventController.delete);

module.exports = eventRouter;