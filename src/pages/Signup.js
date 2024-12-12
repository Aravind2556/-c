import React, { useContext } from 'react'
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { DataContext } from '../context/DataContext';
import SlowLoader from '../components/SlowLoader';

function Signup() {

  const {UserAuth} = useContext(DataContext)
  const [Loader, setLoader] = useState(false)

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [renderOtp, setRenderOtp] = useState(false)
  const [comparePassword, setComparePassword] = useState(true)


  const handleSignup = async (e) => {

    setLoader(true)

    if(renderOtp===true){

    e.preventDefault(); // Prevent default form submission

    // Get the form element
    const form = e.target.closest('form');
  
    // Check if the form is valid
    if (form.checkValidity()) {


    if(name.trim() !== '' && contact.trim() !== '' && email.trim() !== '' && password.trim() !== '' &&   confirmPassword.trim() !== '' &&   otp.trim() !== ''){
      setComparePassword(password===confirmPassword)
      if(comparePassword){
        try {
            const response = await fetch('https://skecommerce-backend.onrender.com/signup', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, contact, password, otp }),
            });
    
            const data = await response.json();
    
            if (data.success) {
              setLoader(false)
                alert('Signup Successfull!, You will be redirected to the Homepage.')
                localStorage.setItem("auth-token",data.token)
                UserAuth(true)
            } else {
              setLoader(false)
                // Signup failed
                alert(data.message) // Assuming the server sends an error message in the response
                if(data.message==="Invalid OTP!"){
                  alert(data.message)
                }else{
                  setName('')
                  setEmail('')
                  setContact('')
                  setPassword('')
                  setConfirmPassword('')
                  otp('')
                }
            }
        } catch (error) {
          setLoader(false)
            alert('Error connecting to the Server! Please try again later.')
            console.log('Catch error: '+error)
            setName('')
            setEmail('')
            setContact('')
            setPassword('')
            setConfirmPassword('')
        }
      }else{
        setLoader(false)
        alert('Passwords do not match')
      }
    }else{
      setLoader(false)
      alert("Please fill all fields")
    }

  }

  else {
    setLoader(false)
    // If the form is not valid, Bootstrap will automatically display validation styles
    form.classList.add('was-validated')
  }

  }else{
    setLoader(false)
    alert('Please click on the Send OTP button, and enter the received OTP below.')
  }

}

  const sendOtp = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email!=='' && emailPattern.test(email)){
    setLoader(true)
    setRenderOtp(true)
    fetch('https://skecommerce-backend.onrender.com/sendotp',{
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email}),
    })
    .then(response=>response.json())
    .then(data => {
      setLoader(false)
      if(data.success){
        alert(data.message)
      }else{
        alert(data.message)
      }
    }).catch(err=>{
      setLoader(false)
      alert('Error connecting to Server! Please try again later.')
      console.log('Error on Sending Otp: ',err)
    })
  }else{
    alert('Please enter a valid Email address')
  }
  }

  return (
    <div>
      <Navbar/>
      <div className='d-flex flex-wrap justify-content-center align-items-center'>
      <div className='text-primary text-center p-3'>
        <h1 className=''>Create an Account!</h1>
        <p>Enter all the required details and verify your Email for creating a new Account.</p>
      </div>
      <div className='bg-primary text-light p-5 col-md-5 rounded'>
        <h2 className='text-center'>Sign Up</h2>
        <p>Already have an account? then <a className='text-info' href='/signin'>Click here</a></p>
        <form className='needs-validation' noValidate>
          <div className="mb-3">
            <label htmlFor="InputName" className="form-label">Full Name</label>
            <input autoComplete='name' value={name} onChange={(e) => setName(e.target.value)} required type="text" className="form-control" id="InputName" placeholder="Subhin Krishna"/>
            <div className="invalid-feedback">
                Please enter your Full Name
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="InputContact" className="form-label">Contact</label>
            <input autoComplete='contact' value={contact} onChange={(e) => setContact(e.target.value)} required type="tel" className="form-control" id="InputContact" placeholder="+91 9876543210"/>
            <div className="invalid-feedback">
                Please enter your Contact Number
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="InputEmail" className="form-label">Email address</label>
            <input autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} required type="email" className="form-control" id="InputEmail" placeholder="name@example.com"/>
            <div className="invalid-feedback">
                Please enter your Email Address
            </div>
            {
              renderOtp &&
              <div className="mb-3">
                <label htmlFor="InputOTP" className="form-label">OTP</label>
                <input autoComplete='otp' value={otp} onChange={(e) => setOtp(e.target.value)} required type="number" className="form-control" id="InputOTP" placeholder="eg: 769854"/>
                <div className="invalid-feedback">
                  Please enter the OTP sent to your mentioned Email Id
                </div>
              </div>
            }

            {
              !renderOtp &&
              <button type='button' onClick={sendOtp} className='btn btn-outline-light m-2'>Send OTP</button>
            }

          </div>
          <div className="mb-3">
            <label htmlFor="InputPassword" className="form-label">Password</label>
            <input autoComplete='new-password' value={password} onChange={(e) => setPassword(e.target.value)} required type="password" className="form-control" id="InputPassword" placeholder="••••••••"/>
            <div className="invalid-feedback">
                Please enter a Password
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="InputConfirmPassword" className="form-label">Confirm Password</label>
            <input autoComplete='new-password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required type="password" className="form-control" id="InputConfirmPassword" placeholder="••••••••"/>
            <div className="invalid-feedback">
                Please Re-enter the Password
            </div>
          </div>
          <button onClick={(e)=>handleSignup(e)} type='submit' className='btn btn-outline-light'>Sign Up</button>
          {/* <p>{message}</p> */}
        </form>
      </div>
    </div>
    { Loader &&
      <SlowLoader/>
    }
    </div>
  )
}

export default Signup