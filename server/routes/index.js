const express = require("express");
const router = express.Router();
const { getImage,download,singleUploadFile,imageSearch, getImageById }  = require("../controller/imageController");
const controllerUser = require("../controller/userController");
const {upload} = require("../middleware/uploud");
const multer = require('multer');
const auth = require("../middleware/auth")
const authz = require("../middleware/admin")



let routes = (app) => {
  
  router.get("/files", getImage);
  router.get("/files/:id", getImageById);
  router.get("/files/download/:id", download);
  router.post("/api/upload", upload.single("file"), singleUploadFile);
  router.get("/api/", imageSearch);
  app.use(router);
};

module.exports = routes;
  


