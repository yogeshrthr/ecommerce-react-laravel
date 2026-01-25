
import React from 'react'


import LatestProduct from '../components/common/LatestProduct';
import FeaturedProducts from '../components/common/FeaturedProducts';
import Hero from './common/Hero';
import Layout from './common/Layout';




const Home = () => {
  return (
    <>
      <Layout>      
      <Hero />
      <LatestProduct />
      <FeaturedProducts /> 
      

    </Layout>

    </>
  )
}

export default Home
