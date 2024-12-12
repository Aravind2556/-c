import React from 'react'
import AdminHeader from './AdminNavbar'
import CreateProductImg from '../assets/CreateProduct.jpg'
import ProductsImg from '../assets/Products.jpg'
import OrdersImg from '../assets/Orders.jpg'
import UsersImg from '../assets/Users.jpg'

const Dashboard = () => {
  return (
    <div>
        <AdminHeader/>
        
        <div className='container-fluid'>
            <div className='row'>
                <h1 className='text-secondary fs-3 text-center my-3'>Admin Dashboard</h1>
                <div className='col-md-12 d-flex flex-wrap justify-content-evenly'>
                    <div className="card text-center m-1" style={{width: '18rem'}}>
                        <img className='card-img-top p-5 object-fit-contain' src={CreateProductImg} alt='pandavas' />
                        <div className="card-body">
                            <a href="/admin/create-product" className="btn btn-dark fs-5"><i className="bi bi-folder-plus card-img"></i> Create Product</a>
                        </div>
                    </div>
                    <div className="card text-center m-1" style={{width: '18rem'}}>
                        <img className='card-img-top p-5 object-fit-contain' src={ProductsImg} alt='pandavas' />
                        <div className="card-body">
                            <a href="/admin/products" className="btn btn-dark fs-5"><i className="bi bi-diagram-3 card-img"></i> View Products</a>
                        </div>
                    </div>
                    <div className="card text-center m-1" style={{width: '18rem'}}>
                        <img className='card-img-top p-5 object-fit-contain' src={OrdersImg} alt='pandavas' />
                        <div className="card-body">
                            <a href="/admin/orders" className="btn btn-dark fs-5"><i className="bi bi-basket card-img"></i> View Orders</a>
                        </div>
                    </div>
                    <div className="card text-center m-1" style={{width: '18rem'}}>
                        <img className='card-img-top p-5 object-fit-contain' src={UsersImg} alt='pandavas' />
                        <div className="card-body">
                            <a href="/admin/users" className="btn btn-dark fs-5"><i className="bi bi-people card-img"></i> View Users</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard