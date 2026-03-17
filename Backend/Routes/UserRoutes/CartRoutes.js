const express = require("express");

const {AddToCart, FetchCart, IncreaseQuantity, DecreaseQuantity, RemoveItems} = require("../../Controllers/UserControllers/CartController");

const route = express.Router();

route.post("/add", AddToCart);

route.get("/get-cart/:id", FetchCart);
route.put("/increase", IncreaseQuantity);
route.put("/decrease", DecreaseQuantity);
route.delete("/remove", RemoveItems);

module.exports = route;