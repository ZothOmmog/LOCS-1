const express = require("express");
const adminRouterController = require("../controllers/adminRouterController.js");
const adminRouter = express.Router();

//теги
adminRouter.put("/accepttag/:id", adminRouterController.acceptTags); //подтвердить тег 
adminRouter.delete("/tag/:id", adminRouterController.deleteTag); //удалить тег 
adminRouter.get("/tag/:limit/:offset$", adminRouterController.getTag); //все теги
adminRouter.post("/tag$", adminRouterController.addTag); //добавить тег
adminRouter.put("/tag/:id", adminRouterController.changeTag); //изменить тег 

//Город
adminRouter.get("/city/:limit/:offset$", adminRouterController.getCity); //все города
adminRouter.post("/city$", adminRouterController.createCity); //добавить город
adminRouter.put("/city/:id", adminRouterController.changeCity); //изменить город 
adminRouter.delete("/city/:id", adminRouterController.deleteCity); //удалить город 

//адрес
adminRouter.get("/address/:limit/:offset$", adminRouterController.getAddress); //все адреса
adminRouter.post("/address$", adminRouterController.createAddress); //добавить адрес
adminRouter.put("/address/:id", adminRouterController.changeAddress); //изменить адрес 
adminRouter.delete("/address/:id", adminRouterController.deleteAddress); //удалить адрес 

//юзер/организаторы 
adminRouter.get("/organization/:limit/:offset$", adminRouterController.getOrganization); //все организаторы
adminRouter.get("/users/:limit/:offset$", adminRouterController.getUsers); //все юзеры
adminRouter.post("/ban$", adminRouterController.banUser); //забанить + добавление причины и удаление всех ивентов
adminRouter.post("/unban$", adminRouterController.unbanUser); //разбанить

//удалить, забанить, разбанить событие
adminRouter.get("/event/:limit/:offset$", adminRouterController.getEvents); //все события
adminRouter.post("/event$", adminRouterController.publishEvent); //опубликовать 
adminRouter.put("/event$", adminRouterController.unpublishEvent); //отмена публикации
adminRouter.delete("/event$", adminRouterController.deleteEvent); //удалить 

module.exports = adminRouter;