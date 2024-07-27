import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WeeklyFitnessPlan from "./WeeklyFitnessPlan";
import "./FitnessSurvey.css";

// FitnessSurvey component
const FitnessSurvey = () => {
  // Use the useLocation hook to access the user object passed from the Sign Up component
  const location = useLocation();
  const navigate = useNavigate();
  const newUser = location.state?.user;

  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
  const [user, setUser] = useState({
    age: "",
    weight: "",
    fitness_level: "",
    fitness_goal: "",
    body_type: "",
    height_unit: "imperial",
    height_feet: "",
    height_inches: "",
    height_meters: "",
    height_centimeters: "",
    weight_unit: "lbs",
    calculate_as_gender: "",
    email_address: newUser?.email_address || "",
    password: newUser?.password || "",
    _id: newUser?._id || "",
  });

  // Survey Navigation
  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  // Handle the form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleGenderSelection = (gender) => {
    const updatedUser = {
      ...user,
      calculate_as_gender: gender,
    };
    setUser(updatedUser);
    handleSubmit(updatedUser);
  };

  // Handle the form submission
  const handleSubmit = async (updatedUser) => {
    try {
      const { _id: userId, fitness_level, fitness_goal } = updatedUser;

      // Create the weekly fitness plan using the user ID, fitness level, and fitness goal
      const fitnessPlanResponse = await fetch("/createWeeklyPlan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            _id: userId,
            fitness_level,
            fitness_goal,
          },
        }), // Use the user object with required properties
      });

      if (fitnessPlanResponse.ok) {
        const fitnessPlanData = await fitnessPlanResponse.json();
        console.log("Weekly Fitness Plan created:", fitnessPlanData);

        // Navigate to the user profile page
        navigate(`/userprofile/${userId}`, {
          state: { user: updatedUser },
        });
      } else {
        const errorMsg = await fitnessPlanResponse.json();
        setError(
          errorMsg.error || "An error occurred creating the fitness plan."
        );
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  // Survey steps
  const renderStep = () => {
    switch (step) {
      // Fitness Goal Survey Question
      case 0:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl italic">What is your Fitness Goal?</h2>
            <button
              className="survey-button"
              onClick={() => {
                handleChange({
                  target: { name: "fitness_goal", value: "Lose Weight" },
                });
                nextStep();
              }}
            >
              Lose weight
            </button>
            <button
              className="survey-button"
              onClick={() => {
                handleChange({
                  target: { name: "fitness_goal", value: "Build Strength" },
                });
                nextStep();
              }}
            >
              Build strength
            </button>
            <button
              className="survey-button"
              onClick={() => {
                handleChange({
                  target: { name: "fitness_goal", value: "Build Endurance" },
                });
                nextStep();
              }}
            >
              Build endurance
            </button>
            <button
              className="survey-button"
              onClick={() => {
                handleChange({
                  target: { name: "fitness_goal", value: "Build Muscle" },
                });
                nextStep();
              }}
            >
              Build muscle mass
            </button>
            <button
              className="survey-button"
              onClick={() => {
                handleChange({
                  target: { name: "fitness_goal", value: "Flexibility" },
                });
                nextStep();
              }}
            >
              Flexibility
            </button>
          </div>
        );
      // Fitness Level Survey Question
      case 1:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl italic">What is your Fitness Level?</h2>
            <button
              className="survey-button"
              onClick={() => {
                handleChange({
                  target: { name: "fitness_level", value: "Beginner" },
                });
                nextStep();
              }}
            >
              Beginner
            </button>
            <button
              className="survey-button"
              onClick={() => {
                handleChange({
                  target: { name: "fitness_level", value: "Intermediate" },
                });
                nextStep();
              }}
            >
              Intermediate
            </button>
            <button
              className="survey-button"
              onClick={() => {
                handleChange({
                  target: { name: "fitness_level", value: "Advanced" },
                });
                nextStep();
              }}
            >
              Advanced
            </button>
            <div>
              <button className="survey-nav-button" onClick={previousStep}>
                Back
              </button>
            </div>
          </div>
        );
      // Body Type Survey Question
      case 2:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl italic">What is your Body Type?</h2>
            <button
              className="survey-button"
              onClick={() => {
                handleChange({
                  target: { name: "body_type", value: "Ectomorph" },
                });
                nextStep();
              }}
            >
              Ectomorph
            </button>
            <button
              className="survey-button"
              onClick={() => {
                handleChange({
                  target: { name: "body_type", value: "Mesomorph" },
                });
                nextStep();
              }}
            >
              Mesomorph
            </button>
            <button
              className="survey-button"
              onClick={() => {
                handleChange({
                  target: { name: "body_type", value: "Endomorph" },
                });
                nextStep();
              }}
            >
              Endomorph
            </button>
            <div>
              <button className="survey-nav-button" onClick={previousStep}>
                Back
              </button>
            </div>
          </div>
        );
      // Height Survey Questions
      case 3:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl italic">What is your height?</h2>
            <h2 className="text-3xl italic">Height Unit:</h2>
            <select
              name="height_unit"
              value={user.height_unit}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="imperial">Imperial (ft/in)</option>
              <option value="metric">Metric (m/cm)</option>
            </select>
            {user.height_unit === "imperial" ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Height (Feet):
                  </label>
                  <input
                    type="number"
                    name="height_feet"
                    value={user.height_feet}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Height (Inches):
                  </label>
                  <input
                    type="number"
                    name="height_inches"
                    value={user.height_inches}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Height (Meters):
                  </label>
                  <input
                    type="number"
                    name="height_meters"
                    value={user.height_meters}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Height (Centimeters):
                  </label>
                  <input
                    type="number"
                    name="height_centimeters"
                    value={user.height_centimeters}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </>
            )}
            <div className="flex space-x-4">
              <button className="survey-nav-button" onClick={previousStep}>
                Back
              </button>
              <button className="survey-nav-button" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        );
      // Weight Survey Question
      case 4:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl italic">What is your Weight?</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight:
              </label>
              <input
                type="number"
                name="weight"
                value={user.weight}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <h2 className="text-3xl italic">Weight Unit:</h2>
            <select
              name="weight_unit"
              value={user.weight_unit}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="lbs">Pounds (lbs)</option>
              <option value="kg">Kilograms (kg)</option>
            </select>
            <div className="flex space-x-4">
              <button className="survey-nav-button" onClick={previousStep}>
                Back
              </button>
              <button className="survey-nav-button" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        );
      // Age Survey Question
      case 5:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl italic">What is your Age?</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age:
              </label>
              <input
                type="number"
                name="age"
                value={user.age}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex space-x-4">
              <button className="survey-nav-button" onClick={previousStep}>
                Back
              </button>
              <button className="survey-nav-button" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        );
      // Gender Submission Buttons
      case 6:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl italic">What is your gender?</h2>
            <button
              className="survey-button"
              onClick={() => handleGenderSelection("male")}
            >
              Male
            </button>
            <button
              className="survey-button"
              onClick={() => handleGenderSelection("female")}
            >
              Female
            </button>
            <button className="survey-nav-button" onClick={previousStep}>
              Back
            </button>
            {error && <div className="text-red-500">{error}</div>}
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl italic">Your Weekly Fitness Plan</h2>
            <WeeklyFitnessPlan userId={user._id} />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center px-14 py-20 mx-auto w-full text-2xl bg-lime-200 max-w-[480px]">
      {renderStep()}
    </div>
  );
};

export default FitnessSurvey;
