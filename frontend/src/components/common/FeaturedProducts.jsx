import React ,{useEffect,useState} from 'react'
import ProductImg from '../../assets/images/mens/eleven.jpg';
import { apiUrl } from '../common/http';

const FeaturedProducts = () => {
    const [faturedProduct, setFaturedProduct]=useState([]);
    // const [faturedProduct setFaturedProduct]=useState([]);

    const featureProduct=()=>{
        fetch(apiUrl+`/get-featured-products`,{
            method:'GET',
            Headers:{
                'Accept':'application/json',
                'content-type':'application/json',
            }
        }).then(res=>res.json())
        .then(result=>{
           //  console.log(result)
            setFaturedProduct(result.data);
        })
    }
    useEffect(()=>{
        featureProduct();
    },[]);
  return (
    <>
        <section className='section2 py-2'>
            <div className='container'>
                <h2>Featured Products</h2>
                <div className='row mt-4'>
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
                    <div className='col-md-3  col-6' >
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
                    <div className='col-md-3  col-6'>
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
                    <div className='col-md-3  col-6'>
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
                    {
                            faturedProduct && faturedProduct.map((item,index)=>
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
                </div>

            </div>
        </section>
    </>
  )
}

export default FeaturedProducts
