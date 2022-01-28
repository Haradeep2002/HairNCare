const express = require('express')
const { userById,addOrderToUserHistory } = require('../controllers/user')
const auth = require('../middleware/auth')
const isAuth = require('../middleware/isAuth')
const isAdmin = require('../middleware/isAdmin')
const router = new express.Router()
const { create ,listOrders,getStatusValues,updateOrderStatus,orderById} = require('../controllers/order')
const { decreaseQuantity } = require('../controllers/product')

router.post('/order/create/:userId',auth,isAuth,addOrderToUserHistory,decreaseQuantity,create)
router.get('/order/list/:userId',auth,isAuth,isAdmin,listOrders)
router.get("/order/status-values/:userId",auth,isAuth,isAdmin,getStatusValues);
router.patch("/order/:orderId/status/:userId",auth,isAuth,isAdmin,updateOrderStatus);
router.param("userId",userById)
router.param("orderId", orderById);

module.exports = router