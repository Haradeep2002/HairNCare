const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength:32,
        unique:true
    },
},{
    timestamps:true,
    toJSON: { virtuals: true }
})

categorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category'
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category