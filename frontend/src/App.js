// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import SignIn from "./pages/SignIn.js";
import SignUp from "./pages/SignUp.js";
import UserProfile from "./pages/UserProfile.js";
import Nav from "./pages/Nav.js";
import FitnessSurvey from "./pages/FitnessSurvey";
import WorkoutCard from './pages/WorkoutCard.js'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Nav" element={<Nav />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/fitnesssurvey" element={<FitnessSurvey />} />
        <Route path="/WorkoutCard" element={<WorkoutCard />} />
        <Route path="/dailyworkoutlist" element={<DailyWorkoutList />} />
      </Routes>
    </Router>
  );
}

export default App;
