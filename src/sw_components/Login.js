import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Components/UserContext"; // Adjust path as needed
import "./Login.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const canLogin = form.email && form.password;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canLogin) {
      // Simulate user data from backend
      setUser({
        username: form.email.split("@")[0], // Example: take username from email
        email: form.email,
      });
      navigate("/dashboard");
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
          <a href="#" className="login-forgot">
            Forgot Password?
          </a>
        </div>
        <button
          type="submit"
          className="login-btn"
          disabled={!canLogin}
        >
          Login
        </button>
        <div className="login-signup-link">
          Don&apos;t have an account? <a href="/signup">Sign Up</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
