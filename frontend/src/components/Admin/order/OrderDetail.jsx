import React, { useEffect, useState } from 'react'
import Layout from '../../common/Layout'
import Sidebar from '../Sidebar'
import { adminToken, apiUrl, userToken } from '../../common/http'
import { useParams,Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2';
import Loader from '../../common/Loader'
import { useForm } from 'react-hook-form'
const OrderDetail = () => {
    const {
             register,
             handleSubmit,
             watch,
             reset,
             formState: { errors },
         } = useForm();
    const {id} = useParams();
    const [orderDetails , setOrderDetails]=useState([]);
    const [loader, setLoader]=useState(false)

    const statsuConfg={
        pending:{color:'warning',text:'Pending'},
        delivered:{color:'success',text:'Deliverd'},
        shipped:{color:'primary',text:'Shipped'},
        cancelled:{color:'danger',text:'Cancelled'},
    }

    const fetchOrderDetails= async()=>{
        setLoader(true)
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
            reset({
                payment_status:result.data.payment_status,
                status:result.data.status
            })
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
        }).finally(()=>{
            setLoader(false)
        })
    }

    const handStatusChange=(e)=>{
        if(e.target.value=='')
            return false
        if(e.target.value==orderDetails.status)
            return false
        setLoader(true)
        fetch(apiUrl+`/admin/update-order-status/${id}`,{
            method:'POST',
            headers:{
                'Accept':"application/json",
                'Content-Type':"application/json",
                'Authorization':`Bearer ${adminToken()}`
            },
            body:JSON.stringify({'status':e.target.value})
        }).then(res=>{
            return res.json().then(errrData=>{
                if(!res.ok){
                    console.log(errrData)
                     const error=Error(errrData.message|| 'unexpected error');
                    error.status=errrData.status;
                    error.error=errrData.errors;
                    throw error;
                }
               return errrData;
            })
            
        }).then(result=>{
            toast.success(result.message||'Success')
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
                       temp += message + '\n';
                    });
                });                
                Swal.fire({
                    icon: "error",
                    title: "Validation Error!",
                    text: temp,
                });
            }else{
                 toast.error(err.message ||"Somethign went wrong!")
            }
        }).finally(()=>{
            setLoader(false)
            fetchOrderDetails()
        })


    }
    const handlePaymentStatusChange=(e)=>{
        if(e.target.value=='')
            return false
        
        if(orderDetails.payment_status== e.target.value){
            return false
        }
        setLoader(true)
        fetch(apiUrl+`/admin/update-order-payment-status/${id}`,{
            method:'POST',
            headers:{
                'Accept':"application/json",
                'Content-Type':"application/json",
                'Authorization':`Bearer ${adminToken()}`
            },
            body:JSON.stringify({'status':e.target.value})
        }).then(res=>{
            return res.json().then(errrData=>{
                if(!res.ok){
                    console.log(errrData)
                     const error=Error(errrData.message|| 'unexpected error');
                    error.status=errrData.status;
                    error.error=errrData.error;
                    throw error;
                }
               return errrData;
            })
            
        }).then(result=>{
            toast.success(result.message||'Success')
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
                       temp += message + '\n';
                    });
                });                
                Swal.fire({
                    icon: "error",
                    title: "Validation Error!",
                    text: temp,
                });
            }else{
                 toast.error(err.message ||"Somethign went wrong!")
            }
        }).finally(()=>{
            setLoader(false)
            fetchOrderDetails();

        })


    }
    // const Status =watch('status')
    // const statuslocked=['delivered','cancelled','returned'];
    
    // const paymentStatus =watch('payment_status')
    useEffect(()=>{
     fetchOrderDetails();
        
    },[])
  return (
    <>
    <Layout>
        <div className='container'>
            <div className='row py-5'>
                <div className='h4 pb-0 mb-3'>
                    Order Details
                </div>
                <div className='col-md-3'>
                    <Sidebar></Sidebar>

                </div>
                <div className='col-md-7 '>
                    <div className='card shadow mb-5 .shadow p-4' style={{height:"800px" ,overflowY:"auto"}}>
                        {                        
                            loader?<Loader></Loader> :
                                <>                        
                                    <div className='row'>
                                        <div className='col-md-4 col-sm-4'>
                                            <span><strong>Order : #{orderDetails.id}</strong></span><br></br>
                                            <span className={`badge bg-${statsuConfg[orderDetails.status]?.color || 'dark'}`}>
                                                {statsuConfg[orderDetails.status]?.text || 'N/A'}</span>
                                        
                                        </div>
                                        <div className='col-md-4 col-sm-4'>
                                            <span>Date</span><br></br>
                                            <span className=''>{orderDetails.order_date}</span>

                                        </div>
                                        <div className='col-md-4 col-sm-4'>
                                            <span>Order Status</span><br></br>
                                            <span className={`badge bg-${orderDetails.payment_status=='paid'?'success':'danger'}`}>
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
                                                orderDetails.items && orderDetails.items.map((dt,index)=>{
                                                    return (
                                                        <tr key={`item-details`+index}>
                                                            <td>
                                                                <div className='d-flex'>                                                                  
                                                                    <Link  style={{ width: "100px" }} target="_blank" className='mt-2 d-inline-blok' to={`/product/`+dt.product_id}><img width="100%" src={dt.product.image_url} alt="" /> </Link>
                                                                    <div className='p-2'>
                                                                        <Link target="_blank" className='link' to={`/product/`+dt.product_id}><p>{dt.product_name}</p></Link>
                                                                        <button className='btn btn-sm '  style={{ backgroundColor: "rgba(10, 25, 48, 0.03)",borderColor: "rgba(10, 25, 48, 0.1)" ,color:"black"}} disabled>{dt.size.name}</button>
                                                                        
                                                                        <p className='mt-1'>${dt.unit_price}</p>
                                                                    </div>  
                                                                </div>                                            
                                                            </td>
                                                            <td >
                                                                <div className=' d-flex justify-content-end'>
                                                                    <span>X {dt.qty}</span>
                                                                    <span>&nbsp;&nbsp; ${dt.price}</span>
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
                                </>
                        }
                    </div>
                </div>
                <div className='col-md-2'>
                    <div className='card shadow mb-5 p-4'>
                        <form>                       
                       
                            <div className='mb-3'>
                                {/* disabled={statuslocked.includes(Status)} */}
                                <label htmlFor="" className='form-label'>Status</label>
                                <select  name=""  className='form-select ' id=""
                                    {...register('status',{
                                        onChange:(e)=>handStatusChange(e)
                                    })

                                    }
                                >
                                    <option value="">Select</option>
                                    <option value="pending">Pending</option>
                                    <option value="shipped">Shipped</option>
                                    <option   value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div>
                                {/* disabled={paymentStatus === "paid"} */}
                                <label htmlFor="" className='form-label'>Payment Status</label>
                                <select  name="" onChange={handlePaymentStatusChange} className='form-select ' id=""
                                
                                    {...register('payment_status',{
                                            onChange:(e)=>handlePaymentStatusChange(e),
                                        })

                                    }
                                >
                                    <option value="">Select</option>
                                    <option value="paid">Paid</option>
                                    <option value="not_paid">Not Paid</option>
                                </select>

                            </div>
                         </form>

                    </div>
                </div>
            </div>

        </div>
    </Layout>
    </>
  )
}

export default OrderDetail
