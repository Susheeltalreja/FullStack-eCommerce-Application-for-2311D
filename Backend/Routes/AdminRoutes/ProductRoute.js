const express = require('express');

const route = express.Router();

const {ResponseForImage} = require("../../Controllers/AdminControllers/ProductController");
const ProductUpload = require("../../Multer/ProductConfig");

route.post("/upload", ProductUpload.single("ProductImage"), ResponseForImage)

module.exports = route