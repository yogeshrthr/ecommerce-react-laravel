import React from 'react'
import Layout from './common/Layout'
import { Link } from 'react-router-dom';
import ProductImg from '../assets/images/mens/six.jpg';
import  { useState } from 'react'

const CheckOut = () => {
    const [paymentMethod ,setPaymentMethod]=useState('');
    const HandlePaymentMethod= (e)=>{
        setPaymentMethod(e.target.value)

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

                    <div className='row'>
                        <div className='col-md-7'>
                            <h3 className='border-bottom pb-3'><strong>Billing Details</strong> </h3>

                            <form action="">
                                <div className='row pt-3'>
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input type="text" className='form-control' id="name" placeholder=' Name' />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input type="email" className='form-control' id="email" placeholder='Email' />
                                        </div>
                                    </div>
                                    <div className='col-md-12'>
                                        <div className='mb-3'>
                                            <textarea name="" className='form-control' id="address" placeholder="Address" row="4"></textarea>

                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input type="text" className='form-control' id="city" placeholder='City' />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input type="text" className='form-control' id="state" placeholder='State' />
                                        </div>

                                    </div>
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input type="text" className='form-control' id="zip" placeholder='Zip' />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input type="text" className='form-control' id="mobile" placeholder='Mobile' />
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                        <div className='col-md-5'>
                            <h3 className='border-bottom pb-3'> <strong>Items</strong>  </h3>
                            <table className='table mt-5'>
                                <tbody>
                                    <tr>
                                        <td width={100}>
                                            <img src={ProductImg} width={80} alt="" />
                                        </td>
                                        <td width={600}>
                                            <h4> Dummy product details</h4>
                                            <div className='pt-3 d-flex align-items-center'>
                                                <span> $10</span>
                                                <div className='ps- '>
                                                    <button className='btn btn-size'>S</button>
                                                </div>
                                                <div className='ps-5'>
                                                    X 1
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>


                            <div className='row '>
                                <div className='col-md-12'>
                                    <div className='d-flex justify-content-between border-bottom pb-2 mb-2'>
                                        <div><strong>Subtotal: </strong> </div>
                                        <div>$10</div>
                                    </div>
                                    <div className='d-flex justify-content-between border-bottom  py-2'>
                                        <div> <strong>Shipping: </strong> </div>
                                        <div>$10</div>
                                    </div>
                                    <div className='d-flex justify-content-between   py-2'>
                                        <div><strong>Grand Total: </strong></div>
                                        <div>$30</div>
                                    </div>
                                </div>

                            </div>

                            <h3 className='border-bottom pb-3 pt-3'> <strong>Payment Method</strong>  </h3>
                            <div className='pt-2'>
                                <input onClick={HandlePaymentMethod} value={'stripe'} checked={paymentMethod=='stripe'} className='ps-2' type="radio" />
                                <label className='ps-2' htmlFor="">Stripe</label>
                                <input onClick={HandlePaymentMethod} value={'cod'} checked={paymentMethod=='cod'} className='ms-3' type="radio" />
                                <label className='ps-2' htmlFor="">Cod</label>
                            </div>


                            <div className='d-flex py-3'>
                                <button className='btn btn-primary'>Pay Now</button>
                            </div>
                        </div>


                    </div>

                </div>

            </div>

        </Layout>
    )
}

export default CheckOut
