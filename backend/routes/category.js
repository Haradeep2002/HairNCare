const express = require('express')
const router = express.Router()
const {userById} = require('../controllers/user')
const {create,categoryById,read,update,delet,readAll} = require("../controllers/category")
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')
const isAuth = require('../middleware/isAuth')

router.post("/category/create/:userId",auth,isAuth,isAdmin,create)
router.get('/category/:categoryId',read)
router.patch('/category/:categoryId/:userId',auth,isAuth,isAdmin,update)
router.delete('/category/:categoryId/:userId',auth,isAuth,isAdmin,delet)
router.get('/categories',readAll)

router.param("categoryId",categoryById)
router.param("userId",userById)

module.exports =router