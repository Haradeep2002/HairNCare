import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts,deleteProduct } from "./apiAdmin";
import './styles.css'

const ManageProducts = () => {
    const [products,setProducts] = useState([])

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log('here')
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts()
    },[])

    return(
        <Layout title="Manage Products" description="Curd on Products" className='container-fluid'>
            <div className="row">
                <div className="col-12">
                <h2 className="text-center">
                        Total {products.length} products
                    </h2>
                    <hr />
                    <ul className="list-group">
                        {products.map((p, i) => (
                            <li key={i} className="list-group-item d-flex justify-content-between align-items-center m-2"  style={{backgroundColor:'#001233'}} >
                                <strong style={{color:'#EFE0CA'}}>{p.name}</strong>
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <span className="btn btn-info" style={{ border: '2px solid #000133', backgroundColor: '#EFE0CA', color: '#001233', textDecoration: 'none', padding: '10px' ,marginTop:'10px'}}>Update</span>
                                </Link>
                                <span onClick={(e) => {
                                    e.preventDefault() 
                                    return destroy(p._id)}} className="btn btn-danger" style={{ border: '2px solid black', backgroundColor: '#EFE0CA', color: '#001233', textDecoration: 'none', padding: '10px' ,marginTop:'10px'}}>
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                    <br />
                </div>
            </div>
        </Layout>
    )
}
export default ManageProducts