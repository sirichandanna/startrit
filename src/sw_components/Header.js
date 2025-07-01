import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <span className="logo">Startrit</span>
      </div>
      <nav className="header-center">
        <a href="#">Hire Developers</a>
        <a href="#">Find Work</a>
        <a href="#">FAQs</a>
        <a href="#">About</a>
      </nav>
      <div className="header-right">
        <input
          className="header-search"
          type="text"
          placeholder="Search projects or developers"
        />
        <Link to="/login">
          <button className="header-login">Login</button>
        </Link>
        <Link to="/signup">
          <button className="header-signup">Sign Up</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
