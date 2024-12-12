import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { DataContext } from '../context/DataContext'
import { useParams } from 'react-router-dom'
import SlowLoader from '../components/SlowLoader'
import NoImg from '../assets/Imageupload.gif'

function ProductPage() {

    let Product
    const {Products, Loader} = useContext(DataContext)
    const {addToCart} = useContext(DataContext)
    let {productId} = useParams()

    if(productId){
        Product = Products.find((e)=>e.id === Number(productId));
    }else{
        productId = 1
        Product = Products[0]
    }


    const [displayImg, setDisplayImg] = useState(null)

    useEffect(()=>{
        if(typeof Product !== 'undefined'){
            setDisplayImg(Product.images[0])
        }
    }, [Product])


    if(typeof Product !== 'undefined'){
        return (
            <div>
                <Navbar/>
                <button onClick={()=>{window.location.href='/'}} className='btn btn-outline-dark rounded-pill ms-2 my-2'><i className="bi bi-arrow-left-circle"></i><span className='back-home-sm'> Home</span><span className='back-home-lg'> Goto Homepage</span></button>
                <div className='product-info-container p-1 d-flex justify-content-center w-100'>
                    <div className='product-info-left d-flex justify-content-between align-items-center border rounded p-2'>
                        <img className='product-info-img-lg' src={displayImg===null?NoImg:displayImg} alt={Product.name} />
                        <div className='product-info-gallery d-flex flex-wrap justify-content-between align-items-center'>
                            <img className='product-info-img-sm' src={Product.images[0]} alt={Product.name} onClick={()=>setDisplayImg(Product.images[0])} />
                            <img className='product-info-img-sm' src={Product.images[1]} alt={Product.name} onClick={()=>setDisplayImg(Product.images[1])} />
                            <img className='product-info-img-sm' src={Product.images[2]} alt={Product.name} onClick={()=>setDisplayImg(Product.images[2])} />
                            <img className='product-info-img-sm' src={Product.images[3]} alt={Product.name} onClick={()=>setDisplayImg(Product.images[3])} />
                        </div>
                    </div>
                    <div className='product-info-right p-2'>
                        <h1 className='product-info-title'>{Product.name}</h1>
                        <div className='d-flex justify-content-between px-3'>
                            <p className='product-info-rating badge bg-dark mx-3'>⭐ 4.5</p>
                            {Product.isBestSeller&&<p className='mx-3 product-info-category text-warning bg-dark px-3'><i className='bi bi-award'></i> Best seller</p>}
                        </div>
                        <p className='product-info-description'>{Product.description}</p>
                        <div>
                            <p className='fw-bold'>Actual Price: ₹ <s>{Product.actualPrice}</s></p>
                            <p className='fw-bold text-success'>Offer Price: ₹ {Product.offerPrice}</p>
                        </div>
                        <div className='d-flex flex-wrap justify-content-evenly mt-3 px-5'>
                            <button className='btn btn-primary m-2 w-100' onClick={()=>addToCart(Product.id, 1)}><i className="bi bi-bag"></i> Buy Now</button>
                            <button className='btn btn-outline-dark m-2 w-100' onClick={()=>addToCart(Product.id, 0)}><i className="bi bi-cart3"></i> Add to Cart</button>
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

export default ProductPage