import React from 'react'
import './Keyprojects.css'
import { useNavigate } from 'react-router-dom';
import gallery_1 from '../../assets/gallery-1.png'
import gallery_2 from '../../assets/img-2.jpg'
import gallery_35 from '../../assets/img-35.png';
function SonchCard({ title, content, image }) {
  const navigate = useNavigate();
  const handleGalleryClick = () => {
    navigate('/keymore');
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
          Learn More
        </button>
      </div>
    </div>
  )
}

const newsItems = [
  {
    title: "Plantation projects",
    content: "Under the 'Harit Pradesh Harit Desh' initiative, NGO Soch planted 30,000 saplings, including fruit-bearing and timber trees, across various districts of Bihar and Jharkhand in the past six months. The program aims to raise environmental awareness and promote sustainable development among communities. Members of the organization actively participated in nurturing the saplings, emphasizing the importance of ecological balance. As the article states, “संस्था लोगों के बीच एक सहजान समझ विकसित करना चाह रही है,” highlighting Soch’s commitment to fostering a deeper understanding of environmental conservation through collective and impactful actions.",
    image: gallery_1
  },
  {
    title: "Digital literacy centres",
    content: "Digital Literacy CentresSONCH has established Digital Literacy Centres to bridge the digital divide and empower individuals with essential technological skills. These centres provide training in basic computer operations, internet usage, and digital tools, enabling participants to enhance their employability and adapt to the modern digital landscape. This initiative equips communities to access opportunities and resources more effectively",
    image: gallery_2
  },
  {
    title: "Women Empowerment",
    content: "Women Empowerment ProjectsSONCH’s Women Empowerment Projects aim to uplift women by promoting financial independence, leadership, and active participation in decision-making processes. Through partnerships with Women Self-Help Groups (SHGs), the initiative provides training, resources, and mentorship to help women lead socio-economic transformations within their communities, fostering a more equitable and inclusive society",
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
            <SonchCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}