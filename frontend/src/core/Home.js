import React,{ useState,useEffect } from "react";
import { getBlogs, getProducts } from "./apiCore";
import Layout from "./Layout";
import Card from "./Card";
import Search from "./Search";


const Home = () => {
    const [productsBySell,setProductsBySell] =useState([])
    const [productsByArrival,setProductsByArrival] =useState([])
    const [error,setError] =useState(false)

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error)
                setError(data.error)
            else {
              setProductsBySell(data)
            }

        })
    }

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error)
                setError(data.error)
            else {
              setProductsByArrival(data)
            }
        })
    } 


    useEffect(() => {
      loadProductsByArrival()
      loadProductsBySell()
      getBlogs().then(data => 
        data.map((m,i) => {
          console.log(m)
        }))
      
    },[])
    return(
      <Layout title="Home Page" description="Ecommerce" className='container-fluid'>
        <Search></Search>
        
        <h2 className="mb-4 ">New Arrivals</h2>
        <div className="row">
          {productsByArrival.map((product,i) => (
              <div key={i} className='col-4 mb-3'>
                  <Card product={product} />
              </div>
          ))}
        </div>
            <hr></hr>
        <h2 className="mb-4 ">Best Sellers</h2>
        <div className="row">
          {productsBySell.map((product,i) => (
              <div key={i} className='col-4 mb-3'>
                  <Card product={product} />
              </div>
          ))}
        </div>
        
        <hr></hr>
      </Layout>
    )
  }
  
  export default Home;
  