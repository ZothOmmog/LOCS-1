const path = require('path')
const express = require("express");
const sysController = require("../controllers/sysController.js");
const sysRouter = express.Router();
const multer = require("multer");

const upload = multer({
    dest: "../uploads/profile",
    fileFilter: function(req, file, callback) {
        var ext = path.extname(file.originalname);
        var size = file.size;
        if ((ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') || size > 6300000) {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
});
sysRouter.post("/uploadPhoto/:type", upload.single("file"), sysController.uploadPhoto); // для загрузки фото (type - для определения типа загрузки фото), имя файла file



module.exports = sysRouter;