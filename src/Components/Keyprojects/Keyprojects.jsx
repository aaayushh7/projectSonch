import React from 'react'
import './Keyprojects.css'
import { useNavigate } from 'react-router-dom';
import gallery_1 from '../../assets/gallery-1.png'
import gallery_2 from '../../assets/img-2.jpg'
import gallery_35 from '../../assets/img-35.png';

function SonchCard({ title, content, image, index }) {
  const navigate = useNavigate();
  
  const handleGalleryClick = () => {
    if (index === 0) {
      navigate('/keymore');
    } else if (index === 1) {
      navigate('/keymore2');
    } else if (index === 2) {
      navigate('/keymore3');
    }
  };

  return (
    <div className="snch-card">
      <div className="snch-card-image-container">
        <img 
          className="snch-card-image" 
          src={image}
          alt={title}
        />
      </div>
      <div className="snch-card-content">
        <h2 className="snch-card-title">{title}</h2>
        <p className="snch-card-text">
          {content}
        </p>
        <button className="snch-card-button" onClick={handleGalleryClick}>
          Read More
        </button>
      </div>
    </div>
  )
}

const newsItems = [
  {
    title: "Plantation projects",
    content: "Under the 'Harit Pradesh Harit Desh' initiative, NGO Soch planted 30,000 saplings, including fruit-bearing and timber trees, across various districts of Bihar and Jharkhand in the past six months...",
    image: gallery_1
  },
  {
    title: "Digital literacy centres",
    content: "Digital Literacy CentresSONCH has established Digital Literacy Centres to bridge the digital divide and empower individuals with essential technological skills...",
    image: gallery_2
  },
  {
    title: "Women Empowerment",
    content: "Women Empowerment ProjectsSONCH's Women Empowerment Projects aim to uplift women by promoting financial independence, leadership, and active participation in decision-making processes...",
    image: gallery_35
  }
];

export default function SonchNews() {
  return (
    <div className="snch-news">
      <div className="snch-news-container">
        <h1 className="snch-news-title">Projects</h1>
        <div className="snch-news-grid">
          {newsItems.map((item, index) => (
            <SonchCard 
              key={index} 
              {...item} 
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}