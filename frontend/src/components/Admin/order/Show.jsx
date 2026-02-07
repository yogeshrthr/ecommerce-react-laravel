import React, { useEffect, useState } from 'react'
import Layout from '../../common/Layout'
import Sidebar from '../Sidebar'
import { Link, useParams } from 'react-router-dom'
import { adminToken, apiUrl } from '../../common/http'
import { toast } from 'react-toastify'
import Loader from '../../common/Loader'
import NoState from '../../common/NoState'
import Swal from 'sweetalert2'



const show = () => {
    const [order,setOrder]=useState([]);
    const [pagination,setPagination]=useState(null);
    const [searchTerm, setSearchTerm] = useState("");;
    const [StatusChangeValue, setStatusChangeValue] = useState("");
    const [PaymentStatusChangeValue, setPaymentStatusChangeValue] = useState("");
    const [perPage, setPerPage] = useState(10);

    const statsuConfg={
        pending:{color:'warning',text:'Pending'},
        success:{color:'success',text:'Deliverd'},
        shipped:{color:'primary',text:'Shipped'},
        cancelled:{color:'danger',text:'Cancelled'},
    }

    // Handle Search Input (With a slight delay/Debounce is better, but this is direct)
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        fetchOrder(1, e.target.value, perPage,StatusChangeValue,PaymentStatusChangeValue); // Always reset to page 1 on search
    };

    // Handle Per Page Dropdown
    const handlePerPageChange = (e) => {
        setPerPage(e.target.value);
        fetchOrder(1, searchTerm, e.target.value,StatusChangeValue,PaymentStatusChangeValue); // Reset to page 1
    };
     // Handle Status Dropdown
    const HandlestatusChange = (e) => {
        setStatusChangeValue(e.target.value);
        fetchOrder(1, searchTerm,perPage, e.target.value,PaymentStatusChangeValue); // Reset to page 1
    };
     // Handle Status Dropdown
    const HandlePaymentStatusChange = (e) => {
        setPaymentStatusChangeValue(e.target.value);
        fetchOrder(1, searchTerm,perPage, StatusChangeValue,e.target.value); // Reset to page 1
    };


    const fetchOrder= async (pageNumber = 1,search = searchTerm, limit = perPage,status=StatusChangeValue,payment_status=PaymentStatusChangeValue)=>{
         await fetch(apiUrl+`/admin/order-list?page=${pageNumber}&search=${search}&per_page=${limit}&status=${status}&payment_status=${payment_status}`, {
            method:"GET",
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json',
                'Authorization':`Bearer ${adminToken()}`
            },
        }).then(res=>{
            return res.json().then(errData=>{
                if(!res.ok){
                    const error=Error(errData.message || 'unexpected error!')
                    error.status=errData.status
                    error.error=errData.error
                    throw error;
                }
                return errData;
            })
        }).then(result=>{
            setOrder(result.data.data);
            setPagination(result.data); 
            // console.log(result)
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
        })
    }
    useState(()=>{
        fetchOrder();
    },[])
    
    return (
        <Layout>
            <div className='container'>
                <div className='row py-5'>
                    <div className='d-flex justify-content-between mt-5 pb-3'>
                        <h4 className=' h4 pb-0 mb-0'> Order List</h4>
                        {/* <Link to="/admin/product/create"><button className='btn btn-primary'>Create</button></Link> */}
                    </div>
                    <div className='col-md-3'>
                        <Sidebar />
                    </div>
                    <div className=' col-md-9'>
                        <div className='card card-shardow p-4'>

                             {/* filter */}
                                {/* <div className='row'> */}
                                    <div className=" row">
                                        {/* Per Page Dropdown */}  
                                        <div className='col-md-3 ' >
                                            <div className=' d-flex justify-content-between mb-3 align-items-center' >                                                                               
                                                <div className="d-flex align-items-center">
                                                    <span>Show</span>
                                                    <select 
                                                        className="form-select form-select-sm" 
                                                        style={{ width: '80px' }}
                                                        value={perPage}
                                                        onChange={handlePerPageChange}
                                                    >
                                                        <option value="10">10</option>
                                                        <option value="25">25</option>
                                                        <option value="50">50</option>
                                                        <option value="100">100</option>
                                                    </select>
                                                    <span>entries</span>
                                                </div>
                                            </div> 
                                        </div> 

                                        {/* Status */}
                                        <div className='col-md-3'>                                         
                                            <div className="d-flex align-items-center ">
                                                <span className='mx-2'>Status</span>
                                                <div className="">
                                                    <select 
                                                        placeholder="Status"
                                                        className="form-select" 
                                                        style={{ width: '100px' }}
                                                        value={StatusChangeValue}
                                                        onChange={HandlestatusChange}
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="pending">Pending</option>
                                                        <option value="shipped">Shipped</option>
                                                        <option value="cancelled">Cancelled</option>
                                                        <option value="delivered">Deliverd</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Payment Status */}
                                            
                                        <div className='col-md-3'>
                                            <div className='d-flex justify-content-between mb-3 align-items-center' > 
                                                <div className=" d-flex align-items-center">
                                                    <span className='mx-2'>Payment Status</span>
                                                    <div className="">
                                                        <select 
                                                            placeholder="Status"
                                                            className="form-select" 
                                                            style={{ width: '100px' }}
                                                            value={PaymentStatusChangeValue}
                                                            onChange={HandlePaymentStatusChange}
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="paid">Paid</option>
                                                            <option value="not_paid">Not Paid</option>
                                                        </select>
                                                    </div>
                                                </div> 
                                            </div> 
                                        </div> 
                                                                                 
                                        {/*End  Payment Status */}
                                            
                                        {/* Global Search Input */}
                                        <div className="col-md-3">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Search customer (name, order id, amount...)" 
                                                value={searchTerm}
                                                onChange={handleSearch}
                                            />
                                        </div> 
                                          {/* End Global Search Input */}
                                    
                                         
                                       
                                    </div>
                                {/* </div> */}
                                {/* End filter */}

                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>
                                            Order Id
                                        </th>
                                        <th>
                                            Customer
                                        </th>
                                        <th>
                                            Amount
                                        </th>
                                        <th>
                                            Date
                                        </th>
                                        <th>
                                            Payment
                                        </th>
                                        <th>
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        order && order.map((dt)=>{                                            
                                            return (
                                                <tr>
                                                    <td>                                            
                                                        <Link className='link' to={`/admin/order-details/${dt.id}`}> #{dt.id} </Link>                                             
                                                    </td>
                                                    <td>
                                                        {dt.name}
                                                    </td>
                                                    <td>
                                                        ${dt.grand_total}
                                                    </td>
                                                    <td>
                                                        {dt.order_date}
                                                    </td>
                                                    <td>                                                        
                                                        <span class={`badge bg-${dt.payment_status=='paid'?'success':'danger'}`}>
                                                            {dt.payment_status=='paid'?'Paid':'Not Paid'}</span>                                                        
                                                    </td>
                                                    <td>
                                                        <span class={`badge bg-${statsuConfg[dt.status]?.color || 'dark'}`}>
                                                            {statsuConfg[dt.status]?.text || 'N/A'}</span>
                                                        
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                   
                                </tbody>

                            </table>
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
                                        <button className="page-link" onClick={() => fetchOrder(pagination.current_page - 1)}>
                                            &laquo;
                                        </button>
                                    </li>

                                    {/* Loop through total pages and create numbers */}
                                    {pagination && [...Array(pagination.last_page).keys()].map((number) => {
                                        const page = number + 1;
                                        return (
                                            <li key={page} className={`page-item ${pagination.current_page === page ? 'active' : ''}`}>
                                                <button className="page-link" onClick={() => fetchOrder(page)}>
                                                    {page}
                                                </button>
                                            </li>
                                        );
                                    })}

                                    {/* Next Button */}
                                    <li className={`page-item ${pagination?.current_page === pagination?.last_page ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => fetchOrder(pagination.current_page + 1)}>
                                            &raquo;
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        {/* End paginate  */}

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default show
