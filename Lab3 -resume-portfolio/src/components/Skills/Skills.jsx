import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const Skills = ({ skills }) => {
  return (
    <section id="skills">
      <h2 className="section-title">Skills & Technologies</h2>

      <div className="skills-grid">
        {skills.map((categoryGroup, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card skill-category-card"
          >
            <h3>{categoryGroup.category}</h3>
            <div className="skills-list">
              {categoryGroup.items.map((skill, i) => (
                <div key={i} className="skill-item">
                  <div className="skill-info">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="progress-bar">
                    <motion.div 
                      className="progress-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;