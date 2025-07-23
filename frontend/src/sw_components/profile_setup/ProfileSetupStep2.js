import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileSetupStep2.css";

const LANGUAGES = [
  "English",
  "Hindi",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Arabic",
  "Russian",
  "Portuguese",
];

const PROFICIENCY_LEVELS = [
  "Beginner",
  "Intermediate",
  "Fluent",
  "Native",
];

export default function ProfileSetupStep2() {
  const navigate = useNavigate();

  const [languageInput, setLanguageInput] = useState("");
  const [filteredLanguages, setFilteredLanguages] = useState(LANGUAGES);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [dob, setDob] = useState("");
  const [ageValid, setAgeValid] = useState(true);
  const [gender, setGender] = useState("");
  const [otherGender, setOtherGender] = useState("");

  // Filter languages based on user input for search-as-you-type
  useEffect(() => {
    if (!languageInput) {
      setFilteredLanguages(LANGUAGES);
    } else {
      const filtered = LANGUAGES.filter(
        (lang) =>
          lang.toLowerCase().includes(languageInput.toLowerCase()) &&
          !selectedLanguages.some((l) => l.name === lang)
      );
      setFilteredLanguages(filtered);
    }
  }, [languageInput, selectedLanguages]);

  // Validate age >= 16
  useEffect(() => {
    if (!dob) {
      setAgeValid(true);
      return;
    }
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }
    setAgeValid(age >= 16);
  }, [dob]);

  // Add selected language with default proficiency Beginner
  const addLanguage = () => {
    if (
      languageInput &&
      LANGUAGES.includes(languageInput) &&
      !selectedLanguages.some((l) => l.name === languageInput)
    ) {
      setSelectedLanguages([
        ...selectedLanguages,
        { name: languageInput, level: "Beginner" },
      ]);
      setLanguageInput("");
    }
  };

  // Remove language from selected list
  const removeLanguage = (name) => {
    setSelectedLanguages(selectedLanguages.filter((l) => l.name !== name));
  };

  // Change proficiency level for a language
  const changeLevel = (name, newLevel) => {
    setSelectedLanguages(
      selectedLanguages.map((l) =>
        l.name === name ? { ...l, level: newLevel } : l
      )
    );
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!ageValid) {
      alert("You must be at least 16 years old.");
      return;
    }
    // You can store data to context/state here before navigating
    navigate("/profile-setup/step3");
  };

  const handleBack = () => {
    navigate("/profile-setup/step1");
  };

  return (
    <div className="profile-setup-step2-root">
      {/* Header */}
      <header className="profile-setup-header">
        <div className="header-left">Startrit</div>
        <div className="header-center">Additional Info</div>
        <div className="header-right">
          <div className="step-label">Profile Setup: Step 2 of 9</div>
        </div>
      </header>

      {/* Progress bar below header */}
      <div className="progress-bar-below-header">
        <div className="progress-bar-fill" style={{ width: "22%" }} />
      </div>

      <form className="profile-setup-content" onSubmit={handleNext}>
        {/* Languages Section */}
        <div className="input-group languages-section">
          <label className="big-label">What languages do you speak?</label>

          <div className="language-selector-row">
            <input
              type="text"
              list="language-list"
              placeholder="Select language"
              value={languageInput}
              onChange={(e) => setLanguageInput(e.target.value)}
              className="language-input"
            />
            <datalist id="language-list">
              {filteredLanguages.map((lang) => (
                <option key={lang} value={lang} />
              ))}
            </datalist>
            <button
              type="button"
              onClick={addLanguage}
              disabled={
                !languageInput ||
                !LANGUAGES.includes(languageInput) ||
                selectedLanguages.some((l) => l.name === languageInput)
              }
              className="add-language-btn"
            >
              Add
            </button>
          </div>

          {/* Selected languages list */}
          <div className="selected-languages-list">
            {selectedLanguages.length === 0 && (
              <p className="empty-languages">No languages selected yet.</p>
            )}
            {selectedLanguages.map(({ name, level }) => (
              <div key={name} className="language-item">
                <span className="language-name">{name}</span>
                <select
                  className="proficiency-select"
                  value={level}
                  onChange={(e) => changeLevel(name, e.target.value)}
                >
                  {PROFICIENCY_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="remove-language-btn"
                  aria-label={`Remove ${name}`}
                  onClick={() => removeLanguage(name)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Date of Birth */}
        <div className="input-group dob-group">
          <label htmlFor="dob">Date of Birth (as per government documents)</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            max={new Date().toISOString().split("T")[0]}
          />
          {!ageValid && (
            <p className="error-msg">You must be at least 16 years old.</p>
          )}
        </div>

        {/* Gender section - two columns */}
        <div className="input-group gender-group">
          <label>Gender</label>
          <div className="gender-options">
            <div className="gender-column">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Transgender"
                  checked={gender === "Transgender"}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                Transgender
              </label>
            </div>

            <div className="gender-column">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Others"
                  checked={gender === "Others"}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                Others
              </label>
              {gender === "Others" && (
                <input
                  type="text"
                  placeholder="Please specify"
                  value={otherGender}
                  onChange={(e) => setOtherGender(e.target.value)}
                  required
                  className="other-gender-input"
                />
              )}
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="navigation-buttons">
          <button type="button" className="back-btn" onClick={handleBack}>
            Back
          </button>
          <button type="submit" className="next-btn">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
