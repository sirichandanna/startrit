import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileSetupStep1.css";

function ProfileSetupStep1() {
  const [profilePic, setProfilePic] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const fileInputRef = useRef();
  const cameraInputRef = useRef();
  const navigate = useNavigate();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleCameraClick = (e) => {
    e.stopPropagation();
    cameraInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePic(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Next clicked with:", { firstName, lastName, profilePic });

    // Optional: validate fields here

    // Navigate to step 2
      navigate("/profile-setup/step2");

  };

  return (
    <div className="profile-setup-step1-root">
      {/* Header */}
      <header className="profile-setup-header">
        <div className="header-left">Startrit</div>
        <div className="header-center">
          <span>Personal Info</span>
        </div>
        <div className="header-right">
          <div className="step-label">Profile Setup: Step 1 of 9</div>
        </div>
      </header>

      {/* Progress bar below header */}
      <div className="progress-bar-below-header">
        <div className="progress-bar-fill" style={{ width: "11%" }} />
      </div>

      {/* Main Content */}
      <form className="profile-setup-content" onSubmit={handleSubmit}>
        <div className="profile-setup-title">
          Let’s get started with setting up your profile!
        </div>

        <div className="profile-setup-photo-section">
          <div
            className="profile-photo-placeholder"
            onClick={handleUploadClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleUploadClick();
              }
            }}
            aria-label="Upload profile photo"
          >
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="profile-photo-img"
              />
            ) : (
              <span className="svg-user-icon" aria-label="User">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="30" cy="30" r="30" fill="#e5e7eb" />
                  <circle cx="30" cy="24" r="10" fill="#b6c2d6" />
                  <ellipse cx="30" cy="44" rx="15" ry="9" fill="#b6c2d6" />
                </svg>
              </span>
            )}

            <span
              className="photo-upload-camera"
              title="Open camera"
              onClick={handleCameraClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCameraClick(e);
                }
              }}
              aria-label="Open camera"
            >
              <span role="img" aria-label="camera">
                📸
              </span>
            </span>

            {/* Hidden file inputs */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="user"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>

          <div className="profile-photo-buttons">
            <button
              type="button"
              className="photo-btn"
              onClick={handleUploadClick}
            >
              Upload from device
            </button>
          </div>
        </div>

        <div className="profile-setup-inputs">
          <div className="input-group">
            <label htmlFor="firstName">First Name (as per documents)</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name (as per documents)</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
            />
          </div>
        </div>

        {/* Next Button aligned right */}
        <div className="next-button-container">
          <button type="submit" className="next-btn">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileSetupStep1;
