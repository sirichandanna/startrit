import React from "react";
import "./HeroSection.css";

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>
          Find the Best Freelance <span className="highlight">Developers</span>
        </h1>
        <p>
          Connect with top deep-tech talent, post your project, and get hired fast.
        </p>
        <div className="hero-search-row">
          <input
            type="text"
            className="hero-search"
            placeholder="What project are you looking for?"
          />
          <button className="hero-search-btn">🔍</button>
        </div>
        <div className="hero-btn-row">
          <button className="hero-btn blue">Hire Developers</button>
          <button className="hero-btn white">Become Developer</button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;