import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { FaBell, FaFolderOpen, FaComments, FaUserCircle } from "react-icons/fa";
import { useUser } from "../Components/UserContext"; // Adjust path as needed
import "./DashboardLayout.css";

const sidebarItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Tasklists", path: "/dashboard/Tasklists" },
  { label: "My Projects", path: "/dashboard/my-projects" },
  { label: "Inbox", path: "/dashboard/inbox" },
  { label: "Feedback", path: "/dashboard/feedback" },
  { label: "Free Credit", path: "/dashboard/free-credit" },
  { label: "Project Updates", path: "/dashboard/project-updates" },
  { label: "Bookmarks", path: "/dashboard/bookmarks" },
  { label: "Ask Doubt", path: "/dashboard/ask-doubt" },
  { label: "Pricing Tool", path: "/dashboard/PricingTool" }, // Assuming you have a Lists component
];

const DashboardLayout = ({
  notificationCount = 0,
  messageCount = 0,
  balance = "₹0.00 INR",
}) => {
  const { user } = useUser();

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <div className="logo">STARTRIT</div>
        <nav className="header-nav">
          <NavLink to="#">Browse</NavLink>
          <NavLink to="#">Manage</NavLink>
          <NavLink to="#">Groups</NavLink>
        </nav>
        <div className="header-actions">
          <div className="icon-badge">
            <FaBell size={20} />
            {notificationCount > 0 && (
              <span className="badge">{notificationCount}</span>
            )}
          </div>
          <div className="icon-badge">
            <FaFolderOpen size={20} />
            {messageCount > 0 && (
              <span className="badge">{messageCount}</span>
            )}
          </div>
          <div className="icon-badge">
            <FaComments size={20} />
          </div>
          <button className="post-project-btn">Post a Project</button>
          <div className="user-info">
            <FaUserCircle size={28} />
            <span className="username">
              {user?.username || "Account"}
            </span>
            <span className="balance">{balance}</span>
          </div>
        </div>
      </header>
      <div className="dashboard-main">
        <aside className="dashboard-sidebar">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              end={item.path === "/dashboard"}
            >
              {item.label}
            </NavLink>
          ))}
        </aside>
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
