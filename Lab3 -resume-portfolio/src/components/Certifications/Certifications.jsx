import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate } from 'react-icons/fa';
import './Certifications.css';

const Certifications = ({ certifications }) => {
  return (
    <section id="certifications">
      <h2 className="section-title">Certifications</h2>

      <div className="certifications-grid">
        {certifications.map((cert, index) => (
          <motion.div 
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-card cert-card"
          >
            <div className="cert-icon"><FaCertificate /></div>
            <div>
              <h4>{cert.title}</h4>
              <p>{cert.issuer}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;