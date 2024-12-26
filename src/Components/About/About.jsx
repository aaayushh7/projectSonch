import React, { useRef } from 'react';
import './About.css';
import ashish from '../../assets/Ashish Agrawal profpic.jpeg'
import ashwini from '../../assets/Ashwini Singh profpic.jpeg'
import ritesh from '../../assets/Ritesh_Chandra_profpic.png'
import mrinalini from '../../assets/Mrinalini profpic.jpeg'
import santosh from '../../assets/Santosh_Sinha_profpic.jpg'
import kamleshwar from '../../assets/kamo.png'
import kanika from '../../assets/gallery-1.png'
const foundersData = [
  {
    name: "Ashwini Pratap Singh",
    image: ashwini,
    description: "Ashwini brings with him more than 22+ years of diversified experience in community development, project management / implementation, capacity planning, and resource Management. Over the past close to two decade, he has worked with grassroot agencies, support agencies and advocacy groups. In his present role, his focus is on designing an overarching strategy and charter for community mobilization and outreach for creating a better world for people standing last in queue. He is actively involved in managing relationship with a broad set of stakeholders including community, community leaders, NGOs, pressure groups, local level government officials and policy shapers."
  },
  {
    name: "Ashish Agrawal",
    image: ashish,
    description: "Presently practicing histopathology and cytopathology in Pathology Consultancy services . Had been quality manager of lab for NABL audit. Also associated with Digiscan , a company which promotes and provides digital slides in pathology to undergraduates and post graduates students .Completed my DPB, DNB in pathology from reputed institutes. worked in various private hospital as pathologist. Experience in histopathology, cytopathology and hematology"
  }, {
    name: "Ritesh Chandra",
    image: ritesh,
    description: "I am a senior legal counsel with more than two decades of experience across 25 countries, and several industries including Aviation, Beverages, Power, Telecom, Automobile, Manufacturing, Supply Chain, FMCG, Chemical and Gas, IT. I have successfully led several high value multimillion-dollar, complex transactions and M&A deals across the globe. Having founded Vidhikrit Legal, my aim is to assist businesses and startups through my domain expertise and strength in Corporate and Board Restructuring, Board Directorships, Secretarial matters, complex high value Corporate and Commercial transactions, In-Country and Global contracts, Negotiations, Risk Assessment and Management, large scale, high value and complex Litigations and Arbitrations, Corporate and Statutory Compliances, Government and Regulatory affairs."
  }, {
    name: "Santosh Sinha",
    image: santosh,
    description: "Senior Officer with more than 20 years of experience across a gamut of administrative functions, with leading Organizations. Adept in controlling various administrative functions including vendor management, facilities management, employee relations and support functions.Skills in various aspects of administration such as, Vendor Management, MIS Reporting, Housekeeping and Facilities Management. Demonstrated abilities in addressing operational issues, resolving performance bottlenecks and achieving desired objectives. Expertise in implementation of Standard Operational Procedure, in every system of the organization to meet the desired organizational goal."
  }, {
    name: "Mrinalini Priyadarshini",
    image: mrinalini,
    description: "Presently practicing histopathology and cytopathology in Pathology Consultancy services . Had been quality manager of lab for NABL audit. Also associated with Digiscan , a company which promotes and provides digital slides in pathology to undergraduates and post graduates students .Completed my DPB, DNB in pathology from reputed institutes. worked in various private hospital as pathologist. Experience in histopathology, cytopathology and hematology."
  }, {
    name: "Kamleshwar Singh",
    image: kamleshwar,
    description: "Rural Development Professional with 26+ years of experience in executing varied projects covering the issues of Environment, Joint Forest Management , Watershed Development, Saving & Credit, Citizen Participation and Democratic Local GovernanceProfessional competencies in Policy Advocacy & Lobbying with the National, State Government, Directorates, District Administration & Networks of Elected Representatives. Served as member in various state level committees in Himachal Pradesh such State resource group member for SSA( education for all), steering committee member for sanitation prize for Directorate of urban development, State level member for WASH project -GTZ-WASH and govt H.P and Amendment committee member of Panchayati Raj and Rural Development Directorate."
  }, {
    name: "Kanika Singh",
    image: "",
    description: "Presently practicing histopathology and cytopathology in Pathology Consultancy services . Had been quality manager of lab for NABL audit. Also associated with Digiscan , a company which promotes and provides digital slides in pathology to undergraduates and post graduates students .Completed my DPB, DNB in pathology from reputed institutes. worked in various private hospital as pathologist. Experience in histopathology, cytopathology and hematology"
  },
];

const About = ({ founderRef, organisationRef, journeyRef, valuesRef }) => {
  return (
    <div className="about-container">
      <section className="about" ref={organisationRef}>
        <h2>Our Organisation</h2>
        <p><strong>SONCH</strong> is a mission-driven organization dedicated to fostering inclusive growth and sustainable development. We work to empower communities by creating opportunities for self-governance, promoting equitable access to resources, and driving positive social change. Through collaborative efforts, SONCH aims to create a lasting impact by uplifting marginalized sections of society and advocating for a just, equitable future for all.</p>
        <p><strong>SONCH</strong> strives to build a just society where equality and self-governance thrive. By strengthening local governance systems and encouraging the active participation of marginalized communities, SONCH helps people improve their living conditions and make informed decisions about their future. The organization’s efforts focus on sustainable development, women empowerment, education, healthcare, and livelihood promotion.</p>
      </section>

      <section className="about" ref={journeyRef}>
        <h2>Our Journey</h2>
        <p><strong>SONCH</strong> has an interesting saga even before its advent. Much before the name and organisation CEED formalised for leading the transformative works in the Indo-Gangetic plain, a team of young, passionate and highly motivated professionals started a public awareness on renewable energy through 'Bihar Renewable Energy Development Support Network (BREDSN)' in Bihar in 2010, which for the first time in the state created buzz around cleaner energy, particularly solar, and its decentralised models with the aim to promote energy access and climate solutions.</p>
      </section>
       <section className="about" ref={valuesRef}>
        <h2>Mission & Goal</h2>
        <p><strong>SONCH</strong> is committed to empowering communities by promoting self-governance and sustainable development. Our mission is to enhance socio-economic and cultural growth through skill development, knowledge-sharing, and equitable participation in decision-making. We aim to create an inclusive society where individuals are equipped with the resources to improve their quality of life and foster positive social change.</p>
      </section>
      <section className="about" ref={valuesRef}>
        <h2>Our Values</h2>
        <p> At <strong>SONCH</strong>, we are driven by a commitment to transparency, teamwork, and accountability in all our activities. We believe in the power of democratic processes and collective decision-making to foster sustainable development. Our guiding principles emphasize community-led initiatives, where local participation is central to addressing social challenges. We uphold the belief that true change begins from within the community, and through empowerment, people can overcome poverty and achieve lasting development. We prioritize ethical practices, inclusivity, and social responsibility in everything we do.</p>
      </section>

      <section className="founder" ref={founderRef}>
        <div className="founder-content">
          <h2>Governing Body</h2>
          
          {foundersData.map((founder, index) => (
            <div key={index} className="founder-profile">
              <img src={founder.image} alt={founder.name} className="founder-image" />
              <div className="founder-info">
                <h3>{founder.name}</h3>
                <p>{founder.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
