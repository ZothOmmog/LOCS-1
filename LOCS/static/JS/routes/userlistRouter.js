const express = require("express");
const userlistController = require("../controllers/userlistController.js");
const userlistRouter = express.Router();

userlistRouter.use("/$", userlistController.acc);

userlistRouter.post("/registration/postreg$", userlistController.postRegistration); //регистрация

userlistRouter.use("/login/postlogin$", userlistController.postLogin); //вход

userlistRouter.use("/logout$", userlistController.logout); //выход

userlistRouter.post("/SearchUser$", userlistController.searchUser); //поиск по нику
userlistRouter.post("/SearchUser/:limit/:offset", userlistController.searchUserWithLimit); //поиск по нику страничный вывод

userlistRouter.get("/Friends", userlistController.friendList); //друзья
userlistRouter.get("/Friends/:limit/:offset", userlistController.friendListWithLimit); //друзья  страничный вывод


userlistRouter.get("/FriendRequests$", userlistController.friendRequests); //Список входящих заявок пользователя 
userlistRouter.get("/FriendRequests/:limit/:offset", userlistController.friendRequestsWithLimit); //Список входящих заявок пользователя  страничный вывод


module.exports = userlistRouter;