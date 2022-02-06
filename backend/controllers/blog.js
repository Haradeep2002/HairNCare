const Blog = require('../models/blog')
const addProduct = async (req, res) => {
    const blog = new Blog(req.body)
    try{
        await blog.save()
        res.status(200).send(blog);
    }catch(err){
        return res.status(400).send({
            error: err
        })
    }
}


const getProductById = async (req,res) => {
    try {
        const blog = await Blog.find()
        console.log(blog)
        res.status(200).send(blog)

    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
}

module.exports={addProduct,getProductById}