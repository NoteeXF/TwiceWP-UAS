const express = require("express");
const router = express.Router();
const controllerUser = require("../controller/userController");

let routes = (app) => {

  router.post("/api/user", controllerUser.createUser);
  router.get("/api/admin/user", controllerUser.getAllUser);

  app.use(router);
};

module.exports = routes;