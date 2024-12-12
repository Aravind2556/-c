import React from 'react'
// import Products from '../components/Products'
import Navbar from '../components/Navbar'
import ProductsBlock from '../components/ProductsBlock'

function LandingPage() {

  const scrollToProducts = () => {
    console.log('func called')

    const productBlock = document.getElementById('productblock');
    if (productBlock) {
      productBlock.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div>
        <Navbar/>
        <div className='landing-container'>
            <div className='text-center landing-content'>
                <h2 className='text-center fs-3 fw-bold text-primary'>⪡c</h2>
                <p className="fs-4 text-start text-secondary">Avail exiciting offers before its ending!</p>
                <button className='btn px-4 py-2 fs-5 rounded-pill btn-primary' onClick={scrollToProducts}>Browse Products</button>
            </div>
        </div>
        <div id="productblock">
          <ProductsBlock />
        </div>
    </div>
  )
}

export default LandingPage