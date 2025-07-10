import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Components/UserContext";
 // <-- make sure you have user context
import "./ProfileSetupStep1.css";

function ProfileSetupStep1() {
  const [profilePic, setProfilePic] = useState(null);
  const [file, setFile] = useState(null); // <-- store the file
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();
  const cameraInputRef = useRef();
  const navigate = useNavigate();
  const { user } = useUser(); // <-- get user info (username/email)

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleCameraClick = (e) => {
    e.stopPropagation();
    cameraInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // <-- store the file
      const url = URL.createObjectURL(selectedFile);
      setProfilePic(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a photo.");
      return;
    }
    setUploading(true);

    // Prepare FormData
    const formData = new FormData();
    formData.append("username", user.username); // or user.email, as per your backend
    formData.append("profile_photo", file);

    // Send to backend
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/developer/profile-photo/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      // Success! Go to next step
      navigate("/profile-setup/step2");
    } else {
      const errorData = await response.json();
      alert("Upload failed: " + (errorData.error || "Unknown error"));
    }
    setUploading(false);
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
                {/* ...svg code... */}
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

        {/* Next Button aligned right */}
        <div className="next-button-container">
          <button type="submit" className="next-btn" disabled={uploading}>
            {uploading ? "Uploading..." : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileSetupStep1;
