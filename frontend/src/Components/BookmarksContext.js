import React, { createContext, useContext, useState, useEffect } from "react";

const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(() => {
    // Load from localStorage if available
    const stored = localStorage.getItem("bookmarks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (project) => {
    setBookmarks((prev) =>
      prev.find((b) => b.id === project.id) ? prev : [...prev, project]
    );
  };

  const removeBookmark = (projectId) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== projectId));
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarksContext);
