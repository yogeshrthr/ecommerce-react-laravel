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
import Sidebar from './Sidebar';
import { useForm } from 'react-hook-form';
import { apiUrl, userToken } from './common/http';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Loader from './common/Loader';


const Account = () => {
    
    const {
            register,
            handleSubmit,
            watch,
            formState: { errors }
        } = useForm();

    const product_id=useParams().id;
    const [loader, setLoader] = useState(true)
    const [flag, setFlag] = useState(false);   

    const handlAccountsubmit=(data)=>{
        setFlag(true)
        fetch(apiUrl+`/update-account-info`,{
            method:"POST",
            headers:{
                'Content-Type':"application/json",
                'Accept':"application/json",
                'Authorization':`Bearer ${userToken()}`

            },
            body:JSON.stringify(data)
        }).then(res=>{
            return res.json().then(errData=>{
                if(!res.ok){
                    const error=Error(errData.messsage||"Unexpected Error!")
                    error.status=errData.status
                    error.error=errData.error
                    throw error;
                }
                return errData;
            })
        }).then(result=>{
           toast.success(result.message)
        }).catch(err=>{
             if(err.status==403){
                toast.error(err.message ||"Request Denied!")
            }else if(err.status==404){
                toast.error(err.message ||"Not found!")
            }else if(err.status==401){
                toast.error(err.message ||"Un-authenticate!")
            }else if(err.status==400){
                let temp=''
                Object.keys(err.error).forEach(key => {
                    err.error[key].forEach(message => {
                        temp += message + '<br/>';
                    });
                });              
                Swal.fire({
                    icon: "error",
                    title: "Validation Error!",
                    html: temp,
                });
            }else{
                toast.error(err.message ||"Somethign went wrong!")
            }
        }).finally(()=>{
            setLoader(false)
            setFlag(false)
        })

    }
    const fetchDe
   
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
                            <Sidebar/>
                        </div>
                       
                        <div className='col-md-9'>
                            <div className='card shadow p-3'>
                                <form action="#" onSubmit={handleSubmit(handlAccountsubmit)}>
                                    <div className="mb-3">
                                        <div className='row mb-2'>
                                            <div className='col-md-6'>                                       
                                                <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                                                <input type="text" className={`form-control ${errors.state && "is-invalid"}`} id="Name" placeholder="Name" 
                                                {...register('name',{
                                                            required:"Name is Required",
                                                            pattern:{
                                                               value: /^[A-Za-z_ -]+$/,
                                                                message:"Only alphabets and spaces are allowed."
                                                            }
                                                        })
                                                    }
                                                />
                                                <span className='pt-2' style={{color:'red'}}>{errors.name? errors.name.message:''}</span>
                                            </div>
                                            
                                            <div className='col-md-6'>                                       
                                                <label htmlFor="Email" className="form-label">Email</label>
                                                <input type="email" className={`form-control ${errors.email && "is-invalid"}`}  id="Email" placeholder="name@example.com"
                                                {...register('email',{
                                                            required:"Email is Required",
                                                            pattern:{
                                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                                message: "Please enter a valid email address"
                                                            }
                                                        })
                                                    }
                                                />
                                                <span className='pt-2' style={{color:'red'}}>{errors.email? errors.email.message:''}</span>
                                            </div>
                                        </div>                                    
                                        <div className='row mb-2'>
                                            <div className='col-md-6'>                                       
                                                <label htmlFor="Pincode" className="form-label">Pincode</label>
                                                <input type="text" className={`form-control ${errors.pincode && "is-invalid"}`}  id="Pincode" placeholder="Pincode"
                                                {
                                                    ...register('pincode',{
                                                            required:"Pincode is Required",
                                                            pattern:{
                                                                value:/^[0-9]{6}$/,
                                                                message:"Enter Vlaid Pincode Number."
                                                            }
                                                        })
                                                    }
                                                />
                                                <span className='pt-2' style={{color:'red'}}>{errors.pincode? errors.pincode.message:''}</span>
                                            </div>
                                            
                                            <div className='col-md-6'>                                       
                                                <label htmlFor="Mobile" className="form-label">Mobile</label>
                                                <input type="number" className={`form-control ${errors.mobile && "is-invalid"}`} id="Mobile" min="0" placeholder="Mobile"
                                                
                                                    {...register('mobile',{
                                                            required:"Mobile is Required",
                                                            pattern:{
                                                                value:/^[6-9][0-9]{9}$/,
                                                                message:"Enter Vlaid Mobile Number."
                                                            }
                                                        })
                                                    }
                                                />
                                                <span className='pt-2' style={{color:'red'}}>{errors.mobile? errors.mobile.message:''}</span>
                                            </div>
                                            
                                        </div>   
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <label htmlFor="city" className='form-lable'>City</label>
                                                <input type="text" id='city' className={`form-control ${errors.city && "is-invalid"}`} 
                                                {...register('city',{
                                                            required:"City is Required",
                                                            pattern:{
                                                                value: /^[A-Za-z_ -]+$/,
                                                                message:"Only alphabets and spaces are allowed"
                                                            }
                                                        })
                                                    }
                                                />
                                                <span className='pt-2' style={{color:'red'}}>{errors.city? errors.city.message:''}</span>
                                            </div>
                                            
                                            <div className='col-md-6'>
                                                <label htmlFor="state" className='form-lable'>State</label>
                                                <input type="text" id="state" className={`form-control ${errors.state && "is-invalid"}`}   
                                                    {...register('state',{
                                                            required:"State is Required",
                                                            pattern:{
                                                                value:/^[A-Za-z_ -]+$/,
                                                                message:"Only alphabets and spaces are allowed"
                                                            }
                                                        })
                                                    }
                                                />
                                                <span className='pt-2' style={{color:'red'}}>{errors.state? errors.state.message:''}</span>
                                            </div>
                                        </div>
                                        <div className='row mb-2'>
                                            <div className='col-md-12'>                                       
                                             <label htmlFor="address" className={`form-label `}>Address</label>
                                            <textarea className={`form-control ${errors.address && "is-invalid"}`} name=""  id="address"
                                            {...register('address',{
                                                    required:"Address is Required",
                                                })
                                            }
                                            >
                                            </textarea>
                                            <span className='pt-2' style={{color:'red'}}>{errors.address? errors.address.message:''}</span>
                                            </div>

                                            
                                        </div>                                    
                                        
                                    </div>
                                    <input  type="submit" className={`btn btn-primary ${flag?'disabled':''}`}  name="" id="" />
                                    
                                </form>
                            </div>
                        </div>
                       
                    </div>                    
                </div>
            </Layout>
        </>
    )
}

export default Account
