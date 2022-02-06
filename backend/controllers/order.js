const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const { Order, CartItem } = require('../models/order')

exports.create = async (req, res) => {
    console.log(req.body)
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    try {
        const data = await order.save()
        const emailData = {
            to: 'mh322.mara@gmail.com',
            from: 'krishnachitlangi2@gmail.com',
            subject: `A new order is received`,
            html: `
            <h1>Hey Admin, Somebody just made a purchase in your ecommerce store</h1>
            <h2>Customer name: ${order.user.name}</h2>
            <h2>Customer address: ${order.address}</h2>
            <h2>User's purchase history: ${order.user.history.length} purchase</h2>
            <h2>User's email: ${order.user.email}</h2>
            <h2>Total products: ${order.products.length}</h2>
            <h2>Transaction ID: ${order.transaction_id}</h2>
            <h2>Order status: ${order.status}</h2>
            <h2>Product details:</h2>
            <hr />
            ${order.products
                    .map(p => {
                        return `<div>
                        <h3>Product Name: ${p.name}</h3>
                        <h3>Product Price: ${p.price}</h3>
                        <h3>Product Quantity: ${p.count}</h3>
                </div>`;
                    })
                    .join('--------------------')}
            <h2>Total order cost: ${order.amount}<h2>
            <p>Login to your dashboard</a> to see the order in detail.</p>
        `
        };
        sgMail
            .send(emailData)
            .then(sent => console.log('SENT >>>', sent))
            .catch(err => console.log('ERR >>>', err));
        const emailData2 = {
            to: order.user.email,
            from: 'krishnachitlangi2@gmail.com',
            subject: `You order is in process`,
            html: `
                <h1>Hey ${req.profile.name}, Thank you for shopping with us.</h1>
                <h2>Total products: ${order.products.length}</h2>
                <h2>Transaction ID: ${order.transaction_id}</h2>
                <h2>Order status: ${order.status}</h2>
                <h2>Product details:</h2>
                <hr />
                ${order.products
                    .map(p => {
                        return `<div>
                            <h3>Product Name: ${p.name}</h3>
                            <h3>Product Price: ${p.price}</h3>
                            <h3>Product Quantity: ${p.count}</h3>
                    </div>`;
                    })
                    .join('--------------------')}
                <h2>Total order cost: ${order.amount}<h2>
                <p>Thank your for shopping with us.</p>
            `
        };
        sgMail
            .send(emailData2)
            .then(sent => console.log('SENT 2 >>>', sent))
            .catch(err => console.log('ERR 2 >>>', err));
        res.json(data)
    } catch (e) {
        return res.status(400).json({
            error: e
        })
    }
}

exports.listOrders = async (req, res) => {
    try {
        const data = await Order.find().populate('user', '_id name address').sort('-created')
        res.json(data)
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            error: e
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
                    error: err
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