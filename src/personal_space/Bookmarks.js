import React from "react";
import { useBookmarks } from "../Components/BookmarksContext";
import "./Bookmarks.css";

function Bookmarks() {
  const { bookmarks } = useBookmarks();

  return (
    <div className="bookmarks-container">
      <h1 className="bookmarks-header">Bookmarked Projects</h1>
      <table className="bookmarks-table">
        <thead>
          <tr>
            <th>Project</th>
          </tr>
        </thead>
        <tbody>
          {bookmarks.length === 0 ? (
            <tr>
              <td>No bookmarked projects yet.</td>
            </tr>
          ) : (
            bookmarks.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Bookmarks;
