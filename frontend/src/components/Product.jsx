import React from 'react'
import Layout from './common/Layout';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import ProductImgOne  from '../assets/images/mens/five.jpg';
import ProductImgTwo  from '../assets/images/mens/six.jpg';
import ProductImgThree  from '../assets/images/mens/eight.jpg';


import { Rating } from 'react-simple-star-rating'

import { useState } from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


const Product = () => {

    const [ratingValue, setRatingValue] = useState(4)

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <>
            <Layout>

                <div className='container product-detail'>
                    <div className='row  '>
                        <div className='col-md-12'>
                            <nav aria-label="breadcrumb ">
                                <ol className="breadcrumb py-4">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item  " aria-current="page"><Link to="/shop">Shop</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Dummy Product Title</li>
                                </ol>
                            </nav>

                        </div>

                    </div>
                     <div className='row mb-5'>
                        <div className='col-md-5 '>
                            <div className='row '>
                                <div className='col-2'>
                                    <Swiper
                                        style={{
                                            '--swiper-navigation-color': '#000',
                                            '--swiper-pagination-color': '#000',
                                        }}
                                        onSwiper={setThumbsSwiper}
                                        loop={true}
                                        direction={`vertical`}
                                        spaceBetween={10}
                                        slidesPerView={6}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className="mySwiper mt-2"
                                    >

                                        <SwiperSlide>
                                            <div className='content'>
                                                <img
                                                    src={ProductImgOne}
                                                    alt=""
                                                    height={100}
                                                    className='w-100' />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className='content'>
                                                <img
                                                    src={ProductImgTwo}
                                                    alt=""
                                                    height={100}
                                                    className='w-100' />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className='content'>
                                                <img
                                                    src={ProductImgThree}
                                                    alt=""
                                                    height={100}
                                                    className='w-100' />
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                                <div className='col-10'>

                                    <Swiper
                                        style={{
                                            '--swiper-navigation-color': '#000',
                                            '--swiper-pagination-color': '#000',
                                        }}
                                        loop={true}
                                        spaceBetween={0}
                                        navigation={true}
                                        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className="mySwiper2"
                                    >

                                        <SwiperSlide >
                                            <div className='content'>
                                                <img
                                                    src={ProductImgOne}
                                                    alt=""
                                                    className='w-100' />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide >
                                            <div className='content'>
                                                <img
                                                    src={ProductImgTwo}
                                                    alt=""
                                                    className='w-100' />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide >
                                            <div className='content'>
                                                <img
                                                    src={ProductImgThree}
                                                    alt=""
                                                    className='w-100' />
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>


                                </div>
                            </div>
                        </div>
                        <div className='col-md-7'>
                            <h2>Dummy Product Titile</h2>

                            <div className='d-flex'>
                                <Rating readonly size={20} initialValue={ratingValue} />
                                <span className='pt-1 ms-2'>10 <Ri:star-fill></Ri:star-fill>eviews</span>
                            </div>
                            <div className='price my-3 h3'>
                                $100.00  <span className='text-decoration-line-through'>$120.00</span>
                            
                            </div>

                            <div>
                            The Shuirt is a versatile and durable item designed for<br/> everyday use. Its ergonomic design ensures comfort, 

                            </div>
                            <div className='pt-3'>
                                <strong >Select Size</strong>
                                <div className='sizes pt-3'>
                                    <button className=' btn btn-size'>S</button>
                                    <button className='ms-1 btn btn-size'>M</button>
                                    <button className='ms-1 btn btn-size'>L</button>
                                    <button className='ms-1 btn btn-size'>XL</button>
                                </div>

                            </div>
                            
                            <div className='add-to-cart py-4'>
                                <button className='btn btn-primary text-uppercase'>Add To Cart</button>
                            </div>

                            <hr />
                            <div className=''>
                                <strong>SKU:</strong>  DDXXXXXX
                            </div>
                            
                            



                        </div>

                    </div>
                    <div className='row pb-5'>
                        <div className='col-md-12'>
                        <Tabs defaultActiveKey="profile"
                            id="uncontrolled-tab-example"
                            className="mb-3">
                            <Tab eventKey="reviews" title="Reviews (10)">
                                Tab content for Reviews
                            </Tab>
                            <Tab eventKey="description" title="Description">
                                Tab content for Description
                            </Tab>
                           
                        </Tabs>
                        </div>
                         
                    </div>
                </div>



               


            </Layout>
        </>
    )
}

export default Product
