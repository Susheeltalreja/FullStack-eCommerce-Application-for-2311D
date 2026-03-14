const CartModel = require("../../Models/UserModels/CartModel");
const UserModel = require("../../Models/AuthModel");
const ProductModel = require("../../Models/AdminModels/ProductModels");

const AddToCart = async (req, res) => {
    const {UserId, ProductId, Quantity} = req.body;
    try {
        if(!UserId || !ProductId || !Quantity){
            return res.json({
                success: false,
                message: "Invalid data provided"
            })
        }
        const FindUser = await UserModel.findById(UserId);
        if(!FindUser){
            return res.json({
                success: false,
                message: "User not found"
            })
        }
        const FindProduct = await ProductModel.findById(ProductId);
        if(!FindProduct){
            return res.json({
                success: false,
                message: "Product not found"
            })
        }

        const FindCart = await CartModel.findOne({UserId});
        if(FindCart){
            const FindIndex = FindCart.Products.findIndex(i => i.ProductId.toString() === ProductId);
            if(FindIndex > -1){
                FindCart.Products[FindIndex].Quantity += Quantity
            }else{
                FindCart.Products.push({ProductId, Quantity})
            }
            await FindCart.save();
        }else{
            const NewCart = new CartModel({
                UserId,
                Products: [{ProductId, Quantity}]
            })
            await NewCart.save()
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}

module.exports = {AddToCart};