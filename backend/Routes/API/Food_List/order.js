const express = require("express")
const routes = express.Router();
const orderctl = require("../../../Controllers/API/Food_List/Order_ctl")
const authMiddleWare = require("../../../Middlewere/auth");


routes.post("/placeorder",authMiddleWare,orderctl.placeOrder)


routes.post('/userorder',authMiddleWare, orderctl.userOrder);
routes.get('/adminlist',orderctl.listOrder)
routes.post("/status", orderctl.UpdateStatus);



module.exports = routes;