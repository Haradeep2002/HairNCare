import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from 'moment'
import classes from './Card.module.css'
import '../styles.css'
import { addItem, updateItems, removeItem } from "./cartHelper";
import { useState } from "react";
import { isAuthenticated } from "../auth";
const Card = ({ product, showViewProductButton = true, showAddToCartButton = true, cartUpdate = false,
    showRemoveProductButton = false, setRun = f => f, run = undefined, showDescription = false }) => {
    // console.log(product);
    const [redirect, setRedirect] = useState(false)
    const [redirectLogin, setRedirectToLogin] = useState(false)
    const [count, setCount] = useState(product.count)
    const addToCart = () => {
        if (isAuthenticated()) {
            addItem(product, () => {
                setRedirect(true)
            })
        }
        else
            setRedirectToLogin(true)

    }

    const shouldRedirect = redirect => {

        if (redirect) {
            return <Redirect to="/cart" />
        }
    }
    const shouldRedirectToLogin = redirectLogin => {

        if (redirectLogin) {
            return <Redirect to="/signin" />
        }
    }

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (<div>
                <div className="input-group mb-3">
                    <div className="badge btn-primary py-2" style={{ marginRight: '10px' }}>Available Stocks : {product.quantity}</div>
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
        setCount(event.target.value < 1 ? 1 : (event.target.value > product.quantity) ? product.quantity : event.target.value)
        if (event.target.value < 1)
            updateItems(productId, 1)
        else if (event.target.value > product.quantity) {
            updateItems(productId, product.quantity)
        }
        else {
            updateItems(productId, event.target.value)
        }
    }

    const showRemoveButton = (showRemoveProductButton) => {

        return showRemoveProductButton && (
            <button onClick={() => {
                removeItem(product._id)
                setRun(!run);
            }} className="btn btn-danger mt-2 mb-2">
                Remove product
            </button>
        )

    }

    return (
        <div className={`card rounded border border-dark p-2 ${classes.div}`} style={{ overflowX: 'hidden' }}>
            <div className={`card-header name ${classes.title}`}>{product.name}</div>
            <div className={`card-body rounded mt-2`}>
                {shouldRedirect(redirect)}
                {shouldRedirectToLogin(redirectLogin)}
                <ShowImage item={product} url="product"></ShowImage>
                {showDescription && <div className={`mt-2 ${classes.body} mb-2`}><h4 >Description:</h4>{product.description}</div>}
                <hr className={classes.body}></hr>
                <h2 className={classes.body} ><span className={` badge rounded-pill bg-secondary`}>{product.price}/-</span></h2>
                <h6 className={classes.body}>Category : {product.category && product.category.name}</h6>
                <h6 className={classes.body}><span>Added {moment(product.createdAt).fromNow()}</span></h6>

                {
                    product.quantity > 0 && <div className="badge btn-success">In Stock </div>
                }
                {
                    product.quantity <= 0 && <div className="badge btn-danger">Out of Stock </div>
                }
                <br></br>

                <Link to={`/product/${product._id}`}>
                    {showViewProductButton && <button className="btn btn-dark mt-2 mb-2" style={{ marginRight: '5px' }} >View Product</button>}
                </Link>
                {showAddToCartButton && product.quantity > 0 &&
                    <button className="btn btn-dark mt-2 mb-2" onClick={addToCart}>Add to Cart</button>
                }

                {showRemoveButton(showRemoveProductButton)}
                {showCartUpdateOptions(cartUpdate)}

            </div>
        </div>
    )
}

export default Card