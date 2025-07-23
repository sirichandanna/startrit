import React from "react";
import "./Features.css";

function Features() {
  return (
    <section className="features-section">
      <div className="features-columns">
        <div className="features-col">
          <h2>For Clients</h2>
          <ul>
            <li>
              <span className="feature-icon">🌟</span>
              <div>
                <strong>Top Talent Access</strong>
                <p>
                  Connect with pre-vetted deep-tech developers who have proven expertise in cutting-edge technologies and complex problem-solving.
                </p>
              </div>
            </li>
            <li>
              <span className="feature-icon">🔒</span>
              <div>
                <strong>Secure Platform</strong>
                <p>
                  Built-in payment protection, milestone tracking, and dispute resolution to ensure your projects are completed successfully and safely.
                </p>
              </div>
            </li>
            <li>
              <span className="feature-icon">⚡</span>
              <div>
                <strong>Fast Hiring</strong>
                <p>
                  Post your project and start receiving proposals within hours. Our streamlined process gets you connected with the right talent quickly.
                </p>
              </div>
            </li>
            <li>
              <span className="feature-icon">🌐</span>
              <div>
                <strong>Global Network</strong>
                <p>
                  Access developers from around the world, bringing diverse perspectives and expertise to your deep-tech projects and innovations.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="features-col">
          <h2>For Developers</h2>
          <ul>
            <li>
              <span className="feature-icon">💎</span>
              <div>
                <strong>Premium Projects</strong>
                <p>
                  Work on cutting-edge deep-tech projects that challenge your skills and advance your career in emerging technologies.
                </p>
              </div>
            </li>
            <li>
              <span className="feature-icon">⏰</span>
              <div>
                <strong>Flexible Work</strong>
                <p>
                  Choose projects that fit your schedule and expertise. Work remotely with top companies and startups worldwide.
                </p>
              </div>
            </li>
            <li>
              <span className="feature-icon">💰</span>
              <div>
                <strong>Guaranteed Payments</strong>
                <p>
                  Secure payment system ensures you get paid for your work with milestone-based payments and built-in protection.
                </p>
              </div>
            </li>
            <li>
              <span className="feature-icon">📈</span>
              <div>
                <strong>Professional Growth</strong>
                <p>
                  Build your reputation, expand your network, and advance your career by working with innovative companies and fellow experts.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Features;
