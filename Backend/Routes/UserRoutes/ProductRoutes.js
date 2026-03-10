const express = require("express");

const {FetchProductForUser} = require("../../Controllers/UserControllers/ProductController");

const route = express.Router();

route.get("/get-products", FetchProductForUser);

module.exports = route;