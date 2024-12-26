'use client'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './slider.css'

import gallery_1 from '../../assets/gallery-1.png'
import gallery_2 from '../../assets/img-2.jpg'
import gallery_35 from '../../assets/img-35.png';


const slides = [
  {
    image: gallery_2,
    title: "Education",
    subtitle: ""
  },
  {
    image: gallery_35,
    title: "Women Empowerment",
    subtitle: ""
  },
  {
    image: gallery_1,
    title: "Environment and Sustainability",
    subtitle: ""
  }
]

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGalleryClick = () => {
    navigate('/Keyprojects',{ state: { refresh: true } });
  }
  return (
    <div className="slider-container">
      <div className="slides">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="nav-button prev" onClick={prevSlide} aria-label="Previous slide">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button className="nav-button next" onClick={nextSlide} aria-label="Next slide">
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="more-projects">
        <button className="more-projects-btn" onClick={handleGalleryClick}>
          More Projects
        </button>
      </div>

      <div className="slide-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  )
}

