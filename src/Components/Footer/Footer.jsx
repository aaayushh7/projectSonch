import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <p>© 2024 Sonch. All rights reserved.</p>
      <ul>
        <li><a href="https://www.linkedin.com/company/sonch-educational/" target='_blank' rel="noopener noreferrer">
          <i className="fa-brands fa-linkedin"></i>
        </a></li>
        <li><a href="mailto:admin@sonch.org.in" target='_blank' rel="noopener noreferrer">
          <i className="fa-regular fa-envelope"></i>
        </a></li>
      </ul>
    </div>
  )
}

export default Footer