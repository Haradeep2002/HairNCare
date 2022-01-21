const morgan = require('morgan')
// const cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const cors = require('cors')
require('dotenv').config()
const app = express()

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
}).then(() => console.log('Database connected'))


app.use(morgan("dev"))

app.use(cors())


app.use(express.json())
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)


const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})









