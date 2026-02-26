const express = require('express');

const route = express.Router();

const {ResponseForImage, AddProduct} = require("../../Controllers/AdminControllers/ProductController");

const ProductUpload = require("../../Multer/ProductConfig");

route.post("/upload", ProductUpload.single("ProductImage"), ResponseForImage)
route.post("/add-product", AddProduct);
module.exports = route