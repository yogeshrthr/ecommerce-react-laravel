import React, { useEffect } from 'react'
import Layout from './common/Layout';
import { Link, useParams} from 'react-router-dom';

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
import { apiUrl } from './common/http';
import { ToastContainer, toast } from 'react-toastify'; // ✅ Correct


const Product = () => {
    const product_id=useParams().id;
    const [ratingValue, setRatingValue] = useState(4)
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const [product,setProduct]=useState([]);



    const fetProductDetails=async()=>{
        await fetch(apiUrl+`/get-product-details/`+product_id,{
            method:'GET',
            header:{
                'Accept':'application/json',
                'content-type':'application/json'
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            if(result.status==200){
                setProduct(result.data)
                console.log(result.data.product_images)
            }else{
                toast.error(result.message)
            }
            
           
        })
    }
    useEffect(()=>{
        fetProductDetails();

    },[])
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
                                    <li className="breadcrumb-item active" aria-current="page">{product.title??''}</li>
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
                                        {
                                            product.product_images && product.product_images.map((item,index) => {
                                                return (                                               
                                                    <SwiperSlide>                                                       
                                                        <div className='content' key={index}>
                                                            <img
                                                                src={item.image_path}
                                                                alt=""
                                                                height={100}
                                                                className='w-100' />
                                                        </div>
                                                    </SwiperSlide>
                                                )}
                                            )
                                        }
                                        
                                        {/* <SwiperSlide>
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
                                        </SwiperSlide> */}
                                    </Swiper>
                                </div>
                                <div className='col-10'>
                                    {/* 1. Add a check to ensure images exist and have length */}
                                        {product.product_images && product.product_images.length > 0 ? (
                                            <Swiper
                                                style={{
                                                    '--swiper-navigation-color': '#000',
                                                    '--swiper-pagination-color': '#000',
                                                }}
                                                loop={true}
                                                navigation={true}
                                                thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                                                modules={[FreeMode, Navigation, Thumbs]}
                                                className="mySwiper2"
                                            >
                                                {product.product_images.map((item, index) => (
                                                    <SwiperSlide key={index}>
                                                        <div className='content'>
                                                            <img
                                                                src={`${item.image_path_large}`} // Ensure full URL
                                                                alt=""
                                                                className='w-100' 
                                                            />
                                                        </div>
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        ) : (
                                            /* 2. Show a placeholder or the static images only if dynamic ones fail */
                                            <div className="placeholder-loading">Loading Images...</div>
                                        )}

                                    {/* <Swiper
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
                                        {
                                            product.product_images && product.product_images.map((item,index) => {
                                                return (                                               
                                                   <SwiperSlide key={index}>
                                                        <div className='content' >
                                                            <img
                                                                src={item.image_path}
                                                                alt=""
                                                                className='w-100' />
                                                        </div>
                                                    </SwiperSlide>
                                                )}
                                            )
                                        }

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
                                    </Swiper> */}


                                </div>
                            </div>
                        </div>
                        <div className='col-md-7'>
                            <h2>{product.title??''}</h2>

                            <div className='d-flex'>
                                <Rating readonly size={20} initialValue={ratingValue} />
                                <span className='pt-1 ms-2'>10 <Ri:star-fill></Ri:star-fill>reviews</span>
                            </div>
                            <div className='price my-3 h3'>
                                ${product.price??''}  <span className='text-decoration-line-through'>${product.compare_price??''}</span>
                            
                            </div>

                            <div>
                                {product.short_description ?? ''}
                            

                            </div>
                            <div className='pt-3'>
                                <strong >Select Size</strong>
                                <div className='sizes pt-3'>
                                    {
                                    
                                        product.product_size && product.product_size.map((item,index)=>(

                                            <button className=' btn btn-size' key={index}>{item.size[0].name} </button>
                                        ))
                                    
                                    }
                                    {/* <button className=' btn btn-size'>S</button>
                                    <button className='ms-1 btn btn-size'>M</button>
                                    <button className='ms-1 btn btn-size'>L</button>
                                    <button className='ms-1 btn btn-size'>XL</button> */}
                                </div>

                            </div>
                            
                            <div className='add-to-cart py-4'>
                                <button className='btn btn-primary text-uppercase'>Add To Cart</button>
                            </div>

                            <hr />
                            <div className=''>
                                <strong>SKU:</strong>  {product.sku??''}
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
                                
                            <div dangerouslySetInnerHTML={{__html:product.description}}></div>
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
