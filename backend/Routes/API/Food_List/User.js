const express = require('express');
const routes = express.Router();

const userctl = require("../../../Controllers/API/Food_List/User_ctl")

routes.post("/register", userctl.registerUser)

routes.post("/login", userctl.loginUser)


module.exports = routes;