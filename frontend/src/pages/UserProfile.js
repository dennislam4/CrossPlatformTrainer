import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./UserProfile.css";

// Initialize the UserProfile component
const UserProfile = () => {
  // Use the useLocation hook to access the user object passed from the SignIn component
  const location = useLocation();
  const signedInUser = location.state?.user;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Initialize the user state with default values
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
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
  });

  // Set the user state to the signed-in user object if available
  useEffect(() => {
    if (signedInUser) {
      setUser(signedInUser);
    }
  }, [signedInUser]);

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
    e.preventDefault();
    try {
      const response = await fetch("/updateprofile", {
        method: "PUT",
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

  // Handle the unit change for height
  const handleHeightUnitChange = (e) => {
    setUser({
      ...user,
      heightUnit: e.target.value,
    });
  };

  // Handle the unit change for weight
  const handleWeightUnitChange = (e) => {
    setUser({
      ...user,
      weightUnit: e.target.value,
    });
  };

  // Return the UserProfile component with form inputs
  return (
    <div className="user-profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email_address}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
          />
        </label>
        <label>
          Height Unit:
          <select
            name="heightUnit"
            value={user.height_unit}
            onChange={handleHeightUnitChange}
          >
            <option value="imperial">Imperial (ft/in)</option>
            <option value="metric">Metric (m/cm)</option>
          </select>
        </label>
        {user.heightUnit === "imperial" ? (
          <>
            <label>
              Height (Feet):
              <input
                type="number"
                name="heightFeet"
                value={user.height_feet}
                onChange={handleChange}
              />
            </label>
            <label>
              Height (Inches):
              <input
                type="number"
                name="heightInches"
                value={user.height_inches}
                onChange={handleChange}
              />
            </label>
          </>
        ) : (
          <>
            <label>
              Height (Meters):
              <input
                type="number"
                name="heightMeters"
                value={user.height_meters}
                onChange={handleChange}
              />
            </label>
            <label>
              Height (Centimeters):
              <input
                type="number"
                name="heightCentimeters"
                value={user.height_centimeters}
                onChange={handleChange}
              />
            </label>
          </>
        )}
        <label>
          Weight:
          <input
            type="number"
            name="weightValue"
            value={user.weight}
            onChange={handleChange}
          />
          <select
            name="weightUnit"
            value={user.weight_unit}
            onChange={handleWeightUnitChange}
          >
            <option value="lbs">lbs</option>
            <option value="kgs">kgs</option>
          </select>
        </label>
        <label>
          Fitness Level:
          <select
            name="fitnessLevel"
            value={user.fitness_level}
            onChange={handleChange}
          >
            <option value="">Select Fitness Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </label>
        <label>
          Fitness Goal:
          <select
            name="fitnessGoal"
            value={user.fitness_goal}
            onChange={handleChange}
          >
            <option value="">Select Fitness Goal</option>
            <option value="Lose Weight">Lose Weight</option>
            <option value="Increase Flexibility">Increase Flexibility</option>
            <option value="Build Muscle Mass">Build Muscle Mass</option>
            <option value="Build Strength">Build Strength</option>
            <option value="Build Endurance">Build Endurance</option>
          </select>
        </label>
        <label>
          Body Type:
          <select
            name="bodyType"
            value={user.body_type}
            onChange={handleChange}
          >
            <option value="">Select Body Type</option>
            <option value="Ectomorph">Ectomorph</option>
            <option value="Mesomorph">Mesomorph</option>
            <option value="Endomorph">Endomorph</option>
          </select>
        </label>
        <button type="submit">Submit</button>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div>{success}</div>}
      </form>
    </div>
  );
};
// Export the UserProfile component
export default UserProfile;
