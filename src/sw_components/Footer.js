import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <span className="footer-logo">Startrit</span>
          <p>Connecting deep-tech talent with innovative projects worldwide.</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>For Clients</h4>
            <a href="#">Hire Developers</a>
            <a href="#">Post a Project</a>
            <a href="#">How It Works</a>
          </div>
          <div>
            <h4>For Developers</h4>
            <a href="#">Find Work</a>
            <a href="#">Create Profile</a>
            <a href="#">Success Stories</a>
          </div>
          <div>
            <h4>Support</h4>
            <a href="#">FAQs</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © 2024 Startrit. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
