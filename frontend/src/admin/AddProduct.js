import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct ,getCategories} from './apiAdmin';

const AddProduct = () => {
    const [values, setValues] = useState({
        name: '',description: '',price: '',categories: [],
        category: '',shipping: false,quantity: '',loading: false,
        error: '',createdProduct: '',redirectToProfile: false,
    });

    const { user, token } = isAuthenticated();
    const {
        name,description,price,categories,category,
        shipping,quantity,loading,error,
        createdProduct,redirectToProfile,
    } = values;

    const init = () => {
        getCategories().then(data => {
            // console.log(data)
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ 
                    ...values,
                    categories: data,
                    category:data[0]
                });
            }
        }).catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        init();
    }, []);
    const handleChange = name => event => {
        const value = event.target.value;
        setValues({ ...values, [name]: value });
    };


    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        createProduct(user._id,token, values).then(data => {
            // console.log(data)
            if ( data.error) {
                console.log("here")
                setValues({ ...values, loading: false, error: data.error });
            } else {
                setValues({
                    ...values,description: '',price: '',
                    quantity: '',loading: false,createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" required className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} required className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')} type="number" required className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Category(Select)</label>
                    <select onChange={handleChange('category')} className="form-control">
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping(Select)</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input onChange={handleChange('quantity')} type="number" required className="form-control" value={quantity} />
            </div>

            <div className="row">
                <div className="col-10">
                    <Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>
                </div>
                <div className="col-2">
                    <button className="btn btn-outline-primary" >CreateProduct</button>
                </div>
            </div>
        </form >
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            Product {`${createdProduct}`} is created succesfully!!
            {addPhoto()}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );
    const addPhoto = () => {
        localStorage.setItem('product', `${createdProduct}`)
// console.log('addphoto')
        return (< div className="" >
            <Link to="/product/photo" className="text-warning">
                Upload product photo
            </Link>
        </div >);
    }


    return (
        <Layout title="Add a new product" description={`G'day ${user.name}, ready to add a new product?`} className="container-fluid">
            <div className="row">
                <div className="col-md-8 offset-md-2">

                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}

                </div>
            </div>
        </Layout>
    );
};

export default AddProduct;