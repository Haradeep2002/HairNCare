import React, { useState, useEffect } from 'react';
import { API } from '../config';
import { getProducts } from './apiCore';
import { withRouter } from 'react-router-dom';
const Blog = (props) => {

    const [products, setProducts] = useState(false)
    const [error, setError] = useState([])
    const [myIndex, setMyindex] = useState(0);

    const loadProducts = () => {
        getProducts('createdAt').then(data => {
            if (data.error)
                setError(data.error)
            else {
                console.log("in")
                setProducts(data)
                //getPhotos()
            }
        })
        //console.log(products)
    }


    useEffect(() => {
        loadProducts()
    }, [])

    const handleChange = () => {
        const n = products.length;
        console.log(myIndex)
        if (myIndex >= n - 1)

            setMyindex(0);
        else
            setMyindex(myIndex + 1);

    }

    const clickHandle = () => {
        props.history.push(`/product/${products[myIndex]._id}`);
    }
    const handleChangeback = () => {
        const n = products.length;
        console.log(myIndex)
        if (myIndex <= 0)
            setMyindex(n - 1);
        else
            setMyindex(myIndex - 1);

    }
    return (

        <div>

            {products &&
                <div className='row'>

                    <img className='col-1 ' height="60px" src="https://cdn2.iconfinder.com/data/icons/arrows-vol-1-1/32/left2-51.png" onClick={handleChangeback} style={{ marginTop: '200px' }} />
                    <img className="col-10 px-5" src={`${API}/product/photo/${products[myIndex]._id}`} style={{ height: '480px', cursor: 'pointer' }} onClick={clickHandle} />
                    <img className='col-1' height="60px" src="https://cdn2.iconfinder.com/data/icons/arrows-vol-1-1/32/right2-512.png" onClick={handleChange} style={{ marginTop: '200px' }} />

                </div>
            }
        </div>

    )

}

export default withRouter(Blog);