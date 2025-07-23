// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext"; // or wherever your user context is

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === "developer" && !user.profile_completed) {
    return <Navigate to="/profile-setup/step1" replace />;
  }

  return children;
};

export default ProtectedRoute;
