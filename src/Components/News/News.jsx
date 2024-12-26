import React from 'react'
import './News.css'
import { useNavigate } from 'react-router-dom';
import gallery_1 from '../../assets/img (41).jpg'
import gallery_2 from '../../assets/img (34).jpg'



function SonchCard({ title, content, image }) {
  const navigate = useNavigate();
   const handleGalleryClick = () => {
    navigate('/sonch-in-news/readmore'); // Route to the Gallery component
  };
  console.log('Card props:', { title, content, image });
  // Debugging log
  return (
    <div className="sonch-card">
      <img 
        className="sonch-card-image" 
        src={image}
        alt={title}
      />
      <div className="sonch-card-content">
        <h2 className="sonch-card-title">{title}</h2>
        <p className="sonch-card-text">
          {content}
        </p>
        <button className="sonch-card-button" onClick={handleGalleryClick}>
          Read More
        </button>
      </div>
    </div>
  )
}

const newsItems = [
  {
    title: "Bihar and Jharkhand Plantation project",
    content: "Under the 'Harit Pradesh Harit Desh' initiative, NGO Soch planted 30,000 fruit and timber saplings across Bihar and Jharkhand to raise environmental awareness and foster sustainable community development.",
    image: gallery_1
  },
  {
    title: "Launched Multiple Digital Literacy Centre",
    content: "Digital literacy promotion by NGO Soch in collaboration with Capgemini aims to empower underprivileged communities in Bihar. The initiative has established literacy centers, educating many through continuous efforts and impactful programs.",
    image: gallery_2
  }
  
]

export default function SonchNews() {
  console.log('News items:', newsItems); // Debugging log
  return (
    <div className="sonch-news">
      <div className="sonch-news-container">
        <h1 className="sonch-news-title">Sonch in News</h1>
        <div className="sonch-news-grid">
          {newsItems.map((item, index) => (
            <SonchCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}