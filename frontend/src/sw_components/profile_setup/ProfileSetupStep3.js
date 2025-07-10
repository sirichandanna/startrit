import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileSetupStep3.css";

export default function ProfileSetupStep3() {
  const [role, setRole] = useState("");
  const [roleTouched, setRoleTouched] = useState(false);
  const [desc, setDesc] = useState("");
  const [descTouched, setDescTouched] = useState(false);
  const navigate = useNavigate();

  const minRole = 3;
  const maxRole = 10;
  const minDescWords = 10;
  const maxDescWords = 500;
  const maxDescChars = 2500;

  const wordCount = desc.trim() ? desc.trim().split(/\s+/).length : 0;

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setRoleTouched(true);
  };

  const handleDescChange = (e) => {
    if (e.target.value.length <= maxDescChars) {
      setDesc(e.target.value);
      setDescTouched(true);
    }
  };

  const handleNext = () => {
    if (
      role.length >= minRole &&
      wordCount >= minDescWords &&
      wordCount <= maxDescWords
    ) {
      navigate("/profile-setup/step4");
    } else {
      alert("Please meet the input requirements before proceeding.");
    }
  };

  const handleBack = () => {
    navigate("/profile-setup/step2");
  };

  return (
    <div className="profile-step3-unique-root">
      {/* Header */}
      <header className="profile-step3-unique-header">
        <div className="header-left">Startrit</div>
        <div className="profile-step3-unique-header-center">
          Professional Info
        </div>
        <div className="ps3v-step">Profile Setup: Step 3 of 9</div>
      </header>

      {/* Progress bar below header */}
      <div className="progress-bar-below-header">
        <div className="progress-bar-fill" style={{ width: "33%" }} />
      </div>

      {/* Content */}
      <div className="profile-step3-unique-content">
        <h2 className="profile-step3-unique-title">Tell us about yourself</h2>

        {/* Role Input */}
        <div className="profile-step3-unique-form-group">
          <label className="profile-step3-unique-label" htmlFor="role">
            What do you do?
          </label>
          <div className="profile-step3-unique-desc">
            Briefly describe your professional role or main expertise area.
          </div>
          <input
            id="role"
            className="profile-step3-unique-input"
            type="text"
            maxLength={maxRole}
            value={role}
            onChange={handleRoleChange}
            onBlur={() => setRoleTouched(true)}
            placeholder="I'm a Data Scientist"
          />
          <div className="profile-step3-unique-input-helper">
            {roleTouched && role.length < minRole ? (
              <span className="profile-step3-unique-warning">
                ⚠️ Minimum {minRole} characters
              </span>
            ) : role.length >= minRole ? (
              <span className="profile-step3-unique-success">
                ✓ Minimum {minRole} characters
              </span>
            ) : (
              <span>&nbsp;</span>
            )}
            <span className="profile-step3-unique-char-count">
              {role.length}/{maxRole} characters
            </span>
          </div>
        </div>

        {/* Description Input */}
        <div className="profile-step3-unique-form-group">
          <label className="profile-step3-unique-label" htmlFor="desc">
            Describe yourself
          </label>
          <div className="profile-step3-unique-desc">
            Share your professional background, interests, and what makes you
            unique. This helps others understand who you are and what you bring
            to the table.
          </div>
          <textarea
            id="desc"
            className="profile-step3-unique-textarea"
            rows={7}
            maxLength={maxDescChars}
            value={desc}
            onChange={handleDescChange}
            onBlur={() => setDescTouched(true)}
            placeholder="I'm a passionate deep-tech developer with expertise in artificial intelligence and machine learning..."
          />
          <div className="profile-step3-unique-input-helper">
            <span>
              Word count: {wordCount} (minimum {minDescWords}, max{" "}
              {maxDescWords})
            </span>
            <span className="profile-step3-unique-char-count">
              {desc.length}/{maxDescChars} characters
            </span>
          </div>
        </div>

        {/* Tips */}
        <div className="profile-step3-unique-tips">
          <div className="profile-step3-unique-tips-title">
            Tips for a great profile:
          </div>
          <ul>
            <li>Mention your key skills and expertise areas</li>
            <li>Include your years of experience</li>
            <li>Highlight notable projects or achievements</li>
            <li>Show your passion for deep-tech</li>
            <li>Keep it professional yet personable</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="profile-step3-unique-buttons">
          <button type="button" className="back-btn" onClick={handleBack}>
            Back
          </button>
          <button type="button" className="next-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
