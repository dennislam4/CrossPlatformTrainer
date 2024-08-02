import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import WeeklyFitnessPlan from "./WeeklyFitnessPlan";
import "./FitnessSurvey.css";

// FitnessSurvey component
const FitnessSurvey = () => {
  // Use the useLocation hook to access the user object passed from the Sign Up component
  const location = useLocation();
  const navigate = useNavigate();
  const newUser = location.state?.user;
  let { userId } = useParams();
  if (newUser) {
    userId = newUser._id;
  }
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    bmi: "",
    daily_calories: "",
    email_address: newUser?.email_address || "",
    password: newUser?.password || "",
    _id: newUser?._id || userId || "",
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
    setIsSubmitting(true);
    try {
      const { _id: userId, fitness_level, fitness_goal } = updatedUser;
      // Validate input
      if (!userId) {
        console.error("User ID is required.");
      } else if (!fitness_level) {
        console.error("fitness_level is required");
      } else if (!fitness_goal) {
        console.error("fitness_goal is required");
        return;
      }
      // Update the user profile using the updated user object
      const userProfileResponse = await fetch("/updateprofile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: updatedUser,
          email: updatedUser.email_address,
        }), // Use the entire user object. Account for different field names
      });
      if (userProfileResponse.ok) {
        const userProfileData = await userProfileResponse.json();
        console.log("User Profile created:", userProfileData);
      } else {
        const errorMsg = await userProfileResponse.json();
        console.log("Error creating user profile:", errorMsg.error);
      }

      // Create the weekly fitness plan using the entire user object
      const fitnessPlanResponse = await fetch("/createWeeklyPlan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: updatedUser }), // Use the entire user object
      });

      if (fitnessPlanResponse.ok) {
        const fitnessPlanData = await fitnessPlanResponse.json();
        console.log("Weekly Fitness Plan created:", fitnessPlanData);

        // Navigate to the Dashboard
        navigate(`/Dashboard/${userId}`, {
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
    } finally {
      setIsSubmitting(false);
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
                  target: {
                    name: "fitness_goal",
                    value: "Increase Flexibility",
                  },
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
            <div>
              <button className="survey-nav-button" onClick={previousStep}>
                Back
              </button>
              <button className="survey-nav-button" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        );
      // Weight Survey Questions
      case 4:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl italic">What is your weight?</h2>
            <h2 className="text-3xl italic">Weight Unit:</h2>
            <select
              name="weight_unit"
              value={user.weight_unit}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="lbs">Pounds (lbs)</option>
              <option value="kgs">Kilograms (kgs)</option>
            </select>
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
            <div>
              <button className="survey-nav-button" onClick={previousStep}>
                Back
              </button>
              <button className="survey-nav-button" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        );
      // Gender Survey Question
      case 5:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl italic">What is your Gender?</h2>
            <button
              className="survey-button"
              onClick={() => handleGenderSelection("male")}
            >
              Male
            </button>
            <button
              className="survey-button"
              disabled={isSubmitting}
              onClick={() => handleGenderSelection("female")}
            >
              Female
            </button>
            <button
              className="survey-button"
              disabled={isSubmitting}
              onClick={() => handleGenderSelection("other")}
            >
              Other
            </button>
            <div>
              <button
                className="survey-nav-button"
                disabled={isSubmitting}
                onClick={previousStep}
              >
                Back
              </button>
            </div>
          </div>
        );
      // Display WeeklyFitnessPlan after survey is completed
      case 6:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl italic">Weekly Fitness Plan</h2>
            <WeeklyFitnessPlan userId={user._id} />
          </div>
        );
      default:
        console.log(error);
        return null;
    }
  };

  return <div>{renderStep()}</div>;
};

export default FitnessSurvey;
