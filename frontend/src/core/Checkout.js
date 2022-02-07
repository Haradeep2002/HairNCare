import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts, getBraintreeClientToken, processPayment, createOrder } from './apiCore';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { emptyCart } from './cartHelper';
import Card from './Card';
import DropIn from 'braintree-web-drop-in-react'

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        loading: true,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })
    let userId = null
    let token = null
    userId = isAuthenticated() && isAuthenticated().user._id
    token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error) {
                setData({
                    ...data, error: data.error
                })
            } else {
                setData({
                    clientToken: data.clientToken
                })
            }
        })
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const getTotal = () => {
        return products.reduce((c, n) => {
            return c + n.count * n.price;
        }, 0)
    }

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin" className='btn btn-primary'>Sign in to Checkout</Link>
        )

    }
    let deliveryAddress = data.address
    const buy = () => {
        setData({ loading: true })
        let nonce;
        data.instance.requestPaymentMethod()
            .then(data => {
                // console.log(data)
                nonce = data.nonce
                // console.log(nonce,getTotal(products))
                const paymentData = {
                    paymentNonce: nonce,
                    amount: getTotal(products)
                }
                processPayment(userId, token, paymentData)
                    .then(response => {
                        // console.log(response)
                        const createOrderData = {
                            products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                        }
                        createOrder(userId, token, createOrderData)
                            .then(response =>
                                emptyCart(() => {
                                    setRun(!run);
                                    // console.log("payment success")
                                    // console.log(data.success)
                                    setData({ success: true, loading: false })
                                })
                            )
                            .catch(e => {
                                console.log(e)
                                setData({ loading: false });
                            })
                    })
                    .catch(e => {
                        console.log(e)
                        setData({ loading: false });
                    })
            })
            .catch(error => {
                // console.log("dropin error: ", error);
                setData({ ...data, error: error.message });
            });
    }

    const handleAddress = (e) => {
        setData({ ...data, address: e.target.value })
    }

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: "" })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className='form-group mb-3'>
                        <label style={{ color: '#001233' }}>Delivery Address:</label>
                        <textarea onChange={handleAddress} className='form-control' value={data.address} placeholder='Enter address'>
                        </textarea>
                    </div>
                    <DropIn options={{
                        authorization: data.clientToken,
                        paypal: {
                            flow: 'vault'
                        }
                    }} onInstance={instance => (data.instance = instance)}></DropIn>
                    <button className='btn btn-dark col-12' onClick={buy}>Pay</button>
                </div>
            ) : null}
        </div>
    )

    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = success => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Thanks! Your payment was successful!
        </div>
    );

    const showLoading = loading => loading && <div className="alert alert-info" >
        Loading
    </div>

    return (
        <div>
            <h2>Total: Rs.{getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    )
}

export default Checkout