import React, { useContext, useState, } from 'react'


import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import Layout from './common/Layout';
import {apiUrl} from './common/http'
import { UserAuthContext } from './Context/UserAuth';
import { toast } from 'react-toastify';

const Login = () => {
    const { login } =useContext(UserAuthContext)
 
     const navigate = useNavigate();
 
     const {
         register,
         handleSubmit,
         watch,
         formState: { errors },
     } = useForm()
 
   const onSubmit= async (data)=>{
         console.log(data)
         const res= await fetch(`${apiUrl}/login`,{
             method:'Post',
             headers: {
                 "content-type":'application/json'
             },
             body:JSON.stringify(data)
         }).then(res=>res.json())
         .then(result=>{
            //  console.log(result)
 
             if(result.status==200){
                 const userInfo={
                     token:result.token,
                     id:result.id,
                     name:result.name
                 }
                 localStorage.setItem('userInfo',JSON.stringify(userInfo))    
                 login(userInfo)
                 toast.success(result.message)
 
                 navigate('/account')
 
             }else{
                 toast.error(result.message)
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
                            <h3>Login</h3>
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
