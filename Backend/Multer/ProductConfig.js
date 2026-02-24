

const multer = require("multer");

const ProductStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Uploads/ProductsImage")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname)
    }
})

const ProductUpload = multer({storage: ProductStorage})

module.exports = ProductUpload;