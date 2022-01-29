const Product = require('../models/product')
const sharp = require('sharp')

const addPhoto = async (req, res) => {
    try{
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
        // console.log(buffer)
        req.product.photo = buffer
        await req.product.save()    

        res.status(200).send(req.product);
        }catch(error){
            res.status(400).send({ error: error.message })
        }
}

const create = async (req, res) => {
    const product = new Product(req.body)
    try{
        await product.save()
        res.status(200).send(product);
    }catch(err){
        return res.status(400).send({
            error: err
        })
    }
}

const read =  (req, res) => {
    req.product.photo=undefined
    return res.json(req.product) 
}

const remove =  async(req, res) => {
    try {
        await req.product.remove()
        res.json("product removed")
    } catch (e) {
        res.status(500).json(e)
        console.log(e)
    }
}

const update = async (req, res) => {
    const updates = Object.keys(req.body)
    try {
        updates.forEach((update) => req.product[update] = req.body[update])
        await req.product.save()
        // console.log(req.product)
        return res.json(req.product)
    } catch (e) {
        return res.status(400).json(e)
    }
}

const list = async  (req,res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    //.select("-photo")
    try {
        const products = await Product.find()
            .select("-photo")
            .populate("category")
            .sort([[sortBy, order]])
            .limit(limit)
        res.status(200).send(products)
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }

    // .exec((err, products) => {
    //     if (err) {
    //         return res.status(400).json({ error: "products not found" })
    //     }

    //     res.status(200).send(products)
    // })
    
}

const listRelated = async (req,res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    try {
        //  console.log(req.product.category)
        const products = await Product.find({ _id:{$ne:req.product},category: req.product.category })
            //.select("-photo")
            .populate("category","name")
            .limit(limit)

        res.status(200).send(products)

    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: "products not found" })
    }

    // .exec((err, products) => {
    //     if (err) {
    //         return res.status(400).json({ error: "products not found" })
    //     }

    //     res.status(200).send(products)
    // })
}

const listCategories = (req,res) => {
    Product.distinct("category", {}, (err, product) => {
        if (err) {
            return res.status(400).json({
                error: "categories not found"
            })
        }
        res.json(product)
    })
}

const listBySearch =async (req, res) => {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 6;
    let skip = req.body.skip ?parseInt(req.body.skip):0;
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
    try{
        const data = await Product.find(findArgs)
        // Product.find(findArgs)
            .populate('category')
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
        res.json({
                size: data.length,
                data
            });
    }catch(err){
        return res.status(400).json({
            error: err
        });
    }
}

const photo = (req,res,next) =>{
    if (req.product.photo) {
        res.set('Content-type', req.product.photo.type)
        return res.send(req.product.photo)
    }
    else {
        return res.send({
            error: "error"
        })
    }
}

const listSearch = (req,res) => {
    const query = {}
    if(req.query.search) {
        query.name = {$regex: req.query.search, $options:'i' }
        if(req.query.category && req.query.category!='All'){
            query.category = req.query.category
        }
        Product.find(query,(err,products) => {
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            res.json(products)
        }).populate("category").select('-photo')
    }
}

const decreaseQuantity = (req,res,next) => {
    let bulkOps = req.body.order.products.map((item) => {
        return{
            updateOne:{
                filter:{_id:item._id},
                update:{$inc:{quantity:-item.count,sold:+item.count}}
            }
        }
    })

    Product.bulkWrite(bulkOps,{},(err,products) => {
        if(err){
            return res.status(400).json({
                error:'Could not update product'
            })
        }   
        next()
    })
}

module.exports={create,addPhoto,read,remove,update,list,listRelated,listCategories,listBySearch,photo,listSearch,decreaseQuantity}