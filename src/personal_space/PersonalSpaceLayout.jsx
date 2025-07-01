import React, { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./PersonalSpaceLayout.css";


const NAV_LINKS = [
  { to: "/browse", label: "Browse" },
  { to: "/manage", label: "Manage" },
  { to: "/communities", label: "Communities" },
  { to: "/posts", label: "Posts" },
  { to: "/blogs", label: "Blogs" },
];

const TABS = [
  { to: "/personal-space/account-space", label: "Account Space" },
  { to: "/personal-space/dashboard", label: "Dashboard" },
  { to: "/personal-space/lists", label: "Lists" },
  { to: "/personal-space/tasklist", label: "Tasklist" },
  { to: "/personal-space/my-projects", label: "My Projects" },
  { to: "/personal-space/messages", label: "Messages" },
  { to: "/personal-space/credits", label: "Credits" },
  { to: "/personal-space/feedbacks", label: "Feedbacks" },
  { to: "/personal-space/project-updates", label: "Project Updates" },
  { to: "/personal-space/bookmarks", label: "Bookmarks" },
  { to: "/personal-space/ask-doubt", label: "Ask Doubt" },
  { to: "/personal-space/pricing-tool", label: "Pricing Tool" },
];

export default function PersonalSpaceLayout() {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const location = useLocation();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target)
      ) {
        setProfileMenuOpen(false);
      }
    }
    if (profileMenuOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [profileMenuOpen]);

  // Find active tab based on location
  const activeTab =
    TABS.find((tab) => location.pathname.startsWith(tab.to))?.to ||
    TABS[0].to;

  return (
    <div className="pspace-root">
      {/* Top Header */}
      <header className="pspace-top-header">
        <div className="pspace-brand">
          <span role="img" aria-label="star" className="pspace-brand-star">
            ⭐
          </span>
          <span className="pspace-brand-text">Startrit</span>
        </div>
        <nav className="pspace-nav-links">
          {NAV_LINKS.map((nav) => (
            <NavLink
              key={nav.to}
              to={nav.to}
              className={({ isActive }) =>
                "pspace-nav-link" + (isActive ? " pspace-nav-link-active" : "")
              }
            >
              {nav.label}
            </NavLink>
          ))}
        </nav>
        <button className="pspace-post-btn">+ Post Project</button>
        <div className="pspace-header-right">
          <button className="pspace-earnings-btn" title="Earnings">
            <span role="img" aria-label="money">
              💰
            </span>
            <span className="pspace-earnings-label">Earnings</span>
          </button>
          <div
            className="pspace-profile-menu"
            ref={profileMenuRef}
            tabIndex={0}
            onBlur={() => setTimeout(() => setProfileMenuOpen(false), 150)}
          >
            <button
              className="pspace-profile-btn"
              onClick={() => setProfileMenuOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={profileMenuOpen}
            >
              <span role="img" aria-label="user" className="pspace-profile-emoji">
                👤
              </span>
              <span className="pspace-profile-label">Profile</span>
              <span className="pspace-profile-arrow">▼</span>
            </button>
            {profileMenuOpen && (
              <div className="pspace-profile-dropdown">
                <div className="pspace-profile-dropdown-item">Account</div>
                <div className="pspace-profile-dropdown-item">Settings</div>
                <div className="pspace-profile-dropdown-item">Logout</div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Secondary Header (Tabs) */}
      <nav className="pspace-tabs-header" aria-label="Personal Space Tabs">
        <div className="pspace-tabs-scroll">
          {TABS.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={
                "pspace-tab" +
                (activeTab === tab.to ? " pspace-tab-active" : "")
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pspace-main-content">
        <Outlet />
      </main>
    </div>
  );
}
