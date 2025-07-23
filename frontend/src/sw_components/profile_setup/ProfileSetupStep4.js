// ProfileSetupStep4.js
import React, { useState } from "react";
import "./ProfileSetupStep4.css";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  {
    name: "Artificial Intelligence",
    subcategories: [
      {
        name: "Computer Vision",
        skills: ["Image Classification", "Object Detection", "OCR", "Segmentation"],
      },
      {
        name: "Natural Language Processing",
        skills: ["Text Classification", "Sentiment Analysis", "NER", "Translation"],
      },
      {
        name: "Deep Learning",
        skills: ["CNNs", "RNNs", "GANs"],
      },
      {
        name: "Reinforcement Learning",
        skills: ["Q-Learning", "Policy Gradients"],
      },
    ],
  },
  {
    name: "Cybersecurity",
    subcategories: [
      {
        name: "Network Security",
        skills: ["Firewall Management", "IDS/IPS", "VPN"],
      },
      {
        name: "Application Security",
        skills: ["Code Review", "Penetration Testing"],
      },
    ],
  },
  {
    name: "Blockchain",
    subcategories: [
      {
        name: "Smart Contracts",
        skills: ["Solidity", "Auditing", "Testing"],
      },
      {
        name: "Cryptography",
        skills: ["Hash Functions", "Digital Signatures"],
      },
    ],
  },
  {
    name: "Robotics",
    subcategories: [
      {
        name: "Path Planning",
        skills: ["A* Search", "SLAM"],
      },
      {
        name: "Control Systems",
        skills: ["PID", "State Estimation"],
      },
    ],
  },
];

const PROFICIENCY_LEVELS = [1, 2, 3, 4, 5];

export default function ProfileSetupStep4() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [proficiency, setProficiency] = useState(1);
  const [customSkill, setCustomSkill] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  const selectedCategory = CATEGORIES.find((c) => c.name === category);
  const subcategories = selectedCategory ? selectedCategory.subcategories : [];
  const selectedSubcategory = subcategories.find((sc) => sc.name === subcategory);
  const availableSkills = selectedSubcategory ? selectedSubcategory.skills : [];

  function handleAddSkill(skillName) {
    if (
      skillName &&
      !selectedSkills.some(
        (s) =>
          s.name.toLowerCase() === skillName.toLowerCase() &&
          s.category === category &&
          s.subcategory === subcategory
      )
    ) {
      setSelectedSkills([
        ...selectedSkills,
        { name: skillName, category, subcategory, proficiency },
      ]);
      setCustomSkill("");
    }
  }

  function handleRemoveSkill(idx) {
    setSelectedSkills(selectedSkills.filter((_, i) => i !== idx));
  }

  const canProceed = selectedSkills.length > 0;

  return (
    <div className="ps4v-root">
      <div className="ps4v-header">
        <div className="ps4v-brand">Startrit</div>
        <div className="ps4v-title">Skill Sets</div>
        <div className="ps4v-step">Profile Setup: Step 4 of 9</div>
      </div>
      <div className="ps4v-progress">
        <div className="ps4v-progress-bar">
          <div className="ps4v-progress-fill" />
        </div>
      </div>

      <div className="ps4v-form">
        <label className="ps4v-label">Category</label>
        <select value={category} onChange={(e) => {
          setCategory(e.target.value);
          setSubcategory("");
        }} className="ps4v-select">
          <option value="">Select Category</option>
          {CATEGORIES.map((c) => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>

        <label className="ps4v-label">Subcategory</label>
        <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="ps4v-select" disabled={!category}>
          <option value="">Select Subcategory</option>
          {subcategories.map((sc) => (
            <option key={sc.name} value={sc.name}>{sc.name}</option>
          ))}
        </select>

        <label className="ps4v-label">Proficiency Level</label>
        <div className="ps4v-proficiency-row">
          {PROFICIENCY_LEVELS.map((lvl) => (
            <button
              key={lvl}
              className={`ps4v-proficiency-btn ${proficiency === lvl ? "active" : ""}`}
              onClick={() => setProficiency(lvl)}
              type="button"
            >
              {lvl}
            </button>
          ))}
        </div>

        <label className="ps4v-label">Available Skills</label>
        <div className="ps4v-skills">
          {availableSkills.map((skill) => (
            <button
              key={skill}
              className="ps4v-skill-btn"
              onClick={() => handleAddSkill(skill)}
              type="button"
            >
              {skill}
            </button>
          ))}
        </div>

        <div className="ps4v-custom-skill">
          <input
            className="ps4v-input"
            placeholder="Add custom skill..."
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddSkill(customSkill);
            }}
            disabled={!subcategory}
          />
          <button
            onClick={() => handleAddSkill(customSkill)}
            className="ps4v-add-btn"
            type="button"
            disabled={!customSkill || !subcategory}
          >
            Add
          </button>
        </div>

        <label className="ps4v-label">Selected Skills</label>
        <div className="ps4v-selected">
          {selectedSkills.map((skill, idx) => (
            <div key={idx} className="ps4v-chip">
              <span>{skill.name}</span>
              <span className="ps4v-chip-meta">
                ({skill.category} - {skill.subcategory} - Level {skill.proficiency})
              </span>
              <button onClick={() => handleRemoveSkill(idx)} className="ps4v-remove">×</button>
            </div>
          ))}
          {selectedSkills.length === 0 && <p className="ps4v-empty">No skills selected yet.</p>}
        </div>

        <div className="ps4v-nav">
          <button onClick={() => navigate("/profile-setup/step3")} className="ps4v-btn-back">Back</button>
          <button onClick={() => navigate("/profile-setup/step5")} className="ps4v-btn-next" disabled={!canProceed}>Next</button>
        </div>
      </div>
    </div>
  );
}
