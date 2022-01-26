import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts, getBrainTreeClientToken, processPayment } from './apiCore';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { emptyCart } from './cartHelper';
import Card from './Card';

const Checkout = ({products}) => {
    const getTotal = () =>{
        return products.reduce((c,n) => {
            return c+n.count*n.price;
        },0)
    }

    const showCheckout = () => {
        return isAuthenticated()?(
                <button className='btn btn-success'>Checkout</button>
            ):(
                <Link to="/signin" className='btn btn-primary'>Sign in to Checkout</Link>
            )
        
    }
    return(
        <div>
            <h2>Total: Rs.{getTotal()}</h2>
            {showCheckout()}
        </div>
    )
}

export default Checkout