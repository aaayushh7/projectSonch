import React from 'react'
import './Focus.css'
import gallery_6 from '../../assets/gallery-1.png'

import gallery_1 from '../../assets/img-2.jpg'
import gallery_2 from '../../assets/img (33).jpg'
import gallery_3 from '../../assets/img (29).jpg'
import gallery_4 from '../../assets/program-1.png'
import gallery_5 from '../../assets/img-35.png'
function SonchCard({ title, content, image }) {
  console.log('Card props:', { title, content, image }); // Debugging log
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
        
      </div>
    </div>
  )
}

const newsItems = [
  {
    title: "Education",
    content: "SONCH is dedicated to advancing access to quality education in underserved communities. By addressing educational disparities, we empower children and youth with the knowledge and skills required to contribute meaningfully to society. Our programs collaborate with local stakeholders to provide resources, bridge learning gaps, and cultivate a culture of lifelong learning, establishing education as the foundation for sustainable development.",
    image: gallery_1
  },
  {
    title: "Skilling and Livelihood Promotion",
    content: "We focus on enhancing employability through skill development and vocational training tailored to local needs. SONCH fosters economic independence by promoting entrepreneurial ventures and connecting individuals to market opportunities. By equipping communities with practical expertise and resources, we enable sustainable livelihoods and create pathways for long-term socioeconomic growth.",
    image: gallery_2
  },
  {
    title: "Community Development",
    content: "SONCH fosters inclusive community development by strengthening participatory governance and collective decision-making. Through capacity-building initiatives, we empower local institutions to address social and economic challenges effectively. By facilitating active engagement and promoting social cohesion, we aim to build resilient communities that can sustain equitable growth.",
    image: gallery_3
  },
  {
    title: "Digital Education",
    content: "Our digital education initiatives address the growing need for technological competence in underserved areas. SONCH bridges the digital divide by offering comprehensive training programs that enhance digital literacy and empower individuals to access modern opportunities. By integrating technology into education and skill-building, we prepare communities for the demands of a digitally-driven world.",
    image: gallery_4
  },
  {
    title: "Women Empowerment",
    content: "SONCH is committed to fostering gender equity by equipping women with the resources and opportunities to lead and contribute to their communities. Through targeted initiatives, we promote financial independence, leadership development, and access to education. By addressing systemic barriers, we empower women to drive meaningful social and economic transformation.",
    image: gallery_5
  },
  {
    title: "Environment and Sustainability",
    content: "SONCH is dedicated to environmental stewardship and sustainability through initiatives that address climate change, conservation, and resource management. We promote community engagement in practices such as reforestation, waste reduction, and renewable energy adoption. By fostering a culture of environmental responsibility, we contribute to the preservation of natural resources for future generations.",
    image: gallery_6
  }
];



export default function SonchNews() {
  console.log('News items:', newsItems); // Debugging log
  return (
    <div className="sonch-news">
      <div className="sonch-news-container">
        <h1 className="sonch-news-title">Focus Area</h1>
        <div className="sonch-news-grid">
          {newsItems.map((item, index) => (
            <SonchCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}