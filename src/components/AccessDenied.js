import React from 'react'
import Navbar from './Navbar'

const AccessDenied = () => {
  return (
    <div>
        <Navbar/>
        <div className='container-fluid'>
            <div className='row d-flex justify-content-center'>
                <div className='col-md-6 col-sm-11 col-12 text-center mt-3'>
                    <h3 className='display-1 fw-bolder'>OOPS</h3>
                    <h2 className='text-danger'><i className='bi bi-x-octagon'></i> Access Denied, you have no permission to enter!</h2>
                    <p>Navigate to Homepage, by clicking the below button</p>
                    <button onClick={()=>window.location.href='/'} className="btn btn-dark">Go To Homepage</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AccessDenied