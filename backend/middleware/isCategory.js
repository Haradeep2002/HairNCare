const Category = require('../models/category')
//express middleware
const isCategory = async (req, res, next) => {
    try {
        console.log("in")
        if(req.body.category){
            let id = req.body.category;
            //console.log(id)
            const category = await Category.findOne({ _id: id })
            if (!category) {
                throw new Error("Please add category first!");
            }
            //console.log("out")
            req.category = category 
        }
        next()
    } catch (e) {
        console.log(e)
        res.status(500).send({ error: e.message })
    }
}
module.exports = isCategory;