//router.param("id",isProduct)
const Product = require('../models/product')
const isProduct = async (req, res, next) => {
    try {
        const product = await Product.findOne({ _id: req.params.id }).populate("category")

        if (!product) {
            throw new Error("Please add product first!");
        }
        req.product = product
        next()
    } catch (e) {
        console.log("heer")
        res.status(500).send(e)
    }
}
module.exports = isProduct;