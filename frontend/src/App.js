// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import SignIn from "./pages/SignIn.js";
import SignUp from "./pages/SignUp.js";
import UserProfile from "./pages/UserProfile.js";
import Progression from "./pages/Progression.js";
import FitnessSurvey from "./pages/FitnessSurvey";
import DailyWorkoutList from "./pages/DailyWorkoutList.js";
import WeeklyFitnessPlan from "./pages/WeeklyFitnessPlan.js";
import Dashboard from "./pages/Dashboard.js";

function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;
