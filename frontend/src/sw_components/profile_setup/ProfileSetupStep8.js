import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileSetupStep8.css";

// SVG icons for platforms
const icons = {
  linkedin: (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <rect width="24" height="24" rx="5" fill="#2563eb" opacity="0.12"/>
      <path d="M7.75 8.5a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM5.5 10.25h2.5v7.25h-2.5V10.25zM10.25 10.25h2.4v1.05h.03c.33-.63 1.13-1.3 2.32-1.3 2.48 0 2.95 1.63 2.95 3.75v3.75h-2.5v-3.33c0-.79-.01-1.8-1.1-1.8-1.1 0-1.27.86-1.27 1.75v3.38h-2.5v-7.25z" fill="#2563eb"/>
    </svg>
  ),
  facebook: (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <rect width="24" height="24" rx="5" fill="#2563eb" opacity="0.12"/>
      <path d="M15.5 8.5h-2V7c0-.41.34-.75.75-.75h1.25V4.5h-2c-1.38 0-2.5 1.12-2.5 2.5v1.5H8.5V11h2v7h3v-7h2l.5-2.5z" fill="#2563eb"/>
    </svg>
  ),
  x: (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <rect width="24" height="24" rx="5" fill="#2563eb" opacity="0.12"/>
      <path d="M7.5 7.5l9 9M16.5 7.5l-9 9" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  instagram: (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <rect width="24" height="24" rx="5" fill="#2563eb" opacity="0.12"/>
      <rect x="7" y="7" width="10" height="10" rx="5" stroke="#2563eb" strokeWidth="2"/>
      <circle cx="12" cy="12" r="3" stroke="#2563eb" strokeWidth="2"/>
      <circle cx="16" cy="8" r="1" fill="#2563eb"/>
    </svg>
  ),
};

const platforms = [
  { key: "linkedin", label: "LinkedIn" },
  { key: "facebook", label: "Facebook" },
  { key: "x", label: "X (Twitter)" },
  { key: "instagram", label: "Instagram" },
];

export default function ProfileSetupStep8() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState({});
  const [links, setLinks] = useState({
    linkedin: "",
    facebook: "",
    x: "",
    instagram: "",
  });

  const handleExpand = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInput = (key, value) => {
    setLinks((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="ps8-root">
      {/* Header */}
      <div className="ps8-header">
        <div className="ps8-header-left">Startrit</div>
        <div className="ps8-header-center">Social Media Links</div>
        <div className="ps8-header-right">
          <span className="ps8-step-label">Profile Setup:</span>
          <span className="ps8-step-blue">Step 8 of 9</span>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="ps8-progress-bar">
        <div className="ps8-progress-bar-fill" />
      </div>

      {/* Main Card */}
      <div className="ps8-card">
        <div className="ps8-title">Add your social media profiles</div>
        <div className="ps8-subtitle">
          Optional but helpful for building trust and connection.
        </div>
        <div className="ps8-platforms">
          {platforms.map((platform) => (
            <div
              className={`ps8-platform-bar ${
                expanded[platform.key] ? "ps8-platform-bar-active" : ""
              }`}
              key={platform.key}
              onClick={() => handleExpand(platform.key)}
              tabIndex={0}
              role="button"
              aria-expanded={!!expanded[platform.key]}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleExpand(platform.key);
              }}
            >
              <div className="ps8-platform-icon">{icons[platform.key]}</div>
              <div className="ps8-platform-label">{platform.label}</div>
              <div className="ps8-platform-expand">{expanded[platform.key] ? "▲" : "▼"}</div>
            </div>
          ))}
          {platforms.map(
            (platform) =>
              expanded[platform.key] && (
                <div className="ps8-platform-input-row" key={platform.key + "-input"}>
                  <label className="ps8-platform-input-label">
                    {platform.label} URL
                  </label>
                  <input
                    className="ps8-platform-input"
                    type="url"
                    placeholder="Paste your profile link here"
                    value={links[platform.key]}
                    onChange={(e) => handleInput(platform.key, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )
          )}
        </div>
        <div className="ps8-info-box">
          <div className="ps8-info-title">Why add social links?</div>
          <ul className="ps8-info-list">
            <li>Showcase your professional presence</li>
            <li>Build trust with potential clients</li>
            <li>Display your work and achievements</li>
            <li>Make it easier for people to connect with you</li>
          </ul>
        </div>
        <div className="ps8-nav-row">
          <button
            className="ps8-nav-btn ps8-nav-back"
            onClick={() => navigate("/profile-setup/step7")}
          >
            Back
          </button>
          <div className="ps8-nav-right">
            <button
              className="ps8-nav-btn ps8-nav-skip"
              onClick={() => navigate("/profile-setup/step9")}
            >
              Skip for Now
            </button>
            <button
              className="ps8-nav-btn ps8-nav-next"
              onClick={() => navigate("/profile-setup/step9")}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
