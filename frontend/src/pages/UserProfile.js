import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Initialize the UserProfile component
const UserProfile = () => {
  const avatars = [
    { id: 1, src: "/images/man_1.png", alt: "Avatar 1" },
    { id: 2, src: "/images/man_2.png", alt: "Avatar 2" },
    { id: 3, src: "/images/man_3.png", alt: "Avatar 3" },
    { id: 4, src: "/images/woman_1.png", alt: "Avatar 4" },
    { id: 5, src: "/images/woman_2.png", alt: "Avatar 5" },
    { id: 6, src: "/images/woman_3.png", alt: "Avatar 6" },
  ];

  // Use the useLocation hook to access the user object passed from the SignIn component
  const location = useLocation();
  const signedInUser = location.state?.user;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Blank and preset values for default user profile
  const [user, setUser] = useState({
    avatar: avatars[0].src,
    name: "",
    email_address: "",
    password: "",
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
  });

  // Handle the avatar image change
  const handleAvatarChange = (selectedAvatar) => {
    setUser({ ...user, avatar: selectedAvatar });
  };

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
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Avatar:
          </label>
          <div className="flex space-x-2">
            {avatars.map((avatar) => (
              <img
                key={avatar.id}
                src={avatar.src}
                alt={avatar.alt}
                className={`w-12 h-12 cursor-pointer rounded-full ${
                  user.avatar === avatar.src
                    ? "ring-2 ring-blue-500"
                    : "ring-1 ring-gray-300"
                }`}
                onClick={() => handleAvatarChange(avatar.src)}
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={user.email_address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height Unit:
          </label>
          <select
            name="height_unit"
            value={user.height_unit}
            onChange={handleHeightUnitChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="imperial">Imperial (ft/in)</option>
            <option value="metric">Metric (m/cm)</option>
          </select>
        </div>
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
          <select
            name="weight_unit"
            value={user.weight_unit}
            onChange={handleWeightUnitChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
          >
            <option value="lbs">lbs</option>
            <option value="kgs">kgs</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fitness Level:
          </label>
          <select
            name="fitness_level"
            value={user.fitness_level}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Fitness Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fitness Goal:
          </label>
          <select
            name="fitness_goal"
            value={user.fitness_goal}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Fitness Goal</option>
            <option value="Lose Weight">Lose Weight</option>
            <option value="Increase Flexibility">Increase Flexibility</option>
            <option value="Build Muscle Mass">Build Muscle Mass</option>
            <option value="Build Strength">Build Strength</option>
            <option value="Build Endurance">Build Endurance</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Body Type:
          </label>
          <select
            name="body_type"
            value={user.body_type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Body Type</option>
            <option value="Ectomorph">Ectomorph</option>
            <option value="Mesomorph">Mesomorph</option>
            <option value="Endomorph">Endomorph</option>
          </select>
        </div>
        <button
          type="submit"
          className="p-3 mt-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div>{success}</div>}
      </form>
    </div>
  );
};
// export the UserProfile component
export default UserProfile;
