import React from 'react';
import './Readmore.css';
import gallery_1 from '../../assets/img (41).jpg'
import gallery_2 from '../../assets/img (34).jpg'

const newsItems = [
  {
    title: "Bihar and Jharkhand Plantation project",
    content: "Under the 'Harit Pradesh Harit Desh' initiative, NGO Soch planted 30,000 saplings, including fruit-bearing and timber trees, across various districts of Bihar and Jharkhand in the past six months. The program aims to raise environmental awareness and promote sustainable development among communities. Members of the organization actively participated in nurturing the saplings, emphasizing the importance of ecological balance. As the article states, “संस्था लोगों के बीच एक सहजान समझ विकसित करना चाह रही है,” highlighting Soch’s commitment to fostering a deeper understanding of environmental conservation through collective and impactful actions.",
    image: gallery_1
  },
  {
    title: "Launched Multiple Digital Literacy Centre",
    content: "NGO Soch, in collaboration with Capgemini, promotes digital literacy in Bihar's Arwal district to empower marginalized communities. Operating digital literacy centers, the initiative has educated many and bridged the digital divide. As stated, “सेंटर के माध्यम से सोच संस्था काफी लोगों के शिक्षित कर चुकी है,” highlighting its continuous efforts to uplift society through education and skill development.",
    image: gallery_2
  }

];

const Readmore = () => {
  return (
    <div className="about-container">
      <section className="founder">
        <div className="founder-content">
          <h1>News Highlights</h1>
          <p>Here are some of the latest updates and initiatives from Sonch:</p>
          {newsItems.map((item, index) => (
            <div key={index} className="founder-profile">
              <img src={item.image} alt={item.title} className="founder-image" />
              <div className="founder-info">
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Readmore;
