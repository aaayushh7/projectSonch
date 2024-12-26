"use client"
import React, { useRef } from 'react'
import './Testimonials.css'
import user_1 from '../../assets/user-1.png'
import user_2 from '../../assets/user-2.png'
import user_3 from '../../assets/user-3.png'
import user_4 from '../../assets/user-4.png'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  {
    name: "Sunita Devi",
    location: "Village Leader",
    image: user_1,
    text :"Thanks to SONCH, I have learned how to assert my voice in our community meetings. Their training has given me the confidence to actively participate in decisions that affect our village, and now I work alongside other women to uplift our community."
  },
  {
    name: "Rani Kumari",
    location: "Program Participant",
    image: user_2,
    text: "Before joining SONCH’s digital literacy program, I never imagined using a computer. Now, I’m not only comfortable with it but have also helped my children embrace technology for education. It has opened doors for all of us."
  },
  {
    name: "Rajeshwari",
    location: "Entrepreneur",
    image:user_3,
    text: "Through SONCH’s vocational training, I developed skills in tailoring. Now, I have my own small business and am able to provide for my family. This has transformed my life and given me a sense of independence." },
  {
    name: "Mahendra Yadav",
    location: "Farmer",
    image: user_4,
    text: "SONCH has empowered us to understand sustainable farming techniques. With their help, we formed a farmer’s club, and now we can market our produce collectively, which has increased our income and strengthened our community." }
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div className="testimonials" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        Testimonials
      </motion.h2>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="testimonial-card"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.2 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.2 }
            }}
          >
            <div className="user-info">
              
              <div>
                <h3>{testimonial.name}</h3>
                <span>{testimonial.location}</span>
              </div>
            </div>
            <p>{testimonial.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}