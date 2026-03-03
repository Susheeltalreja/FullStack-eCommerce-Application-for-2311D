
const ProductModel = require("../../Models/AdminModels/ProductModels");

const fs = require("fs");
const path = require("path");

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
    const { ProductImage, ProductName, ProductPrice, ProductSalePrice, ProductQuantity, ProductBrand, ProductCategory, ProductDesc } = req.body;
    try {
        if (!ProductImage || !ProductName || !ProductPrice || !ProductQuantity || !ProductBrand || !ProductCategory) {
            return res.json({
                success: false,
                message: "All input fields are required"
            })
        }
        const price = Number(ProductPrice);
        const sprice = Number(ProductSalePrice);
        if (ProductSalePrice && sprice >= price) {
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

const FetchProducts = async (req, res) => {
    try {
        const AllProducts = await ProductModel.find();
        return res.status(200).json({
            success: true,
            data: AllProducts
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Server issues'
        })
    }
}

const UpdateProducts = async (req, res) => {
    const { ProductImage, ProductName, ProductPrice, ProductSalePrice, ProductQuantity, ProductBrand, ProductCategory, ProductDesc } = req.body;
    try {
        const ProductId = req.params.id;
        if (!ProductImage || !ProductName || !ProductPrice || !ProductQuantity || !ProductBrand || !ProductCategory) {
            return res.json({
                success: false,
                message: "All input fields are required"
            })
        }
        const ProductData = await ProductModel.findOne({ _id: ProductId });

        if (!ProductData) {
            return res.json({
                success: false,
                message: "No product found"
            })
        }

        if (ProductImage !== ProductData?.ProductImage) {
            const address = path.join("Uploads", ProductData?.ProductImage);
            if (fs.existsSync(address)) {
                fs.unlinkSync(address)
            }
        }

        const UpdatedProduct = await ProductModel.findByIdAndUpdate(ProductId, req.body);
        return res.status(200).json({
            success: true,
            message: "Product updated successfully"
        })

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Server issues'
        })
    }
}

const DeleteProducts = async (req, res) => {
    try {
        const ProductId = req.params.id;
        const FindProduct = await ProductModel.findOne({ _id: ProductId });
        if (!FindProduct) {
            return res.json({
                success: false,
                message: "No product found"
            })
        }

        const Address = path.join("Uploads", FindProduct.ProductImage);
        if(fs.existsSync(Address)){
            fs.unlinkSync(Address)
        }

        await ProductModel.findByIdAndDelete(ProductId);
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: 'Server issues'
        })
    }
}
module.exports = { ResponseForImage, AddProduct, FetchProducts, UpdateProducts, DeleteProducts };