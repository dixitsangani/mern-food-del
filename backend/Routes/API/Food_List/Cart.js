const express = require('express');
const routes = express.Router();

const authMiddleWare = require("../../../Middlewere/auth");
const CartCtl = require("../../../Controllers/API/Food_List/Cart_ctl");

routes.post("/addtocart", authMiddleWare, CartCtl.addToCart);
routes.delete(`/removetocart/:itemId`, authMiddleWare, CartCtl.removeToCart);
routes.post("/gettocart", authMiddleWare, CartCtl.getToCart);

module.exports = routes;
