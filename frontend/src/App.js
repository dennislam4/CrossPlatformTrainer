import React from "react";
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
import WorkoutCard from "./pages/WorkoutCard";

// Used to show sidebar on all pages except signin, signup, survey, dashboard, and home pages
const AppContents = () => {
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/fitnesssurvey" ||
    location.pathname === "/" ||
    location.pathname === "/dashboard";
  return (
    <div className="flex flex-col min-h-screen">
      {!hideSidebar && <Sidebar />}
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

// Display main app content
function App() {
  return (
    <Router>
      <AppContents />
    </Router>
  );
}

export default App;
