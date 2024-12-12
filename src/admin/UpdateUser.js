import React, { useState, useEffect } from 'react'
import AdminHeader from './AdminNavbar'
import { useParams } from 'react-router-dom'
import SlowLoader from '../components/SlowLoader'

const UpdateUser = () => {

    const {userId} = useParams()
    const [newPassword, setNewPassword] = useState(false)
    const [password1Visibility, setPassword1Visibility] = useState(false)
    const [password2Visibility, setPassword2Visibility] = useState(false)
    const [userInfo, setUserInfo] = useState(null)

    const [Loader, setLoader] = useState(false)

    const [userData, setUserData] = useState(null)


    const [comparePassword, setComparePassword] = useState(true)

    useEffect(()=>{
        setLoader(true)
        if(localStorage.getItem("auth-token")){
            fetch('https://skecommerce-backend.onrender.com/fetchuser', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                    "auth-token": `${localStorage.getItem("auth-token")}`
                },
                body: JSON.stringify({userId : userId})
            }).then(res=>res.json())
            .then((data)=>{
                setLoader(false)
                if(data.success){
                    setUserInfo(data.User)
                    const User = data.User
                    setUserData({
                        fullname: User?User.name:'',
                        email: User?User.email:'',
                        contact: User?User.contact:'',
                        password: '',
                        confirmPassword: '',
                        doorStreet:  User.Address?User.Address.doorStreet:'',
                        area: User.Address?User.Address.area:'',
                        landmark: User.Address?User.Address.landmark:'',
                        city: User.Address?User.Address.city:'',
                        state: User.Address?User.Address.state:'',
                        country: User.Address?User.Address.country:'',
                        zipcode: User.Address?User.Address.zipcode:'',
                    })
                }else{
                    if('redirect' in data && data.redirect===true){
                        alert(data.message)
                        window.location.href='/'
                    }else{
                        alert(data.message)
                    }
                }
            }).catch(err=>{
                setLoader(false)
                alert('Error connecting to the Server! please try again later.')
                console.log('Error on Userinfo: ',err)
            })

        }else{
            setLoader(false)
            alert('You dont have Access to this page!')
            window.location.replace("/")
        }
    },[userId])

    const handleUpdateUser = async () => {
        setLoader(true)
        if(localStorage.getItem("auth-token")){
            try{
                await fetch('https://skecommerce-backend.onrender.com/updateuser',{
                    method: 'POST',
                    headers: {
                        Accept:'application/form-data',
                        'Content-Type':'application/json',
                        "auth-token": `${localStorage.getItem("auth-token")}`
                    },
                    body: JSON.stringify({useremail: userInfo.email, userdata: userData, passwordupdation: newPassword}),
                }).then(res=> res.json())
                .then((data)=>{
                    setLoader(false)
                    if(data.success){
                        alert(data.message)
                        window.location.href='/admin/users'
                    }else{
                        if('redirect'in data && data.redirect===true){
                            alert('You dont have Access to this page!')
                            window.location.replace("/")
                        }else{
                            alert(data.message)
                        }
                    }
                })
            }catch(error){
                setLoader(false)
                console.log('Error on user updation: ',error)
            }
        }else{
            setLoader(false)
            alert('You dont have Access to this page!')
            window.location.replace("/")
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
        }else{
            setLoader(false)
            alert('Please enter all the required values!')
        }
    }

    if(userData!==null){
        return (
            <div>
                <AdminHeader/>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='w-100 d-flex flex-wrap justify-content-between align-items-center'>
                                <button onClick={()=>{window.location.href='/admin/users'}} className='btn btn-outline-dark rounded-pill my-2'><i className="bi bi-arrow-left-circle"></i><span className='back-home-sm'> Users</span><span className='back-home-lg'> Goto Users</span></button>
                                <button className='btn btn-dark rounded-pill my-2' onClick={handleUpdation}>Update <i className="bi bi-pencil-square"></i></button>
                            </div>
                            <h4 className='text-center my-1'>Update User</h4><hr/>
                            <div className='d-flex justify-content-center align-items-center'>
                                <i className="bi bi-person-circle m-2 user-account-icon"></i>
                                <h4 className='text-center my-1'>catchify</h4>
                            </div>
                            <div className='user-account-form-container'>
                            <form className='w-100'>
                                    <div className='checkout-form-left'>
                                        <div className='d-flex flex-wrap justify-content-evenly align-items-center'>
                                            <div className="my-2" style={{width: '320px'}}>
                                                <label htmlFor="FormControlName" className="form-label">Full Name</label>
                                                <input value={userData.fullname} onChange={(e)=>setUserData({ ...userData, fullname: e.target.value })} type="text" className={`form-control ${(!userData.fullname)?'is-invalid':''}`} id="FormControlName" placeholder="Your Name" />
                                            </div>
                                            <div className="my-2" style={{width: '320px'}}>
                                                <label htmlFor="FormControlContact" className="form-label">Contact</label>
                                                <input value={userData.contact} onChange={(e)=>setUserData({ ...userData, contact: e.target.value })} type="tel" className={`form-control ${(!userData.contact)?'is-invalid':''}`} id="FormControlContact" placeholder="+91 98765 43210" />
                                            </div>
                                            <div className="my-2" style={{width: '320px'}}>
                                                <label htmlFor="FormControlEmail" className="form-label">Email</label>
                                                <input value={userData.email} onChange={(e)=>setUserData({ ...userData, email: e.target.value })} type="email" className={`form-control ${(!userData.email)?'is-invalid':''}`} id="FormControlEmail" placeholder="yourname@mail.com" />
                                            </div>
                                            {
                                                newPassword === false&&(
                                                    <button onClick={()=>setNewPassword(true)} className='btn btn-dark'>Change Password</button>
                                            )}
                                            {
                                                newPassword === true&&(
                                                <div className='d-flex flex-wrap justify-content-evenly align-items-center w-100'>
                                                    <div className="my-2" style={{width: '320px'}}>
                                                        <label htmlFor="FormControlPassword" className="form-label">Set Password</label>
                                                        <div className='d-flex'>
                                                            <input value={userData.password} onChange={(e)=>setUserData({...userData, password: e.target.value})} type={password1Visibility?'text':'password'} className={`form-control ${(!comparePassword)&&'is-invalid'} `} id="FormControlPassword" placeholder="********" autoComplete='new-password' />
                                                            <i style={{cursor: 'pointer'}} className={`fs-4 mx-1 bi ${password1Visibility?'bi-eye-slash':'bi-eye'}`} onClick={()=>setPassword1Visibility(!password1Visibility)}></i>
                                                        </div>
                                                    </div>
                                                    <div className="my-2" style={{width: '320px'}}>
                                                        <label htmlFor="FormControlConfirmPassword" className="form-label">Confirm Password</label>
                                                        <div className='d-flex'>
                                                            <input value={userData.confirmPassword} onChange={(e)=>setUserData({...userData, confirmPassword: e.target.value})} type={password2Visibility?'text':'password'} className={`form-control ${(!comparePassword)&&'is-invalid'} `} id="FormControlConfirmPassword" placeholder="********" autoComplete='new-password' />
                                                            <i style={{cursor: 'pointer'}} className={`fs-4 mx-1 bi  ${password2Visibility?'bi-eye-slash':'bi-eye'}`} onClick={()=>setPassword2Visibility(!password2Visibility)}></i>
                                                        </div>
                                                    </div>
                                                    {(!comparePassword) && <p className='text-danger m-2'><i className='bi bi-exclamation-triangle-fill'></i> Please enter the same passwords!</p>}
                                                    <button type='button' className='btn btn-outline-danger m-2' onClick={()=>setNewPassword(false)}>Cancel Password setting</button>
                                                </div>
                                                )
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <h5 className='text-center mt-3'>Default Shipment Address</h5>
                                            <div id='FormControlDelivery' className='d-flex flex-wrap justify-content-evenly align-items-center'>
                                                <div className='my-1'>
                                                    <label htmlFor="FormControlDoorStreet" className="form-label text-center">Door numer & Street name</label>
                                                    <input value={userData.doorStreet} onChange={(e)=>setUserData({...userData, doorStreet: e.target.value})} type="text" style={{width: '320px'}} className={`form-control delivery my-1 ${(!userData.doorStreet)?'is-invalid':''}`} id="FormControlDoorStreet" placeholder="Door No. & Street Name" />
                                                </div>
                                                <div className='my-1'>
                                                    <label htmlFor="FormControlArea" className="form-label text-center">Area</label>
                                                    <input value={userData.area} onChange={(e)=>setUserData({...userData, area: e.target.value})} type="text" style={{width: '320px'}} className={`form-control delivery my-1 ${(!userData.area)?'is-invalid':''}`} id="FormControlArea" placeholder="Area" />
                                                </div>
                                                <div className='my-1'>
                                                    <label htmlFor="FormControlLandmark" className="form-label text-center">Landmark</label>
                                                    <input value={userData.landmark} onChange={(e)=>setUserData({...userData, landmark: e.target.value})} type="text" style={{width: '320px'}} className={`form-control delivery my-1 ${(!userData.landmark)?'is-invalid':''}`} id="FormControlLandmark" placeholder="Landmark" />
                                                </div>
                                                <div className='my-1'>
                                                    <label htmlFor="FormControlCity" className="form-label text-center">City</label>
                                                    <input value={userData.city} onChange={(e)=>setUserData({...userData, city: e.target.value})} type="text" style={{width: '320px'}} className={`form-control delivery my-1 ${(!userData.city)?'is-invalid':''}`} id="FormControlCity" placeholder="City" />
                                                </div>
                                                <div className='my-1'>
                                                    <label htmlFor="FormControlState" className="form-label text-center">State</label>
                                                    <input value={userData.state} onChange={(e)=>setUserData({...userData, state: e.target.value})} type="text" style={{width: '320px'}} className={`form-control delivery my-1 ${(!userData.state)?'is-invalid':''}`} id="FormControlState" placeholder="State" />
                                                </div>
                                                <div className='my-1'>
                                                    <label htmlFor="FormControlCountry" className="form-label text-center">Country</label>
                                                    <input value={userData.country} onChange={(e)=>setUserData({...userData, country: e.target.value})} type="text" style={{width: '320px'}} className={`form-control delivery my-1 ${(!userData.country)?'is-invalid':''}`} id="FormControlCountry" placeholder="Country" />
                                                </div>
                                                <div className='my-1'>
                                                    <label htmlFor="FormControlZipcode" className="form-label text-center">Country</label>
                                                    <input value={userData.zipcode} onChange={(e)=>setUserData({...userData,zipcode: e.target.value})} type="number" style={{width: '320px'}} className={`form-control delivery my-1 ${(!userData.zipcode)?'is-invalid':''}`} id="FormControlZipcode" placeholder="Zip code" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='checkout-form-right'>
                                        <div className='d-flex flex-wrap justify-content-center'>
                                            <button type='button' className='btn btn-dark m-2' onClick={handleUpdation}>Update <i className="bi bi-pencil-square"></i></button>
                                        </div>
                                    </div>      
                                </form>
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

export default UpdateUser