const express = require("express");
const adminRouterController = require("../controllers/adminRouterController.js");
const adminRouter = express.Router();




//теги
adminRouter.put("/accepttag/:id", adminRouterController.acceptTag); //подтвердить тег 
adminRouter.delete("/tag/:id", adminRouterController.deleteTag); //удалить тег 
adminRouter.get("/tag$", adminRouterController.getTag); //все теги
adminRouter.post("/tag$", adminRouterController.addTag); //добавить тег
adminRouter.put("/tag/:id", adminRouterController.changeTag); //изменить тег 


//Город
adminRouter.get("/city$", adminRouterController.getCity); //все город
adminRouter.post("/city$", adminRouterController.createCity); //добавить город
adminRouter.put("/city/:id", adminRouterController.changeCity); //изменить город 
adminRouter.delete("/city/:id", adminRouterController.deleteCity); //удалить город 

//район
adminRouter.get("/district$", adminRouterController.getDistrict); //все районы
adminRouter.post("/district$", adminRouterController.createDistrict); //добавить район
adminRouter.put("/district/:id", adminRouterController.changeDistrict); //изменить район 
adminRouter.delete("/district/:id", adminRouterController.deleteDistrict); //удалить район 

//адрес
adminRouter.get("/address/:limit/:offset$", adminRouterController.getAddress); //все адреса
adminRouter.post("/address$", adminRouterController.createAddress); //добавить адрес
adminRouter.put("/address/:id", adminRouterController.changeAddress); //изменить адрес 
adminRouter.delete("/address/:id", adminRouterController.deleteAddress); //удалить адрес 

//организатор
adminRouter.get("/organization/:limit/:offset$", adminRouterController.getOrganization); //все организаторы
adminRouter.post("/organization$", adminRouterController.banOrganization); //забанить
adminRouter.put("/organization$", adminRouterController.unbanOrganization); //разбанить


// забанить, разбанить юзера 
//удалить, забанить, разбанить событие

module.exports = adminRouter;