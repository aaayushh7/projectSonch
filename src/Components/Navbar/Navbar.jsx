import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import logo from '../../assets/asliLogo.png'
import menu_icon from '../../assets/menu-icon.png'
import DonationForm from '../DonationForm';
'use client'

const DonationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src="/placeholder.svg?height=200&width=200" alt="Donation QR Code" className="qr-code" />
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default function Component({ founderRef, organisationRef, journeyRef, valuesRef }) {
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileMenu(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
    setActiveDropdown(null);
  }

  const openDonationModal = () => {
    setIsModalOpen(true);
    setMobileMenu(false);
  }

  const closeDonationModal = () => {
    setIsModalOpen(false);
  }

  const handleNavItemClick = () => {
    setMobileMenu(false);
    setActiveDropdown(null);
  }

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  }


  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav ref={navRef} className={`container ${sticky ? 'dark-nav' : 'dark-nav'}`}>
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <ul className={mobileMenu ? 'mobile-menu-active' : ''}>
          <li><Link to="/" onClick={handleNavItemClick}>Home</Link></li>
          <li className={`dropdown ${activeDropdown === 'focus' ? 'active' : ''}`}>
           <Link to="/focus"> <button className="dropbtn" onClick={() => toggleDropdown('focus')}>Focus Area</button></Link>
            {/* <div className="dropdown-content">
              <Link to="/focus" onClick={handleNavItemClick}>Digital literacy</Link>
              <Link to="/focus" onClick={handleNavItemClick}>Women Empowerment</Link>
              <Link to="/focus" onClick={handleNavItemClick}>Institutional Building</Link>
            </div> */}
          </li>
          <li className={`dropdown ${activeDropdown === 'about' ? 'active' : ''}`}>
            <Link to= "/about"><button className="dropbtn" onClick={() => toggleDropdown('about')}>About Us</button></Link>
            <div className="dropdown-content">
              <Link to="#" onClick={() => scrollToSection(organisationRef)}>Our Organisation</Link>
              <Link to="#" onClick={() => scrollToSection(journeyRef)}>Our Journey</Link>
              <Link to="#" onClick={() => scrollToSection(founderRef)}>Founders</Link>
              <Link to="#" onClick={() => scrollToSection(valuesRef)}>Our Values</Link>
            </div>
          </li>
          <li><Link to="/Keyprojects" onClick={handleNavItemClick}>Projects</Link></li>
          <li><Link to="/gallery" onClick={handleNavItemClick}>Gallery</Link></li>
          <li><Link to="/sonch-in-news" onClick={handleNavItemClick}>Sonch in News</Link></li>
          <li><Link to="/contact" className='' onClick={handleNavItemClick}>Contact us</Link></li>
          <li><DonationForm /></li>

</ul>
        <img src={menu_icon} alt="Menu" className={`menu-icon ${mobileMenu ? 'active' : ''}`} onClick={toggleMenu} />
      </nav>
      <DonationModal isOpen={isModalOpen} onClose={closeDonationModal} />
    </>
  )
}