import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { DataContext } from '../context/DataContext'
import SlowLoader from '../components/SlowLoader'

const Cart = () => {

    const {Products, userInfo, getTotalCartItems, setCartItems, cartItems} = useContext(DataContext)

    const [totalAmount, setTotalAmount] = useState(null)
    const [Loader, setLoader] = useState(false)

    useEffect(()=>{

        fetch('https://skecommerce-backend.onrender.com/gettotalamount', {
            method: 'POST',
            headers:{
                'Content-Type' : 'Application/Json',
                'auth-token': `${localStorage.getItem("auth-token")}`,
            },
            body: JSON.stringify()
        }).then(res=>res.json())
        .then((data)=>{
            if(data.success){
                setTotalAmount(data.totalAmount)
            }else{
                alert(data.message)
            }
        }).catch(err=>{
            alert('Error connecting to the Server!, Please try again later.')
            console.log('Error on fetching total amount from server: ', err);
        })

    },[])

    const HandleCartUpdate = (i, value) => {
        if(localStorage.getItem("auth-token"))
        {
          fetch('https://skecommerce-backend.onrender.com/updatecart', {
            // fetch('https://skecommerce-backend.onrender.com/updatecart', {
          method: 'POST',
          headers: {
            Accept:'application/form-data',
            'auth-token':`${localStorage.getItem("auth-token")}`,
            'Content-Type':'application/json',
          },
          body: JSON.stringify({"itemId":i, "value": value}),
        })
          .then((resp) => resp.json())
          .then((data) => {
            if(!data.success){
                if('redirect' in data && data.redirect === true){
                    alert(data.message)
                    window.location.href= '/';
                }else{
                    alert(data.message)
                    window.location.reload()
                }
            }else{
                if(value===null){
                    window.location.reload()
                }
                fetch('https://skecommerce-backend.onrender.com/gettotalamount', {
                    method: 'POST',
                    headers:{
                        'Content-Type' : 'Application/Json',
                        'auth-token': `${localStorage.getItem("auth-token")}`,
                    },
                    body: JSON.stringify()
                }).then(res=>res.json())
                .then((data)=>{
                    if(data.success){
                        setTotalAmount(data.totalAmount)
                    }else{
                        alert(data.message)
                    }
                }).catch(err=>{
                    alert('Error connecting to the Server!, Please try again later.')
                    console.log('Error on fetching total amount from server: ', err);
                })

            }
          });   
        }else{
            setLoader(false)
            alert('You dont have access to this Action!, Please login again')
            window.location.href='/signin'
        }
    }


    if(Products && userInfo && userInfo!==null && cartItems!==null){
        return (
            <div>
                <Navbar/>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12'>
                            
                            <div>
                                <div className='w-100 d-flex flex-wrap justify-content-between align-items-center'>
                                    <button onClick={()=>{window.location.href='/'}} className='btn btn-outline-dark rounded-pill my-2'><i className="bi bi-arrow-left-circle"></i><span className='back-home-sm'> Home</span><span className='back-home-lg'> Goto Homepage</span></button>
                                    <button disabled={!getTotalCartItems()>0} onClick={()=>window.location.href='/checkout'} className='btn btn-primary rounded-pill my-2'>Proceed to Checkout <i className="bi bi-arrow-right-circle"></i></button>
                                </div>
                                <h1 className='fs-3 text-center mt-2'>Checkout Page, Total {getTotalCartItems()} Items</h1><hr/>
                                <div className='cart-products-container w-100 d-flex flex-wrap justify-content-center'>
                                    
                                    {
                                        Products.some((e)=>(cartItems[e.id]!==null))?(
                                        Products.map((e, index) => {
                                            if (cartItems[e.id] !== null) {
                                                return (
                                                    <div className='cart-card p-2 d-flex flex-wrap justify-content-evenly align-items-center w-100' key={index}>
                                                        <img className='cart-card-img rounded m-2 object-fit-cover' style={{height:'100px', width:'100px'}} src={e.images[0]} alt='product_images' />
                                                        <h2 className='cart-card-title fs-4 m-2'>{e.name}</h2>
                                                        <div className='cart-card-right d-flex align-items-center m-2'>
                                                            <form>
                                                                <label htmlFor='cart-quantity' className='my-1'>Items:</label>
                                                                {/* <input onChange={(event) => {setCartItems((prev) => ({ ...prev, [e.id]: Number(event.target.value) })); HandleCartUpdate(e.id, event.target.value)}} value={cartItems[e.id]} min="1" max="1000" id='cart-quantity' className='form-control' type='number' /> */}
                                                            
                                                                <input 
                                                                    onChange={(event) => {
                                                                        const value = event.target.value;
                                                                        if (/^\d*$/.test(value) || value === '') {
                                                                            setCartItems((prev) => ({ ...prev, [e.id]: value === '' ? '' : parseInt(value) }));
                                                                            HandleCartUpdate(e.id, value === '' ? '' : parseInt(value));
                                                                        }
                                                                    }} 
                                                                    onKeyDown={(event) => {
                                                                        const key = event.key;
                                                                        // Allow only backspacing and prevent other non-numeric characters
                                                                        if (!(key === 'Backspace' || (key >= '0' && key <= '9'))) {
                                                                            event.preventDefault();
                                                                        }
                                                                    }}
                                                                    value={cartItems[e.id] || ''} 
                                                                    id={`cart-quantity-${e.id}`} 
                                                                    className='form-control' 
                                                                    type='text' 
                                                                />



                                                            </form>
                                                        </div>
                                                        <i className="bi bi-x-circle fs-3" style={{cursor:'pointer'}} onClick={() => HandleCartUpdate(e.id, null)}></i><br /><br />
                                                    </div>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })
                                        ):(
                                            <p className='text-danger text-center'>No Products added yet! <a href='/'>click here</a> to view all products</p>
                                        )
                                    }


                                </div><hr/>
                                <div className='d-flex align-items-center justify-content-center m-3'>
                                    <h6 className='m-2 fw-bold'>Total Amount: </h6>
                                    <p className='m-2'>₹ {totalAmount/100}.00</p>
                                </div>
                                <div className='text-center'>
                                    <button disabled={!getTotalCartItems()>0} onClick={()=>window.location.href='/checkout'} className={`btn btn-primary rounded-pill my-2`}>Proceed to Checkout <i className="bi bi-arrow-right-circle"></i></button>
                                </div>
                            </div>
                            

                        </div>
                    </div>
                </div>
                {
                    Loader && <SlowLoader/>
                }
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

export default Cart