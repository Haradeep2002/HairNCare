import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom'
import Card from './Card';
import { getCart } from './cartHelper';
import Checkout from './Checkout';
import ScrollToTop from "react-scroll-to-top";
const Cart = () => {
    const [items, setItems] = useState([])
    const [run, setRun] = useState(false);
    useEffect(() => {
        setItems(getCart())
    }, [run])

    const showItems = (items) => {
        return (
            <div>
                <h2 className='mb-4' style={{ backgroundColor: '#001233', color: '#EFE0CA', padding: '10px' }}>Your cart has {`${items.length}`} items</h2>

                {
                    items.map((product, i) => (
                        <div className='py-3'>
                    <Card key={i} product={product} showAddToCartButton={false} cartUpdate={true}
                        showRemoveProductButton={true} setRun={setRun}
                        run={run}/>
                        </div>
                        )
                        )
                }
                <h4>Click on <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSKDgXbbRPqpzt5-E9C0BI0ySBHY-OT9yofib4qnedUxCEbyzV1" height="40" width="40px" alt="Up arrow button"></img> to Proceed for payment</h4>
            </div>
        )
    }

    const noItemsMessage = () => (<div>
        <h2 style={{ backgroundColor: '#001233', color: '#EFE0CA', padding: '10px' }} className='text-seondary'>Your cart is empty<br />
        </h2><br></br>
        <Link style={{ border: '2px solid #000133', backgroundColor: '#EFE0CA', color: '#001233', textDecoration: 'none', padding: '10px' }} to="/shop">Continue Shopping</Link>
    </div>
    )


    return (
        <Layout title="Shopping Cart" description="Manage your cart items. Add, remove, checkout or continue shopping" className="container-fluid" >
            <div className='row'>
                <div className="col-5">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>
                {/* <div className="vr text-success"></div> */}
                <div className='col-6'>
                    <h2 className='mb-4' style={{ backgroundColor: '#001233', color: '#EFE0CA', padding: '10px' }}>Your cart summary </h2>
                    {<Checkout products={items} setRun={setRun} run={run} />}
                    <ScrollToTop smooth />
                </div>
            </div>
        </Layout>

    )
}
export default Cart;