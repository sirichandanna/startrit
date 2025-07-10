// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Context Providers
import { UserProvider } from "./Components/UserContext";
import { BookmarksProvider } from "./Components/BookmarksContext";
import { ProjectsProvider } from "./Components/ProjectsContext";
import { TasksProvider } from './Components/TasksContext';
import ProtectedRoute from './Components/ProtectedRoute';

// Home components
import Header from "./sw_components/Header";
import HeroSection from "./sw_components/HeroSection";
import Features from "./sw_components/Features";
import Footer from "./sw_components/Footer";

// Auth components
import SignUp from "./sw_components/SignUp";
import Login from "./sw_components/Login";

// Profile setup components
import ProfileSetupStep1 from "./sw_components/profile_setup/ProfileSetupStep1";
import ProfileSetupStep2 from "./sw_components/profile_setup/ProfileSetupStep2";
import ProfileSetupStep3 from "./sw_components/profile_setup/ProfileSetupStep3";
import ProfileSetupStep4 from "./sw_components/profile_setup/ProfileSetupStep4";
import ProfileSetupStep5 from "./sw_components/profile_setup/ProfileSetupStep5";
import ProfileSetupStep6 from "./sw_components/profile_setup/ProfileSetupStep6";
import ProfileSetupStep7 from "./sw_components/profile_setup/ProfileSetupStep7";
import ProfileSetupStep8 from "./sw_components/profile_setup/ProfileSetupStep8";
import ProfileSetupStep9 from "./sw_components/profile_setup/ProfileSetupStep9";

// Personal space layout and AccountSpace component
import PersonalSpaceLayout from "./personal_space/PersonalSpaceLayout";
import AccountSpace from "./personal_space/AccountSpace";

// Dashboard layout and pages
import DashboardLayout from "./personal_space/DashboardLayout";
import DashboardHome from "./personal_space/DashboardHome";
import MyProjects from "./personal_space/MyProjects";
import Inbox from "./personal_space/Inbox";
import Feedback from "./personal_space/Feedback";
import FreeCredit from "./personal_space/FreeCredit";
import ProjectUpdates from "./personal_space/ProjectUpdates";
import Bookmarks from "./personal_space/Bookmarks";
import AskDoubt from "./personal_space/AskDoubt";
import Tasklists from "./personal_space/Tasklists";
import PricingTool from "./personal_space/PricingTool";

function App() {
  return (
    <UserProvider>
      <ProjectsProvider>
        <BookmarksProvider>
          <TasksProvider>
            <div className="app-container">
              <Routes>
                {/* Homepage */}
                <Route
                  path="/"
                  element={
                    <>
                      <Header />
                      <HeroSection />
                      <Features />
                      <Footer />
                    </>
                  }
                />

                {/* Auth routes */}
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />

                {/* Profile Setup Steps (public, so devs can finish setup) */}
                <Route path="/profile-setup/step1" element={<ProfileSetupStep1 />} />
                <Route path="/profile-setup/step2" element={<ProfileSetupStep2 />} />
                <Route path="/profile-setup/step3" element={<ProfileSetupStep3 />} />
                <Route path="/profile-setup/step4" element={<ProfileSetupStep4 />} />
                <Route path="/profile-setup/step5" element={<ProfileSetupStep5 />} />
                <Route path="/profile-setup/step6" element={<ProfileSetupStep6 />} />
                <Route path="/profile-setup/step7" element={<ProfileSetupStep7 />} />
                <Route path="/profile-setup/step8" element={<ProfileSetupStep8 />} />
                <Route path="/profile-setup/step9" element={<ProfileSetupStep9 />} />

                {/* Personal Space (protected) */}
                <Route
                  path="/personal-space/*"
                  element={
                    <ProtectedRoute>
                      <PersonalSpaceLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="account-space" replace />} />
                  <Route path="account-space" element={<AccountSpace />} />
                </Route>

                {/* Dashboard (protected) */}
                <Route
                  path="/dashboard/*"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<DashboardHome />} />
                  <Route path="my-projects" element={<MyProjects />} />
                  <Route path="inbox" element={<Inbox />} />
                  <Route path="feedback" element={<Feedback />} />
                  <Route path="free-credit" element={<FreeCredit />} />
                  <Route path="project-updates" element={<ProjectUpdates />} />
                  <Route path="bookmarks" element={<Bookmarks />} />
                  <Route path="ask-doubt" element={<AskDoubt />} />
                  <Route path="tasklists" element={<Tasklists />} />
                  <Route path="pricingtool" element={<PricingTool />} />
                </Route>

                {/* Fallback: redirect unknown routes to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </TasksProvider>
        </BookmarksProvider>
      </ProjectsProvider>
    </UserProvider>
  );
}

export default App;
