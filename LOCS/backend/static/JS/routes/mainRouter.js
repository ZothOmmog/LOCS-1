const express = require("express");
const mainController = require("../controllers/mainController.js");
const mainRouter = express.Router();

mainRouter.use("/$", mainController.mainPage);

module.exports = mainRouter;