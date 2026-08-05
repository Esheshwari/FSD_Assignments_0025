import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './Contact.css';

const Contact = ({ personalInfo }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact">
      <h2 className="section-title">Get In Touch</h2>

      <div className="contact-container">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="contact-info"
        >
          <h3>Let's Collaborate</h3>
          <p>I am open to discussions regarding AI Engineering, Multi-Agent Systems, and Data Analytics positions or collaborations.</p>

          <div className="info-item">
            <FaEnvelope className="icon" />
            <div>
              <span>Email</span>
              <p>{personalInfo.email}</p>
            </div>
          </div>

          <div className="info-item">
            <FaPhone className="icon" />
            <div>
              <span>Phone</span>
              <p>{personalInfo.phone}</p>
            </div>
          </div>

          <div className="info-item">
            <FaMapMarkerAlt className="icon" />
            <div>
              <span>Location</span>
              <p>{personalInfo.location}</p>
            </div>
          </div>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="glass-card contact-form"
        >
          {submitted && <div className="success-toast">Message Sent Successfully!</div>}
          
          <div className="form-group">
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <textarea name="message" rows="5" placeholder="Your Message" value={formData.message} onChange={handleChange} required></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            <FaPaperPlane /> Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;