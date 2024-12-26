"use client"

import React, { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import styles from './timeline.module.css'; // Use .module.css for CSS modules

const timelineEvents = [
  {
    year: "2001",
    title: "Laying the Foundation",
    description: "Began as volunteers in a government school, teaching Mathematics and Science to students."
  },
  {
    year: "2002",
    title: "Formation of SONCH",
    description: "Established SONCH as a society and initiated Maths and Science projects in two schools in Rewa, Madhya Pradesh."
  },
  {
    year: "2003",
    title: "Expanding Educational Reach",
    description: "Expanded SONCH’s reach by covering 2-3 additional schools"
  },
  {
    year: "2008",
    title: "Skill Development Begins",
    description: "Launched the first Skill Development Center in Anuppur, Madhya Pradesh"
  },
  {
    year: "2009",
    title: "Widening the Skill Network",
    description: "Opened three more skill centers, one each in Rewa, Sidhi, and Satna, Madhya Pradesh."
  }, {
    year: "2012",
    title: "Sustainability Initiative",
    description: "Initiated the Plantation Project to promote environmental sustainability."
  }, {
    year: "2017",
    title: "Empowering Women",
    description: "Began work with Women Self-Help Groups (SHGs) in Bihar, focusing on women’s empowerment."
  }, {
    year: "2021",
    title: "Promoting Oral Hygiene",
    description: "Conducted an Oral Hygiene Project campaign in schools across Bihar."
  },{
    year: "2022",
    title: "Growth in Bihar",
    description: "Two New skill development centre launched in bihar"
  }
]

const TimelineEvent = ({ event, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={mainControls}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      className={`${styles.timelineEvent} ${index % 2 === 0 ? styles.left : styles.right}`}
    >
      <div className={styles.eventContent}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.year}>{event.year}</h3>
          </div>
          <div className={styles.cardContent}>
            <h4 className={styles.title}>{event.title}</h4>
            <p className={styles.description}>{event.description}</p>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, delay: index * 0.1 + 0.2 }}
          className={styles.eventMarker}
        />
      </div>
    </motion.div>
  )
}

 function Timeline() {
  return (
    <section className={styles.timelineSection}>
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={styles.sectionTitle}
      >
        Our Journey
      </motion.h2>
      <div className={styles.timelineContainer}>
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ originY: 0 }}
          className={styles.timelineLine}
        />
        {timelineEvents.map((event, index) => (
          <TimelineEvent key={index} event={event} index={index} />
        ))}
      </div>
    </section>
  )
}
export default Timeline