import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import NoData from '../assets/No data.gif'
import SlowLoader from '../components/SlowLoader'

const Orders = () => {

    const [orders, setOrders] = useState(null)
    const [Loader, setLoader] = useState(false)
    useEffect(()=>{
        setLoader(true)
        fetchOrder()
    }, [])

    const fetchOrder = async () => {
        try {
            await fetch(`https://skecommerce-backend.onrender.com/usersorder`, {
                method: 'POST',
                headers: {
                    Accept:'application/json',
                    'Content-Type': 'application/json',
                    "auth-token": `${localStorage.getItem('auth-token')}`,
                }
            }).then(res=>res.json())
            .then((data)=>{ 
                if (data.success) {
                    setOrders(data.orders)
                } else {
                    if('redirect' in data && data.redirect === true){
                        alert(data.message)
                        window.location.href('/');
                    }else{
                        alert(data.message)
                    }
                }
                setLoader(false)
            })
        } catch (error) {
            setLoader(false)
            console.log("Error found on order fetching!: ", error);
        }
    }

  return (
    <div>
        <Navbar/>
        <button onClick={()=>{window.location.href='/'}} className='btn btn-outline-dark rounded-pill ms-2 my-2'><i className="bi bi-arrow-left-circle"></i><span className='back-home-sm'> Home</span><span className='back-home-lg'> Goto Homepage</span></button>
        <div className='container-fluid'>
            <div className='row d-flex justify-content-center'>
                <div className='col-md-8 col-sm-11'>
                    <h2 className='text-center fs-3 my-3'>Order History</h2>
                    <table className="table table-striped border text-center table-hover">
                        <thead>
                            <tr>
                                <th className='bg-primary text-light' scope="col">#Order ID</th>
                                <th className='bg-primary text-light' scope="col">Date</th>
                                <th className='bg-primary text-light' scope="col">Status</th>
                                <th className='bg-primary text-light' scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.length>0 ? orders.map((order, i)=>{
                                return <tr key={i}>
                                            <th scope="row">{order.id}</th>
                                            <td>{new Date(order.date).toLocaleDateString()}</td>
                                            <td>{order.status}</td>
                                            <td><Link to={`/order/${order.id}`}>View</Link></td>
                                        </tr>
                            }):
                            <tr>
                                <td colSpan='4'>No Orders available!</td>
                            </tr>}
                        </tbody>
                    </table>
                    {
                        (orders===null)&&<div className='d-flex justify-content-center'><img style={{height:'300px'}} src={NoData} alt='No Data Available!' /></div>
                    }
                </div>
            </div>
            {/* <div className='d-flex justify-content-center'>
                <img className='text-center' src={NoFile} style={{height: '250px'}} alt='pandavas' />
            </div> */}
        </div>
        {Loader && <SlowLoader/>}
    </div>
  )
}

export default Orders