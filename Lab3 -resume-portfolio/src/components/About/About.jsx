import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import './About.css';

const About = ({ personalInfo, education }) => {
  return (
    <section id="about">
      <h2 className="section-title">About Me</h2>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card about-card"
      >
        <div className="about-grid">
          <div className="about-info">
            <h3>Building Next-Gen AI Workflows & Systems</h3>
            <p>{personalInfo.about}</p>
            
            <div className="info-pills">
              <div className="pill"><FaMapMarkerAlt /> {personalInfo.location}</div>
              <div className="pill"><FaEnvelope /> {personalInfo.email}</div>
              <div className="pill"><FaGraduationCap /> RV University</div>
            </div>
          </div>

          <div className="about-highlights">
            {education.map((edu) => (
              <div className="edu-highlight-box" key={edu.id}>
                <h4>{edu.degree}</h4>
                <p className="inst">{edu.institution}</p>
                <div className="cgpa-badge">CGPA: {edu.cgpa}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;