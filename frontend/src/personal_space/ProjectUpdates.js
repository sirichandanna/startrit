import React from "react";
import { useProjects } from "../Components/ProjectsContext";
import "./ProjectUpdates.css";

function ProjectUpdates() {
  const { projects } = useProjects();

  // Gather all updates with project names
  const updates = projects
    .flatMap((project) =>
      (project.updates || []).map((update) => ({
        projectName: project.name,
        ...update,
      }))
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // newest first

  return (
    <div className="projectupdates-container">
      <h1 className="projectupdates-header">Project Updates</h1>
      {updates.length === 0 ? (
        <div className="projectupdates-empty">No updates yet.</div>
      ) : (
        <ul className="projectupdates-list">
          {updates.map((update, idx) => (
            <li key={idx} className="projectupdates-item">
              <div className="projectupdates-project">{update.projectName}</div>
              <div className="projectupdates-text">{update.text}</div>
              <div className="projectupdates-date">
                {new Date(update.date).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProjectUpdates;

