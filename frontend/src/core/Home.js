import React, { useState, useEffect } from "react";
import { getProducts } from "./apiCore";
import Layout from "./Layout";
import Card from "./Card";
import Search from "./Search";
import ScrollToTop from "react-scroll-to-top";
import Blog from "./Blog";

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
      <div style={{ backgroundColor: '#001233' }}>
        <h1 style={{ color: '#EFE0CA', marginLeft: '40%' }}>New Arrivals</h1>

        <Blog />
      </div>


      <div style={{ backgroundColor: '#001233' }}>
        <h1 style={{ paddingBottom: '10px', color: '#EFE0CA', marginLeft: '40%', marginBottom: '40px' }}>Best Sellers</h1>
      </div>
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
