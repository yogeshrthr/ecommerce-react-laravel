import React from 'react'
import React from 'react'
import Layout from '../../common/Layout'
import Sidebar from '../Sidebar'

const Sample = () => {
    return (
        <Layout>
            <div className='container'>
                <div className='row py-5'>
                    <div className='d-flex justify-content-between mt-5 pb-3'>
                        <h4 className=' h4 pb-0 mb-0'> Your Title</h4>
                        <button className='btn btn-primary'>Button</button>
                    </div>
                    <div className='col-md-3'>
                        <Sidebar />
                    </div>
                    <div className='col-md-9'>
                        <div className='card'>
                            <div className='card-body shadow'>


                            </div>

                        </div>
                        {/* <div className='row py-5'>
                            
                        </div> */}
                    </div>
                </div>
            </div>



        </Layout>
    )
}

export default Sample
