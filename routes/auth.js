const express = require("express");
const router = express.Router();
const controllerAuth = require("../controller/authController");


let routes = (app) => {

  router.post("/api/auth", controllerAuth.auth);
  router.post("/api/auth", controllerAuth.validate);
  

  app.use(router);
};

module.exports = routes;