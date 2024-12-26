"use client"

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Gallery.css'
import gallery_1 from '../../assets/img (1).jpg';
import gallery_2 from '../../assets/img-2.jpg';
import gallery_3 from '../../assets/img (3).jpg';
import gallery_4 from '../../assets/img (4).jpg';
import gallery_5 from '../../assets/img (5).jpg';
import gallery_6 from '../../assets/img (6).jpg';
import gallery_7 from '../../assets/img (7).jpg';
import gallery_8 from '../../assets/img (8).jpg';
import gallery_9 from '../../assets/img (9).jpg';
import gallery_10 from '../../assets/img (10).jpg';
import gallery_11 from '../../assets/img (11).jpg';
import gallery_12 from '../../assets/img (12).jpg';
import gallery_13 from '../../assets/img (13).jpg';
import gallery_14 from '../../assets/img (14).jpg';
import gallery_15 from '../../assets/img (15).jpg';
import gallery_16 from '../../assets/img (16).jpg';
import gallery_17 from '../../assets/img (17).jpg';
import gallery_18 from '../../assets/img (18).jpg';
import gallery_19 from '../../assets/img (19).jpg';
import gallery_20 from '../../assets/img (20).jpg';
import gallery_21 from '../../assets/img (21).jpg';
import gallery_22 from '../../assets/img (22).jpg';
import gallery_23 from '../../assets/img (23).jpg';
import gallery_24 from '../../assets/img (24).jpg';
import gallery_25 from '../../assets/img (25).jpg';
import gallery_26 from '../../assets/img (26).jpg';
import gallery_27 from '../../assets/img (27).jpg';
import gallery_28 from '../../assets/img (28).jpg';
import gallery_29 from '../../assets/img (29).jpg';
import gallery_30 from '../../assets/img (30).jpg';
import gallery_31 from '../../assets/img (31).jpg';
import gallery_32 from '../../assets/img (32).jpg';
import gallery_33 from '../../assets/img (33).jpg';
import gallery_34 from '../../assets/img (34).jpg';
import gallery_35 from '../../assets/img-35.png';
const images = [
  gallery_1,
  gallery_2,
  gallery_3,
  gallery_4,
  gallery_5,
  gallery_6,
  gallery_7,
  gallery_8,
  gallery_9,
  gallery_10,
  gallery_11,
  gallery_12,
  gallery_13,
  gallery_14,
  gallery_15,
  gallery_16,
  gallery_17,
  gallery_18,
  gallery_19,
  gallery_20,
  gallery_21,
  gallery_22,
  gallery_23,
  gallery_24,
  gallery_25,
  gallery_26,
  gallery_27,
  gallery_28,
  gallery_29,
  gallery_30,
  gallery_31,
  gallery_32,
  gallery_33,
  gallery_34,
];



export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div className="gallery-container" ref={ref}>
      <div className="gallery-content">
        <h2
          className="gallery-title"
          
        >
          Our Gallery
        </h2>
        <div className="gallery-grid">
          {images.map((src, index) => (
            <div
              key={index}
              className="gallery-item"
              
             
            >
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="gallery-image"
              />
              <motion.div
                className="gallery-overlay"
                whileHover={{ opacity: 1 }}
              >
                <p className="gallery-overlay-text">Image {index + 1}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}