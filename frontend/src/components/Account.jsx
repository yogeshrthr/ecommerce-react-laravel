import React, { useEffect,useContext } from 'react'
import Layout from './common/Layout';
import { Link, useParams} from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import ProductImgOne  from '../assets/images/mens/five.jpg';
// import ProductImgTwo  from '../assets/images/mens/six.jpg';
// import ProductImgThree  from '../assets/images/mens/eight.jpg';
import { UserAuthContext } from './Context/UserAuth';


import { Rating } from 'react-simple-star-rating'
import { useState } from 'react';


const Account = () => {
    const product_id=useParams().id;
    const [ratingValue, setRatingValue] = useState(4)
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const  { Logout } = useContext(UserAuthContext)
    const handleLogout=()=>{
        Logout();
    }
   
    return (
        <>
            <Layout>

                <div className='container product-detail'>
                    <div className='row  '>
                         <div className='col-md-12 mt-3'>
                             <nav aria-label="breadcrumb ">
                                 <h5>Profile</h5>
                             </nav>

                         </div>

                     </div>
                     <div className='row mt-5 mb-5'>
                        <div className='col-md-3 '>
                            <div className="card shadow mb-5" >
                            <div className="card-body sidebar">
                                <ul>
                                    <li>
                                        <Link className='link' to="/admin/dashboard">Dashboard</Link>                            
                                    </li>
                                    <hr className="mb-2" />
                                    <li>
                                        <Link className='link active' to="/admin/category">Categories</Link>                            
                                    </li>                                  
                                    <hr className="mb-2" />
                                    <li>
                                        Change Password
                                    </li>
                                    <hr className="mb-2" />
                                    <li style={{ cursor: 'pointer' }} onClick={handleLogout}>
                                        Logout
                                    </li>
            
                                </ul>
                            </div>
                        </div>
                        </div>
                        <div className='col-md-9'>
                            <form action="">
                                <div class="mb-3">
                                    <div className='row mb-2'>
                                        <div className='col-md-6'>                                       
                                            <label for="exampleFormControlInput1" class="form-label">Name</label>
                                            <input type="text" class="form-control" id="Name" placeholder="Name" />
                                        </div>
                                        <div className='col-md-6'>                                       
                                            <label for="Email" class="form-label">Email</label>
                                            <input type="email" class="form-control" id="Email" placeholder="name@example.com" />
                                        </div>
                                    </div>                                    
                                    <div className='row mb-2'>
                                        <div className='col-md-6'>                                       
                                            <label for="Pincode" class="form-label">Pincode</label>
                                            <input type="text" class="form-control" id="Pincode" placeholder="Pincode" />
                                        </div>
                                        <div className='col-md-6'>                                       
                                            <label for="Mobile" class="form-label">Mobile</label>
                                            <input type="number" class="form-control" id="Mobile" min="0" placeholder="Mobile" />
                                        </div>
                                    </div>   
                                    <div className='row mb-2'>
                                        <div className='col-md-12'>                                       
                                            <label for="Address" class="form-label">Address</label>
                                           <textarea class="form-control" name="" id="">
                                            </textarea>
                                        </div>
                                        
                                    </div>                                    
                                </div>
                                
                            </form>
                        </div>
                    </div>                    
                </div>
            </Layout>
        </>
    )
}

export default Account
