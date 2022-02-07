import React, { useState, useEffect } from 'react';
import { API } from '../config';
import { getProducts } from './apiCore';
import { withRouter } from 'react-router-dom';
import classes from './Blog.module.css'
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

        <div className={classes.outer}>

            {products &&
                <div className={`${classes.main}`}>
                    <img className={classes.zoom1} height="60px" src="https://cdn2.iconfinder.com/data/icons/arrows-vol-1-1/32/left2-51.png" onClick={handleChangeback} />
                    <span className={classes.image}>
                        <img className={` ${classes.mydiv}`} src={`${API}/product/photo/${products[myIndex]._id}`} style={{ height: '480px', cursor: 'pointer' }} onClick={clickHandle} /><i class="fa fa-search fa-3x" />
                    </span>
                    <img className={classes.zoom2} height="60px" src="https://cdn2.iconfinder.com/data/icons/arrows-vol-1-1/32/right2-512.png" onClick={handleChange} />

                </div>
            }
        </div >

    )

}

export default withRouter(Blog);