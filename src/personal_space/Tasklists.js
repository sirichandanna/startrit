import React, { useState, useEffect } from "react";
import { useTasks } from "../Components/TasksContext";
import { useUser } from "../Components/UserContext";
import "./Tasklists.css";

function Tasklists() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const { user, setUser } = useUser();

  // Set a default user for development
  useEffect(() => {
    if (!user) {
      setUser({ username: "gurramsirichand5" });
    }
  }, [user, setUser]);

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showEditTasklistModal, setShowEditTasklistModal] = useState(false);
  const [tasklistDesc, setTasklistDesc] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [taskBeingEdited, setTaskBeingEdited] = useState(null);

  const [taskForm, setTaskForm] = useState({
    name: "",
    assignee: user?.username || "",
    dueDate: "",
    description: "",
  });

  const openAddTaskModal = () => {
    setEditMode(false);
    setTaskForm({
      name: "",
      assignee: user.username,
      dueDate: "",
      description: "",
    });
    setShowAddTaskModal(true);
  };

  const openEditTaskModal = (task) => {
    setEditMode(true);
    setTaskBeingEdited(task);
    setTaskForm({
      name: task.name,
      assignee: task.assignee,
      dueDate: task.dueDate,
      description: task.description,
    });
    setShowAddTaskModal(true);
  };

  const handleSaveTask = () => {
    if (!taskForm.name.trim()) return alert("Task name is required");

    const assignedTo = !taskForm.assignee || taskForm.assignee === "me"
      ? user.username
      : taskForm.assignee;

    const taskData = { ...taskForm, assignee: assignedTo };

    if (editMode && taskBeingEdited) {
      updateTask(taskBeingEdited.id, taskData);
    } else {
      addTask(taskData);
    }

    setShowAddTaskModal(false);
    setTaskForm({
      name: "",
      assignee: user.username,
      dueDate: "",
      description: "",
    });
    setTaskBeingEdited(null);
  };

  if (!user) return <div>Loading...</div>;

  const userTasks = tasks.filter((task) => task.assignee === user.username);

  return (
    <div className="tasklists-container">
      <div className="sidebar">
        <h3>Tasklists</h3>
        <div className="tasklist-name">@{user.username}'s tasklist</div>
      </div>

      <div className="main">
        <div className="tasklist-header">
          <h2>@{user.username}'s tasklist</h2>
          <div className="tasklist-actions">
            <button onClick={() => setShowEditTasklistModal(true)}>✏️</button>
            <button onClick={openAddTaskModal}>➕</button>
            <button onClick={() => alert("Delete functionality pending")}>🗑️</button>
          </div>
        </div>

        {userTasks.length === 0 ? (
          <p className="no-tasks">No tasks yet. Create your first task.</p>
        ) : (
          userTasks.map((task) => (
            <div className="task-card" key={task.id}>
              <h4>{task.name}</h4>
              <p>{task.description}</p>
              <p><strong>Due:</strong> {task.dueDate || "Not set"}</p>
              <div className="task-actions">
                <button onClick={() => openEditTaskModal(task)}>📝 Edit</button>
                <button onClick={() => deleteTask(task.id)}>🗑 Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Task Modal */}
      {showAddTaskModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editMode ? "Edit Task" : "Add Task"}</h3>
            <label>Task name <span className="required">(required)</span></label>
            <input
              type="text"
              placeholder="Enter a task name"
              value={taskForm.name}
              onChange={(e) => setTaskForm({ ...taskForm, name: e.target.value })}
            />
            <label>Assign to</label>
            <input
              type="text"
              placeholder="Search for assignee"
              value={taskForm.assignee}
              onChange={(e) => setTaskForm({ ...taskForm, assignee: e.target.value })}
            />
            <label>Due date</label>
            <input
              type="date"
              value={taskForm.dueDate}
              onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
            />
            <label>Description</label>
            <textarea
              placeholder="Describe what the task is about"
              value={taskForm.description}
              onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
            />
            <div className="modal-actions">
              <button onClick={() => setShowAddTaskModal(false)}>Cancel</button>
              <button onClick={handleSaveTask}>
                {editMode ? "Save Changes" : "Add Task"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Tasklist Modal */}
      {showEditTasklistModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Tasklist</h3>
            <label>Name <span className="required">(required)</span></label>
            <input type="text" value={`@${user.username}'s tasklist`} disabled />
            <label>Description</label>
            <textarea
              placeholder="Describe your tasklist here..."
              value={tasklistDesc}
              onChange={(e) => setTasklistDesc(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={() => setShowEditTasklistModal(false)}>Cancel</button>
              <button onClick={() => setShowEditTasklistModal(false)}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasklists;
