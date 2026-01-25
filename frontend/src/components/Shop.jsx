import React, { useEffect,useState,useContext } from 'react'
import Layout from './common/Layout';
import ProductImg from '../assets/images/mens/eight.jpg';
import { Link } from 'react-router-dom';
import { apiUrl } from './common/http';
import {useSearchParams  } from 'react-router-dom';
import { CategoryContext } from './Context/CategoryContext';


const Shop = () => {
    // 4. Access the global category data
    const category = useContext(CategoryContext);
    console.log(category)

    // const [category , setCategory]=useState([]);
    const [brand , setBrand]=useState([]);
    const [product , setProducts]=useState([]);
    // const [categoryChecked , setCategoryChecked]=useState([]);
    // const [brandChecked , setBrandChecked]=useState([]);
    const [searchParamsUrl , setSearchParmsUrl]=useSearchParams();
    const [defaultCategory , setDefaultCategory]=useState([]);
    const [defaultBrand , setDefaultBrand]=useState([]);
    const [pagination, setPagination] = useState(null);

    const [categoryChecked, setCategoryChecked] = useState(() => {
        // This runs ONLY once when the tab opens
        const params = new URLSearchParams(window.location.search);
        const cat = params.get('category');
        return cat ? cat.split(',') : [];
    });

    const [brandChecked, setBrandChecked] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        const brand = params.get('brand');
        return brand ? brand.split(',') : [];
    });
    // const fetchCatgories=(()=>{
       

    //     fetch(apiUrl+`/get-category`,{
    //         method:'GET',
    //         Headers:{
    //             'Accept':'application/josn',
    //             'content-type':'application/josn',

    //         },
    //     }).then(res=>res.json())
    //     .then(result=>{
    //         console.log(result)
            
    //         setCategory(result.data)

    //     })
    // })
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
    const getProducts=(page=1)=>{
        // 1. Create a copy of the CURRENT parameters in the URL
        const newParams = new URLSearchParams(searchParamsUrl);

        // 2. Handle Category
        if (categoryChecked.length > 0) {
            newParams.set('category', categoryChecked.join(','));
        } else {
            newParams.delete('category'); // Clear it from URL if nothing is checked
        }

        // 3. Handle Brand
        if (brandChecked.length > 0) {
            newParams.set('brand', brandChecked.join(','));
        } else {
            newParams.delete('brand'); // Clear it from URL if nothing is checked
        }

        // 4. Update the URL bar
        setSearchParmsUrl(newParams);
        // console.log(searchParamsUrl.get('category'))
        // console.log(search)
        fetch(apiUrl+`/get-products?${newParams}&page=${page}`,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'content-type':'application/json',
            },
        }).then(res=>res.json())
        .then(result=>{
           
            setProducts(result.data.data)
            setPagination(result.data);
             console.log(product)
        })
    }
    const HandleFilter = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            // Use a Set or check includes to prevent duplicates in state
            setCategoryChecked(prev => prev.includes(value) ? prev : [...prev, value]);
        } else {
            // Use the functional 'prev' to ensure you're filtering the latest state
            setCategoryChecked(prev => prev.filter(item => item !== value));
        }
    };

    const HandleBrandFilter = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            setBrandChecked(prev => prev.includes(value) ? prev : [...prev, value]);
        } else {
            setBrandChecked(prev => prev.filter(item => item !== value));
        }
    };
    useEffect(()=>{
        // fetchCatgories();
        fetchBrand();
        getProducts();

        
    },[categoryChecked,brandChecked])

    useEffect(() => {
        const categoryFromUrl = searchParamsUrl.get('category');
        if (categoryFromUrl) {
            // Convert "1,2" into ["1", "2"]
            // IMPORTANT: Use String or Number consistently. 
            // If item.id is a Number, use .map(Number) here.
            const ids = categoryFromUrl.split(',').map(id => id.trim());
            setDefaultCategory(ids);
        } else {
            setDefaultCategory([]);
        }
        const brandFromUrl = searchParamsUrl.get('brand');
        if (brandFromUrl) {
            // Convert "1,2" into ["1", "2"]
            // IMPORTANT: Use String or Number consistently. 
            // If item.id is a Number, use .map(Number) here.
            const ids = brandFromUrl.split(',').map(id => id.trim());
            setDefaultBrand(ids);
        } else {
            setDefaultBrand([]);
        }
    }, [searchParamsUrl]);
    return (
        <>
            {/* <Layout> */}
                {/* <Hero /> */}

                <div className='container pb-5'>
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
                                                    <input type="checkbox" value={item.id} onChange={HandleFilter} 
                                                    checked={defaultCategory.includes(String(item.id))}
                                                    />
                                                    <label htmlFor="" value={item.id} className='ps-2'>{item.name}</label>
                                                     {console.log(defaultCategory,item.id,defaultCategory.includes(item.id))}
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
                                                    <input type="checkbox"
                                                    checked={defaultBrand.includes(String(item.id))}
                                                    id={`brand-${item.id}`} value={item.id} onChange={HandleBrandFilter} />
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
                        <div className='col-md-9' style={{ height: '700px', overflowY: 'auto' }}>
                            <div className='row pb-5'>
                                {
                                    product && product.map((item)=>(
                                        <div className='col-md-4 col-6'>
                                            <div className='product card border-0'>
                                                <div className='card-img'>
                                                    <Link to={`/product/${item.id}`}>
                                                        <img src={item.image_url} alt="" style={{ width: '100%' }} />
                                                    </Link>
                                                </div>
                                                <div className='card-body pt-3'>
                                                    <Link className='mt-3' to={`/product/${item.id}`}>{item.title}</Link>
                                                    <div className='price'>
                                                        ${item.price}  <span className='text-decoration-line-through'>${item.compared_price} </span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))
                                }
                                
                                 {/* paginate  */}
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                {/* Showing info like: Showing 1 to 10 of 50 entries */}
                                <div className="text-muted">
                                    Showing {pagination?.from} to {pagination?.to} of {pagination?.total} entries
                                </div>

                                <nav>
                                    <ul className="pagination mb-0">
                                        {/* Previous Button */}
                                        <li className={`page-item ${pagination?.current_page === 1 ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => getProducts(pagination.current_page - 1)}>
                                                &laquo;
                                            </button>
                                        </li>

                                        {/* Loop through total pages and create numbers */}
                                        {pagination && [...Array(pagination.last_page).keys()].map((number) => {
                                            const page = number + 1;
                                            return (
                                                <li key={page} className={`page-item ${pagination.current_page === page ? 'active' : ''}`}>
                                                    <button className="page-link" onClick={() => getProducts(page)}>
                                                        {page}
                                                    </button>
                                                </li>
                                            );
                                        })}

                                        {/* Next Button */}
                                        <li className={`page-item ${pagination?.current_page === pagination?.last_page ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => getProducts(pagination.current_page + 1)}>
                                                &raquo;
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            {/* End paginate  */}
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





            {/* </Layout> */}
        </>
    )
}

export default Shop
