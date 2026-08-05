import React from 'react';
import { motion } from 'framer-motion';
import './Education.css';

const Education = ({ education }) => {
  return (
    <section id="education">
      <h2 className="section-title">Education</h2>

      <div className="timeline">
        {education.map((edu, index) => (
          <motion.div 
            key={edu.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="timeline-item glass-card"
          >
            <div className="timeline-header">
              <h3>{edu.degree}</h3>
              <span className="duration">{edu.duration}</span>
            </div>
            <p className="institution">{edu.institution}, {edu.location}</p>
            <p className="cgpa">CGPA: <strong>{edu.cgpa}</strong></p>
            
            <div className="coursework">
              <span>Relevant Coursework:</span>
              <div className="tags">
                {edu.courses.map((course, i) => (
                  <span key={i} className="tag">{course}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;