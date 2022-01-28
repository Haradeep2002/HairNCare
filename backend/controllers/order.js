const {Order,CartItem} = require('../models/order')

exports.create =async (req,res) => {
    // console.log(req.body)
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    try{
        const data = await order.save()
        res.json(data)
    }catch(e){
        return res.status(400).json({
            error:e
        })
    }
}

exports.listOrders =async (req,res) => {
    try{
        const data = await Order.find().populate('user','_id name address').sort('-created')
        res.json(data)
    }catch(e){
        console.log(e)
        return res.status(400).json({
            error:e
        })
    }
    
}

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path('status').enumValues);
};

exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error:err
                });
            }
            req.order = order;
            next();
        });
};

exports.updateOrderStatus = (req, res) => {
    Order.updateOne({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(order);
    });
};