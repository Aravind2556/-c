import React from 'react'

const SlowLoader = () => {
  return (
    <div className='position-absolute top-0 start-0 d-flex justify-content-center align-items-center p-5' style={{ backgroundColor: 'rgba(255, 255, 255)', height: '100vh', width: '100%' }}>
      <div>
        <div className='d-flex justify-content-center align-items-center'>
          <div className="custom-loader"></div>
        </div>
        <figure className="text-center">
          <blockquote className="blockquote">
            <p className='text-primary fw-bold fs-1'>⪡c</p>
          </blockquote>
          <figcaption className="blockquote-footer fs-4">
            Developed by catchify
          </figcaption>
        </figure>
      </div>
    </div>
  )
}

export default SlowLoader