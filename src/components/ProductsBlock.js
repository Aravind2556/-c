import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../context/DataContext'
import NoData from '../assets/No data.gif'
import SlowLoader from './SlowLoader'

const ProductsBlock = () => {

    const {Products} = useContext(DataContext)

    const [categoryProducts, setCategoryProducts] = useState(null)
    const [activeCategory, setActiveCategory] = useState('bestseller')
    const [totalProducts, setTotalProducts] = useState(null)
    const productsPerPage = 8
    const [totalPages, setTotalPages] = useState(Math.ceil(totalProducts / productsPerPage))
    const [renderPage, setRenderPage] = useState(1)
    const [startProduct, setStartProduct] = useState((renderPage - 1) * productsPerPage)
    const [endProduct, setEndProduct] = useState(startProduct+8)
    const [renderProducts, setRenderProducts] = useState(null)


    const displayProducts = () => {
        setTotalProducts(categoryProducts.length)
        setTotalPages(Math.ceil(totalProducts / productsPerPage))
        setStartProduct((renderPage - 1) * productsPerPage)
        setEndProduct(startProduct+8)
    }

    useEffect(()=>{
        if(Products!==null){
            setCategoryProducts(Products.filter(data=>(data.isBestSeller===true && data.availability===true)))
        }
    },[Products])

    useEffect(()=>{
        if(categoryProducts!==null){
            setTotalProducts(categoryProducts.length)
            setRenderProducts(categoryProducts.slice(startProduct, endProduct))
        }
    },[categoryProducts, startProduct, endProduct])


    

    const updateCategory = (category) => {
        if(category==='bestseller'){
            setCategoryProducts(Products.filter(data=>(data.isBestSeller===true && data.availability===true)))
            setActiveCategory('bestseller')
        }
        else if(category==='all'){
            setCategoryProducts(Products.filter(data=>data.availability===true))
            setActiveCategory('all')
        }
        else{
            setCategoryProducts(Products.filter(data => (data.category === category && data.availability===true)))
            setActiveCategory(category)
        }
        displayProducts()
    }

    const updateProducts = (pg) => {
        if(pg>totalPages){
            setRenderPage(totalPages)
        }
        else if(pg<1){
            setRenderPage(1)
        }
        else{
            setRenderPage(pg)
        }
        displayProducts()
    }

    if(Products!==null && Products.length>=0){


        return (
            <div>
                <h2 className='text-center fs-3 fw-bold mt-3 text-dark'>PRODUCTS</h2>
                <div className='products-categories-parentcontainer d-flex flex-wrap align-items-center justify-content-center'>
                    <h3>Category:</h3>
                    <div className='products-categories-container mx-2'>
                        <button onClick={()=>{updateCategory('bestseller')}} className={`btn btn-outline-primary rounded-pill py-0 m-2 ${activeCategory==='bestseller'?'active':''}`}>Best Sellers</button>
                        <button onClick={()=>{updateCategory('all')}} className={`btn btn-outline-primary rounded-pill py-0 m-2 ${activeCategory==='all'?'active':''}`}>All</button>
                        <button onClick={()=>{updateCategory('fashion')}} className={`btn btn-outline-primary rounded-pill py-0 m-2 ${activeCategory==='fashion'?'active':''}`}>Fashion</button>
                        <button onClick={()=>{updateCategory('homeapplainces')}} className={`btn btn-outline-primary rounded-pill py-0 m-2 ${activeCategory==='homeapplainces'?'active':''}`}>Home Applainces</button>
                    </div>
                </div>
                <div className='Products-card-container p-3'>
  
            { renderProducts!==null && renderProducts.length>0 && renderProducts.map((data) => {
                return <div className="card product-card" key={data.id}>
                    {data.isBestSeller && (
                        <div className="badge-container">
                            <div className="badgee">Best Sellers</div>
                        </div>
                    )}
                    <span className='card-rating'>⭐ {data.rating}</span>
                    <img src={data.images[0]} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{data.name}</h5>
                        <p className="card-text card-desc">{data.description}</p>
                        <div className='d-flex justify-content-center'>
                            <Link to={`/product/${data.id}`}>
                                <button className="btn btn-primary rounded px-3">
                                    View <i className='bi bi-arrow-right-circle mx-2'></i>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            })}
            { renderProducts!==null && renderProducts.length===0&&(
                <div className='d-flex justify-content-center'>
                    <img style={{height: '300px'}}  src={NoData} alt="No Data Available!" />
                </div>
            )}
  
              
              
          </div>
          <div className="pagination-container my-2">
              <button onClick={()=>{updateProducts(1)}} id="first-page-btn" className="Pagination btn btn-outline-primary rounded-pill">First</button>
              <button onClick={()=>{updateProducts(renderPage-1)}} id="prev-page-btn" className="Pagination  btn btn-outline-primary rounded-pill"><i className="bi bi-caret-left"></i> Prev</button>
              <button onClick={()=>{updateProducts(renderPage-1)}} id="previous-btn" className={`${((renderPage-1)<1)?'d-none':'Pagination'}  btn btn-outline-primary rounded-pill`}>{renderPage-1}</button>
              <button onClick={()=>{updateProducts(renderPage)}} id="current-btn" className="Pagination btn btn-primary rounded-pill">{renderPage}</button>
              <button onClick={()=>{updateProducts(renderPage+1)}} id="next-btn" className={`${((renderPage+1)>totalPages)?'d-none':'Pagination'}  btn btn-outline-primary rounded-pill`}>{renderPage+1}</button>
              <button onClick={()=>{updateProducts(renderPage+1)}} id="next-page-btn" className="Pagination btn btn-outline-primary rounded-pill">Next <i className="bi bi-caret-right"></i></button>
              <button onClick={()=>{updateProducts(totalPages)}} id="last-page-btn" className="Pagination btn btn-outline-primary rounded-pill">Last</button>
          </div>
            </div>
        )
    }else{
        return (
            <div>
                <SlowLoader/>
            </div>
        )
    }
}

export default ProductsBlock