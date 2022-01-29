//auth.js+user.js
const express = require('express')
const {signup,signin,signout,userById,read,update,purchaseHistory} = require('../controllers/user')
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')
const isAuth = require('../middleware/isAuth')
const router = new express.Router()

router.post('/signup',signup)
router.post('/signin', signin)
router.get('/signout',auth, signout)
router.get('/secret/:userId',auth,isAuth,isAdmin,(req,res) => {
    res.json({
        user:   req.profile
    })
})
router.get('/user/:userId',auth,isAuth,read)
router.patch('/user/:userId',auth,isAuth,update)
router.get('/orders/by/user/:userId',auth,isAuth,purchaseHistory)

router.param("userId",userById)

module.exports = router
