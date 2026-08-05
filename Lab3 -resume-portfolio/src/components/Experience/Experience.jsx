import React from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

const Experience = ({ experiences }) => {
  return (
    <section id="experience">
      <h2 className="section-title">Work Experience</h2>

      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <motion.div 
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="glass-card exp-card"
          >
            <div className="exp-header">
              <div>
                <h3>{exp.role}</h3>
                <h4 className="company">{exp.company}</h4>
              </div>
              <span className="duration">{exp.duration}</span>
            </div>

            <ul className="exp-bullets">
              {exp.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;