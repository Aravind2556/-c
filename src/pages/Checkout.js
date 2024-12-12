import React, { useContext, useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { DataContext } from '../context/DataContext'
import SlowLoader from '../components/SlowLoader'

const Cart = () => {

    const [PaymentMethod, setPaymentMethod] = useState('online')
    const [totalAmount, setTotalAmount] = useState(null)
    const [orderId, setOrderId] = useState(null)
    const [Loader, setLoader] = useState(false)


    const { userInfo } = useContext(DataContext)
    const [userData, setUserData] = useState({
        Fullname: userInfo?userInfo.name:'',
        Contact: userInfo?userInfo.contact:'',
        Email: userInfo?userInfo.email:'',
        DoorStreet: userInfo&&userInfo.Address?userInfo.Address.doorStreet:'',
        Area: userInfo&&userInfo.Address?userInfo.Address.area:'',
        Landmark: userInfo&&userInfo.Address?userInfo.Address.landmark:'',
        City: userInfo&&userInfo.Address?userInfo.Address.city:'',
        State: userInfo&&userInfo.Address?userInfo.Address.state:'',
        Country: userInfo&&userInfo.Address?userInfo.Address.country:'',
        Zipcode: userInfo&&userInfo.Address?userInfo.Address.zipcode:'',
    })

    useEffect(()=>{
        if (userInfo) {
          setUserData({
              Fullname: userInfo.name,
              Email: userInfo.email,
              Contact: userInfo.contact,
              DoorStreet: userInfo.Address ? userInfo.Address.doorStreet : '',
              Area: userInfo.Address ? userInfo.Address.area : '',
              Landmark: userInfo.Address ? userInfo.Address.landmark : '',
              City: userInfo.Address ? userInfo.Address.city : '',
              State: userInfo.Address ? userInfo.Address.state : '',
              Country: userInfo.Address ? userInfo.Address.country : '',
              Zipcode: userInfo.Address ? userInfo.Address.zipcode : '',
          });
      }
    },[userInfo])
    
    useEffect(()=>{
        setLoader(true)

        fetch('https://skecommerce-backend.onrender.com/gettotalamount', {
            method: 'POST',
            headers:{
                'Content-Type' : 'Application/Json',
                'auth-token': `${localStorage.getItem("auth-token")}`,
            },
            body: JSON.stringify()
        }).then(res=>res.json())
        .then((data)=>{
            setLoader(false)
            if(data.success){
                setTotalAmount(data.totalAmount)
            }else{
                alert(data.message)
            }
        }).catch(err=>{
            setLoader(false)
            alert('Error connecting to the Server!, Please try again later.')
            console.log('Error on fetching total amount from server: ', err);
        })

    },[])


    const handleOrder = () => {
        setLoader(true)
        const form = document.getElementById("checkout-form")
        if(form){
            if(form.checkValidity()){
                if(userData.Fullname!=='' && userData.Contact!=='' && userData.Email!=='' && userData.DoorStreet!=='' && userData.Area!=='' && userData.Landmark!=='' && userData.City!=='' && userData.State!=='' && userData.Country!=='' && userData.Zipcode!==''){

                    fetch('https://skecommerce-backend.onrender.com/generateorder', {
                        method: 'POST',
                        headers:{
                            'Content-Type' : 'Application/Json',
                            'auth-token': `${localStorage.getItem("auth-token")}`,
                        },
                        body: JSON.stringify({"userData":userData, "PaymentMethod": PaymentMethod})
                    }).then(response=> response.json())
                    .then((data)=>{
                        setLoader(false)
                        if(data.success){
                            alert('Order placed Successfully!')
                            window.location.href= '/orders';
                        }else{
                            if('redirect' in data && data.redirect === true){
                                alert(data.message)
                                window.location.href= '/';
                            }else{
                                alert(data.message)
                            }
                        }
                    }).catch((error)=>{
                        setLoader(false)
                        alert('Error connecting to Server! Please try again Later.')
                        console.log('Error on Order generation:',error)
                    })
                }else{
                    setLoader(false)
                    alert("Please Enter all fields correctly!")
                }
            }else{
                setLoader(false)
                alert('Please Enter all fields correctly!')
                // If the form is not valid, Bootstrap will automatically display validation styles
                form.classList.add('was-validated')
            }
        }else{
            alert('Form doesnt exists, please contact developer')
        }
    }


    const renderRzp = () => {
        console.log('render rzp func called')
        if((totalAmount/100)>40000){
            setLoader(false)
            console.log('Total Amount: ',totalAmount/100)
            alert('Trial version purchases are limited to items under ₹40,000! Total Amount is :',totalAmount);
        }else{
            if(orderId!==null){
                const options = {
                    "key": "rzp_test_F5In6xQnTcFB8q", // Replace with your Razorpay key
                    "amount": totalAmount, // Amount in paisa
                    "currency": "INR",
                    "name": "SK Ecommerce",
                    "description": "SKS",
                    "order_id": orderId, // Pass the order ID obtained from the server
                    "handler": function (response){
                        // console.log('response: ', response)
                        // alert(response.razorpay_payment_id);
                        // alert(response.razorpay_order_id);
                        // alert(response.razorpay_signature)
                        
                        fetch('https://skecommerce-backend.onrender.com/verifypayment', {
                            method: 'POST',
                            headers:{
                                'Content-Type' : 'Application/Json',
                                'x-razorpay-signature': response.razorpay_signature,
                            },
                            body: JSON.stringify({"rzppaymentId":response.razorpay_payment_id, "rzporderId": response.razorpay_order_id})
                        }).then(res=> res.json())
                        .then(data => {
                            if(data.success){
                                console.log("Payment success data: ",data)
                                // alert(data.message)
                                handleOrder()
                            }else{
                                setLoader(false)
                                alert(data.message)
                            }
                        }).catch(err=>{
                            setLoader(false)
                            console.log(err)
                            alert('Error connecting to server! please try again later.')
                        })
                    },
                    "prefill": {
                        "name": "Gaurav Kumar",
                        "email": "gaurav.kumar@example.com",
                        "contact": "9000090000"
                    },
                    "theme": {
                        "color": "#072553"
                    }
                };
                const rzp = new window.Razorpay(options);
                rzp.on('payment.failed', function (response){
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);
                });
                rzp.open();
            }else{
                setLoader(false)
                alert('OrderId is Null!')
            }
        }
    }


    useEffect(()=>{
        if(orderId!==null){
            renderRzp()
        }
    },[orderId])


    // Function to handle payment using Razorpay
    const handlePayment = (e) => {
        setLoader(true)
        e.preventDefault()
        const form = e.target.closest('form')
        if(form.checkValidity()){
        if(userData.Fullname!=='' && userData.Contact!=='' && userData.Email!=='' && userData.DoorStreet!=='' && userData.Area!=='' && userData.Landmark!=='' && userData.City!=='' && userData.State!=='' && userData.Country!=='' && userData.Zipcode!==''){
            if(totalAmount!==null){
                fetch('https://skecommerce-backend.onrender.com/create/orderId', {
                method: 'POST',
                headers:{
                    'Content-Type' : 'Application/Json',
                    'auth-token': `${localStorage.getItem("auth-token")}`,
                },
                body: JSON.stringify({"amount": totalAmount})
                }).then(res=>res.json())
                .then((data)=>{
                    if(data.success){
                        setOrderId(data.orderId)
                    }else{
                        setLoader(false)
                        alert(data.message)
                    }
                }).catch(err=>{
                    setLoader(false)
                    alert('Error connecting to the Server!, Please try again later.')
                    console.log('Error on fetching OrderId of RZP from the server: ', err);
                })
            }else{
                setLoader(false)
                alert('Some Network issue occured!, Please try again later.')
            }
        }else{
            setLoader(false)
            alert('Please Enter all fields correctly!')
        }
        }else{
            setLoader(false)
            alert('Please Enter all fields correctly!')
            // If the form is not valid, Bootstrap will automatically display validation styles
            form.classList.add('was-validated')
        }
    };

    if(userInfo && userInfo!==null && userData && userData.Fullname!==''){
        return (
            <div>
                <Navbar/>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12'>
                                
                            <div className='checkout-form-container mt-3'>
                                <button onClick={()=>window.location.href='/cart'} className='btn btn-outline-dark rounded-pill my-2'><i className="bi bi-arrow-left-circle"></i> Back</button>
                                <h3 className='text-center'>Shipment To</h3>
                                <form className='w-100 needs-validation' noValidate id='checkout-form'>
                                    <div className='checkout-form-left'>
                                        <div className='d-flex flex-wrap justify-content-evenly align-items-center'>
                                            <div className="my-2" style={{width: '320px'}}>
                                                <label htmlFor="FormControlName" className="form-label">Full Name</label>
                                                <input required value={userData.Fullname} onChange={(e)=>setUserData((prev)=>({...prev, Fullname: e.target.value}))} type="text" className="form-control" id="FormControlName" placeholder="Your Name" />
                                            </div>
                                            <div className="my-2" style={{width: '320px'}}>
                                                <label htmlFor="FormControlContact" className="form-label">Contact</label>
                                                <input required type="tel" value={userData.Contact} onChange={(e)=>setUserData((prev)=>({...prev, Contact: e.target.value}))} className="form-control" id="FormControlContact" placeholder="+91 98765 43210" />
                                            </div>
                                            <div className="my-2" style={{width: '320px'}}>
                                                <label htmlFor="FormControlEmail" className="form-label">Email</label>
                                                <input required type="email" value={userData.Email} onChange={(e)=>setUserData((prev)=>({...prev, Email: e.target.value}))} className="form-control" id="FormControlEmail" placeholder="yourname@mail.com" />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="FormControlDoor" className="form-label text-center w-100 m-0 mt-2">Delivery Address</label>
                                            <div id='FormControlDelivery' className='d-flex flex-wrap justify-content-evenly align-items-center'>
                                                <input required value={userData.DoorStreet} onChange={(e)=>setUserData((prev)=>({...prev, DoorStreet: e.target.value}))} type="text" style={{width: '320px'}} className="form-control delivery m-1" id="FormControlDoor" placeholder="Door No. & Street Name" />
                                                <input required value={userData.Area} onChange={(e)=>setUserData((prev)=>({...prev, Area: e.target.value}))} type="text" style={{width: '320px'}} className="form-control delivery m-1" id="FormControlArea" placeholder="Area" />
                                                <input required value={userData.Landmark} onChange={(e)=>setUserData((prev)=>({...prev, Landmark: e.target.value}))} type="text" style={{width: '320px'}} className="form-control delivery m-1" id="FormControlLandmark" placeholder="Landmark" />
                                                <input required value={userData.City} onChange={(e)=>setUserData((prev)=>({...prev, City: e.target.value}))} type="text" style={{width: '320px'}} className="form-control delivery m-1" id="FormControlCity" placeholder="City" />
                                                <input required value={userData.State} onChange={(e)=>setUserData((prev)=>({...prev, State: e.target.value}))} type="text" style={{width: '320px'}} className="form-control delivery m-1" id="FormControlState" placeholder="State" />
                                                <input required value={userData.Country} onChange={(e)=>setUserData((prev)=>({...prev, Country: e.target.value}))} type="text" style={{width: '320px'}} className="form-control delivery m-1" id="FormControlCountry" placeholder="Country" />
                                                <input required value={userData.Zipcode} onChange={(e)=>setUserData((prev)=>({...prev, Zipcode: e.target.value}))} type="number" style={{width: '320px'}} className="form-control delivery m-1" id="FormControlZipcode" placeholder="Zip code" />
                                            </div>
                                        </div>
                                        

                                        <div className='d-flex justify-content-center align-items-center w-100 my-3'>
                                            <div>
                                                <h5 className='my-2'>Payment Method</h5>
                                                <div className="form-check my-2">
                                                    <input className="form-check-input" type="radio" name="cod" id="flexRadioDefault1" onChange={(e)=>setPaymentMethod(e.target.name)} checked={PaymentMethod==='cod'} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                        Cash On Delivery
                                                    </label>
                                                </div>
                                                <div className="form-check my-2">
                                                    <input className="form-check-input" type="radio" name="online" id="flexRadioDefault2" onChange={(e)=>setPaymentMethod(e.target.name)} checked={PaymentMethod==='online'} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                        Pay Online
                                                    </label>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className='checkout-form-right'>
                                        <div className='d-flex flex-wrap justify-content-center'>
                                            {
                                                (PaymentMethod === 'cod') &&
                                                <button type='button' className='btn btn-dark m-2' onClick={()=>handleOrder()}><i className='bi bi-box mx-2'></i>Order Now</button>
                                            }
                                            {
                                                (PaymentMethod === 'online') &&
                                                <button type='button' className='btn btn-dark m-2' id="rzp-button1" onClick={(e)=>handlePayment(e)}><i className='bi bi-box mx-2'></i>Pay Now</button>
                                            }
                                            </div>
                                    </div>      
                                </form>
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