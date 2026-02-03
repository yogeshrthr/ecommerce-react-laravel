import React,{useContext, useEffect} from 'react'
import Layout from './common/Layout'
import { Link, useNavigate } from 'react-router-dom';
import ProductImg from '../assets/images/mens/six.jpg';
import  { useState } from 'react'
import { CartContext } from './Context/AddToCart';
import { useForm } from 'react-hook-form';
import { apiUrl, userToken } from './common/http';

const CheckOut = () => {

    const {  cartData,shippingCharge, subTotal,grandTotal } =useContext(CartContext)

    const [paymentMethod ,setPaymentMethod]=useState('');
    const HandlePaymentMethod= (e)=>{
        setPaymentMethod(e.target.value)
    }

    
     const navigate = useNavigate();
 
     const {
         register,
         handleSubmit,
         watch,
         formState: { errors },
     } = useForm()
     const processOrder=(data)=>{


           const token = userToken(); // safe retrieval
            // Optionally handle missing token globally here
            if (!token) {
                console.log("No token found, redirect to login or show error");
                return;
            }

        // console.log(data);
        
        // 2️⃣ Create FormData object
        const submissionData = new FormData();

        // 3️⃣ Append all original fields
         // Append normal fields
            Object.entries(data).forEach(([key, value]) => {
                submissionData.append(key, value);
            });

            // Append cart as JSON string
            submissionData.append("cart", JSON.stringify(cartData));
        console.log(submissionData,cartData,data)
        fetch(apiUrl+`/save-order`,{
            method:'POST',
            headers:{
                "Content-type":"json/Application",
                "Accept":"json/Application",
                'Authorization': `Bearer ${userToken()}`,
            },
           body: JSON.stringify(submissionData),

        }).then(res => res.json()).then(result=>{
             console.log(result)
        
        })
           

     }
 
    return (
        <Layout>

            <div className='container pb-5'>
                <div className='row'>
                    <div className='col-md-12'>
                        <nav aria-label="breadcrumb ">
                            <ol className="breadcrumb py-4">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item  active" aria-current="page"><Link to="/checkout">Checkout</Link></li>

                            </ol>
                        </nav>

                    </div>

                    <form onSubmit={handleSubmit(processOrder)}>
                        <div className='row'>
                            <div className='col-md-7'>
                                <h3 className='border-bottom pb-3'><strong>Billing Details</strong> </h3>                           
                                <div className='row pt-3'>
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input type="text" className= {`form-control ${errors.name ? "is-invalid" : ""}`} id="name" placeholder=' Name'
                                            
                                            {...register('name',{
                                               required:"Name shoud't be Empty!." ,
                                               pattern: {
                                                    value: /^[A-Za-z0-9-_\s]+$/,
                                                    message: "Name should contain only letters"
                                                }
                                            })}
                                            />
                                            {errors.name && (
                                            <p className="text-danger mt-1">
                                                {errors.name.message}
                                            </p>
                                        )}
                                        </div>
                                         
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input type="email" className={`form-control ${errors.email?'is-invalid':""}`} id="email" placeholder='Email' 
                                            {...register('email',{
                                                required:"Email is required!",
                                                pattern:{
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                            />
                                             {errors.email && (<p className="text-danger mt-1">{errors.email.message} </p>)}
                                        </div>
                                       
                                    </div>
                                    <div className='col-md-12'>
                                        <div className='mb-3'>
                                            <textarea name="" className={`form-control ${errors.address?"is-invalid":""}`} id="address" placeholder="Address" row="4"
                                            {...register('address',{
                                                required:"Address Field is Required!.",
                                                pattern:{

                                                }
                                            })}
                                            ></textarea>
                                            {errors.address && (<p className='text-danger mt-1'> {errors.address.message}</p>)}

                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input type="text" className={`form-control ${errors.city?"is-invalid":""}`}  id="city" placeholder='City'
                                            {...register('city',{
                                                required:"City field is required!",
                                                pattern:{
                                                    value: /^[A-Za-z ]+$/i,
                                                    message: "City is Invalid!"
                                                }
                                            })} 
                                            />
                                            {errors.city && (<p className='text-danger mt-1'> {errors.city.message}</p>)}
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input type="text" className={`form-control ${errors.state?"is-invalid":""}`}  id="state" placeholder='State' 
                                            {...register('state',{
                                                required:"State field is required!",
                                                pattern:{
                                                    value: /^[A-Za-z ]+$/i,
                                                    message: "State is Invalid!"
                                                }
                                                
                                            })}
                                           />
                                             {errors.state && (<p className='text-danger mt-1'> {errors.state.message}</p>)}
                                        </div>

                                    </div>
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input type="text" className={`form-control ${errors.zip?"is-invalid":""}`} id="zip" placeholder='Zip' 
                                            {...register("zip",{
                                                required:"zip Code is required!",
                                                pattern:{
                                                    value: /^[1-9][0-9]{5}$/,
                                                    message: "Zip Code Invalid!"
                                                }
                                            })}
                                            />
                                            {errors.zip && (<p className='text-danger mt-1'> {errors.zip.message}</p>)}
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input type="text" className={`form-control ${errors.mobile?"is-invalid":""}`} id="mobile" placeholder='Mobile'
                                            {...register("mobile",{
                                                required:"Mobile Code is required!",
                                                pattern:{
                                                    value: /^[6-9][0-9]{9}$/,
                                                    message: "Mobile number must start with 6-9 and be 10 digits"
                                                }
                                            })}
                                            />
                                            {errors.mobile && (<p className='text-danger mt-1'> {errors.mobile.message}</p>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-5'>
                                <h3 className='border-bottom pb-3'> <strong>Items</strong>  </h3>
                                <table className='table mt-5'>
                                    <tbody>
                                        {
                                            cartData && cartData.map((item)=>{                                            
                                            return (
                                                <tr> 
                                                    <td width={100}>
                                                        <img src={item.image_url} width={80} alt="" />
                                                    </td>
                                                    <td width={600}>
                                                        <h4> {item.product_name}</h4>
                                                        <div className='pt-3 d-flex align-items-center'>
                                                            <span> ${item.price??0}</span>
                                                            <div className='ps- '>
                                                                <button className='btn btn-size'>{item.sizeName}</button>
                                                            </div>
                                                            <div className='ps-5'>
                                                                X {item.qty??0}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                )
                                            })
                                        
                                        }
                                    </tbody>
                                </table>


                                <div className='row '>
                                    <div className='col-md-12'>
                                        <div className='d-flex justify-content-between border-bottom pb-2 mb-2'>
                                            <div><strong>Subtotal: </strong> </div>
                                            <div>${subTotal()}</div>
                                        </div>
                                        <div className='d-flex justify-content-between border-bottom  py-2'>
                                            <div> <strong>Shipping: </strong> </div>
                                            <div>${shippingCharge()}</div>
                                        </div>
                                        <div className='d-flex justify-content-between   py-2'>
                                            <div><strong>Grand Total: </strong></div>
                                            <div>${grandTotal()}</div>
                                        </div>
                                    </div>

                                </div>

                                <h3 className='border-bottom pb-3 pt-3'> <strong>Payment Method</strong>  </h3>
                                <div className='pt-2'>
                                    <input onClick={HandlePaymentMethod} value={'stripe'} checked={paymentMethod=='stripe'}
                                    className='ps-2' type="radio"
                                        {...register("paymentMethod", {
                                            required: "Please select a payment method"
                                        })}
                                    
                                    />
                                    <label className='ps-2' htmlFor="">Stripe</label>
                                    <input onClick={HandlePaymentMethod} value={'cod'} checked={paymentMethod=='cod'}
                                        className='ms-3' type="radio" 
                                        {...register("paymentMethod", {
                                            required: "Please select a payment method"
                                        })}
                                    />
                                    <label className='ps-2' htmlFor="">Cod</label>

                                </div>
                                {errors.paymentMethod && (
                                    <p className="text-danger mt-1">
                                        {errors.paymentMethod.message}
                                    </p>
                                )}
                                <div className='d-flex py-3'>
                                    <button className='btn btn-primary'>Pay Now</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>

            </div>

        </Layout>
    )
}

export default CheckOut
