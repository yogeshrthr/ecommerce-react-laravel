import React ,{ useEffect, useState } from 'react'
import ProductImg from '../../assets/images/mens/eight.jpg';
import { apiUrl } from "../common/http";



const LatestProduct = () => {
    const [newProduct, setNewProduct]=useState([]);

    const latestProduct=()=>{
        fetch(apiUrl+`/get-new-arrived-products`,{
            method:'GET',
            Headers:{
                'Accepte':"application/Json",
                'content-type':"application/Json"
            },
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setNewProduct(result.data)
        })
    }

    useEffect(()=>{
        latestProduct();
    },[])
    return (
        <>
            <section className='section2 py-2'>
                <div className='container'>
                    <h2>New Arrivals</h2>
                    <div className='row mt-4 '>
                        {
                            newProduct && newProduct.map((item,index)=>
                                 (
                                    <div className='col-md-3 col-6' key={index}>
                                        <div className='product card border-0'>
                                            <div className='card-img'>
                                                <img src={item.image_url??''} alt="" style={{ width: '100%' }} />
                                            </div>
                                            <div className='card-body pt-3'>
                                                <a className='mt-3' href="">{item.title??'product TItle'}</a>
                                                <div className='price'>
                                                    ${item.price??0}  <span className='text-decoration-line-through'>${item.compared_price??0} </span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )
                            )
                            
                        }
                        

                        {/* <div className='col-md-3 col-6'>
                            <div className='product card border-0'>
                                <div className='card-img'>
                                    <img src={ProductImg} alt="" style={{ width: '100%' }} />
                                </div>
                                <div className='card-body pt-3'>
                                    <a className='mt-3' href="">Red Check Shirt Men</a>
                                    <div className='price'>
                                        $50  <span className='text-decoration-line-through'>$70 </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='col-md-3 col-6'>
                            <div className='product card border-0'>
                                <div className='card-img'>
                                    <img src={ProductImg} alt="" style={{ width: '100%' }} />
                                </div>
                                <div className='card-body pt-3'>
                                    <a className='mt-3' href="">Red Check Shirt Men</a>
                                    <div className='price'>
                                        $50  <span className='text-decoration-line-through'>$70 </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='col-md-3 col-6'>
                            <div className='product card border-0'>
                                <div className='card-img'>
                                    <img src={ProductImg} alt="" style={{ width: '100%' }} />
                                </div>
                                <div className='card-body pt-3'>
                                    <a className='mt-3' href="">Red Check Shirt Men</a>
                                    <div className='price'>
                                        $50  <span className='text-decoration-line-through'>$70 </span>
                                    </div>
                                </div>

                            </div>
                        </div> */}
                    </div>

                </div>
            </section>

        </>
    )
}

export default LatestProduct
