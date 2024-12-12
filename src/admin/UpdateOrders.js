import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminNavbar'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import SlowLoader from '../components/SlowLoader'

const UpdateOrders = () => {

    const {orderId} = useParams()
    const [order, setOrder] = useState(null)
    const [orderStatus, setOrderStatus] = useState('')
    const [Loader, setLoader] = useState(true)

    useEffect(()=>{
        setLoader(true)
        fetch(`https://skecommerce-backend.onrender.com/currentorder`, {
            method: 'POST',
            headers: {
                Accept:'application/json',
                'Content-Type': 'application/json',
                "auth-token": `${localStorage.getItem("auth-token")}`
            },
            body: JSON.stringify({ orderId: orderId })
        }).then(res=>res.json())
        .then((data)=>{
            setLoader(false) 
            if (data.success) {
                setOrder(data.order);
                setOrderStatus(data.order.status);
            } else {
                if('redirect' in data && data.redirect === true){
                    alert('you dont have permission to view this page!')
                    window.location.href ='/'
                }else{
                    alert(data.message)
                }
            }
        }).catch((error)=> {
            setLoader(false)
            console.log("Error found on order fetching!: ", error)
            alert('Error connecting to the Server! Try again later.')
        })
    }, [orderId])
   

    const HandleOrderUpdate = async () => {
        setLoader(true)
        fetch(`https://skecommerce-backend.onrender.com/updateorder`, {
            method: 'POST',
            headers: {
                Accept:'application/json',
                'Content-Type': 'application/json',
                "auth-token": `${localStorage.getItem("auth-token")}`
            },
            body: JSON.stringify({ orderId: orderId, orderStatus: orderStatus })
        }).then(res=>res.json())
        .then((data)=>{ 
            if (data.success) {
                setLoader(false)
                alert('Order updated successfully!')
                window.location.href='/admin/orders'
            } else {
                if('redirect' in data && data.redirect === true){
                    alert('You dont have permission to access this page!')
                    window.location.href='/'
                }else{
                    alert(data.message);
                }
            }
        }).catch(err=>{
            setLoader(false)
            alert('Error connecting to the Server! Please contact developer.')
            console.log('Error on Order update: ',err)
        })
    }

    if(order!==null){
        return (
            <div>
                <AdminHeader/>
                <div className='container-fluid'>
                    <div className='row'>
                    <div className='col-md-12'>
                            <div className='w-100 d-flex flex-wrap justify-content-between align-items-center'>
                                <button onClick={()=>{window.location.href='/admin/orders'}} className='btn btn-outline-dark rounded-pill my-2'><i className="bi bi-arrow-left-circle"></i><span className='back-home-sm'> Orders</span><span className='back-home-lg'> Goto Orders</span></button>
                                <button className='btn btn-dark rounded-pill my-2' onClick={HandleOrderUpdate}>Update <i className="bi bi-folder-plus"></i></button>
                            </div>
                            <h4 className='text-center my-1'>Update Order</h4><hr/>
                            <div className='user-account-form-container'>
                                <div className='d-flex justify-content-between'>
                                    <p className='bg-primary p-2 text-light'>Order ID: #{order.id}</p>
                                    <p className='bg-primary p-2 text-light'>Date: {new Date(order.date).toLocaleDateString()}</p>
                                </div>
                                <p className=''><span className='fw-bold'>Ordered by: </span> { order.user && order.user.name}, { order.user && order.user.email}, { order.user && order.user.contact}</p>
                                <div className='d-flex align-items-center'>
                                    <h6 className='m-2 fw-bold'>Payment Method: </h6>
                                    <p className='m-2'>{(order.paymentmethod).toUpperCase()}</p>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <h6 className='m-2 fw-bold'>Total Amount: </h6>
                                    <p className='m-2'>₹ {order.amount}.00</p>
                                </div>
                                <p className='fw-bold'>Shipment to: </p>
                                <div className='ps-4'>
                                    <p className=''>Full Name: {order.shipment && order.shipment.fullname}</p>
                                    <p className=''>Email: {order.shipment && order.shipment.email}</p>
                                    <p className=''>Contact: {order.shipment && order.shipment.contact}</p>
                                    {order.shipment && 
                                        <p className=''>Delivery Address: <em>{order.shipment.doorstreet}, {order.shipment.area}, {order.shipment.state}, {order.shipment.country} - {order.shipment.zipcode}</em><br/> - Landmark: {order.shipment.landmark}</p>
                                    }
                                </div>
                                <div className="d-flex justify-content-center p-2">
                                    <p className={`text-center pt-2 fw-bold w-100`}>Order status:</p>
                                    <select defaultValue={orderStatus} onChange={(e)=>setOrderStatus(e.target.value)} className="form-select form-select-lg mb-3 text-center w-100 border-dark" aria-label="Large select example">
                                        <option disabled>Update Status</option>
                                        <option value="Placed">Placed</option>
                                        <option value="Receivedpayment">Received Payment</option>
                                        <option value="Preparing">Preparing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <div className='card'>
                                    <h2 className='text-center fs-3 my-3'>Products List</h2>
                                    <table className="table table-striped border text-center table-hover">
                                        <thead>
                                            <tr>
                                                <th className='bg-primary text-light' scope="col">#Product ID</th>
                                                <th className='bg-primary text-light' scope="col">Name</th>
                                                <th className='bg-primary text-light' scope="col">Items</th>
                                                <th className='bg-primary text-light' scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.products && order.products.map((product, i)=>{
                                                return<tr key={i}>
                                                        <th scope="row">{product.productId}</th>
                                                        {/* <td>{product.category}</td> */}
                                                        <td>{product.name}</td>
                                                        <td>{product.quantity} kg</td>
                                                        <td><Link to={`/admin/updateproduct/${product.productId}`}>View <i className='bi bi-arrow-right-circle'></i></Link></td>
                                                    </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='d-flex flex-wrap justify-content-center'>
                                <button className='btn btn-dark m-2' onClick={HandleOrderUpdate}>Update <i className="bi bi-folder-plus"></i></button>
                            </div>
        
                        </div>
                    </div>
                </div>
                {Loader && <SlowLoader/>}
            </div>
        )
    }else{
        return(
            <div>
                <SlowLoader/>
            </div>
        )
    }

}

export default UpdateOrders