import React, { useState, useEffect } from 'react';
import Card from '../core/Card';
import Layout from '../core/Layout';
import Contact from './Contact';
import { getProducts } from '../core/apiCore';
const Hairfall = () => {
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
    const doc = "https://secondconsult.com/prod/wp-content/uploads/2021/05/1623147112Mrunalini-Mrunalini.jpeg";
    return (


        <Layout className="row" title='Dandruff' description='Ecommerce'>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Contact style={{ width: '40%' }} className="col-6" title="Dr. Mahi, MD" photo={doc} desc="orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."></Contact>
                {products &&
                    <div style={{ width: '40%' }} className="col-6">
                        <h1 style={{ paddingTop: '10%' }}>Related Products</h1>
                        <Card className="col-6" product={products[0]}></Card>
                    </div>
                }
            </div>
        </Layout>



    )
}

export default Hairfall;
