import React, {useContext, useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import { DataContext } from '../context/DataContext'
import AccountImg from '../assets/myaccount.jpg'
import SlowLoader from '../components/SlowLoader'

function UserAccount() {

  const [newPassword, setNewPassword] = useState(false)
  const [newMail, setNewMail] = useState(false)
  const [otpSend, setOtpSend] = useState(false)
  const [emailOtp, setEmailOtp] = useState('')

  const [password1Visibility, setPassword1Visibility] = useState(false)
  const [password2Visibility, setPassword2Visibility] = useState(false)
  const [Loader, setLoader] = useState(false)
  const {userInfo} = useContext(DataContext)
  const [userData, setUserData] = useState({
      fullname: userInfo ? userInfo.name:'',
      email: userInfo?userInfo.email:'',
      contact: userInfo?userInfo.contact:'',
      password: '',
      confirmPassword: '',
      doorStreet:  (userInfo && userInfo.Address) ? userInfo.Address.doorStreet:'',
      area: (userInfo && userInfo.Address) ? userInfo.Address.area:'',
      landmark: (userInfo && userInfo.Address) ? userInfo.Address.landmark:'',
      city: (userInfo && userInfo.Address) ? userInfo.Address.city:'',
      state: (userInfo && userInfo.Address) ? userInfo.Address.state:'',
      country: (userInfo && userInfo.Address) ? userInfo.Address.country:'',
      zipcode: (userInfo && userInfo.Address) ? userInfo.Address.zipcode:'',
  })

  useEffect(()=>{
    if (userInfo) {
      setUserData({
          fullname: userInfo.name,
          email: userInfo.email,
          contact: userInfo.contact,
          doorStreet: userInfo.Address ? userInfo.Address.doorStreet : '',
          area: userInfo.Address ? userInfo.Address.area : '',
          landmark: userInfo.Address ? userInfo.Address.landmark : '',
          city: userInfo.Address ? userInfo.Address.city : '',
          state: userInfo.Address ? userInfo.Address.state : '',
          country: userInfo.Address ? userInfo.Address.country : '',
          zipcode: userInfo.Address ? userInfo.Address.zipcode : '',
      });
  }
  if(userData.fullname!==''&&userData.email!==''&&userData.contact!==''){
    setLoader(false)
  }else{
    setLoader(true)
  }
  },[userInfo])


  useEffect(()=>{
    if(userInfo!==null){
      if(userInfo.email!==null){
        setLoader(false)
      }else{
        setLoader(true)
      }
    }else{
      setLoader(true)
    }
  },[userData])



  const [comparePassword, setComparePassword] = useState(true)    

  const handleUpdateUser = async () => {
    setLoader(true)
    try{
        await fetch('https://skecommerce-backend.onrender.com/updatecurrentuser',{
            method: 'POST',
            headers: {
                Accept:'application/form-data',
                'Content-Type':'application/json',
                'auth-token': `${localStorage.getItem("auth-token")}`
            },
            body: JSON.stringify({userdata: userData, passwordupdation: newPassword, newMail: newMail, emailOtp: emailOtp}),
        }).then(res=> res.json())
        .then((data)=>{
          setLoader(false)
            if(data.success){
                alert(data.message)
                window.location.reload()
            }else{
                if('redirect' in data && data.redirect === true){
                    alert(data.message)
                    window.location.href='/'
                }else{
                    alert(data.message) 
                }
            }
        })

    }catch(error){
      setLoader(false)
        alert('Error on Connection! Please try again later.')
        console.log('Error on user updation: ',error)
    }
  }


  const handleUpdation = () => {
    setLoader(true)
      if(userData.fullname!==''&&userData.email!==''&&userData.contact!==''&&userData.doorStreet!==''&&userData.area!==''&&userData.landmark!==''&&userData.city!==''&&userData.state!==''&&userData.country!==''&&userData.zipcode!==''){
          if(newPassword){
              if (userData.password === userData.confirmPassword && userData.password!=='' && userData.confirmPassword!==''){
                handleUpdateUser()
              }else{
                setLoader(false)
                setComparePassword(false)
              }
          }else{
              handleUpdateUser()
          }
          if(newMail){
            if(emailOtp!==''){
              handleUpdateUser()
            }else{
              alert('Please Enter the Otp!')
            }
          }
      }else{
        setLoader(false)
        alert('Please enter all the required values!')
      }
  }

  const HandleEmailUpdate = (e) => {
    setUserData({ ...userData, email: e.target.value })
    if(userInfo.email===e.target.value){
      setNewMail(false)
    }else{
      setNewMail(true)
    }
  }

  const sendOtp = () => {

    fetch('https://skecommerce-backend.onrender.com/verifyemail',{
      // fetch('https://skecommerce-backend.onrender.com/verifyemail',{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: userData.email}),
      })
      .then(response=>response.json())
      .then(data => {
          console.log('data: ',data)
          setLoader(false)
          if(data.success){
            setOtpSend(true)
            alert(data.message)
          }else{
            setOtpSend(false)
            alert(data.message)
          }
      }).catch(err=>{
          setLoader(false)
          alert('Error connecting to Server! Please try again later.')
          console.log('Error in verifing Email: ',err)
      })


  }






  if(userInfo!==null && userInfo.email!==null && userData.email!==''){
    return (
      <div>
        <Navbar/>
        <div className='d-flex flex-wrap justify-content-center align-items-center'>
          <div className='text-primary text-center pt-0 p-3'>
            <img src={AccountImg} alt='User Account' style={{height: '200px'}} />
            <h1 className=''>Your Account Information</h1>
            <p>Find all your account informations here, click Edit Account to update your informations.</p>
          </div>
        <div className='bg-primary text-light p-5 col-md-5 rounded'>
          <h2 className='text-center'>Account Info</h2>
          <form>
              <div className='d-flex justify-content-end'>
                  <button type='button' className='btn btn-outline-light' onClick={handleUpdation}>Update Account <i className="bi bi-check2-square"></i></button>
              </div>
            <div className="mb-3">
              <label htmlFor="FormControlName" className="form-label">Full Name</label>
              <input required value={userData.fullname} onChange={(e)=>setUserData({ ...userData, fullname: e.target.value })} type="text" className={`form-control ${(!userData.fullname)?'is-invalid':''}`} id="FormControlName" placeholder="Your Full Name"/>
            </div>
            <div className="mb-3">
              <label htmlFor="FormControlEmail" className="form-label">Email address</label>
              <input required value={userData.email} onChange={(e)=>HandleEmailUpdate(e)} type="email" className={`form-control ${(!userData.email)?'is-invalid':''}`} id="FormControlEmail" placeholder="name@example.com"/>
            </div>
            {(newMail && !otpSend) && <button type='button' className='btn btn-light mb-3' onClick={sendOtp}>Verify Email</button>}
            {(newMail && otpSend) && 
              <div className="mb-3">
                <label htmlFor="FormControlOtp" className="form-label">Enter OTP</label>
                <input required value={emailOtp} onChange={(e)=>setEmailOtp(e.target.value)} type="tel" className={`form-control ${(!emailOtp)?'is-invalid':''}`} id="FormControlOtp" placeholder="******"/>
              </div>
            }
            <div className="mb-3">
              <label htmlFor="FormControlContact" className="form-label">Contact Number</label>
              <input required value={userData.contact} onChange={(e)=>setUserData({ ...userData, contact: e.target.value })} type="tel" className={`form-control ${(!userData.contact)?'is-invalid':''}`} id="FormControlContact" placeholder="+91 98765 43210"/>
            </div>
            <div>
              {
                newPassword === false&&(
                    <button onClick={()=>{setNewPassword(true);setComparePassword(true)}} className='btn btn-outline-light my-2'>Set new Password</button>
              )}
              {
                  newPassword === true&&(
                  <div className='d-flex flex-wrap justify-content-evenly align-items-center w-90 my-2 border-top border-bottom border-start border-end border-dark p-2'>
                      <div className="m-2" style={{width: '320px'}}>
                          <label htmlhtmlFor="FormControlPassword" className="form-label">Set Password</label>
                          <div className='d-flex'>
                              <input value={userData.password} onChange={(e)=>setUserData({...userData, password: e.target.value})} type={password1Visibility?'text':'password'} className={`form-control ${(!comparePassword)&&'is-invalid'} `} id="FormControlPassword" placeholder="********" autoComplete='new-password' />
                              <i style={{cursor: 'pointer'}} className={`fs-4 mx-1 bi ${password1Visibility?'bi-eye-slash':'bi-eye'}`} onClick={()=>setPassword1Visibility(!password1Visibility)}></i>
                          </div>
                      </div>
                      <div className="m-2" style={{width: '320px'}}>
                          <label htmlhtmlFor="FormControlConfirmPassword" className="form-label">Confirm Password</label>
                          <div className='d-flex'>
                              <input value={userData.confirmPassword} onChange={(e)=>setUserData({...userData, confirmPassword: e.target.value})} type={password2Visibility?'text':'password'} className={`form-control ${(!comparePassword)&&'is-invalid'} `} id="FormControlConfirmPassword" placeholder="********" autoComplete='new-password' />
                              <i style={{cursor: 'pointer'}} className={`fs-4 mx-1 bi  ${password2Visibility?'bi-eye-slash':'bi-eye'}`} onClick={()=>setPassword2Visibility(!password2Visibility)}></i>
                          </div>
                      </div>
                      {(!comparePassword) && <p className='text-danger m-2'><i className='bi bi-exclamation-triangle-fill'></i> Please enter the same passwords!</p>}
                      <button type='button' className='btn btn-outline-danger m-2' onClick={()=>setNewPassword(false)}>Cancel Password setting</button>
                      {/* <button onClick={checkPassword} type='button' className='btn btn-dark m-2'>Update Password</button> */}
                  </div>
                  )
              }
            </div>
            <div className="mb-3">
              <label htmlFor="FormControlDoorStreet" className="form-label">Delivery Address</label>
              <input required value={userData.doorStreet} onChange={(e)=>setUserData({...userData, doorStreet: e.target.value})} type="text" className={`form-control delivery my-1 ${(!userData.doorStreet)?'is-invalid':''}`} id="FormControlDoorStreet" placeholder="Enter your Door No., Street Name" autoComplete='Door Number'/>
              <input required value={userData.area} onChange={(e)=>setUserData({...userData, area: e.target.value})} type="text" className={`form-control delivery my-1 ${(!userData.area)?'is-invalid':''}`} placeholder="Enter your Area" autoComplete='area'/>
              <input value={userData.landmark} onChange={(e)=>setUserData({...userData, landmark: e.target.value})} type="text" className={`form-control delivery my-1 ${(!userData.landmark)?'is-invalid':''}`} placeholder="Enter a LandMark" autoComplete='landmark'/>
              <input required value={userData.city} onChange={(e)=>setUserData({...userData, city: e.target.value})} type="text" className={`form-control delivery my-1 ${(!userData.city)?'is-invalid':''}`} placeholder="Enter your City" autoComplete='city'/>
              <input required value={userData.state} onChange={(e)=>setUserData({...userData, state: e.target.value})} type="text" className={`form-control delivery my-1 ${(!userData.state)?'is-invalid':''}`} placeholder="Enter your State" autoComplete='state'/>
              <input required value={userData.country} onChange={(e)=>setUserData({...userData, country: e.target.value})} type="text" className={`form-control delivery my-1 ${(!userData.country)?'is-invalid':''}`} placeholder="Enter your Country" autoComplete='country'/>
              <input required value={userData.zipcode} onChange={(e)=>setUserData({...userData,zipcode: e.target.value})} type="tel" className={`form-control delivery my-1 ${(!userData.zipcode)?'is-invalid':''}`} placeholder="Enter your Pincode here" autoComplete='pincode'/>
            </div>
            <button type='button' className='btn btn-outline-light' onClick={handleUpdation}>Update Account <i className="bi bi-check2-square"></i></button>
          </form>
        </div>
      </div>
      {Loader && <SlowLoader/>}
      </div>
    )
  }else{
    return(
      <>
        <SlowLoader/>
      </>
    )
  }
}

export default UserAccount