import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Components/UserContext";
import "./SignUp.css";

function SignUp() {
  const [role, setRole] = useState("client");
  const { setUser } = useUser();
  const navigate = useNavigate();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const allFieldsFilled =
    form.firstName && form.lastName && form.email && form.password && form.confirmPassword;

  const passwordsMatch = form.password === form.confirmPassword;
  const canSubmit = allFieldsFilled && passwordsMatch && form.terms;

  const handleRole = (selectedRole) => setRole(selectedRole);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const endpoint = role === "developer" ? "/signup/developer" : "/signup/client";

    try {
      const response = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Signup failed');
      setUser({
        username: data.user.username,
        email: data.user.email,
      });

      // Redirect based on role
      if (role === "developer") {
        navigate("/profile-setup/step1");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-logo">Startrit</div>
        <div className="signup-role-toggle">
          <button
            type="button"
            className={role === "client" ? "role-btn active" : "role-btn"}
            onClick={() => handleRole("client")}
          >
            Client
          </button>
          <button
            type="button"
            className={role === "developer" ? "role-btn active" : "role-btn"}
            onClick={() => handleRole("developer")}
          >
            Developer
          </button>
        </div>
        <h2 className="signup-title">Create your Startrit account</h2>
        <div className="signup-fields">
          <div className="signup-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              autoComplete="given-name"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              autoComplete="family-name"
            />
          </div>
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
            autoComplete="new-password"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />
          {form.password && form.confirmPassword && !passwordsMatch && (
            <div className="signup-error">Passwords do not match.</div>
          )}
        </div>
        <label className="signup-checkbox">
          <input
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
          />
          <span>
            I agree to the <a href="#">Terms &amp; Conditions</a>
          </span>
        </label>
        <button type="submit" className="signup-btn" disabled={!canSubmit}>
          Sign Up
        </button>
        <div className="signup-login-link">
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
