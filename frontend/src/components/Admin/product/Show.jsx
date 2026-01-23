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
    const [loader, setLoader] = useState(false);
    const [product, setProduct] = useState();
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [StatusChangeValue, setStatusChangeValue] = useState("");
    const [perPage, setPerPage] = useState(10);

    const fetchProducts = async (pageNumber = 1,search = searchTerm, limit = perPage,status=StatusChangeValue) => {
        setLoader(true)
        const res = await fetch(`${apiUrl}/admin/product?page=${pageNumber}&search=${search}&per_page=${limit}&status=${status}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },

        }).then(res => res.json())
            .then(result => {

                if (result.status == 200) {
                    //  toast.success(result.message)
                    console.log(result.data.data)
                    setProduct(result.data.data); // The actual list
        setPagination(result.data);    // The metadata (total, last_page, etc.)
                } else {
                    toast.error(result.message)
                }
            }).finally(() => {
                setLoader(false)
            })

    }
    useEffect(() => {
        fetchProducts();
    }, [])


    // Handle Search Input (With a slight delay/Debounce is better, but this is direct)
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        fetchProducts(1, e.target.value, perPage); // Always reset to page 1 on search
    };

    // Handle Per Page Dropdown
    const handlePerPageChange = (e) => {
        setPerPage(e.target.value);
        fetchProducts(1, searchTerm, e.target.value); // Reset to page 1
    };
     // Handle Status Dropdown
    const HandlestatusChange = (e) => {
        setStatusChangeValue(e.target.value);
        fetchProducts(1, searchTerm,perPage, e.target.value); // Reset to page 1
    };
    // delte product
    const deleteProduct = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                setLoader(true) 
                    const res =  fetch(`${apiUrl}/admin/product/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${adminToken()}`
                        },

                    }).then(res => res.json())
                        .then(result => {
                            console.log(result)
                            if (result.status == 200) {
                                fetchProducts();
                                toast.success(result.message)
                            } else {
                                toast.error(result.message)
                            }
                        }).finally(() => {
                            setLoader(false)
                        })

                }


            // }
        });


    }
    return (
        <Layout>

            <div className='container'>
                <div className='row py-5'>
                    <div className='d-flex justify-content-between mt-5 pb-3'>
                        <h4 className=' h4 pb-0 mb-0'> Product</h4>
                        <Link to="/admin/product/create"><button className='btn btn-primary'>Create</button></Link>
                    </div>
                    <div className='col-md-3'>
                        <Sidebar />
                    </div>

                    <div className='col-md-9'>
                        <div className='card shadow' >
                            <div className='card-body  p-4 ' >
                                {/* filter */}
                                <div className='row'>
                                    <div className="d-flex justify-content-between mb-3 align-items-center">
                                        {/* Per Page Dropdown */}
                                        <div className="d-flex align-items-center gap-2">
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
                                        {/* Status */}
                                        <div className="d-flex align-items-center ">
                                            <span className='mx-2'>Status</span>
                                            <div className="col-md-4">
                                                <select 
                                                    placeholder="Status"
                                                    className="form-select" 
                                                    style={{ width: '100px' }}
                                                    value={StatusChangeValue}
                                                    onChange={HandlestatusChange}
                                                >
                                                    <option value="">Select</option>
                                                    <option value="1">Active</option>
                                                    <option value="0">InActive</option>
                                                </select>
                                            </div>
                                        </div>
                                    
                                        {/* Global Search Input */}
                                        <div className="col-md-4">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Search products (name, SKU, etc...)" 
                                                value={searchTerm}
                                                onChange={handleSearch}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* End filter */}
                                
                                {
                                    (loader)
                                        ? <Loader title="Products"></Loader>
                                        :
                                        (product && product.length )> 0 ?
                                            (
                                                <div  style={{ maxHeight: '600px', overflowY: 'auto' }}>
                                                    <table className='table table-hover index_table'> 
                                                        <thead>
                                                                <tr>
                                                                    <th >Id</th>
                                                                    <th>Image</th>
                                                                    <th>Title</th>
                                                                    <th>Price</th>
                                                                    <th>Qty</th>
                                                                    <th width={200}>Sku </th>
                                                                    <th  >Status</th>
                                                                    <th width={100}> Actions</th>
                                                                </tr>
                                                            </thead>                                                       
                                                        <tbody>
                                                            {
                                                                product && product.map(product => {

                                                                    return (
                                                                        <tr key={product.id}>
                                                                            <td>{product.id}</td>
                                                                            <td> <img src={ product.image_url==''?'https://dummyimage.com/50X50/ffffff/030003.png&text=No+Image':product.image_url} width={50} alt="" /> </td>
                                                                            <td>{product.title}</td>
                                                                            <td>{product.price}</td>
                                                                            <td>{product.qty}</td>
                                                                            <td>{product.sku}</td>
                                                                            <td>
                                                                                <span className={`badge text-bg-${product.status == 1 ? 'success' : 'danger'}`} > {product.status == 1 ? 'Active' : 'Inactive'}   </span>
                                                                            </td>
                                                                            <td>
                                                                                <Link to={`/admin/product/${product.id}`} className='text-primary'><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"></path></svg> </Link>

                                                                                <Link onClick={() => { deleteProduct(product.id) }} className='text-danger ms-2'>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                                                                    </svg>
                                                                                </Link>

                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })

                                                            }

                                                        </tbody>
                                                    </table>
                                                </div>
                                                )
                                        :
                                            <NoState title="Produts" />
                                }
                            </div>
                        </div>
                                    
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
                                        <button className="page-link" onClick={() => fetchProducts(pagination.current_page - 1)}>
                                            &laquo;
                                        </button>
                                    </li>

                                    {/* Loop through total pages and create numbers */}
                                    {pagination && [...Array(pagination.last_page).keys()].map((number) => {
                                        const page = number + 1;
                                        return (
                                            <li key={page} className={`page-item ${pagination.current_page === page ? 'active' : ''}`}>
                                                <button className="page-link" onClick={() => fetchProducts(page)}>
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

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default show
