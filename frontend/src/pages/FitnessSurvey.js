import React, { useState, useEffect } from "react";
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
    height: "",
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

  // Set the user state to the signed-in user object if available
  useEffect(() => {
    const fetchUser = async () => {
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
            _id: fetchedUser._id || newUser?._id,
          }));
          navigate("/userprofile", { state: { user: fetchedUser } });
        } else {
          const errorMsg = await response.json();
          setError(errorMsg.message || "An error occurred. Please try again.");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    };

    if (newUser) {
      setUser(newUser);
      fetchUser();
    }
  }, [newUser, navigate]);

  // Handle the form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    console.dir(user);
    // If the user exists, just update their profile
    const method = user._id ? "PUT" : "POST";
    const endpoint = user._id ? "/updateprofile" : "/createprofile"; // Adjust endpoints as needed

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        setSuccess("User profile updated successfully.");
        setError("");
        const updatedUser = await response.json();
        setUser(updatedUser);
      } else {
        const errorMsg = await response.json();
        setError(errorMsg.error || "An error occurred. Please try again.");
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
                  target: { name: "fitness_goal", value: "lose weight" },
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
                  target: { name: "fitness_goal", value: "build strength" },
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
                  target: { name: "fitness_goal", value: "build endurance" },
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
                  target: { name: "fitness_goal", value: "build muscle" },
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
                  target: { name: "fitness_goal", value: "flexibility" },
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
                  target: { name: "fitness_level", value: "beginner" },
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
                  target: { name: "fitness_level", value: "intermediate" },
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
                  target: { name: "fitness_level", value: "advanced" },
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
                  target: { name: "body_type", value: "ectomorph" },
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
                  target: { name: "body_type", value: "mesomorph" },
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
                  target: { name: "body_type", value: "endomorph" },
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
            <h2 className="text-3xl italic">What is your weight?</h2>
            <input
              type="number"
              name="weight"
              value={user.weight}
              onChange={handleChange}
              className="survey-input"
            />
            <select
              name="weight_unit"
              value={user.weight_unit}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            >
              <option value="lbs">lbs</option>
              <option value="kgs">kgs</option>
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
            <h2 className="text-3xl italic">What is your age?</h2>
            <input
              type="number"
              value={user.age}
              name="age"
              onChange={handleChange}
              className="survey-input"
            />
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
              name="calculate_as_gender"
              value={user.calculate_as_gender}
              onClick={() => {
                handleChange({
                  target: { name: "calculate_as_gender", value: "male" },
                });
                handleSubmit();
              }}
            >
              Male
            </button>
            <button
              className="survey-button"
              name="calculate_as_gender"
              value={user.calculate_as_gender}
              onClick={() => {
                handleChange({
                  target: { name: "calculate_as_gender", value: "female" },
                });
                handleSubmit();
              }}
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
