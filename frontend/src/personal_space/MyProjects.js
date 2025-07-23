import React, { useState } from "react";
import { useProjects } from "../Components/ProjectsContext";
import { useBookmarks } from "../Components/BookmarksContext";
import "./MyProjects.css";

const tabs = [
  { label: "Open Projects", value: "open" },
  { label: "Work in Progress", value: "wip" },
  { label: "Past Projects", value: "past" },
];

function MyProjects() {
  const [activeTab, setActiveTab] = useState("open");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { projects, addProject, updateProjectStatus } = useProjects();
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  // Filter projects by tab and search
  const filteredProjects = projects.filter(
    (project) =>
      project.status === activeTab &&
      project.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handle new project submission
  const handlePostProject = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.projectName.value.trim();
    if (name) {
      addProject({
        id: Date.now(),
        name,
        status: "open",
      });
      setShowModal(false);
      form.reset();
    }
  };

  return (
    <div className="myprojects-container">
      {/* Main Header */}
      <h1 className="myprojects-main-header">Projects</h1>

      {/* Small Header Tabs */}
      <div className="myprojects-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`myprojects-tab${activeTab === tab.value ? " active" : ""}`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="myprojects-searchbar">
        <input
          type="text"
          placeholder="Search projects"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Projects List */}
      <div className="myprojects-list">
        {filteredProjects.length === 0 ? (
          <div className="myprojects-empty">No projects found.</div>
        ) : (
          filteredProjects.map((project) => {
            const isBookmarked = bookmarks.some((b) => b.id === project.id);
            return (
              <div className="myprojects-project-card" key={project.id}>
                <span className="myprojects-project-name">{project.name}</span>
                <div>
                  <button
                    className={`myprojects-bookmark-btn${isBookmarked ? " bookmarked" : ""}`}
                    onClick={() =>
                      isBookmarked
                        ? removeBookmark(project.id)
                        : addBookmark(project)
                    }
                  >
                    {isBookmarked ? "Bookmarked" : "Bookmark"}
                  </button>
                  {/* Status update buttons for demo/testing */}
                  {project.status === "open" && (
                    <button
                      className="myprojects-status-btn"
                      onClick={() => updateProjectStatus(project.id, "wip")}
                    >
                      Start Work
                    </button>
                  )}
                  {project.status === "wip" && (
                    <button
                      className="myprojects-status-btn"
                      onClick={() => updateProjectStatus(project.id, "past")}
                    >
                      Mark as Complete
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create a New Project Section */}
      <div className="myprojects-new-section">
        <h2>Create a New Project</h2>
        <button className="myprojects-post-btn" onClick={() => setShowModal(true)}>
          Post a Project
        </button>
      </div>

      {/* Modal for Adding Project */}
      {showModal && (
        <div className="myprojects-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="myprojects-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Post a New Project</h3>
            <form onSubmit={handlePostProject}>
              <input
                name="projectName"
                type="text"
                placeholder="Project name"
                required
                autoFocus
              />
              <div style={{ marginTop: "16px" }}>
                <button type="submit" className="myprojects-post-btn">
                  Add Project
                </button>
                <button
                  type="button"
                  style={{ marginLeft: "12px" }}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProjects;
