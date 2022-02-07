import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders, getStatusValues ,updateOrderStatus} from "./apiAdmin";
import moment from "moment";
import './styles.css'

const Orders = () => {
    const [orders,setOrders] = useState([])
    const [statusValues,setStatusValues] = useState([])
    const { user, token } = isAuthenticated();
    const [data,setData] = useState({
        search:'',
        results:[],
        searched:false
    })
    const [s,sets] = useState(false)
    const {search,results,searched} = data

    const handleChange = (name)=>event => {
        event.preventDefault()
        sets(false)
        setData({...data,[name]:event.target.value,searched:false})
    }

    const searchData = () => {
        const d = orders.find(element => element._id === search)
        if(d === -1){
            console.log(d)
           return( <div className="col-10">
                <h1 className='display-2' style={{ backgroundColor: '#001233',color: '#EFE0CA',padding:'10px' }}>No products found</h1>
                    <br></br><br></br>
                    <Link to="/admin/dashboard" exact style={{ border: '2px solid #000133', backgroundColor: '#EFE0CA', color: '#001233', textDecoration: 'none', padding: '10px' ,marginTop:'10px'}}>Back to Manage Orders</Link>
            </div>
           )
        }
        setData({...data,results:d,searched:true})
    }

    const searchSubmit = (event) => {
        event.preventDefault()
        searchData()
    }

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`;
        }
        if (searched && results.length < 1) {
            return `No products found`;
        }
    };

    const searchedProducts = (order = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, order)}
                </h2>
                <div className='card rounded p-4 mb-5' style={{backgroundColor:'#001233'}}>
                    <h4 className="card-header" style={{backgroundColor:'#EFE0CA',color:'#001233',marginBottom:'10px'}}>Order Id: {order._id}</h4>
                    <div className="card-body rounded border border-secondary p-2 m-2" >
                        <ul className='list-group mb-2'>
                            <li className='list-group-item'>{!s && showStatus(order)}</li>
                            <li className='list-group-item'>{s && <h3 className="mark mb-4">Status Updated</h3>}</li>
                            <li className='list-group-item'>Transaction ID: {order.transaction_id}</li>
                            <li className='list-group-item'>Amount: Rs.{order.amount}</li>
                            <li className='list-group-item'>Ordered By: {order.user.name}</li>
                            <li className='list-group-item'>Ordered On: {moment(order.createdAt).fromNow()}</li>
                            <li className='list-group-item'>Delivery Address: {order.address}</li>
                        </ul>
                    </div>
                    <div className='card-header mb-3 mt-5' style={{backgroundColor:'#EFE0CA',color:'#001233'}}>Total products in the order: {order.products.length}</div>
                    {order.products.map((p, pIndex) => (
                        <div className="mb-4 border border-secondary " key={pIndex}
                            style={{padding: "20px"}}>
                            {showInput("Product name", p.name)}
                            {showInput("Product price", p.price)}
                            {showInput("Product total", p.count)}
                            {showInput("Product Id", p._id)}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    const showOrdersLength =() =>{
        if(orders.length>0){
            return <h1 className='display-2' style={{ backgroundColor: '#001233',color: '#EFE0CA',padding:'10px' }}>Total Orders:{orders.length}</h1>
        }
        else return <h1 className='text-danger'>No orders</h1>
    }   

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input type="text" value={value} className="form-control" readOnly />
        </div>
    );

    const handleStatusChange = (e,orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                    // let d = results
                    // d.status = e.target.value
                    // setData({...data,results:d})
                    sets(true)
                    searchedProducts(results)
                }
            }
        );
    }

    const showStatus = o => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );
    return(
        <Layout
            title="Orders"
            description={`Hello ${user.name}, you can manage orders here`}
        >
            
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}
                    <form className="row p-5 m-5" onSubmit={searchSubmit}>
                        <input type="search" className="col-10" onChange={handleChange('search')} placeholder="Search By Order ID"></input>
                        <button className="input-group-text col-2">Search</button>
                    </form>
                    {/* {console.log(results)} */}
                    {searched && searchedProducts(results)}
                    <hr></hr>
                    <h2 style={{backgroundColor:'#EFE0CA',color:'#001233',padding:'5px',marginBottom:'20px'}}>All Orders:</h2>
                    {orders.map((order,i) => {
                        return(
                            <div className='card rounded border border-dark p-4 mb-5 ' style={{backgroundColor:'#001233'}} key={i}>
                                <h4 className="card-header " style={{backgroundColor:'#EFE0CA',color:'#001233',marginBottom:'10px'}}>Order Id: {order._id}</h4>
                                <div className="card-body rounded border p-2 m-2">
                                    <ul className='list-group mb-2'>
                                        <li className='list-group-item'>{showStatus(order)}</li>
                                        <li className='list-group-item'>Transaction ID: {order.transaction_id}</li>
                                        <li className='list-group-item'>Amount: Rs.{order.amount}</li>
                                        <li className='list-group-item'>Ordered By: {order.user.name}</li>
                                        <li className='list-group-item'>Ordered On: {moment(order.createdAt).fromNow()}</li>
                                        <li className='list-group-item'>Delivery Address: {order.address}</li>
                                    </ul>
                                </div>
                                <div className='card-header mb-3 mt-5' style={{backgroundColor:'#EFE0CA',color:'#001233'}}>Total products in the order: {order.products.length}</div>
                                {order.products.map((p, pIndex) => (
                                    <div className="mb-4 border" key={pIndex}
                                        style={{padding: "20px"}}>
                                        {showInput("Product name", p.name)}
                                        {showInput("Product price", p.price)}
                                        {showInput("Product total", p.count)}
                                        {showInput("Product Id", p._id)}
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                </div >
            </div >
        </Layout >
    )
}

export default Orders