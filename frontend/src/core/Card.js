import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from 'moment'
import '../styles.css'
const Card = ({product,showViewProductButton=true}) => {
    return(
        <div className="card">
            <div className="card-header name">{product.name}</div>
            <div className="card-body">
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

                <button className="btn btn-outline-warning mt-2 mb-2">Add to Cart</button>
                
            </div>
        </div>
    )
}

export default Card



// import { Link } from "react-router-dom";
// import ShowImage from "./ShowImage";
// const Card = ({product,showViewProductButton=true}) => {
//     return(
//         <div className="card h-100 w-50">
//             <div className="card-header">{product.name}</div>
//             <div className="card-body d-flex flex-column">
//                 <ShowImage item={product} url="product"></ShowImage>
//                 <div className="mt-auto">
//                 <p>{product.description.substring(0,100)}</p>
//                 <p>{product.price}</p>
                
//                 <Link to={`/product/${product._id}`}>
//                     {showViewProductButton && <button className="btn btn-outline-primary" style={{'margin-right': '5px'}} >View Product</button>}
//                 </Link>
//                 <button className="btn btn-outline-warning ml-2">Add to Cart</button>
//                 </div>
                
//             </div>
//         </div>
//     )
// }

// export default Card