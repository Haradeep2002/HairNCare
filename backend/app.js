const morgan = require('morgan')
// const cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const braintreeRoutes = require('./routes/braintree')
const orderRoutes = require('./routes/order')
const bl = require('./routes/blog')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const app = express()

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
}).then(() => console.log('Database connected'))


app.use(morgan("dev"))

app.use(cors())

app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb'}))
app.use(express.json())
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', braintreeRoutes)
app.use('/api', orderRoutes)
app.use('/api', bl)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})




// .env
// PORT=8000
// DATABASE=mongodb://localhost/ecommerce
// JWT_SECRET=thisisasecretformyapp



