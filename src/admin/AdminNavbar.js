import React from 'react'

const AdminHeader = () => {
  return (
    <div>
        <div className="App-header d-flex justify-content-between bg-light p-3">
            <h1 className='text-primary fw-bolder mx-3'>⪡c<span className='text-secondary fs-5'> - Admin panel</span></h1>
            <div className='d-flex'>
                {/* <i onClick={()=>window.location.href='/cart'} className='bi bi-cart3 fs-2 text-primary mx-5 position-relative' style={{cursor:'pointer'}}><span className='text-light bg-danger position-absolute rounded-pill fs-5 px-1 top-0 start-100 translate-middle'>0</span></i> */}
                <div className="dropdown">
                    <i className="bi bi-list fs-2 bg-primary rounded text-light fw-bolder menu-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="/admin/dashboard"><i className='bi bi-house-door mx-2'></i>Dashboard</a></li>
                        <li><a className="dropdown-item" href="/"><i className='bi bi-globe mx-2'></i>Visit Website</a></li>
                        {/* <li><a className="dropdown-item" href="/signin"><i className='bi bi-cart3 mx-2'></i>Cart</a></li> */}
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href="/admin/create-product"><i className='bi bi-file-earmark-plus mx-2'></i>Create Product</a></li>
                        <li><a className="dropdown-item" href="/admin/products"><i className='bi bi-boxes mx-2'></i>View Products</a></li>
                        <li><a className="dropdown-item" href="/admin/orders"><i className='bi bi-inboxes-fill mx-2'></i>View Orders</a></li>
                        <li><a className="dropdown-item" href="/admin/users"><i className='bi bi-people mx-2'></i>View Users</a></li>
                        <li><a className="dropdown-item" href="/signout"><i className='bi bi-box-arrow-in-right mx-2'></i>Sign Out</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminHeader