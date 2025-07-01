import React, { createContext, useContext, useState, useEffect } from "react";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
  const updateTask = (id, updates) =>
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates } : task)));
  const deleteTask = (id) => setTasks((prev) => prev.filter((task) => task.id !== id));

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
