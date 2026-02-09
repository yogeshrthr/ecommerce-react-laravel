import React, { useContext, useState, } from 'react'


import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import Layout from './common/Layout';
import {apiUrl} from './common/http'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Login = () => {
 
     const navigate = useNavigate();
 
     const {
         register,
         handleSubmit,
         watch,
         formState: { errors },
     } = useForm()
 
   const onSubmit= async (data)=>{
         console.log(data)
         const res= await fetch(`${apiUrl}/register`,{
             method:'Post',
             headers: {
                 "content-type":'application/json'
             },
             body:JSON.stringify(data)
         }).then(res=>{
            return res.json().then(errData=>{
                if(!res.ok){
                    const error=Error(errData.message||"Unexpected Error!")
                    error.status=errData.status
                    error.error=errData.errors
                    throw error;
                }
                return errData;
            })
        }).then(result=>{
            //  console.log(result)
 
             if(result.status==200){
                 toast.success(result.message) 
                 navigate('/login')
 
             }else{
                 toast.error(result.message)
             }
         }).catch(err=>{
            if(err.status==403){
                toast.error(err.message ||"Request Denied!")
            }else if(err.status==404){
                toast.error(err.message ||"Not found!")
            }else if(err.status==401){
                toast.error(err.message ||"Un-authenticate!")
            }else if(err.status==422){
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
         })
 
   }
 
  return (
    <div>      
        <Layout>           
            <div className='container  d-flex justify-content-center py-5'>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className='card shadow border-0 login' >
                        <div className='card-body p-4'>
                            <h3>User Login</h3>
                            <div className='mb-3'>
                                <label htmlFor="" className='form-label'>Name</label>
                                <input
                                {
                                    ...register('name',{
                                        required:"The Name  field is required.",
                                        pattern: {
                                            value: /^[A-Z0-9._ -]+$/i,
                                            message: "Invalid email address"
                                        } 
                                    })
                                }
                                
                                type="text" className={`form-control ${errors.name && 'is-invalid'}` } placeholder='Name' />

                                {
                                    errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                                }
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="" className='form-label'>Email</label>
                                <input
                                {
                                    ...register('email',{
                                        required:"The email field is required.",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        } 
                                    })
                                }
                                
                                type="text" className={`form-control ${errors.email && 'is-invalid'}` } placeholder='Email' />

                                {
                                    errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                                }
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="" className='form-label'>Password</label>
                                <input
                                {
                                    ...register('password',{
                                        required:"The Password field is required"
                                    })
                                }
                                type="password" className={`form-control ${errors.password && 'is-invalid'}` } placeholder='Password' />

                                {
                                    errors.password && <p className='invalid-feedback'>{errors.password?.message}</p>
                                }
                            </div>
                            <button className='btn btn-secondary'>Login</button>
                        </div>


                    </div>
                </form>

            </div>
        </Layout>
    </div>
  )
}

export default Login
