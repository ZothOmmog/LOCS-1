const express = require("express");
const userlistController = require("../controllers/userlistController.js");
const userlistRouter = express.Router();


userlistRouter.post("/registration/postreg$", userlistController.postRegistration);
userlistRouter.use("/registration$", userlistController.registration);



module.exports = userlistRouter;