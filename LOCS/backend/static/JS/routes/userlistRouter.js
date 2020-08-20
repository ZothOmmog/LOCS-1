const express = require("express");
const userlistController = require("../controllers/userlistController.js");
const userlistRouter = express.Router();

userlistRouter.use("/$", userlistController.acc);

userlistRouter.post("/registration$", userlistController.postRegistration); //регистрация

userlistRouter.use("/login$", userlistController.postLogin); //вход

userlistRouter.use("/logout$", userlistController.logout); //выход

//userlistRouter.post("/SearchUser$", userlistController.searchUser); //поиск по нику
userlistRouter.post("/SearchUser/:limit/:offset", userlistController.searchUserWithLimit); //поиск по нику страничный вывод

//userlistRouter.get("/Friends", userlistController.friendList); //друзья
userlistRouter.get("/Friends/:limit/:offset", userlistController.friendListWithLimit); //друзья  страничный вывод


//userlistRouter.get("/FriendRequests$", userlistController.friendRequests); //Список входящих заявок пользователя 
userlistRouter.get("/FriendRequests/:limit/:offset", userlistController.friendRequestsWithLimit); //Список входящих заявок пользователя  страничный вывод

//userlistRouter.get("/FriendRequestsSent$", userlistController.friendRequestsSent); //Список отправленных заявок пользователя 
userlistRouter.get("/FriendRequestsSent/:limit/:offset", userlistController.friendRequestsWithLimitSentWithLimit); //Список отправленных заявок пользователя  страничный вывод

userlistRouter.post("/AddFriend$", userlistController.addfriend); //добавление в друзья 

userlistRouter.post("/AcceptFriend$", userlistController.acceptfriend); //подтверждение заявки в друзья 

userlistRouter.post("/DeleteFriend$", userlistController.deletefriend); //удаление из друзей

userlistRouter.post("/UserAccount$", userlistController.UserAccount); //аккаунт другого человека 

module.exports = userlistRouter;