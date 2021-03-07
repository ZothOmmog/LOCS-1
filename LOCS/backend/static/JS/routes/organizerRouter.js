const express = require("express");
const organizerController = require("../controllers/organizerController.js");
const organizerRouter = express.Router();

organizerRouter.post("/delete$", organizerController.delete); //удаление мероприятия

organizerRouter.get("/$", organizerController.personAccount); //аккаунт организатора (личный кабинет)

organizerRouter.get("/mySubs/:limit/:offset", organizerController.mySubscribersLimit); //подписчики организатора (личный кабинет) странично 

organizerRouter.post("/changeAccount$", organizerController.changeOrgAcc); //изменение даных в личном кабинете

organizerRouter.get("/myEvents/:limit/:offset$", organizerController.myEventsListLimit); //список мероприятий (личный кабинет) странично 

organizerRouter.post("/registration", organizerController.registration); //регистрация организатора

organizerRouter.post("/account$", organizerController.organizerAccount); //аккаунт организатора по id

organizerRouter.post("/search/:limit/:offset", organizerController.searchLimit); //поиск организаторов странично 

organizerRouter.post("/subs/:limit/:offset", organizerController.subscribersLimit); //подписчики организатора  по id странично 

organizerRouter.post("/subscribe$", organizerController.subscribe); //подписаться

organizerRouter.post("/unSubscribe$", organizerController.unSubscribe); //отписаться

organizerRouter.post("/subUser/:limit/:offset", organizerController.subscribeUserListLimit); //список подписок по id странично 

organizerRouter.post("/events/:limit/:offset", organizerController.eventsListLimit); //список мероприятий странично 

organizerRouter.post("/createEvent$", organizerController.createEvent); //создание события

organizerRouter.post("/changeEvent$", organizerController.changeEvent); //изменение события

organizerRouter.post("/searchAddress$", organizerController.searchAddress); //поиск id адреса 

organizerRouter.post("/visitEvent$", organizerController.visitEvent); //пользователь отмечает, что он идет на событие 

organizerRouter.delete("/visitEvent$", organizerController.notvisitEvent); //пользователь отмечает, что он не идет на событие 

module.exports = organizerRouter;