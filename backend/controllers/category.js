const Category = require('../models/category');
const Product = require('../models/product');

const categoryById =async (req,res,next,id) => {
    try {
        //console.log(id)
        const category = await Category.findById(id)
        if (!category) {
            throw new Error();
        }
        //console.log("out")
        req.category = category
        next()
    } catch (e) {
        res.status(500).send({ error: "Category does not exist" })
    }
}

const create =async (req,res) => {
    const category = new Category(req.body)
    try{
        await category.save()
        res.status(201).send({category})
    }catch(err){
        return res.status(400).send({
            error: err
        })
    }
}

const read = (req,res) => {
    return res.json(req.category)
}

const update = async (req,res) => {
    const category = req.category
    category.name=req.body.name
    try{
        await category.save()
        res.status(201).send({category})
    }catch(err){
        return res.status(400).send({
            error: err
        })
    }
}
const delet = async (req,res) => {
    const category = req.category
    try{
        await Product.deleteMany({
            category
        })
        await category.remove()
        res.status(201).send("category removed")
    }catch(err){
        return res.status(400).send({
            error: err
        })
    }
}

const readAll =async (req,res) => {
    try {
        const category = await Category.find();
        res.status(200).send(category)
    } catch (e) {
        console.log(e);
        res.status(402).send(e)
    }
}

module.exports={create,categoryById,read,update,delet,
    readAll
}