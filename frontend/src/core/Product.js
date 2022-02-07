import React,{ useState,useEffect } from "react";
import { getProducts,read } from "./apiCore";
import Layout from "./Layout";
import Card from "./Card";
import { listRelated } from "./apiCore";

const Product = (props) =>{
    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])
    const [error, setError] = useState(false)
    const loadSingleProduct = id => {
        // console.log(id)
        //do async-await
        read(id).then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setProduct(data)
                listRelated(data._id).then(res => {
                    if(res.error){
                        setError(res.error)
                    }else{
                        setRelatedProduct(res)
                    }
                })
            }
        })
    }

    useEffect(() => {
        const id = props.match.params.id
        loadSingleProduct(id)
    },[props])
    return(
        <Layout title={product && product.name} description={product && product.description && product.description.substring(0,100)} className='container-fluid'>
          <div className="row">
                <div className="col-6" style={{paddingRight:'50px'}}>
                    {product && product.description && <Card product={product} showViewProductButton={false} showDescription={true}/>}
                </div>
<div className="vr"></div>
                <div className="col-5" style={{paddingLeft:'50px'}}>
                    <h4>Related products</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3" key={i}>
                            <Card product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
      )
}

export default Product