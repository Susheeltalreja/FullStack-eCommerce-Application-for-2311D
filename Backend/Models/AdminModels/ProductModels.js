

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        required: true
    },
    ProductImage: {
        type: String,
        required: true
    },
    ProductPrice: {
        type: Number,
        required: true
    },
    ProductSalePrice: {
        type: Number
    },
    ProductQuantity: {
        type: Number,
        default: 0
    },
    ProductCategory: {
        type: String,
        required: true
    },
    ProductBrand: {
        type: String,
        required: true
    },
    ProductDesc: {
        type: String
    },
}, {timestamps: true})

const ProductModel = mongoose.model("products", ProductSchema)
module.exports = ProductModel;