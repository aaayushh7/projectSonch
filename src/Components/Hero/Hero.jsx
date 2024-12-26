import React from 'react'
import { motion } from 'framer-motion'
import './Hero.css'
import dark_arrow from '../../assets/dark-arrow.png'

const Hero = () => {
  // Define animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const arrowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className='hero container'>
      <motion.div 
        className="hero-text"
        initial="hidden" 
        animate="visible" 
        variants={containerVariants} 
        transition={{ duration: 1 }} // Animation duration for the container
      >
        <motion.h1 
          variants={textVariants} 
          transition={{ duration: 0.8, delay: 0.2 }} // Delay for the heading
        >
          Empowering Lives for a Brighter Future
        </motion.h1>
        <motion.p 
          variants={textVariants} 
          transition={{ duration: 0.9, delay: 0.4 }} // Delay for the paragraph
        >
          Our initiatives are designed to empower communities with the knowledge, skills, and resources needed to thrive in a just and equitable society.
        </motion.p>
       
      </motion.div>
    </div>
  )
}

export default Hero
