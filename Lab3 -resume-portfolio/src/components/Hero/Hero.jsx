import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaCode, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-scroll';
import './Hero.css';

const Hero = ({ personalInfo }) => {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-content">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-text"
        >
          <span className="badge">AI Engineer & Data Analyst</span>
          <h1>Hi, I'm <span className="highlight">{personalInfo.name}</span></h1>
          
          <div className="typing-container">
            <span>Specialized in </span>
            <TypeAnimation
              sequence={[
                'Multi-Agent Workflows', 2000,
                'LLM & RAG Systems', 2000,
                'Prompt Engineering', 2000,
                'Data Analytics Pipelines', 2000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="typing-text"
            />
          </div>

          <p className="hero-description">{personalInfo.about}</p>

          <div className="hero-buttons">
            <Link to="contact" smooth={true} duration={500}>
              <button className="btn btn-primary">
                <FaEnvelope /> Contact Me
              </button>
            </Link>
            <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <FaGithub /> GitHub Profile
            </a>
          </div>

          <div className="hero-socials">
            <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href={personalInfo.socials.leetcode} target="_blank" rel="noopener noreferrer"><FaCode /></a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="hero-image-container"
        >
          <div className="avatar-glow"></div>
          <div className="avatar-card glass-card">
            <img 
              src="/ProfileImage.jpeg" 
              alt={personalInfo.name} 
              className="avatar-img"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;