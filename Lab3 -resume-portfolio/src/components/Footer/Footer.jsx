import React from 'react';
import { FaGithub, FaLinkedin, FaCode } from 'react-icons/fa';
import './Footer.css';

const Footer = ({ personalInfo }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="footer-logo">EK.</span>
        <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
        <div className="footer-socials">
          <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href={personalInfo.socials.leetcode} target="_blank" rel="noopener noreferrer"><FaCode /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;