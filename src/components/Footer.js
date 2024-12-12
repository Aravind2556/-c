// import React from 'react'

// const Footer = () => {
//   return (
//     <footer className='text-center py-2 text-primary sticky-bottom' style={{background: '#ebf9ff'}}>
//         Copyrights @ <b>catcaify.tech</b> 2024 - <code> <em role='button' onClick={()=>window.open('https://subhinkrishna.vercel.app/','_blank')}><u>All Rights Reserved</u></em></code>
//     </footer>
//   )
// }

// export default Footer

import React from 'react';
import whatsapp from '../assets/whatsapp.png'
import Linkedin from '../assets/linkedin.png'
import Phone from '../assets/telephone.png'
import Email from '../assets/gmail.png'
import twitter from '../assets/twitter.png'

const Footer = () => {
  return (
    <footer
      className="text-center py-3 text-primary mx-auto"
      style={{ background: '#ebf9ff' }}
    >
      <p>Let's connect</p>
     <div className="d-flex justify-content-between"> 
      <div className="mt-2">
        
       <p>Contacts</p>
        <a
          href="https://wa.me/8248221211"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2"
        >
          
          <img src={whatsapp} alt='hjb' title='whatsapp' style={{width : '30px',height :'30px'}}/>
        </a>
        <a
          href="https://www.linkedin.com/in/www.linkedin.com/in/d-aravindan"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2"
        >
          <img src={Linkedin} alt='hjb' title='linkdin' style={{width : '30px',height :'30px'}}/>
        </a>
        <a
          href="https://twitter.com/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2"
        >
          <img src={
            twitter} alt='hjb' title='Twitter' style={{width : '30px',height :'30px'}}/>
        </a>
        <a
          href="mailto:contact@catcaify.tech"
          className="mx-2"
        >
          <img src={Email} alt='hjb' title='Email' style={{width : '30px',height :'30px'}}/>
        </a>
        <a href="tel:+8248221211" className="mx-2">
        <img src={Phone} alt='hjb' title='Phone' style={{width : '30px',height :'30px'}}/>
        </a>
      </div>
      <div className="mt-3">
        <p>
          Customer Care Number: <b>+91 87600-22299</b>
        </p>
        </div>
          <div>
        <p>
          Address: <b>123 Tech Street, Innovation City, Techland, 56789</b>
        </p>
        
      </div>
      </div>
      <div>
        Copyrights @ <b>catchify</b> 2024 -
        <code>
          <em
            role="button"
            onClick={() =>
              window.open('https://arvindan.vercel.app/', '_blank')
            }
          >
            <u>All Rights Reserved</u>
          </em>
        </code>
      </div>
    </footer>
  );
};

export default Footer;

