import React, { useContext, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import { DataContext } from '../context/DataContext'
import SlowLoader from '../components/SlowLoader'

function User() {

  const {UserAuth} = useContext(DataContext)

  const EmailRef = useRef(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loader, setLoader] = useState(false)

  const [message, setMessage] = useState('')

  const HandleSignin = async (e)=> {

    e.preventDefault(); // Prevent default form submission

  // Get the form element
  const form = e.target.closest('form');

  // Check if the form is valid
  if (form.checkValidity()) {

    if(email.trim()!==''&&password.trim()!==''){
      setLoader(true)

      try{
          const  response = await fetch("https://skecommerce-backend.onrender.com/signin", {
              method:"POST",
              headers:{
                  "Content-Type":"application/json"
              },
              body:JSON.stringify({
                  email, password
              })
          });
  
          let data = await response.json()
  
          if(data.success){
            setLoader(false)
              localStorage.setItem("auth-token", data.token)
              UserAuth(true)
              window.location.href='/'
          }else{
            setLoader(false)
              setMessage(data.message)
          }
  
      }catch(error){
          setLoader(false)
          alert('Error connecting to the Server! Please try again later.')
          console.log('Catched Error on Login: '+error)
      }
    }else{
      // alert('Please fill in the required fields')
    }

  }

  else {
    // If the form is not valid, Bootstrap will automatically display validation styles
    form.classList.add('was-validated');
  }

}



  return (
    <div>
      <Navbar/>
      <div className='d-flex flex-wrap justify-content-center align-items-center'>
      <div className='text-primary text-center p-3 rounded-start'>
        <h1 className=''>Welcome Back!</h1>
        <p>Enter your registered Email and Password for accesing your user account.</p>
      </div>
      <div className='bg-primary text-light p-5 col-md-5 rounded'>
        <h2 className='text-center'>Sign In</h2>
        <p>Don't have an account? then <a className='text-info' href='/signup'>Click here</a></p>
        <form className='needs-validation' noValidate onSubmit={HandleSignin}>
          <div className="mb-3">
            <label htmlFor="EmailInput" className="form-label">Email address</label>
            <input ref={EmailRef} autoComplete='email' value={email} onChange={(e)=>{setEmail(e.target.value);setMessage('')}} required type="email" className="form-control" id="EmailInput" placeholder="name@example.com"/>
            <div className="invalid-feedback">
                Please enter your email correctly!
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="PasswordInput" className="form-label">Password</label>
            <input autoComplete='current-password' value={password} onChange={(e)=>{setPassword(e.target.value);setMessage('')}} required type="password" className="form-control" id="PasswordInput" placeholder="••••••••"/>
            <div className="invalid-feedback">
                Please enter your Password!
            </div>
          </div>
          <p>Forgot Password? then <a className='text-info' href='/forgotpassword'>Click here</a></p>
          {(message!=='')&&
          <p className='my-2 ms-3 text-danger'><i className='bi bi-exclamation-triangle-fill'></i> {message}</p>}
          <div className='d-flex justify-content-center'>
            <button onClick={(e)=>HandleSignin(e)} type='submit' className='btn btn-outline-light'>Sign In</button>
          </div>
        </form>
      </div>
    </div>
    { loader &&
      <SlowLoader/>
    }
    </div>
  )
}

export default User