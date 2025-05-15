import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p>© 2025 TaskDragger. All rights reserved.</p>
          <p className="built-with">Built with Dragula.js & React</p>
        </div>
        <div className="footer-links">
          <a href="#" className="footer-link">How to Use</a>
          <a href="#" className="footer-link">Privacy</a>
          <a href="#" className="footer-link">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;