import React, { createContext, useContext, useState, useEffect } from "react";

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    const stored = localStorage.getItem("projects");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addProject = (project) => {
    setProjects((prev) => [...prev, project]);
  };

  const addUpdate = (projectId, updateText) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              updates: [
                ...(project.updates || []),
                { text: updateText, date: new Date().toISOString() },
              ],
            }
          : project
      )
    );
  };
  const updateProjectStatus = (projectId, newStatus) => {
  setProjects((prev) =>
    prev.map((project) =>
      project.id === projectId ? { ...project, status: newStatus } : project
    )
  );
};

  return (
    <ProjectsContext.Provider value={{ projects, addProject, addUpdate,updateProjectStatus}}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);
