import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <p>&copy; {new Date().getFullYear()} Full-Stack Web Development Course. All rights reserved.</p>
    </footer>
  );
};

export default Footer;