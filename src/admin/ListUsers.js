import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminNavbar'
import { Link } from 'react-router-dom'
import SlowLoader from '../components/SlowLoader'

const ListUsers = () => {

    const [Users, setUsers] = useState(null)

    useEffect(()=>{
        fetch('https://skecommerce-backend.onrender.com/fetchusers', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
                "auth-token": `${localStorage.getItem("auth-token")}`
            }
        }).then(res=>res.json())
        .then((data)=>{
            if(data.success){
                setUsers(data.Users)
            }else{
                if('redirect' in data && data.redirect === true){
                    alert('You have no access to view this page!')
                    window.location.href='/'
                }
                alert(data.message)
            }
        }).catch(err=>{
            alert('Error connecting to the Server! Try again later.')
            console('Error on fetching Users list: ',err)
        })
    },[])

    if(Users !== null) {



    return (
        <div>
            <AdminHeader/>
            <button onClick={()=>{window.location.href='/admin/dashboard'}} className='btn btn-outline-dark rounded-pill ms-2 my-2'><i className="bi bi-arrow-left-circle"></i><span className='back-home-sm'> Dashboard</span><span className='back-home-lg'> Goto Dashboard</span></button>
            <div className='container-fluid'>
                <div className='row d-flex justify-content-center'>
                    <div className='col-md-8 col-sm-11'>
                        <h2 className='text-center fs-3 my-3'>Users List</h2>
                        <table className="table table-striped border text-center table-hover">
                            <thead>
                                <tr>
                                    <th className='bg-primary text-light' scope="col">#Email</th>
                                    <th className='bg-primary text-light' scope="col">Contact</th>
                                    <th className='bg-primary text-light' scope="col">Name</th>
                                    <th className='bg-primary text-light' scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Users && Users.map((user, i)=>{  
                                    return <tr key={i}>
                                                <th scope="row">{user.email}</th>
                                                <td>{user.contact}</td>
                                                <td>{user.name}</td>
                                                <td><Link to={`/admin/update-user/${user._id}`}>View <i className='bi bi-arrow-right-circle'></i></Link></td>
                                            </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
    }else{
        return(
            <SlowLoader/>
        )
    }
}

export default ListUsers