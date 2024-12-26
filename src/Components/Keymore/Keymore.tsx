import React from 'react'
import gallery_3 from '../../assets/gallery-1.png'
import { Users, FileText, Calendar } from 'lucide-react'
import './Keymore.css'


function Button({ children, variant = 'primary' }: { children: React.ReactNode; variant?: 'primary' | 'outline' }) {
  return (
    <button className={`button ${variant}`}>
      {children}
    </button>
  )
}

export default function Component() {
  const objectives = [
    {
      title: "Digital Literacy",
      description: "Providing knowledge and technical support to empower communities through digital skills and education"
    },
    {
      title: "Environmental Action",
      description: "Building capacity of various stakeholders to implement sustainable environmental practices"
    },
    {
      title: "Women Empowerment",
      description: "Empowering individuals and their communities through tools and resources for sustainable development"
    }
  ]

  const activities = [
    {
      title: "Digital Skills Training Programs",
      description: "Comprehensive workshops on computer literacy, internet safety, and digital tools",
      status: "Ongoing"
    },
    {
      title: "Environmental Awareness Campaigns",
      description: "Community-led initiatives for sustainable environmental practices",
      status: "Active"
    },
    {
      title: "Women Leadership Workshops",
      description: "Skill development and empowerment sessions for women leaders",
      status: "Upcoming"
    }
  ]

  return (
    <div className="key-projects-layout">
      {/* Hero Section */}
      <section className="her">
        <div className="container-keymore">
          <div className="her-content">
            <div className="her-text">
              <h1>Empowering Communities Through Key Projects</h1>
              <p>Join us in our mission to create lasting positive change in communities worldwide.</p>
            
            </div>
            <div className="her-image">
              <img
                src={gallery_3}
                alt="Community Impact"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="objectives">
        <div className="container-keymore">
          <h2>Our Objectives</h2>
          <div className="objectives-list">
            {objectives.map((objective, index) => (
              <div key={index} className="objective-item">
                <h3>{objective.title}</h3>
                <p>{objective.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section className="numbers">
        <div className="container-keymore">
          <h2>Our Impact</h2>
          <div className="numbers-grid">
            {[
              { icon: Users, number: "10,000+", label: "People Impacted" },
              { icon: Calendar, number: "50+", label: "Workshops Conducted" },
              { icon: FileText, number: "30+", label: "Success Stories" }
            ].map((item, index) => (
              <div key={index} className="number-item">
                <item.icon className="number-icon" />
                <div className="number">{item.number}</div>
                <div className="number-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      
    </div>
  )
}