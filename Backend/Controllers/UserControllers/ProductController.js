

const ProductModel = require("../../Models/AdminModels/ProductModels");

const FetchProductForUser = async (req, res) => {
    const { Brand = [], Category = [], SortBy = "a to z" } = req.query;
    try {

        let filters = {};
        if (Category.length > 0) {
            filters.ProductCategory = { $in: Category.split(",") }
        }

        if (Brand.length > 0) {
            filters.ProductBrand = { $in: Brand.split(",") }
        }

        let sort = {};

        switch (SortBy) {
            case "a to z":
                sort.ProductName = 1
                break;
            case "z to a":
                sort.ProductName = -1
                break;
            case "Price low to high":
                sort.ProductPrice = 1;
                break;
            case "Price high to low":
                sort.ProductPrice = -1;
                break;
        }

        const Products = await ProductModel.find(filters).sort(sort);
        return res.status(200).json({
            success: true,
            Data: Products
        })

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}

module.exports = {FetchProductForUser}