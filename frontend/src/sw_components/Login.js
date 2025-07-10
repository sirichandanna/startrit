// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Components/UserContext";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const { setUser } = useUser();
  const navigate = useNavigate();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const canLogin = form.email && form.password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canLogin) return;

    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Login failed');

      // Save user info in context
      setUser({
        username: data.user.username,
        email: data.user.email,
        role: data.user.role,
        profile_completed: data.user.profile_completed,
        step_completed: data.user.step_completed, // for developer, might be null for client
      });

      // Redirect logic
      if (data.user.role === "developer" && !data.user.profile_completed) {
        // If developer and not completed profile, go to current step
        const step = data.user.step_completed || 1;
        navigate(`/profile-setup/step${step}`);
      } else {
        // Client or developer with completed profile
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-logo">Startrit</div>
        <h2 className="login-title">Welcome back!</h2>
        <div className="login-fields">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
        </div>
        <div className="login-options">
          <label className="login-checkbox">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
            />
            Remember Me
          </label>
          <a href="#" className="login-forgot">Forgot Password?</a>
        </div>
        <button type="submit" className="login-btn" disabled={!canLogin}>
          Login
        </button>
        <div className="login-signup-link">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
