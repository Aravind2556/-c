import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext'

const Navbar = () => {
    const {getTotalCartItems, UserAuth, isValidAuth, userInfo} = useContext(DataContext)

    if(userInfo && userInfo!==null){
        return (
            <div>
                <div className="App-header d-flex justify-content-between bg-light p-3 fixed-top">
                    <h1 className='text-primary fw-bolder mx-3' style={{cursor:"pointer"}} onClick={()=>window.location.href='/'}>⪡c</h1>
                    <div className='d-flex'>
                        <i onClick={()=>window.location.href='/cart'} className='bi bi-cart3 fs-2 text-primary mx-5 position-relative' style={{cursor:'pointer'}}><span className='text-light bg-danger position-absolute rounded-pill fs-5 px-1 top-0 start-100 translate-middle'>{getTotalCartItems()}</span></i>
                        <div className="dropdown">
                            <i className="bi bi-list fs-2 bg-primary rounded text-light fw-bolder menu-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/"><i className='bi bi-house-door mx-2'></i>Home</a></li>
                                {
                                    isValidAuth?
                                    <>
                                        <li><a className="dropdown-item" href="/useraccount"><i className='bi bi-person-circle mx-2'></i>My Account</a></li>
                                        <li><a className="dropdown-item" href="/orders"><i className='bi bi-box mx-2'></i>My Orders</a></li>
                                        <li><p style={{cursor:'pointer'}} className="dropdown-item" onClick={()=>UserAuth(false)} ><i className='bi bi-box-arrow-in-right mx-2'></i>Sign Out</p></li>
                                    </>
                                    :
                                    <>
                                        <li><a className="dropdown-item" href="/signin"><i className='bi bi-box-arrow-up-right mx-2'></i>Sign In/ Up</a></li>
                                    </>
                                }
                                {
                                    (userInfo.isAdmin)&&(
                                        <>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><a className="dropdown-item bg-primary text-light rounded-pill" href="/admin/dashboard">Admin Dashboard</a></li>
                                        </>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div className='text-center'>
                <p>upadte soon</p>
            </div>
        )
    }

}

export default Navbar