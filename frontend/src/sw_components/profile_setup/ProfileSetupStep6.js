import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Added this line
import "./ProfileSetupStep6.css";

const TYPE_OPTIONS = ["Certification", "License", "Patent"];

export default function ProfileSetupStep6({ onBack, onNext }) {
     const navigate = useNavigate(); // ✅ Added this

  const [showForm, setShowForm] = useState(false);
  const [credentials, setCredentials] = useState([]);
  const [form, setForm] = useState({
    type: "",
    title: "",
    reference: "",
    file: null,
  });
  const [formTouched, setFormTouched] = useState(false);
  const fileInputRef = useRef();

  function resetForm() {
    setForm({ type: "", title: "", reference: "", file: null });
    setFormTouched(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleFormChange(e) {
    const { name, value, files } = e.target;
    if (name === "file") {
      setForm((f) => ({ ...f, file: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  function handleAddCredential(e) {
    e.preventDefault();
    setFormTouched(true);
    if (!form.title.trim() || !form.type) return;
    setCredentials([
      ...credentials,
      {
        ...form,
        id: Date.now(),
        fileName: form.file ? form.file.name : "",
      },
    ]);
    setShowForm(false);
    resetForm();
  }

  function handleRemoveCredential(id) {
    setCredentials(credentials.filter((c) => c.id !== id));
  }

  return (
    <div className="ps6-root">
      {/* Header */}
      <div className="ps6-header">
        <div className="ps6-header-left">Startrit</div>
        <div className="ps6-header-center">Credentials</div>
        <div className="ps6-header-right">
          <span className="ps6-step-label">Profile Setup: Step 6 of 9</span>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="ps6-progress-bar">
        <div className="ps6-progress-bar-fill" />
      </div>

      {/* Main Card */}
      <div className="ps6-main">
        <div className="ps6-main-title">
          Add your certifications, licenses, or patents
        </div>
        <div className="ps6-main-subtitle">
          Highlight your verified qualifications to build credibility.
        </div>
        <div className="ps6-main-content">
          {/* Left: Add Credential */}
          <div className="ps6-form-card">
            {!showForm && (
              <button
                className="ps6-add-btn"
                onClick={() => {
                  setShowForm(true);
                  resetForm();
                }}
              >
                + Add Credential
              </button>
            )}

            {showForm && (
              <form
                className="ps6-form"
                onSubmit={handleAddCredential}
                autoComplete="off"
              >
                <div className="ps6-form-row">
                  <label>
                    Type
                    <span className="ps6-form-required">*</span>
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleFormChange}
                    className={
                      formTouched && !form.type
                        ? "ps6-form-input ps6-form-error"
                        : "ps6-form-input"
                    }
                  >
                    <option value="">Select type</option>
                    {TYPE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="ps6-form-row">
                  <label>
                    Title
                    <span className="ps6-form-required">*</span>
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleFormChange}
                    placeholder="e.g., AWS Certified Developer"
                    className={
                      formTouched && !form.title.trim()
                        ? "ps6-form-input ps6-form-error"
                        : "ps6-form-input"
                    }
                  />
                  {formTouched && !form.title.trim() && (
                    <div className="ps6-form-err-msg">Title is required</div>
                  )}
                </div>
                <div className="ps6-form-row">
                  <label>Reference or License Number</label>
                  <input
                    name="reference"
                    value={form.reference}
                    onChange={handleFormChange}
                    placeholder="Enter reference or license number"
                    className="ps6-form-input"
                  />
                </div>
                <div className="ps6-form-row">
                  <label>Proof Document</label>
                  <div
                    className={
                      "ps6-upload-box" +
                      (form.file ? " ps6-upload-box-hasfile" : "")
                    }
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  >
                    <input
                      ref={fileInputRef}
                      name="file"
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      style={{ display: "none" }}
                      onChange={handleFormChange}
                    />
                    {form.file ? (
                      <span className="ps6-upload-filename">{form.file.name}</span>
                    ) : (
                      <span>
                        Click to upload proof document
                        <br />
                        <span className="ps6-upload-sub">
                          PDF, JPG, PNG up to 10MB
                        </span>
                      </span>
                    )}
                  </div>
                </div>
                <div className="ps6-form-btn-row">
                  <button
                    type="button"
                    className="ps6-form-cancel"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="ps6-form-add">
                    Add Credential
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: List */}
          <div className="ps6-list-card">
            <div className="ps6-list-title">
              Your Credentials ({credentials.length})
            </div>
            {credentials.length === 0 ? (
              <div className="ps6-list-empty">No credentials added yet</div>
            ) : (
              <ul className="ps6-list">
                {credentials.map((c) => (
                  <li className="ps6-list-item" key={c.id}>
                    <div className="ps6-list-row">
                      <span className="ps6-list-type">{c.type}</span>
                      <button
                        className="ps6-list-remove"
                        onClick={() => handleRemoveCredential(c.id)}
                        title="Remove"
                        aria-label="Remove"
                      >
                        ×
                      </button>
                    </div>
                    <div className="ps6-list-title-main">{c.title}</div>
                    {c.reference && (
                      <div className="ps6-list-ref">
                        Ref: <span>{c.reference}</span>
                      </div>
                    )}
                    {c.fileName && (
                      <div className="ps6-list-file">
                        <span className="ps6-list-file-label">File:</span>{" "}
                        <span>{c.fileName}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* Navigation */}
        <div className="ps6-nav-row">
  <button
    className="ps6-nav-btn ps6-nav-back"
    onClick={() => navigate("/profile-setup/step5")}
  >
    Back
  </button>
  <div className="ps6-nav-right">
    <button
      className="ps6-nav-btn ps6-nav-skip"
      onClick={() => navigate("/profile-setup/step7")}
    >
      Skip
    </button>
    <button
      className="ps6-nav-btn ps6-nav-next"
      onClick={() => navigate("/profile-setup/step7")}
      disabled={credentials.length === 0}
    >
      Next
    </button>
  </div>
</div>

      </div>
    </div>
  );
}
