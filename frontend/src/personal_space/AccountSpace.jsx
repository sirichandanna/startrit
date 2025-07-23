import React, { useState } from "react";
import "./AccountSpace.css";

// Dummy user data
const USER = {
  avatar: "https://i.pravatar.cc/160?img=68",
  username: "deeptech_dev",
  bio: "Building the future with code. AI, robotics, and deeptech enthusiast.",
  posts: 12,
  blogs: 7,
  followers: 245,
  following: 180,
};

const DUMMY_COMMUNITIES = [
  { id: 1, name: "AI Innovators", url: "https://startrit.com/ai-innovators" },
  { id: 2, name: "Robotics Hub", url: "https://startrit.com/robotics-hub" },
];

const DUMMY_POSTS = [
  {
    id: 1,
    title: "How I Built a Custom LLM Chatbot",
    snippet: "A step-by-step guide to building a chatbot using open-source LLMs and React.",
    date: "2025-06-30",
    likes: 34,
    comments: 5,
  },
  {
    id: 2,
    title: "Deploying ML Models at Scale",
    snippet: "Best practices for deploying machine learning models using Docker and Kubernetes.",
    date: "2025-06-21",
    likes: 28,
    comments: 2,
  },
];

const DUMMY_BLOGS = [
  {
    id: 1,
    title: "The Rise of Deeptech Startups",
    snippet: "Why deeptech is the next big wave in innovation and what it means for founders.",
    date: "2025-06-15",
    likes: 19,
    comments: 4,
  },
  {
    id: 2,
    title: "Understanding Reinforcement Learning",
    snippet: "A beginner-friendly overview of RL concepts and real-world applications.",
    date: "2025-05-28",
    likes: 22,
    comments: 3,
  },
];

const DUMMY_SAVED = [
  {
    id: 1,
    title: "Open Source Robotics Projects",
    snippet: "A curated list of top open source projects in robotics.",
    date: "2025-05-10",
  },
];

const TABS = [
  { key: "posts", label: "📄 My Posts" },
  { key: "blogs", label: "📝 My Blogs" },
  { key: "saved", label: "🔒 Saved Items", private: true },
];

export default function AccountSpace() {
  const [activeTab, setActiveTab] = useState("posts");
  const [bio, setBio] = useState(USER.bio);
  const [communities, setCommunities] = useState(DUMMY_COMMUNITIES);
  const [newCommunity, setNewCommunity] = useState("");
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  // Dummy content for followers/following search
  const dummyPeople = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `User${i + 1}`,
    avatar: `https://i.pravatar.cc/40?img=${i + 10}`,
  }));

  function handleAddCommunity(e) {
    e.preventDefault();
    if (!newCommunity.trim()) return;
    setCommunities([
      ...communities,
      {
        id: Date.now(),
        name: newCommunity,
        url: "#",
      },
    ]);
    setNewCommunity("");
  }

  function renderTabContent() {
    if (activeTab === "posts") {
      return (
        <div className="aspace-cards-list">
          {DUMMY_POSTS.map((post) => (
            <div className="aspace-card" key={post.id}>
              <div className="aspace-card-title">{post.title}</div>
              <div className="aspace-card-snippet">{post.snippet}</div>
              <div className="aspace-card-meta">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span>👍 {post.likes}</span>
                <span>💬 {post.comments}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (activeTab === "blogs") {
      return (
        <div className="aspace-cards-list">
          {DUMMY_BLOGS.map((blog) => (
            <div className="aspace-card" key={blog.id}>
              <div className="aspace-card-title">{blog.title}</div>
              <div className="aspace-card-snippet">{blog.snippet}</div>
              <div className="aspace-card-meta">
                <span>{new Date(blog.date).toLocaleDateString()}</span>
                <span>👍 {blog.likes}</span>
                <span>💬 {blog.comments}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (activeTab === "saved") {
      return (
        <div className="aspace-cards-list">
          {DUMMY_SAVED.map((item) => (
            <div className="aspace-card" key={item.id}>
              <div className="aspace-card-title">{item.title}</div>
              <div className="aspace-card-snippet">{item.snippet}</div>
              <div className="aspace-card-meta">
                <span>{new Date(item.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  }

  return (
    <div className="aspace-root">
      {/* Top Section */}
      <section className="aspace-profile-section">
        <div className="aspace-profile-pic-wrap">
          <img
            src={USER.avatar}
            alt="User Profile"
            className="aspace-profile-pic"
          />
        </div>
        <div className="aspace-profile-details">
          <div className="aspace-username">{USER.username}</div>
          <div className="aspace-stats-row">
            <div className="aspace-stat">
              <span>{USER.posts}</span>
              <span>Posts</span>
            </div>
            <div className="aspace-stat">
              <span>{USER.blogs}</span>
              <span>Blogs</span>
            </div>
            <button
              className="aspace-stat aspace-stat-link"
              onClick={() => setShowFollowers(true)}
            >
              <span>{USER.followers}</span>
              <span>Followers</span>
            </button>
            <button
              className="aspace-stat aspace-stat-link"
              onClick={() => setShowFollowing(true)}
            >
              <span>{USER.following}</span>
              <span>Following</span>
            </button>
          </div>
          <textarea
            className="aspace-bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={2}
            maxLength={180}
          />
          <div className="aspace-profile-btn-row">
            <button className="aspace-profile-btn">View Full Profile</button>
            <button className="aspace-profile-btn aspace-profile-btn-alt">
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Followers/Following Modal */}
      {(showFollowers || showFollowing) && (
        <div className="aspace-modal-bg" onClick={() => {setShowFollowers(false); setShowFollowing(false);}}>
          <div className="aspace-modal" onClick={e => e.stopPropagation()}>
            <div className="aspace-modal-title">
              {showFollowers ? "Followers" : "Following"}
            </div>
            <input
              className="aspace-modal-search"
              placeholder={`Search ${showFollowers ? "followers" : "following"}...`}
            />
            <div className="aspace-modal-list">
              {dummyPeople.map((p) => (
                <div className="aspace-modal-person" key={p.id}>
                  <img src={p.avatar} alt="" />
                  <span>{p.name}</span>
                </div>
              ))}
            </div>
            <button className="aspace-modal-close" onClick={() => {setShowFollowers(false); setShowFollowing(false);}}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Community Links */}
      <section className="aspace-community-section">
        <form className="aspace-community-form" onSubmit={handleAddCommunity}>
          <input
            className="aspace-community-input"
            type="text"
            placeholder="Add a new community link..."
            value={newCommunity}
            onChange={(e) => setNewCommunity(e.target.value)}
            maxLength={80}
          />
          <button className="aspace-community-add-btn" type="submit" title="Add">
            <span role="img" aria-label="attach">
              📎
            </span>
          </button>
        </form>
        <div className="aspace-community-links">
          {communities.map((c) => (
            <a
              key={c.id}
              href={c.url}
              className="aspace-community-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {c.name}
            </a>
          ))}
        </div>
      </section>

      {/* Tabbed Content */}
      <section className="aspace-tabs-section">
        <div className="aspace-tabs-row">
          {TABS.map((tab) =>
            tab.private && false ? null : ( // Only visible to user; always visible here
              <button
                key={tab.key}
                className={
                  "aspace-tab-btn" +
                  (activeTab === tab.key ? " aspace-tab-btn-active" : "")
                }
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            )
          )}
        </div>
        <div className="aspace-tab-content">{renderTabContent()}</div>
      </section>
    </div>
  );
}
