import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <h2 className="footer-logo">Tomato<span>.</span></h2>
          <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
          <div className="footer-social-icons">
            {/* Aap yahan social media icons laga sakte hain */}
            <span>🌐</span> <span>🔵</span> <span>📸</span>
          </div>
        </div>
        
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2026 © Tomato.com - All Rights Reserved.</p>
    </div>
  );
};

export default Footer;