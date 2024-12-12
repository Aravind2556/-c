import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { DataContext } from '../context/DataContext'
import { Link } from 'react-router-dom'
import pageLoader from '../assets/SlowLoader.gif'
import NoData from '../assets/No data.gif'

function Products() {

  const {Products} = useContext(DataContext)

  // Variables for Product rendering
  const bestsellerProducts = Products.filter(data=>data.isBestSeller===true)
  const [categoryProducts, setCategoryProducts] = useState(bestsellerProducts)
  const totalProducts = categoryProducts.length
  const productsPerPage = 8
  const totalPages = Math.ceil(totalProducts / productsPerPage)
  const [renderPage, setRenderPage] = useState(1)
  const [startProduct, setStartProduct] = useState((renderPage - 1) * productsPerPage)
  const [endProduct, setEndProduct] = useState(startProduct+6)
  const [renderProducts, setRenderProducts] = useState(categoryProducts.slice(startProduct, endProduct))
  

  useEffect(()=>{
    setCategoryProducts(Products.filter(data=>data.isBestSeller===true))
  },[Products])

  useEffect(()=>{
    setRenderProducts(categoryProducts.slice(startProduct, endProduct))
  },[categoryProducts, startProduct, endProduct])


  const [activeCategory, setActiveCategory] = useState('bestseller')

  const updateCategory = (category) => {
    if(category===true||category===false){
      setCategoryProducts(Products.filter(data=>data.isBestSeller===true))
      setActiveCategory('bestseller')
    }
    else if(category==='all'){
      setCategoryProducts(Products)
      setActiveCategory('all')
    }
    else{
      setCategoryProducts(Products.filter(data => data.category === category))
      setActiveCategory(category)
    }

    setStartProduct((renderPage - 1) * productsPerPage)
    if (startProduct + 6 > totalProducts) {
      setEndProduct(totalProducts);
    } else {
      setEndProduct(startProduct + productsPerPage);
    }

    setRenderProducts(categoryProducts.slice(startProduct, endProduct))
  }


  const updateProducts = (pg) => {
    // console.log('update func called')
    if(pg>totalPages){
      setRenderPage(totalPages)
    }
    else if(pg<1){
      setRenderPage(1)
    }
    else{
      setRenderPage(pg)
    }
    // console.log('After updation, products: ', renderProducts)
  }

  console.log('Products: ',Products)
  console.log('Best Seller Products: ',bestsellerProducts)
  console.log('Category  Products: ', categoryProducts);
  console.log('renderProducts: ',renderProducts)
  console.log('dsiplaying prod: ',renderProducts)



  if(Products!==null && Products){
    return (
      <div>
          <h2 className='text-center fs-3 fw-bold mt-3 text-dark'>PRODUCTS</h2>
          <div className='products-categories-parentcontainer d-flex flex-wrap align-items-center justify-content-center'>
            <h3>Category:</h3>
            <div className='products-categories-container mx-2'>
              <button onClick={()=>{updateCategory(true)}} className={`btn btn-outline-primary rounded-pill py-0 m-2 ${activeCategory==='bestseller'?'active':''}`}>Best Sellers</button>
              <button onClick={()=>{updateCategory('all')}} className={`btn btn-outline-primary rounded-pill py-0 m-2 ${activeCategory==='all'?'active':''}`}>All</button>
              <button onClick={()=>{updateCategory('fashion')}} className={`btn btn-outline-primary rounded-pill py-0 m-2 ${activeCategory==='fashion'?'active':''}`}>Fashion</button>
              <button onClick={()=>{updateCategory('homeapplainces')}} className={`btn btn-outline-primary rounded-pill py-0 m-2 ${activeCategory==='homeapplainces'?'active':''}`}>Home Applainces</button>
            </div>
          </div>
          <div className='Products-card-container p-3'>
  
            { renderProducts.length>0 && renderProducts.map((data) => {
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
            {
              renderProducts.length===0&&(
                <div className='d-flex justify-content-center'>
                  <img style={{height: '300px'}}  src={NoData} alt="No Data Available!" />
                </div>
              )
            }
  
              
              
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
    return(
        <div className='d-flex justify-content-center mt-5 pt-5'>
            <img src={pageLoader} alt='Loading...' style={{height: '150px'}} />
        </div>
    )
  }


}

export default Products