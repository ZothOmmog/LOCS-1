const express = require("express");
const organizerController = require("../controllers/organizerController.js");
const organizerRouter = express.Router();



organizerRouter.post("/delete$", organizerController.delete); //удаление мероприятия



//лк
organizerRouter.get("/$", organizerController.personAccount); //аккаунт организатора (личный кабинет)

organizerRouter.get("/mySubs$", organizerController.mySubscribers); //подписчики организатора (личный кабинет)
organizerRouter.get("/mySubs/:limit/:offset", organizerController.mySubscribersLimit); //подписчики организатора (личный кабинет) странично

organizerRouter.get("/mySub$", organizerController.mySubscribeList); //список подписок  (личный кабинет пользователя) 
organizerRouter.get("/mySub/:limit/:offset", organizerController.mySubscribeListLimit); //список подписок странично (личный кабинет пользователя)


organizerRouter.get("/myEvents$", organizerController.myEventsList); //список мероприятий (личный кабинет)
organizerRouter.get("/myEvents/:limit/:offset$", organizerController.myEventsListLimit); //список мероприятий (личный кабинет) странично


organizerRouter.post("/registration", organizerController.registration); //регистрация организатора

//


organizerRouter.post("/account$", organizerController.organizerAccount); //аккаунт организатора по id

organizerRouter.post("/search$", organizerController.search); //поиск организаторов
organizerRouter.post("/search/:limit/:offset", organizerController.searchLimit); //поиск организаторов странично




organizerRouter.post("/subs$", organizerController.subscribers); //подписчики организатора по id
organizerRouter.post("/subs/:limit/:offset", organizerController.subscribersLimit); //подписчики организатора  по id странично


organizerRouter.post("/subscribe$", organizerController.subscribe); //подписаться

organizerRouter.post("/unSubscribe$", organizerController.unSubscribe); //отписаться



organizerRouter.post("/subUser$", organizerController.subscribeUserList); //список подписок по id
organizerRouter.post("/subUser/:limit/:offset", organizerController.subscribeUserListLimit); //список подписок по id странично


organizerRouter.post("/events$", organizerController.eventsList); //список мероприятий
organizerRouter.post("/events/:limit/:offset", organizerController.eventsListLimit); //список мероприятий странично

module.exports = organizerRouter;