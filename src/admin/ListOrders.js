import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminNavbar'
import { Link } from 'react-router-dom'
import SlowLoader from '../components/SlowLoader'

const ListOrders = () => {

    const [orders, setOrders] = useState(null)
    const [Loader, setLoader] = useState(false)

    useEffect(()=>{
        setLoader(true)
        fetch('https://skecommerce-backend.onrender.com/allorders',{
            method: 'POST',
            headers: {
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem("auth-token")}`,
                'Content-Type':'application/json',
            },
            body: JSON.stringify(),
        })
        .then(response => response.json())
        .then(data => {
            setLoader(false)
            if(data.success){
                setOrders(data.orders)
            }else{
                setOrders([])
                if('redirect' in data && data.redirect === true){
                    alert('Access denied! you have no permissions to view Orders.')
                    window.location.href='/'
                }else{
                    alert(data.message)
                }
            }
        }).catch((error)=>{
            setLoader(false)
            console.log("Error found on order fetching!: ",error)
            alert('Error on fetching Orders! please try again later.')
        })
            
    }, [])

    if(orders!==null){
        return (
            <div>
                <AdminHeader/>
                <button onClick={()=>{window.location.href='/admin/dashboard'}} className='btn btn-outline-dark rounded-pill ms-2 my-2'><i className="bi bi-arrow-left-circle"></i><span className='back-home-sm'> Dashboard</span><span className='back-home-lg'> Goto Dashboard</span></button>
                <div className='container-fluid'>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-8 col-sm-11'>
                            <h2 className='text-center fs-3 my-3'>Orders List</h2>
                            <table className="table table-striped border text-center table-hover">
                                <thead>
                                    <tr>
                                        <th className='bg-primary text-light' scope="col">#Order ID</th>
                                        <th className='bg-primary text-light' scope="col">Date</th>
                                        <th className='bg-primary text-light' scope="col">Ordered by</th>
                                        <th className='bg-primary text-light' scope="col">Status</th>
                                        <th className='bg-primary text-light' scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length>0 && orders.map((order, i)=>{
                                        return <tr key={i}>
                                            <th scope="row">{order.id}</th>
                                            <td>{new Date(order.date).toLocaleDateString()}</td>
                                            <td>{order.user.name}</td>
                                            <td>{order.status}</td>
                                            <td><Link to={`/admin/update-order/${order.id}`}>View <i className='bi bi-arrow-right-circle'></i></Link></td>
                                        </tr>
                                    })}
                                    {orders.length===0 && 
                                        <tr><td colSpan={5}><i className="bi bi-exclamation-triangle"></i> No Orders Available!</td></tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {Loader && <SlowLoader/>} 
            </div>
        )
    }else{
        return (
            <div>
                <SlowLoader/>
            </div>
        )
    }
}

export default ListOrders