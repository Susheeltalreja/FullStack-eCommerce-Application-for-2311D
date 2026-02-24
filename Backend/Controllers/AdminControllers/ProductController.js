

const ResponseForImage = async(req, res) => {
    try{
        if(!req.file){
            return res.json({
                success: false,
                message: "image not provided"
            })
        }
        return res.status(200).json({
            success: true,
            address: `ProductsImage/${req.file.filename}`
        })
    }catch(e){
        return res.status(500).json({
            success: false,
            message: 'Server issues'
        })
    }
}

module.exports = {ResponseForImage};