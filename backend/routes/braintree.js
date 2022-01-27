const express = require('express')
const { userById } = require('../controllers/user')
const { generateToken,processPayment } = require('../controllers/braintree')
const auth = require('../middleware/auth')
const isAuth = require('../middleware/isAuth')
const router = new express.Router()

router.get('/braintree/getToken/:userId',auth,isAuth,generateToken)
router.post('/braintree/payment/:userId',auth,isAuth,processPayment)


router.param("userId",userById)

module.exports = router