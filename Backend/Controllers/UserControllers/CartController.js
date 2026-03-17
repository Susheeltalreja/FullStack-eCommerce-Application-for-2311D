const CartModel = require("../../Models/UserModels/CartModel");
const UserModel = require("../../Models/AuthModel");
const ProductModel = require("../../Models/AdminModels/ProductModels");

const AddToCart = async (req, res) => {
    const { UserId, ProductId, Quantity } = req.body;
    try {
        if (!UserId || !ProductId || !Quantity) {
            return res.json({
                success: false,
                message: "Invalid data provided"
            })
        }
        const FindUser = await UserModel.findById(UserId);
        if (!FindUser) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }
        const FindProduct = await ProductModel.findById(ProductId);
        if (!FindProduct) {
            return res.json({
                success: false,
                message: "Product not found"
            })
        }

        const FindCart = await CartModel.findOne({ UserId });
        if (FindCart) {
            const FindIndex = FindCart.Products.findIndex(i => i.ProductId.toString() === ProductId);
            if (FindIndex > -1) {
                FindCart.Products[FindIndex].Quantity += Quantity
            } else {
                FindCart.Products.push({ ProductId, Quantity })
            }
            await FindCart.save();
        } else {
            const NewCart = new CartModel({
                UserId,
                Products: [{ ProductId, Quantity }]
            })
            await NewCart.save()
        }
        return res.status(200).json({
            success: true,
            message: "Product add to cart successfuly"
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}

const FetchCart = async (req, res) => {
    try {
        const UserId = req.params.id;
        const CartDetails = await CartModel.findOne({ UserId }).populate("Products.ProductId");
        return res.status(200).json({
            success: true,
            Data: CartDetails
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}



const IncreaseQuantity = async (req, res) => {
    const { UserId, ProductId } = req.body;
    try {
        const FindCart = await CartModel.findOne({ UserId });
        if (!FindCart) {
            return res.json({
                success: false,
                message: "Cart not found"
            })
        }
        const FindIndex = FindCart.Products.findIndex(item => item.ProductId.toString() === ProductId);
        if (FindIndex > -1) {
            FindCart.Products[FindIndex].Quantity += 1;
        }
        await FindCart.save();
        return res.status(200).json({
            success: true
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}

const DecreaseQuantity = async (req, res) => {
    const { UserId, ProductId } = req.body;
    try {
        const FindCart = await CartModel.findOne({ UserId });
        if (!FindCart) {
            return res.json({
                success: false,
                message: "Cart not found"
            })
        }
        const FindIndex = FindCart.Products.findIndex(item => item.ProductId.toString() === ProductId);
        if (FindIndex > -1) {
            if (FindCart.Products[FindIndex].Quantity > 1) {
                FindCart.Products[FindIndex].Quantity -= 1;
            }
        }
        await FindCart.save();
        return res.status(200).json({
            success: true
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}
const RemoveItems = async (req, res) => {
    const { UserId, ProductId } = req.body;
    try {
        const FindCart = await CartModel.findOne({ UserId });
        if (!FindCart) {
            return res.json({
                success: false,
                message: "Cart not found"
            })
        }
        const FindIndex = FindCart.Products.findIndex(item => item.ProductId.toString() === ProductId);
        if (FindIndex > -1) {
            FindCart.Products.splice(FindIndex, 1);
        }
        await FindCart.save();
        return res.status(200).json({
            success: true
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}


module.exports = { AddToCart, FetchCart, IncreaseQuantity, DecreaseQuantity, RemoveItems  };