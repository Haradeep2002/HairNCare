import { Link,Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from 'moment'
import '../styles.css'
import { addItem, updateItems, removeItem } from "./cartHelper";
import { useState } from "react";
const Card = ({product,showViewProductButton=true,showAddToCartButton=true,cartUpdate=false,
    showRemoveProductButton=false,setRun = f => f, run = undefined }) => {
    // console.log(product);
    const [redirect,setRedirect] =useState(false)
    const [count,setCount] =useState(product.count)
    const addToCart = () => {
        addItem(product,
            setRedirect(true)
        )
    }

    const shouldRedirect = redirect => {

        if (redirect) {
            return <Redirect to="/cart" />
        }
    }

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && ( <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Adjust Quantity</span>
                        </div>
                        <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
                    </div>
                    </div>
            )
        );
    };

    const handleChange = productId => event => {
        setRun(!run);
        setCount(event.target.value < 1 ? 1 : event.target.value)

        if (event.target.value >= 1) {
            updateItems(productId, event.target.value)
        }
    }

    const showRemoveButton = (showRemoveProductButton) => {

        return showRemoveProductButton && (
            <button onClick={() => {
                removeItem(product._id)
                setRun(!run);
            }} className="btn btn-outline-danger mt-2 mb-2">
                Remove product
            </button>
        )

    }

    return(
        <div className="card">
            <div className="card-header name">{product.name}</div>
            <div className="card-body">
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="product"></ShowImage>
                <p className="lead mt-2">{product.description.substring(0,100)}</p>
                <p className="black-10">Rs.{product.price}</p>
                <p className="black-9">Category:{product.category && product.category.name}</p>
                <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>

                {
                    product.quantity > 0 &&<div className="badge btn-success">In Stock </div>
                }
                {
                    product.quantity <= 0 &&<div className="badge btn danger">Out of Stock </div>
                }
                <br></br>

                <Link to={`/product/${product._id}`}>
                    {showViewProductButton && <button className="btn btn-outline-primary mt-2 mb-2" style={{'margin-right': '5px'}} >View Product</button>}
                </Link>
                {showAddToCartButton && 
                    <button className="btn btn-outline-warning mt-2 mb-2" onClick={addToCart}>Add to Cart</button>
                }   
                {showRemoveButton(showRemoveProductButton)}
                {showCartUpdateOptions(cartUpdate)}
                
            </div>
        </div>
    )
}

export default Card