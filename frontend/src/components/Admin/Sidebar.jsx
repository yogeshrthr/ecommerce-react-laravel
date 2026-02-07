import React from 'react'
import { Link } from 'react-router-dom'


const Sidebar = () => {
    return (
        <>            
            <div className="card shadow mb-5" >
                <div className="card-body sidebar">

                    <ul>
                        <li>
                             <Link className='link' to="/admin/dashboard">Dashboard</Link>                            
                        </li>
                        <hr className="mb-2" />
                        <li>
                            <Link className='link ' to="/admin/category">Categories</Link>                            
                        </li>
                        <hr className="mb-2" />
                        <li>
                            <Link className='link ' to="/admin/brand">Brands</Link>  
                        </li>
                        <hr className="mb-2" />
                        <li>
                            <Link className='link ' to="/admin/product">Products</Link>  
                        </li>
                        <hr className="mb-2" />
                        <li>
                           <Link className='link '  to="/admin/orders">  Orders</Link>
                        </li>
                        <hr className="mb-2" />
                        <li>
                            Users
                        </li> <hr className="mb-2" />
                        <li>
                            Shipping
                        </li>
                        <hr className="mb-2" />
                        <li>
                            Change Password
                        </li>
                        <hr className="mb-2" />
                        <li>
                            Logout
                        </li>

                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar
