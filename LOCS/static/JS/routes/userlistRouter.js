const express = require("express");
const userlistController = require("../controllers/userlistController.js");
const userlistRouter = express.Router();

userlistRouter.use("/$", userlistController.acc);
userlistRouter.post("/registration/postreg$", userlistController.postRegistration);
userlistRouter.use("/registration$", userlistController.registration);

userlistRouter.use("/login$", userlistController.login);
userlistRouter.use("/login/postlogin$", userlistController.postLogin);

userlistRouter.use("/logout$", userlistController.logout);


module.exports = userlistRouter;