import React, { useEffect, useState } from 'react'
import Layout from './common/Layout'
import { apiUrl, userToken } from './common/http'
import { useRef } from 'react'
import { useParams,Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from './common/Loader'
const OrderConfirmation = () => {
    const [loader,setLoader]=useState(true)
    const { id } = useParams(); // get the id from URL
    const [orderDetails,setOrderDetails]=useState([]);
    const getOrderDetails= async()=>{
         await fetch(apiUrl+`/order-confirmation/`+id,{
            method:'GET',
            headers:{
                'Accept':"application/json",
                // 'Content-type':"application/json",
                'Authorization':`Bearer ${userToken()}`
            }
        }).then(res=>{
            
                return res.json().then(errData=>{
                    if(!res.ok){
                        const error = new Error(errData.message || "Unknown error")
                        error.status = res.status;
                        error.errors = res.error;
                        throw error; // Goes to .catch()
                    }
                    return errData; // <--- return parsed JSON for success
                })                
            
        }).then(result=>{
            setOrderDetails(result.data)
        }).catch(err=>{
            if(err.status==404){
                toast.error(err.message || 'Data not found!')
            }else{
                toast.error(err.message || 'Somethign Went wrong!')
            }
        }).finally(()=>{
            setLoader(false)
        })
    }
    let status_bdg='not_paid';
    useEffect(()=>{
        getOrderDetails();        
    },[]);

  return (
    <>
        <Layout>

            <div className='container product-detail mt-4'>
                {
                    loader?<Loader></Loader>:
                    <>
                        <div className=' '>
                            <div className='col-md-12 mt-3'>
                            <div className='text-center'>
                                <h2 style={{color:"green"}}> 
                                <strong>Thank You!</strong>
                            </h2>                           
                            Your order has been Successfully Placed.
                            </div>
                            

                            </div>
                        </div>
                        <div className='col-md-12 mt-3 mb-5'>
                        <div className='card card-shadow  shadow'>
                            <div className='ms-2 me-2 '>                     
                                <h3 className='mt-2'>  <strong>Order Summary</strong></h3>
                                <hr />
                                <div className='row'> 
                                    <div className='col-md-6'>
                                        <p>                               
                                            <strong>Order Id:</strong> #{orderDetails.id??0}
                                        </p>
                                        <p>                               
                                            <strong>Date:</strong> {orderDetails.order_date??'N/A'}
                                        </p>
                                        <p>  {
                                            status_bdg =orderDetails.paymet_status=='not_paid'?'warning':'success'
                                            }                        
                                            <strong>Status:</strong> <span className={`badge bg-success ${status_bdg}`} >Paid</span> 
                                            {/* warning  */}
                                        </p>
                                        <p>                               
                                            <strong>Payment Method:</strong> COD
                                        </p>
                                    </div>
                                    <div className='col-md-6'>
                                        <p>                               
                                            <strong>Cusomer:</strong> {orderDetails.name??'N/A'}
                                        </p>
                                        <p>    
                                                                        
                                            <strong>Address:</strong> {orderDetails.full_address??'N/A'} 
                                        </p>
                                        <p>                               
                                            <strong>Contact:</strong> {orderDetails.mobile??'N/a'}
                                        </p>
                                    </div>
                                    <div className='col-md-12 p-4 '>
                                        <table className='p-5 table table-bordered border'  >
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Item
                                                    </th>
                                                    <th>
                                                        Qty
                                                    </th>
                                                    <th>
                                                        Price
                                                    </th>
                                                    <th>
                                                        Total
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    orderDetails.items &&  orderDetails.items.map((dt)=>{
                                                        return( 
                                                            <tr>
                                                                <td>
                                                                    {dt.product_name??'N/a'}
                                                                </td>
                                                                <td>
                                                                        {dt.qty??'0'}
                                                                </td>
                                                                <td>
                                                                    ${dt.unit_price??'0'}

                                                                </td>
                                                                <td>
                                                                        ${dt.price??'0'}

                                                                </td>
                                                            </tr>
                                                

                                                        )
                                                    })
                                                }
                                                

                                                <tr>
                                                    
                                                    <td   style={{ paddingRight: '15px', fontWeight: 'bold', whiteSpace: 'nowrap' }} colSpan="3"  className='text-end' >
                                                        SubTotal

                                                    </td>
                                                    <td >
                                                        ${orderDetails.sub_total??0}

                                                    </td>
                                                </tr>
                                                <tr>
                                                    
                                                    <td  colSpan="3" style={{ paddingRight: '15px', fontWeight: 'bold', whiteSpace: 'nowrap' }} className='text-end' >
                                                    Shipping

                                                    </td>
                                                    <td >
                                                        ${orderDetails.shipping??0}

                                                    </td>
                                                </tr>
                                                <tr>
                                                    
                                                    <td  style={{ paddingRight: '15px', fontWeight: 'bold', whiteSpace: 'nowrap' }} colSpan="3" className='text-end' >
                                                    Grand Total

                                                    </td>
                                                    <td >
                                                        ${orderDetails.grand_total??0}

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='d-flex justify-content-center p-2'>
                                        <div className='m-1'>
                                            <button className='btn btn-primary' >View Order Details</button>
                                        </div>
                                        <div className='m-1'>
                                            <Link to={'/'}>
                                            <button className='btn btn-outline-secondary' >Continue Shopping</button></Link>
                                        </div>
                                    </div>
                                </div>                               
                            </div>
                        </div>
                        </div>
                    </>
                }
                    

                </div>
        </Layout>
    </>
  )
}

export default OrderConfirmation
