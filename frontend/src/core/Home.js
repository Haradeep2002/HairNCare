<<<<<<< HEAD
import React,{ useState,useEffect } from "react";
import { getBlogs, getProducts } from "./apiCore";
import Layout from "./Layout";
import Card from "./Card";
import Search from "./Search";

=======
import React, { useState, useEffect } from "react";
import { getProducts } from "./apiCore";
import Layout from "./Layout";
import Card from "./Card";
import Search from "./Search";
import ScrollToTop from "react-scroll-to-top";
import Blog from "./Blog";
>>>>>>> c9bcb151206776cd802f52dbf673615f93888677

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([])
  const [productsByArrival, setProductsByArrival] = useState([])
  const [error, setError] = useState(false)

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
  }, [])
  return (

    <Layout title="Home Page" description="Ecommerce" className='container-fluid'>

      <Search></Search>
      <h2 className="mb-4 " style={{ color: 'blue' }}>New Arrivals</h2>
      <Blog />


      <hr></hr>
      <h2 className="mb-4 " style={{ color: 'blue' }}>Best Sellers</h2>
      <div className="row">
        {productsBySell.map((product, i) => (
          <div key={i} className='col-4 mb-3'>
            <Card product={product} />
          </div>
        ))}
      </div>

      <hr></hr>

    </Layout >
  )
}

export default Home;
