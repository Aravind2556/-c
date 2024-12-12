import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from './AdminNavbar'
import { DataContext } from '../context/DataContext'
import SlowLoader from '../components/SlowLoader'

const ListProduct = () => {

  const {Products} = useContext(DataContext)

  if(Products!==null){
    return (
        <div>
            <AdminHeader/>
            <button onClick={()=>{window.location.href='/admin/dashboard'}} className='btn btn-outline-dark rounded-pill ms-2 my-2'><i className="bi bi-arrow-left-circle"></i><span className='back-home-sm'> Dashboard</span><span className='back-home-lg'> Goto Dashboard</span></button>
            <div className='container-fluid'>
                <div className='row d-flex justify-content-center'>
                    <div className='col-md-8 col-sm-11'>
                        <h2 className='text-center fs-3 my-3'>Products List</h2>
                        <table className="table table-striped border text-center table-hover">
                            <thead>
                                <tr>
                                    <th className='bg-primary text-light' scope="col">#Product ID</th>
                                    <th className='bg-primary text-light' scope="col">Category</th>
                                    <th className='bg-primary text-light' scope="col">Name</th>
                                    <th className='bg-primary text-light' scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (Products && Products.length>0)?
                                    Products.map((product, index)=>{
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{product.id}</th>
                                                <td>{product.category}</td>
                                                <td>{product.name}</td>
                                                <td>
                                                    <div>
                                                    <Link to={`/admin/updateproduct/${product.id}`}>
                                                    View <i className='bi bi-arrow-right-circle'></i>
                                                    </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :<tr>
                                        <td colSpan="4" className='text-center'>No Products Available!</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
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

export default ListProduct