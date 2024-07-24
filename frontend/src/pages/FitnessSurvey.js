import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FitnessSurvey.css";

// FitnessSurvey component
const FitnessSurvey = () => {
  // Use the useLocation hook to access the user object passed from the Sign Up component
  const location = useLocation();
  const navigate = useNavigate();
  const newUser = location.state?.user;

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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

  const fetchUser = async (userDetails) => {
    try {
      const response = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: newUser?.email_address,
          password: newUser?.password,
        }),
      });
      if (response.ok) {
        const fetchedUser = await response.json();
        setUser((prevUser) => ({
          ...prevUser,
          ...fetchedUser,
          _id: fetchedUser._id || userDetails._id,
        }));
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
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
    fetchUser(updatedUser);
    handleSubmit(updatedUser);
  };

  // Handle the form submission
  const handleSubmit = async (updatedUser) => {
    try {
      const response = await fetch("/updateprofile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      if (response.ok) {
        setSuccess("User profile updated successfully.");
        setError("");
        const updatedUserResponse = await response.json();
        setUser(updatedUserResponse);
        navigate("/userprofile", { state: { user: updatedUserResponse } });
      } else {
        const errorMsg = await response.json();
        setError(errorMsg.error || "An error occurred during signing in.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  // Render the survey steps
  const renderStep = () => {
    switch (step) {
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
          </div>
        );
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
          </div>
        );
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
            {success && <div>{success}</div>}
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl italic">Your Weekly Fitness Plan</h2>
            {/* Render the fitness plan here */}
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
