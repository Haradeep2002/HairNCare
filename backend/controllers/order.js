
const nodemailer = require('nodemailer');
require('dotenv').config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    // tls: {
    //     rejectUnauthorized: false
    // }
});
const { Order, CartItem } = require('../models/order')
exports.create = async (req, res) => {
    console.log(req.body)
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    try {
        const data = await order.save()

        const mailOptions = {
            from: 'krishnachitlangi2@gmail.com',
            to: req.body.order.user.email,
            subject: 'You Order Received!',
            /*text: `We received your order of ${order.products.map((product, index) => {
                return(product.name);
            })}`*/
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

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })

        const mailOptions1 = {
            from: 'krishnachitlangi2@gmail.com',
            to: 'mh322.mara@gmail.com',
            subject: 'You Order Received!',
            /*text: `We received your order of ${order.products.map((product, index) => {
                return(product.name);
            })}`*/
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
                <p>Login to your dashboard</a> to see the order in detail.</p>`
        };

        transporter.sendMail(mailOptions1, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        }

        )
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