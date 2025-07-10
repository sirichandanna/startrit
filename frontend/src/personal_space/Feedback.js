import React, { useState } from "react";
import { useProjects } from "../Components/ProjectsContext";
import "./Feedback.css";

function Feedback() {
  const { projects, addFeedback } = useProjects();
  const [inputs, setInputs] = useState({});

  // Only show projects without feedback
  const awaitingFeedback = projects.filter((p) => !p.feedback);

  const handleChange = (id, value) => {
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (id, e) => {
    e.preventDefault();
    if (inputs[id]) {
      addFeedback(id, inputs[id]);
      setInputs((prev) => ({ ...prev, [id]: "" }));
    }
  };

  return (
    <div className="feedback-container">
      <h1 className="feedback-main-header">Projects Awaiting Feedback</h1>
      {awaitingFeedback.length === 0 ? (
        <div className="feedback-box">
          <textarea
            className="feedback-textarea"
            placeholder="You have no projects awaiting feedback."
            disabled
          />
        </div>
      ) : (
        awaitingFeedback.map((project) => (
          <div className="feedback-box" key={project.id}>
            <div className="feedback-project-title">{project.name}</div>
            <form onSubmit={(e) => handleSubmit(project.id, e)}>
              <textarea
                className="feedback-textarea"
                placeholder="Write feedback here..."
                value={inputs[project.id] || ""}
                onChange={(e) => handleChange(project.id, e.target.value)}
                required
              />
              <button className="feedback-submit-btn" type="submit">
                Submit Feedback
              </button>
            </form>
          </div>
        ))
      )}
    </div>
  );
}

export default Feedback;
