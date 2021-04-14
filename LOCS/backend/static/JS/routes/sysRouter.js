const path = require('path')
const express = require("express");
const sysController = require("../controllers/sysController.js");
const sysRouter = express.Router();
const multer = require("multer");

const upload = multer({
    fileFilter: function(req, file, callback) {
        var ext = path.extname(file.originalname);
        var size = file.size;
        if ((ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') || size > 6300000) {
            file.mimetype = -1;
            callback(null, false);
        }
        callback(null, true);
    }
});

sysRouter.post("/PhotoAcc", upload.single("file"), sysController.uploadPhotoAcc); // для загрузки фото личного профиля, имя файла в запросе - file

sysRouter.post("/PhotoOrg", upload.single("file"), sysController.uploadPhotoOrg); // для загрузки фото профиля организатора, имя файла в запросе - file

sysRouter.post("/PhotoEvent/:event", upload.single("file"), sysController.uploadPhotoEvent); // для загрузки фото события, имя файла в запросе - file

sysRouter.get("/accept/:hash", sysController.acceptAccount); //функция для подтв почты/аккаунта личного кабинета

sysRouter.get("/forwardMail", sysController.forwardMail); //функция для повторной отправки письма с ссылкой для подтв.

//востановление/изменение пароля

module.exports = sysRouter;