import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Added this line
import "./ProfileSetupStep5.css";


export default function ProfileSetupStep5({ onBack, onNext, onSkip }) {
    const navigate = useNavigate(); // ✅ Added this

  const [showForm, setShowForm] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
    start: "",
    end: "",
    current: false,
  });
  const [formTouched, setFormTouched] = useState(false);

  function resetForm() {
    setForm({
      title: "",
      company: "",
      description: "",
      start: "",
      end: "",
      current: false,
    });
    setFormTouched(false);
  }

  function handleFormChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "current" && checked ? { end: "" } : {}),
    }));
  }

  function handleAddExperience() {
    setFormTouched(true);
    if (!form.title.trim() || !form.company.trim() || !form.start) return;
    setExperiences([
      ...experiences,
      {
        ...form,
        id: Date.now(),
      },
    ]);
    setShowForm(false);
    resetForm();
  }

  function handleRemoveExperience(id) {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  }

  function formatDate(date) {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short" });
  }

  return (
    <div className="ps5-root">
      {/* Header */}
      <div className="ps5-header">
        <div className="ps5-header-left">Startrit</div>
        <div className="ps5-header-center">Professional Info</div>
        <div className="ps5-header-right">
          <span className="ps5-header-step-label">Profile Setup:</span>
          <span className="ps5-header-step-blue">Step 5 of 9</span>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="ps5-progress-bar">
        <div className="ps5-progress-bar-fill" />
      </div>

      {/* Main Card */}
      <div className="ps5-card">
        <div className="ps5-title">Add your work experience</div>
        <div className="ps5-subtitle">
          Add your work experience to showcase your professional background and expertise.
        </div>
        {/* Add Experience Button */}
        {!showForm && (
          <div className="ps5-add-btn-row">
            <button
              className="ps5-add-btn"
              onClick={() => {
                setShowForm(true);
                resetForm();
              }}
            >
              + Add Experience
            </button>
          </div>
        )}

        {/* Add Experience Form */}
        {showForm && (
          <div className="ps5-form">
            <div className="ps5-form-title">
              <span className="ps5-form-title-icon" role="img" aria-label="briefcase">
                <svg width="24" height="24" fill="none"><rect x="4" y="7" width="16" height="13" rx="2" stroke="#2563eb" strokeWidth="2"/><path d="M9 7V5a3 3 0 0 1 6 0v2" stroke="#2563eb" strokeWidth="2"/></svg>
              </span>
              Add Experience
            </div>
            <div className="ps5-form-fields">
              <div className="ps5-form-row">
                <div className="ps5-form-col">
                  <label>
                    Job Title<span className="ps5-form-required">*</span>
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleFormChange}
                    placeholder="e.g., Senior AI Engineer"
                    className={
                      formTouched && !form.title.trim()
                        ? "ps5-form-input ps5-form-error"
                        : "ps5-form-input"
                    }
                  />
                  {formTouched && !form.title.trim() && (
                    <div className="ps5-form-err-msg">Required</div>
                  )}
                </div>
                <div className="ps5-form-col">
                  <label>
                    Company Name<span className="ps5-form-required">*</span>
                  </label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleFormChange}
                    placeholder="e.g., TechCorp Inc."
                    className={
                      formTouched && !form.company.trim()
                        ? "ps5-form-input ps5-form-error"
                        : "ps5-form-input"
                    }
                  />
                  {formTouched && !form.company.trim() && (
                    <div className="ps5-form-err-msg">Required</div>
                  )}
                </div>
              </div>
              <div className="ps5-form-row">
                <div className="ps5-form-col ps5-form-col-full">
                  <label>Job Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleFormChange}
                    placeholder="Describe your responsibilities, achievements, and key projects..."
                    className="ps5-form-textarea"
                    rows={3}
                  />
                </div>
              </div>
              <div className="ps5-form-row">
                <div className="ps5-form-col">
                  <label>
                    Start Date<span className="ps5-form-required">*</span>
                  </label>
                  <input
                    name="start"
                    type="date"
                    value={form.start}
                    onChange={handleFormChange}
                    className={
                      formTouched && !form.start
                        ? "ps5-form-input ps5-form-error"
                        : "ps5-form-input"
                    }
                  />
                  {formTouched && !form.start && (
                    <div className="ps5-form-err-msg">Required</div>
                  )}
                </div>
                <div className="ps5-form-col">
                  <label>End Date</label>
                  <input
                    name="end"
                    type="date"
                    value={form.end}
                    onChange={handleFormChange}
                    className="ps5-form-input"
                    disabled={form.current}
                  />
                  <div className="ps5-form-checkbox-row">
                    <input
                      type="checkbox"
                      name="current"
                      id="ps5-current"
                      checked={form.current}
                      onChange={handleFormChange}
                    />
                    <label htmlFor="ps5-current" className="ps5-form-checkbox-label">
                      Currently working here
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="ps5-form-btn-row">
              <button
                className="ps5-form-cancel-btn"
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
              >
                Cancel
              </button>
              <button
                className="ps5-form-add-btn"
                type="button"
                onClick={handleAddExperience}
              >
                Add Experience
              </button>
            </div>
          </div>
        )}

        {/* Experience List */}
        <div className="ps5-exp-list">
          {experiences.length === 0 && !showForm && (
            <div className="ps5-empty-exp">
              <span className="ps5-empty-exp-icon" role="img" aria-label="briefcase">
                <svg width="48" height="48" fill="none"><rect x="8" y="14" width="32" height="26" rx="4" stroke="#d1d5db" strokeWidth="2"/><path d="M18 14V10a6 6 0 0 1 12 0v4" stroke="#d1d5db" strokeWidth="2"/></svg>
              </span>
              <div className="ps5-empty-exp-title">No work experience added yet.</div>
              <div className="ps5-empty-exp-desc">
                Add your professional experience to strengthen your profile.
              </div>
            </div>
          )}
          {experiences.map((exp) => (
            <div className="ps5-exp-item" key={exp.id}>
              <div className="ps5-exp-header">
                <div className="ps5-exp-title">
                  <span className="ps5-exp-job">{exp.title}</span>
                  <span className="ps5-exp-at"> at </span>
                  <span className="ps5-exp-company">{exp.company}</span>
                </div>
                <button
                  className="ps5-exp-remove"
                  onClick={() => handleRemoveExperience(exp.id)}
                  title="Remove"
                  aria-label="Remove"
                >
                  ×
                </button>
              </div>
              <div className="ps5-exp-dates">
                {formatDate(exp.start)} -{" "}
                {exp.current ? "Present" : exp.end ? formatDate(exp.end) : "—"}
              </div>
              {exp.description && (
                <div className="ps5-exp-desc">{exp.description}</div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="ps5-nav-row">
          <button
             className="ps5-nav-btn ps5-nav-back"
                 onClick={() => navigate("/profile-setup/step4")} // ✅ Added navigation
                  > Back
          </button>
          <div className="ps5-nav-right">
          <button
  className="ps5-nav-btn ps5-nav-skip"
  onClick={() => navigate("/profile-setup/step6")} // ✅ Added navigation
>

              Skip
            </button>
            <button
  className="ps5-nav-btn ps5-nav-next"
  onClick={() => navigate("/profile-setup/step6")} // ✅ Added navigation
  disabled={experiences.length === 0}
>

              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
