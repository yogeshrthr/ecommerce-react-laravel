import React from 'react'
const Loader = ({title='data'}) => {
  return (

        <div className='d-flex justify-content-center  align-item-center py-5'  style={{ minHeight: '200px' }} >
            <div className='"d-flex align-items-center'>
                <div className=''>
                    <div className="loader"></div>
                </div>

            </div>
             <span className="ms-3 text-muted">Fetching {title}...</span>           
        </div>
 
  )

}

export default Loader
