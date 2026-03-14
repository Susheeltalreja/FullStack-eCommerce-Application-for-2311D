const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Auth"
    },
    Products: [
        {
            ProductId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "products"
            },
            Quantity: {
                type: Number,
                min: 1
            }
        }
    ]
})

const CartModel = mongoose.model("Cart", CartSchema);
module.exports = CartModel;