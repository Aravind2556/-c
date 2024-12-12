import React, { useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import SlowLoader from '../components/SlowLoader'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [Otp, setOtp] = useState('')
    const EmailRef = useRef(null)
    const [otpSend, setOtpSend] = useState(null)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [Loader, setLoader] = useState(false)

    const sendOTP = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(EmailRef.current){
          const isValidEmail = emailPattern.test(EmailRef.current.value.trim())
          if(isValidEmail){
            EmailRef.current.classList.remove("is-invalid")
            EmailRef.current.classList.add("is-valid")

            setLoader(true)
            
            fetch('https://skecommerce-backend.onrender.com/sendpasswordotp',{
            // fetch('https://skecommerce-backend.onrender.com/sendpasswordotp',{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email}),
            })
            .then(response=>response.json())
            .then(data => {
                console.log('data: ',data)
                setLoader(false)
                if(data.success){
                    setUserEmail(data.email)
                    setOtpSend(true)
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
            EmailRef.current.classList.remove("is-valid")
            EmailRef.current.classList.add("is-invalid")
            alert('Please enter the email correctly!')
          }
        }
    }

    const updatePassword = (e) => {
        setLoader(true)
        const form = e.target.closest("form")
        if(form){
            if(form.checkValidity() && password!=='' && confirmPassword!==''){
                if(password===confirmPassword){
                    fetch('https://skecommerce-backend.onrender.com/resetpassword',{
                    // fetch('https://skecommerce-backend.onrender.com/resetpassword',{
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email: email, otp: Otp, password: password}),
                    })
                    .then(response=>response.json())
                    .then(data => {
                        setLoader(false)
                        if(data.success){
                            alert(data.message)
                            window.location.href='/signin'
                        }else{
                            alert(data.message)
                        }
                    }).catch(err=>{
                        setLoader(false)
                        alert('Error connecting to Server! Please try again later.')
                        console.log('Error on Updating Password: ',err)
                    })
                }else{
                    setLoader(false)
                    alert('Please enter the same Passwords!')
                }            
            }else{
                setLoader(false)
                form.classList.add('was-validated')
            }
        }else{
            setLoader(false)
            alert('No forms available!, contact developer')
        }
    }

  return (
    <div>
        <Navbar/>
        <div>
            <h3 className='text-center'><u>Forgot Password?</u></h3>
            <p className='mt-5 text-center'>Please Enter the Email below and Click Send OTP</p>

            <div className="mb-3" style={{width: "320px", margin: "0 auto"}}>
                <label htmlFor="EmailInput" className="form-label">Email address</label>
                <input ref={EmailRef} autoComplete='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} onKeyDown={(e)=>{e.keyCode === 13 && sendOTP()}} required type="email" className="form-control" id="EmailInput" placeholder="name@example.com"/>
                <div className="invalid-feedback">
                    Please enter your email correctly!
                </div>
            </div>
            
            { otpSend!==null &&
            <div className="mb-3" style={{width: "320px", margin: "0 auto"}}>
                <label htmlFor="OtpInput" className="form-label">OTP</label>
                <input ref={EmailRef} autoComplete='otp' value={Otp} onChange={(e)=>{setOtp(e.target.value)}} required type="tel" className="form-control" id="OtpInput" placeholder="******"/>
                <div className="invalid-feedback">
                    Please enter the OTP correctly!
                </div>
            </div>}
            
            { !otpSend!==null &&
            <div className='d-flex justify-content-around'>
                <button type='button' className='btn btn-primary' onClick={sendOTP}>Send OTP</button>
            </div>}
            
            { (otpSend!==null && otpSend===true) && <form className='d-flex justify-content-center flex-wrap'>
                <div className="m-3" style={{width: "320px", margin: "0 auto", display: 'none'}}>
                    <label htmlFor="UserEmail" className="form-label">User Email{userEmail}</label>
                    <input readOnly autoComplete='new-password' value={userEmail} required type="text" className="form-control" id="UserEmail" placeholder="••••••••"/>
                    <div className="invalid-feedback">
                        Please enter a Password
                    </div>
                </div>
                <div className="m-3" style={{width: "320px", margin: "0 auto"}}>
                    <label htmlFor="InputPassword" className="form-label">Password</label>
                    <input autoComplete='new-password' value={password} onChange={(e) => setPassword(e.target.value)} required type="password" className="form-control" id="InputPassword" placeholder="••••••••"/>
                    <div className="invalid-feedback">
                        Please enter a Password
                    </div>
                </div>
                <div className="m-3" style={{width: "320px", margin: "0 auto"}}>
                    <label htmlFor="InputConfirmPassword" className="form-label">Confirm Password</label>
                    <input autoComplete='new-password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required type="password" className="form-control" id="InputConfirmPassword" placeholder="••••••••"/>
                    <div className="invalid-feedback">
                        Please Re-enter the Password
                    </div>
                </div>
                <div className='d-flex align-items-center  justify-content-center'>
                    <button onClick={(e)=>updatePassword(e)} type='submit' className='btn btn-outline-primary'>Update Password</button>
                </div>

            </form>}

        </div>
        {Loader && <SlowLoader/>}
    </div>
  )
}

export default ForgotPassword