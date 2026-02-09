import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserAuthContext } from './Context/UserAuth'

const Sidebar = () => {
    const  { Logout } = useContext(UserAuthContext)
        const handleLogout=()=>{
            Logout();
        }
    return (
        <>           
                  
            <div className="card shadow mb-5" >
                <div className="card-body sidebar">
                    <ul>
                        <li>
                            <Link className='link' to="/account">Dashboard</Link>                            
                        </li>
                        <hr className="mb-2" />
                        <li>
                            <Link className='link' to="/account/order-list">Orders</Link>                            
                        </li>                                  
                        <hr className="mb-2" />
                        <li>
                            Change Password
                        </li>
                        <hr className="mb-2" />
                        <li className='link' style={{ cursor: 'pointer' }} onClick={handleLogout}>
                            Logout
                        </li>

                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar
