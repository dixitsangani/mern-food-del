const express = require('express');
const routes = express.Router();

const Food_List_ctl = require("../../../Controllers/API/Food_List/Food_List_ctl");

const Food_List_Model=require("../../../Models/Food_List/Food_List_Model")

// Define the route for adding a food list
routes.post('/addfoodlist',Food_List_Model.uploadImage, Food_List_ctl.Add_Food_List);

routes.get("/viewfoodlist",Food_List_ctl.View_Food_List)

routes.delete("/deletefoolist/:id",Food_List_ctl.Delete_Food_List)

module.exports = routes;
