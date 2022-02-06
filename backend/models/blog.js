const mongoose = require('mongoose')
const validator = require('validator')
const blog = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error('Name cannot be empty')
            }
        }
    }
},{
    timestamps:true
})

const Blog = mongoose.model('Blog', blog)

module.exports = Blog