const express = require('express')
const router = express.Router()
const {getProductById,addProduct} = require('../controllers/blog')
const {userById} = require('../controllers/user')

const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')
const isAuth = require('../middleware/isAuth')

router.post("/blog/create/:userId",auth,isAuth,isAdmin,addProduct)
router.get("/blogs",getProductById)


router.param("userId",userById)

module.exports =router