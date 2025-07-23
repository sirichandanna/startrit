import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileSetupStep7.css";

export default function ProfileSetupStep7() {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [showForm, setShowForm] = useState(false);
  const [educationList, setEducationList] = useState([]);
  const [form, setForm] = useState({
    school: "",
    degree: "",
    field: "",
    start: "",
    end: "",
    current: false,
    grade: "",
    file: null,
  });
  const [formTouched, setFormTouched] = useState(false);

  // Optional: Limit entries to 5
  const maxEntries = 5;

  function resetForm() {
    setForm({
      school: "",
      degree: "",
      field: "",
      start: "",
      end: "",
      current: false,
      grade: "",
      file: null,
    });
    setFormTouched(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleFormChange(e) {
    const { name, value, type, checked, files } = e.target;
    if (name === "file") {
      setForm((f) => ({ ...f, file: files[0] }));
    } else if (type === "checkbox") {
      setForm((f) => ({
        ...f,
        [name]: checked,
        ...(name === "current" && checked ? { end: "" } : {}),
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  function handleAddEducation(e) {
    e.preventDefault();
    setFormTouched(true);
    if (!form.school.trim() || !form.degree.trim() || !form.start) return;
    if (form.end && form.end < form.start) return;
    setEducationList((prev) =>
      [
        {
          ...form,
          id: Date.now(),
          fileName: form.file ? form.file.name : "",
        },
        ...prev,
      ].slice(0, maxEntries)
    );
    setShowForm(false);
    resetForm();
  }

  function handleRemoveEducation(id) {
    setEducationList((prev) => prev.filter((e) => e.id !== id));
  }

  function formatDate(date) {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short" });
  }

  // Sort by most recent start date
  const sortedList = [...educationList].sort((a, b) =>
    b.start.localeCompare(a.start)
  );

  return (
    <div className="ps7-root">
      {/* Header */}
      <div className="ps7-header">
        <div className="ps7-header-left">Startrit</div>
        <div className="ps7-header-center">Education Details</div>
        <div className="ps7-header-right">
          <span className="ps7-step-label">Profile Setup: </span>
          <span className="ps7-step-blue">Step 7 of 9</span>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="ps7-progress-bar">
        <div className="ps7-progress-bar-fill" />
      </div>

      {/* Main Card */}
      <div className="ps7-main">
        <div className="ps7-title">Add your education background</div>
        <div className="ps7-subtitle">
          Showcase your academic achievements and institutions attended.
        </div>
        <div className="ps7-main-content">
          <div className="ps7-form-card">
            {!showForm && educationList.length < maxEntries && (
              <button
                className="ps7-add-btn"
                onClick={() => {
                  setShowForm(true);
                  resetForm();
                }}
              >
                + Add Education
              </button>
            )}

            {showForm && (
              <form className="ps7-form" onSubmit={handleAddEducation}>
                <div className="ps7-form-row">
                  <label>
                    School / University Name
                    <span className="ps7-form-required">*</span>
                  </label>
                  <input
                    name="school"
                    value={form.school}
                    onChange={handleFormChange}
                    placeholder="e.g., MIT"
                    className={
                      formTouched && !form.school.trim()
                        ? "ps7-form-input ps7-form-error"
                        : "ps7-form-input"
                    }
                  />
                  {formTouched && !form.school.trim() && (
                    <div className="ps7-form-err-msg">Required</div>
                  )}
                </div>
                <div className="ps7-form-row">
                  <label>
                    Degree / Program Name
                    <span className="ps7-form-required">*</span>
                  </label>
                  <input
                    name="degree"
                    value={form.degree}
                    onChange={handleFormChange}
                    placeholder="e.g., B.Sc. Computer Science"
                    className={
                      formTouched && !form.degree.trim()
                        ? "ps7-form-input ps7-form-error"
                        : "ps7-form-input"
                    }
                  />
                  {formTouched && !form.degree.trim() && (
                    <div className="ps7-form-err-msg">Required</div>
                  )}
                </div>
                <div className="ps7-form-row">
                  <label>Field of Study</label>
                  <input
                    name="field"
                    value={form.field}
                    onChange={handleFormChange}
                    placeholder="e.g., Artificial Intelligence"
                    className="ps7-form-input"
                  />
                </div>
                <div className="ps7-form-row ps7-form-row-dates">
                  <div>
                    <label>
                      Start Date
                      <span className="ps7-form-required">*</span>
                    </label>
                    <input
                      name="start"
                      type="date"
                      value={form.start}
                      onChange={handleFormChange}
                      className={
                        formTouched && !form.start
                          ? "ps7-form-input ps7-form-error"
                          : "ps7-form-input"
                      }
                    />
                    {formTouched && !form.start && (
                      <div className="ps7-form-err-msg">Required</div>
                    )}
                  </div>
                  <div>
                    <label>End Date</label>
                    <input
                      name="end"
                      type="date"
                      value={form.end}
                      onChange={handleFormChange}
                      className={
                        form.end && form.start && form.end < form.start
                          ? "ps7-form-input ps7-form-error"
                          : "ps7-form-input"
                      }
                      disabled={form.current}
                    />
                    {form.end && form.start && form.end < form.start && (
                      <div className="ps7-form-err-msg">
                        End date can’t be before start date
                      </div>
                    )}
                    <div className="ps7-form-checkbox-row">
                      <input
                        type="checkbox"
                        name="current"
                        id="ps7-current"
                        checked={form.current}
                        onChange={handleFormChange}
                      />
                      <label htmlFor="ps7-current" className="ps7-form-checkbox-label">
                        Currently studying here
                      </label>
                    </div>
                  </div>
                </div>
                <div className="ps7-form-row">
                  <label>Grade / CGPA</label>
                  <input
                    name="grade"
                    value={form.grade}
                    onChange={handleFormChange}
                    placeholder="e.g., 8.7 / 10"
                    className="ps7-form-input"
                  />
                </div>
                <div className="ps7-form-row">
                  <label>Degree Certificate (optional)</label>
                  <div
                    className={
                      "ps7-upload-box" +
                      (form.file ? " ps7-upload-box-hasfile" : "")
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
                      <span className="ps7-upload-filename">{form.file.name}</span>
                    ) : (
                      <span>
                        Click to upload degree certificate
                        <br />
                        <span className="ps7-upload-sub">
                          PDF, JPG, PNG up to 10MB
                        </span>
                      </span>
                    )}
                  </div>
                </div>
                <div className="ps7-form-btn-row">
                  <button
                    type="button"
                    className="ps7-form-cancel"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="ps7-form-add">
                    Add Education
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Education List */}
          <div className="ps7-list-card">
            <div className="ps7-list-title">
              Your Education ({educationList.length}/{maxEntries})
            </div>
            {educationList.length === 0 ? (
              <div className="ps7-list-empty">No education added yet</div>
            ) : (
              <ul className="ps7-list">
                {sortedList.map((e) => (
                  <li className="ps7-list-item" key={e.id}>
                    <div className="ps7-list-row">
                      <span className="ps7-list-school">{e.school}</span>
                      <button
                        className="ps7-list-remove"
                        onClick={() => handleRemoveEducation(e.id)}
                        title="Remove"
                        aria-label="Remove"
                      >
                        ×
                      </button>
                    </div>
                    <div className="ps7-list-degree">{e.degree}</div>
                    <div className="ps7-list-dates">
                      {formatDate(e.start)} -{" "}
                      {e.current
                        ? "Present"
                        : e.end
                        ? formatDate(e.end)
                        : "—"}
                    </div>
                    {e.field && (
                      <div className="ps7-list-field">
                        Field: <span>{e.field}</span>
                      </div>
                    )}
                    {e.grade && (
                      <div className="ps7-list-grade">
                        Grade / CGPA: <span>{e.grade}</span>
                      </div>
                    )}
                    {e.fileName && (
                      <div className="ps7-list-file">
                        <span className="ps7-list-file-label">File:</span>{" "}
                        <span>{e.fileName}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* Navigation */}
        <div className="ps7-nav-row">
          <button
            className="ps7-nav-btn ps7-nav-back"
            onClick={() => navigate("/profile-setup/step6")}
          >
            Back
          </button>
          <div className="ps7-nav-right">
            <button
              className="ps7-nav-btn ps7-nav-skip"
              onClick={() => navigate("/profile-setup/step8")}
            >
              Skip
            </button>
            <button
              className="ps7-nav-btn ps7-nav-next"
              onClick={() => navigate("/profile-setup/step8")}
              disabled={educationList.length === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
