const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength:32,
    },
    description: {
        type: String,
        required: true,
        maxlength:2000
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    //this field is real
    category: {
        //ObjectID
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //reference of other collection to create a link between both 
        ref: 'Category'
    },
    quantity:{
        required: true,
        type:Number,
    },
    photo: {
        type: Buffer
    },
    shipping:{
        required:true,
        type:Boolean
    },
    sold:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product