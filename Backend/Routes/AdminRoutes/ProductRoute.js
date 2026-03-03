const express = require('express');

const route = express.Router();

const {ResponseForImage, AddProduct, FetchProducts, UpdateProducts, DeleteProducts} = require("../../Controllers/AdminControllers/ProductController");

const ProductUpload = require("../../Multer/ProductConfig");

route.post("/upload", ProductUpload.single("ProductImage"), ResponseForImage)
route.post("/add-product", AddProduct);
route.get("/fetch-product", FetchProducts)
route.put("/update-product/:id", UpdateProducts);
route.delete("/delete-product/:id", DeleteProducts)
module.exports = route