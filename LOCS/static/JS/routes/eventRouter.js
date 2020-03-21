const express = require("express");
const eventController = require("../controllers/eventController.js");
const eventRouter = express.Router();

eventRouter.use("/create$", eventController.create);

module.exports = eventRouter;