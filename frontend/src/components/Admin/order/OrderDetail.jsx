import React, { useEffect, useState } from 'react'
import Layout from '../../common/Layout'
import Sidebar from '../Sidebar'
import { adminToken, apiUrl, userToken } from '../../common/http'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
const OrderDetail = () => {
    const {id} = useParams();
    const [orderDetails , setOrderDetails]=useState([]);

    const statsuConfg={
        pending:{color:'warning',text:'Pending'},
        success:{color:'success',text:'Deliverd'},
        shipped:{color:'primary',text:'Shipped'},
        cancelled:{color:'danger',text:'Cancelled'},
    }

    const fetchOrderDetails= async()=>{
        await fetch(apiUrl+`/admin/order-detail/${id}`,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                "Authorization":`Bearer ${adminToken()}`
            },
        }).then(res=>{
            return res.json().then(errData=>{
                if(!res.ok){
                    const error = Error(errData.message|| 'unexpected error');
                    error.status=errData.status||500
                    error.error=errData.error||[]
                    throw error;
                }
                return errData;
            })
        }).then(result=>{
            setOrderDetails(result.data);
        }).catch(err=>{
            if(err.status==403){
                toast.error(err.message ||"Request Denied!")
            }else if(err.status==404){
                toast.error(err.message ||"Not found!")
            }else if(err.status==401){
                toast.error(err.message ||"Un-authenticate!")
            }else{
                 toast.error(err.message ||"Somethign went wrong!")
            }
            // console.log(err)
        })
    }

    const handStatusChange=(e)=>{
        console.log(e.target.value);
        fetch(apiUrl+`update-status/${id}`,{
            method:'POST',
            headers:{
                'Accept':"application/json",
                'Content-Type':"application/json",
                'Authorization':`Bearer ${adminToken()}`
            },
            data:{'status':e.target.value}
        }).then(res=>{
            return res.json().then(errrData=>{
                const error=Error(errData.messsage|| 'unexpected error');
                error.status=errData.status;
                error.error=errData.error;
                throw error;
            })
            return errrData;
        }).then(result=>{
            toast.success(result.message||'Success')
       }).catch(err=>{
            if(err.status==403){
                toast.error(err.message ||"Request Denied!")
            }else if(err.status==404){
                toast.error(err.message ||"Not found!")
            }else if(err.status==401){
                toast.error(err.message ||"Un-authenticate!")
            }else if(err.status==400){
                console.log(err.error)
                toast.error(err.message ||"Un-authenticate!")
            }else{
                 toast.error(err.message ||"Somethign went wrong!")
            }
            // console.log(err)
        })


    }
    useEffect(()=>{
     fetchOrderDetails();
        
    },[])
  return (
    <>
    <Layout>
        <div className='container'>
            <div className='row py-5'>
                <div className='h4 pb-0 mb-0'>
                    Order Details
                </div>
                <div className='col-md-3'>
                    <Sidebar></Sidebar>

                </div>
                <div className='col-md-7 '>
                    <div className='card shadow mb-5 .shadow p-4'>
                        <div className='row'>
                            <div className='col-md-4 col-sm-4'>
                                <span><strong>Order : #{orderDetails.id}</strong></span><br></br>
                                 <span class={`badge bg-${statsuConfg[orderDetails.status]?.color || 'dark'}`}>
                                    {statsuConfg[orderDetails.status]?.text || 'N/A'}</span>
                             
                            </div>
                            <div className='col-md-4 col-sm-4'>
                                <span>Date</span><br></br>
                                <span className=''>{orderDetails.order_date}</span>

                            </div>
                            <div className='col-md-4 col-sm-4'>
                                <span>Order Status</span><br></br>
                                  <span class={`badge bg-${orderDetails.payment_status=='paid'?'success':'danger'}`}>
                                    {orderDetails.payment_status=='paid'?'Paid':'Not Paid'}</span>     

                            </div>
                        </div>
                        <div className='row mt-4' >
                            <div className='col-md-4 col-sm-4'>
                                <span><strong>{orderDetails.name}</strong></span><br></br>
                                <span className=''>{orderDetails.full_address}</span>
                            </div>
                            <div className='col-md-4 col-sm-4'>
                                <span>Payment Method</span><br></br>
                                <span className=''>stripe</span>
                            </div>
                            
                        </div>
                        <div className='row mt-5'>
                            <h5><b>Items</b></h5>
                            <table className='table '>
                                <tbody>
                                    {
                                       orderDetails.items && orderDetails.items.map((dt)=>{
                                        return (
                                            <tr >
                                                <td>
                                                    <div className='d-flex'>
                                                        <img width="20%" src={dt.product.image_url} alt="" />
                                                        <div className='p-2'>
                                                            <p>{dt.product_name}</p>
                                                            <button className='btn btn-sm '  style={{ backgroundColor: "rgba(10, 25, 48, 0.03)",borderColor: "rgba(10, 25, 48, 0.1)" ,color:"black"}} disabled>{dt.size.name}</button>
                                                        </div>  
                                                    </div>                                            
                                                </td>
                                                <td >
                                                    <div className=' d-flex justify-content-end'>
                                                        <span>X {dt.qty}</span>
                                                        <span>&nbsp;&nbsp; ${dt.unit_price}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                       }) 
                                    }
                                    

                                    <tr>
                                        <td>
                                            Sbutotal
                                        </td>
                                        <td className='text-end'>
                                            ${orderDetails.sub_total}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Shipping
                                        </td>
                                        <td className='text-end' >
                                            <div className='' style={{textAlign:"text-end"}}>
                                                ${orderDetails.shipping}
                                            </div>                                          
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Discount
                                        </td >
                                        <td className='text-end'>
                                                $0
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Grand Total</b>
                                        </td>
                                        <td className='text-end'>
                                            ${orderDetails.grand_total}
                                        </td>
                                    </tr>
                                </tbody> 
                            </table>
                        </div>
                    </div>
                </div>
                <div className='col-md-2'>
                    <div className='card shadow mb-5 p-4'>
                        <div className='mb-3'>
                            <label htmlFor="" className='form-label'>Status</label>
                            <select onChange={handStatusChange} name="" className='form-select ' id="">
                                <option value="">Select</option>
                                <option value="pending">Pending</option>
                                <option value="shipped">Shipped</option>
                                <option value="success">Success</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="" className='form-label'>Payment Status</label>
                            <select name="" className='form-select ' id="">
                                <option value="pending">Select</option>
                                <option value="paid">Paid</option>
                                <option value="not_paid">Not Paid</option>
                            </select>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    </Layout>
    </>
  )
}

export default OrderDetail
