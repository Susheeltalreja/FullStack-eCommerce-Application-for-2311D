
const ProductModel = require("../../Models/AdminModels/ProductModels");

const ResponseForImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.json({
                success: false,
                message: "image not provided"
            })
        }
        return res.status(200).json({
            success: true,
            address: `ProductsImage/${req.file.filename}`
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Server issues'
        })
    }
}

const AddProduct = async (req, res) => {
    const {ProductImage, ProductName, ProductPrice, ProductSalePrice, ProductQuantity, ProductBrand, ProductCategory, ProductDesc} = req.body;
    try {
        if(!ProductImage || !ProductName || !ProductPrice || !ProductQuantity || !ProductBrand || !ProductCategory){
            return res.json({
                success: false,
                message: "All input fields are required"
            })
        }
        const price = Number(ProductPrice);
        const sprice = Number(ProductSalePrice);
        if(ProductSalePrice && sprice >= price){
            return res.json({
                success: false,
                message: "Sale price should be lesser than price"
            })
        }

        const NewProduct = ProductModel({
            ProductImage, ProductName, ProductPrice, ProductSalePrice, ProductQuantity, ProductBrand, ProductCategory, ProductDesc
        })
        await NewProduct.save();
        return res.status(200).json({
            success: true,
            message: "Product Uploaded successfully"
        })

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Server issues'
        })
    }
}

module.exports = { ResponseForImage , AddProduct};