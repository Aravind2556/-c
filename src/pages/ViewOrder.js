import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SlowLoader from '../components/SlowLoader'

const ViewOrder = () => {

    const {orderId} = useParams()
    const [order, setOrder] = useState(null)
    const [Loader, setLoader] = useState(false)

    useEffect(()=>{
        setLoader(true)
        fetch(`https://skecommerce-backend.onrender.com/usersorder`, {
                method: 'POST',
                headers: {
                    Accept:'application/json',
                    'Content-Type': 'application/json',
                    "auth-token": `${localStorage.getItem('auth-token')}`,
                }
        }).then(res=>res.json())
        .then((data)=>{ 
            if(data.success){
                const UserOrders = data.orders
                UserOrders.forEach(order => {
                    if(order.id===Number(orderId)){
                        setOrder(order)
                    }
                });
            } else {
                if('redirect' in data && data.redirect === true){
                    alert(data.message)
                    window.location.href('/');
                }else{
                    alert(data.message)
                }
            }
            setLoader(false)
        }).catch(err=>{
            setLoader(false)
            alert('Error connecting to the Server! Please try again later.')
            console.log('Error on Displaying Order: ',err)
        })
    },[orderId])


    if(order!==null){
        return (
            <div>
                <Navbar/>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='w-100 d-flex flex-wrap justify-content-between align-items-center'>
                                <button onClick={()=>{window.location.href='/orders'}} className='btn btn-outline-dark rounded-pill my-2'><i className="bi bi-arrow-left-circle"></i><span className='back-home-sm'> Orders</span><span className='back-home-lg'> Goto Orders</span></button>
                            </div>
                            <h4 className='text-center my-1'>Order Details</h4><hr/>
                        
                                <div className='user-account-form-container'>
                                <div className='d-flex justify-content-between'>
                                    <p className='bg-primary p-2 text-light'>Order ID: #{order.id}</p>
                                    <p className='bg-primary p-2 text-light'>Date: {new Date(order.date).toLocaleDateString()}</p>
                                    <p className='bg-primary p-2 text-light'>Order Status: {order.status}</p>
                                </div>
                                <p className='m-2'><span className='fw-bold'>Ordered by: </span> { order.user && order.user.name}, { order.user && order.user.email}, { order.user && order.user.contact}</p>
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
                                <div className='card'>
                                    <h2 className='text-center fs-3 my-3'>Ordered Products</h2>
                                    <table className="table table-striped border text-center table-hover">
                                        <thead>
                                            <tr>
                                                <th className='bg-primary text-light' scope="col">#ID</th>
                                                {/* <th className='bg-primary text-light' scope="col">Category</th> */}
                                                <th className='bg-primary text-light' scope="col">Name</th>
                                                <th className='bg-primary text-light' scope="col">Quantity</th>
                                                <th className='bg-primary text-light' scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.products && order.products.map((product, i)=>{
                                                return<tr key={i}>
                                                        <th scope="row">{product.productId}</th>
                                                        {/* <td>{product.category}</td> */}
                                                        <td>{product.name}</td>
                                                        <td>{product.quantity} item(s)</td>
                                                        <td><Link to={`/product/${product.productId}`}>View <i className='bi bi-arrow-right-circle'></i></Link></td>
                                                    </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
        
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

export default ViewOrder