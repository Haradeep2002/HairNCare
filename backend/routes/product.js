const express = require('express')
const router = express.Router()
const multer = require('multer')

const {userById} = require('../controllers/user')
const {create,addPhoto,read,remove,update,list,listRelated,listCategories,listBySearch,photo} = require("../controllers/product")
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')
const isAuth = require('../middleware/isAuth')
const isProduct = require('../middleware/isProduct')
const isCategory = require('../middleware/isCategory')

const upload = multer({
    limits: {
        fileSize: 100000000
    },
    fileFilter(req, file, cb) {
        //regex
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})

router.post("/product/create/:userId",auth,isAuth,isAdmin,isCategory,create)
router.patch("/product/addPhoto/:id/:userId",auth,isAuth,isAdmin,isProduct, upload.single('photo'),addPhoto)
router.get("/product/:id",isProduct,read)
router.delete("/product/:id/:userId",auth,isAuth,isAdmin,isProduct,remove)
// (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// }
router.patch("/product/:id/:userId",auth,isAuth,isAdmin,isProduct,isCategory,update)

router.get("/products",list)
router.get("/products/related/:id",isProduct,listRelated)
router.get("/products/categories",listCategories)
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:id",isProduct,photo)

router.param("userId",userById)

module.exports =router