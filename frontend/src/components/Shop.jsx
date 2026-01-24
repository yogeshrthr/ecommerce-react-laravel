import React, { useEffect,useState } from 'react'
import Layout from './common/Layout';
import ProductImg from '../assets/images/mens/eight.jpg';
import { Link } from 'react-router-dom';
import { apiUrl } from './common/http';


const Shop = () => {
    const [category , setCategory]=useState([]);
    const [brand , setBrand]=useState([]);
    const [product , setProducts]=useState([]);
    const [categoryChecked , setCategoryChecked]=useState([]);
    const [brandChecked , setBrandChecked]=useState([]);
    const fetchCatgories=(()=>{
       

        fetch(apiUrl+`/get-category`,{
            method:'GET',
            Headers:{
                'Accept':'application/josn',
                'content-type':'application/josn',

            },
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            
            setCategory(result.data)

        })
    })
    const fetchBrand=(()=>{
        fetch(apiUrl+`/get-brand`,{
            method:'GET',
            Headers:{
                'Accept':'application/josn',
                'content-type':'application/josn',

            },
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setBrand(result.data)

        })
    })
    const getProducts=()=>{
        let search=[]
        if(categoryChecked.length>0){
            search.push(['category', categoryChecked]);
        }
        if(brandChecked.length>0){
            search.push(['brand', brandChecked]);
        }
        let searchUrl= new URLSearchParams(search)
        console.log(searchUrl.toString())
        // console.log(search)
        fetch(apiUrl+`/get-products?${searchUrl}`,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'content-type':'application/json',
            },
        }).then(res=>res.json())
        .then(result=>{
           
            setProducts(result.data.data)
             console.log(product)
        })
    }
    const HandleFilter=(e)=>{
        const {checked,value} =e.target;
        // console.log(checked,value)
        if(checked){
            setCategoryChecked(pre=> [...pre,value])
        }else{
            setCategoryChecked(categoryChecked.filter(item=>value!=item))
        }
        // console.log(categoryChecked)

    }
    const HandleBrandFilter=(e)=>{
        const {checked,value} =e.target;
        if(checked){
            setBrandChecked(pre=> [...pre,value])
        }else{
            setBrandChecked(brandChecked.filter(item=>value!=item))
        }

    }
    useEffect(()=>{
        fetchCatgories();
        fetchBrand();
        getProducts();
    },[categoryChecked,brandChecked])
    return (
        <>
            <Layout>
                {/* <Hero /> */}

                <div className='container'>
                    <nav aria-label="breadcrumb ">
                        <ol className="breadcrumb py-4">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Shop</li>
                        </ol>
                    </nav>
                    <div className='row'>
                        <div className='col-md-3'>
                            <div className='card shadow border-0 mb-3'>
                                <div className='card-body p-4'>
                                    <h3 className='mb-3'>Categories</h3>
                                    <ul>
                                        {
                                            category && category.map((item,index)=>(
                                                <li className='mb-2' key={index}>
                                                    <input type="checkbox" value={item.id} onChange={HandleFilter} />
                                                    <label htmlFor="" value={item.id} className='ps-2'>{item.name}</label>
                                                </li>
                                            ))
                                        }
                                        {/* <li className='mb-2'>
                                            <input type="checkbox" />
                                            <label htmlFor="" className='ps-2'>Kids</label>
                                        </li>
                                        <li className='mb-2'>
                                            <input type="checkbox" />
                                            <label htmlFor="" className='ps-2'>Men</label>
                                        </li>
                                        <li className='mb-2'>
                                            <input type="checkbox" />
                                            <label htmlFor="" className='ps-2'>Women</label>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                            <div className='card shadow border-0 mb-3'>
                                <div className='card-body p-4'>
                                    <h3 className='mb-3'>Brands</h3>
                                    <ul>
                                        {
                                            brand && brand.map((item,index)=>(
                                                <li className='mb-2' key={index}>
                                                    <input type="checkbox" id={`brand-${item.id}`} onChange={HandleBrandFilter} />
                                                    <label htmlFor="" value={`brand-${item.id}`} className='ps-2'>{item.name}</label>
                                                </li>
                                            ))
                                        }
                                        {/* <li className='mb-2'>
                                            <input type="checkbox" />
                                            <label htmlFor="" className='ps-2'>Puma</label>
                                        </li>
                                        <li className='mb-2'>
                                            <input type="checkbox" />
                                            <label htmlFor="" className='ps-2'>Levi's</label>
                                        </li>
                                        <li className='mb-2'>
                                            <input type="checkbox" />
                                            <label htmlFor="" className='ps-2'>Nike</label>
                                        </li>
                                        <li className='mb-2'>
                                            <input type="checkbox" />
                                            <label htmlFor="" className='ps-2'>Fling Machine</label>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-9'>
                            <div className='row pb-5'>
                                {
                                    product && product.map((item)=>(
                                        <div className='col-md-4 col-6'>
                                            <div className='product card border-0'>
                                                <div className='card-img'>
                                                    <Link to="/product">
                                                        <img src={item.image_url} alt="" style={{ width: '100%' }} />
                                                    </Link>
                                                </div>
                                                <div className='card-body pt-3'>
                                                    <Link className='mt-3' to="/product">{item.title}</Link>
                                                    <div className='price'>
                                                        ${item.price}  <span className='text-decoration-line-through'>${item.compared_price} </span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))
                                }
                                
                                {/* <div className='col-md-4 col-6'>
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
                                <div className='col-md-4 col-6'>
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
                                <div className='col-md-4 col-6'>
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
                                <div className='col-md-4 col-6'>
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
                                <div className='col-md-4 col-6'>
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


                    </div>

                </div>





            </Layout>
        </>
    )
}

export default Shop
