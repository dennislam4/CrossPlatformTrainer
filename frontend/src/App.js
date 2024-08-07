import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home.js";
import SignIn from "./pages/SignIn.js";
import SignUp from "./pages/SignUp.js";
import UserProfile from "./pages/UserProfile.js";
import Progression from "./pages/Progression.js";
import FitnessSurvey from "./pages/FitnessSurvey";
import DailyWorkoutList from "./pages/DailyWorkoutList.js";
import WeeklyFitnessPlan from "./pages/WeeklyFitnessPlan.js";
import Dashboard from "./pages/Dashboard.js";
import Sidebar from "./components/Sidebar";
import WorkoutCard from "./pages/WorkoutCard.js";

// Hide sidebar on home, sign-in, sign-up, and dashboard pages
const AppContent = ({ handleLogout }) => {
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/" ||
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/dashboard";
  // Routes for app content
  return (
    <div className="flex flex-col min-h-screen">
      {!hideSidebar && <Sidebar handleLogout={handleLogout} />}
      <div className={`flex-grow p-4 ${!hideSidebar ? "mb-16" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/Progression/:userId" element={<Progression />} />
          <Route path="/userprofile/:userId" element={<UserProfile />} />
          <Route path="/fitnesssurvey" element={<FitnessSurvey />} />
          <Route
            path="/daily-workouts/:userId/:day"
            element={<DailyWorkoutList />}
          />
          <Route path="/fitnessplan/:userId" element={<WeeklyFitnessPlan />} />
          <Route path="/Dashboard/:userId" element={<Dashboard />} />
          <Route path="/workoutcard/:workoutCardId" element={<WorkoutCard />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);
  // Handle sign-in
  const handleSignIn = (user) => {
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(user));
  };
  // Handle sign-out
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    window.location.href = "/signin"; // Redirect to sign-in page
  };
  // Display main app content and pass handleLogout function to Sidebar
  return (
    <Router>
      <AppContent handleLogout={handleLogout} />
    </Router>
  );
};
// Export App
export default App;
