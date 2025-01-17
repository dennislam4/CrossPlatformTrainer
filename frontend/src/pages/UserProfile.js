import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

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

  let { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const signedInUser = location.state?.user;

  if (signedInUser) {
    userId = signedInUser._id;
  }

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    height_unit: "",
    height_feet: "",
    height_inches: "",
    height_meters: "",
    height_centimeters: "",
    weight_unit: "",
    bmi: "",
    daily_calories: "",
  });

  // Handle fetching user data
  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await fetch(`/userprofile/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          const errorMsg = await response.json();
          setError(errorMsg.error || "An error occurred. Please try again.");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    };

    if (userId) {
      fetchUserData(userId);
    } else if (signedInUser) {
      setUser(signedInUser);
    }
  }, [userId, signedInUser]);

  // Handle avatar change
  const handleAvatarChange = (selectedAvatar) => {
    setUser({ ...user, avatar: selectedAvatar });
  };

  // Handle form input change
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    // If fitness level or fitness goal changes, generate a new fitness plan
    if (name === "fitness_level" || name === "fitness_goal") {
      const updatedUser = {
        ...user,
        [name]: value,
      };

      const response = await fetch("/createWeeklyPlan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: updatedUser }),
      });

      if (response.ok) {
        const updatedPlan = await response.json();
        console.log("New fitness plan generated:", updatedPlan);
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/updateprofile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });
      if (response.ok) {
        setSuccess("User profile updated successfully.");
        setError("");
        const updatedUser = await response.json();
        setUser(updatedUser);
        navigate(`/Dashboard/${updatedUser._id}`, {
          state: { userId: updatedUser._id },
        });
      } else {
        const errorMsg = await response.json();
        setError(errorMsg.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };
  

  const handleHeightUnitChange = (e) => {
    setUser({
      ...user,
      height_unit: e.target.value, 
    });
  };
  

  const handleWeightUnitChange = (e) => {
    setUser({
      ...user,
      weight_unit: e.target.value, 
    });
  };

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
            name="email_address"
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Daily Calorie Expenditure:
          </label>
          <input
            type="number"
            name="daily_calories"
            value={user.daily_calories}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            BMI:
          </label>
          <input
            type="number"
            name="bmi"
            value={user.bmi}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            disabled
          />
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

export default UserProfile;
