import React, { useState, useRef } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import Programs from './Components/Slider/slider'
import Title from './Components/Title/Title'
import About from './Components/About/About'
import Focus from './Components/Focus/Focus'
import Timeline from './Components/Timeline/timeline'
import Campus from './Components/Campus/Campus'
import Testimonials from './Components/Testimonials/Testimonials'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'

import Gallery from './Components/Gallary/Gallery'
import News from './Components/News/News'
import Readmore from './Components/Readmore/Readmore'
import Keyprojects from './Components/Keyprojects/Keyprojects'
import Keymore from './Components/Keymore/Keymore'

const App = () => {
  const [playState, setPlayState] = useState(false);
  const founderRef = useRef(null);
  const organisationRef = useRef(null);
  const journeyRef = useRef(null);
  const valuesRef = useRef(null);

  return (
    <Router>
      <div>
        <Navbar 
          founderRef={founderRef} 
          organisationRef={organisationRef} 
          journeyRef={journeyRef} 
          valuesRef={valuesRef} 
        />
   
        <div className="container">
          <Routes>
            <Route path="/" element={<Home setPlayState={setPlayState} />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/about" element={<AboutPage 
              setPlayState={setPlayState} 
              founderRef={founderRef} 
              organisationRef={organisationRef} 
              journeyRef={journeyRef} 
              valuesRef={valuesRef} 
            />} />
            <Route path="/campus" element={<CampusPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/focus" element={<Focus />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/sonch-in-news" element={<NewsPage />} />
            <Route path="/sonch-in-news/readmore" element={<ReadmorePage />} />
            <Route path="/keyprojects" element={<Keyprojects />} />
            <Route path="/keymore" element={<Keymore/>} />
          </Routes>
        </div>
        <Footer />
        
      </div>
    </Router>
  )
}

const Home = ({ setPlayState }) => (
  <>
    <Hero />
    
    
    
    <Title subTitle='Gallery' title='Our Journey' />

    <Campus />

    <Programs />
    <Title intro='SONCH is a socially driven organization dedicated to empowering individuals and fostering sustainable community development. With a focus on education, skill-building, digital literacy, women empowerment, health, and environmental sustainability, we strive to create opportunities for growth and self-reliance. SONCH works collaboratively to address social challenges, promote equity, and enhance quality of life, guided by the principles of inclusion, dignity, and progress. Through innovative programs and grassroots efforts, we aim to inspire hope and build resilient communities for a better tomorrow.'  />

    <Timeline />
    <Title subTitle='OUR IMPACT' title='What we have achieved' />
    <Testimonials />
    <Title subTitle='Contact Us' title='Get in Touch' />
    <Contact />
  </>
)



const AboutPage = ({ setPlayState, founderRef, organisationRef, journeyRef, valuesRef }) => (
  <>
    <Title title='About us' />
    <About 
      setPlayState={setPlayState} 
      founderRef={founderRef} 
      organisationRef={organisationRef} 
      journeyRef={journeyRef} 
      valuesRef={valuesRef} 
    />
  </>
)
const ProgramsPage = () => (
  <>
    <Title subTitle='Our Programs' title='What We Offer' />
    <Programs />
  </>
)

const CampusPage = () => (
  <>
    <Title subTitle='Our Campus' title='Where We Learn' />
    <Campus />
  </>
)

const TestimonialsPage = () => (
  <>
    <Title subTitle='OUR IMPACT' title='What We Have Achieved' />
    <Testimonials />
  </>
)

const ContactPage = () => (
  <>
    <Title subTitle='Contact Us' title='Get in Touch' />
    <Contact />
  </>
)
const GalleryPage = () => (
  <>
   
    <Gallery/>
  </>
)
const NewsPage = () => (
  <>
   
    <News/>
  </>
)
const ReadmorePage = () => (
  <>
   
    <Readmore/>
  </>
)


export default App
