import React from 'react'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Campus.css'
import gallery_2 from '../../assets/img (29).jpg';
import gallery_3 from '../../assets/img (3).jpg';
import gallery_4 from '../../assets/img-35.png';
import gallery_5 from '../../assets/img (5).jpg';
import white_arrow from '../../assets/white-arrow.png'
// Ensure the correct path to the Gallery component
import Gallery from '../Gallary/Gallery'; // Corrected path if necessary

const Campus = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGalleryClick = () => {
    navigate('/gallery'); // Route to the Gallery component
  };

  return (
    <div className='campus'>
      <div className="gallery">
        <img src={gallery_5} alt="Gallery 1" />
        <img src={gallery_2} alt="Gallery 2" />
        <img src={gallery_3} alt="Gallery 3" />
        <img src={gallery_4} alt="Gallery 4" />
      </div>
      <button className='btn dark-btn' onClick={handleGalleryClick}>
        See more <img src={white_arrow} alt="Arrow" />
      </button>
    </div>
  )
}

export default Campus
