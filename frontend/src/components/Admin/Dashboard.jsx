import React, { useContext } from 'react'
import { AdminAuthContext } from '../Context/AdminAuth'
import Layout from '../common/Layout'
import Sidebar from './Sidebar'



const Dashboard = () => {

    const { Logout } = useContext(AdminAuthContext)
    return (

        <Layout>
            {/* <div>
        <h1>Admin Dashbarod</h1>
        <button  className='btn btn-danger' onClick={Logout}>Logout</button>
        </div> */}
            <div className='container'>
                <div className='row py-5'>
                    <div className='col-md-3'>
                        <h2>Dashbaord</h2>
                        <Sidebar />
                    </div>
                    <div className='col-md-9'>
                        <div className='row py-5'>
                            <div className='col-md-4'>
                                <div class="card">
                                    <div class="card-body">
                                        <h1 class="card-title">1</h1>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Users</h6>
                                    </div>
                                    <div class="card-footer text-body-secondary">
                                        View Users
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-4'>
                                <div class="card">
                                    <div class="card-body">
                                        <h1 class="card-title">0</h1>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Orders</h6>
                                    </div>
                                    <div class="card-footer text-body-secondary">
                                        View Orders
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div class="card">
                                    <div class="card-body">
                                        <h1 class="card-title">1</h1>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Products</h6>
                                    </div>
                                    <div class="card-footer text-body-secondary">
                                        View Products
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard
