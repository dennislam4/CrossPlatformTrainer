import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Progression() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [force, setForce] = useState(null);
  const [error, setError] = useState("");
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = daysOfWeek[new Date().getDay()];

  useEffect(() => {
    const fetchUserData = async () => {
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
    const fetchCurrentWorkout = async () => {
      try {
        const response = await fetch(`/daily-workouts/${userId}/${day}`);
        if (response.ok) {
          const workoutData = await response.json();
          setForce(workoutData.force);
        } else {
          const errorMsg = await response.json();
          setError(errorMsg.error || "An error occurred. Please try again.");
        }
      } catch (error) {
        setError(error || "An error occurred. Please try again.");
      }
    };

    if (userId) {
      fetchUserData();
      fetchCurrentWorkout();
    }
  }, [userId, day]);

  return (
    <div className="flex flex-col pt-20 mx-auto w-full bg-lime-200 border border-black border-solid bg-blend-normal max-w-[480px]">
      <div className="flex flex-col self-center px-5 pt-12 pb-20 mt-20 w-full bg-white max-w-[361px] rounded-[30px]">
        <div className="self-center text-5xl font-black text-black">
          Progress
        </div>
        <div className="flex gap-5 mt-9 text-base font-black text-black">
          <div>Information</div>
          <div className="flex-auto pr-11 text-right">Current Stats</div>
        </div>
        <div className="flex gap-5 py-4 mt-5 whitespace-nowrap border-t border-neutral-200">
          <div className="text-base font-medium text-black">Height</div>
          <div className="flex-auto pl-36 text-xl text-zinc-600">
            {user &&
              user.height_unit &&
              (user.height_unit === "metric"
                ? `${user.height_meters} m ${user.height_centimeters} cm`
                : `${user.height_feet} ft ${user.height_inches} in`)}
          </div>
        </div>
        <div className="flex gap-5 py-4 whitespace-nowrap border-t border-neutral-200">
          <div className="self-start text-base font-medium text-black">
            Weight
          </div>
          <div className="flex-auto pl-36 text-xl text-zinc-600">
            {user &&
              user.weight &&
              user.weight_unit &&
              `${user.weight} ${user.weight_unit}`}
          </div>
        </div>
        <div className="flex gap-5 py-4 whitespace-nowrap border-t border-neutral-200">
          <div className="self-start text-base font-medium text-black">BMI</div>
          <div className="flex-auto pl-36 text-xl text-zinc-600">
            {user && user.bmi && user.bmi}
          </div>
        </div>
        <div className="flex gap-5 py-4 border-t border-neutral-200">
          <div className="flex-auto my-auto text-base font-medium text-black">
            Current Workout
          </div>
          <div className="flex-auto text-xl text-zinc-600">{force}</div>
        </div>
        <div className="flex gap-5 py-4 mb-1.5 border-t border-neutral-200">
          <div className="flex-auto text-base font-medium text-black">
            Resting Heartrate
          </div>
          <div className="flex-auto text-xl text-zinc-600">
            {user &&
              user.resting_heart_rate &&
              `${user.resting_heart_rate} BPM`}
          </div>
        </div>
      </div>
      <div className="flex gap-5 justify-between px-10 py-7 mt-44 w-full text-xs font-medium text-black bg-white shadow-[0px_0px_0px_rgba(0,0,0,0.1)]">
        <Link to={`/fitnessplan/${userId}`}>
          <button className="flex flex-col self-start mt-2.5 tracking-tight text-center">
            <img
              alt="loading..."
              loading="lazy"
              src="/images/progress.jpg"
              className="self-center w-14 aspect-[1.82]"
            />
            <div className="mt-1.5">Fitness Plan</div>
          </button>
        </Link>
        <Link to={`/userprofile/${userId}`}>
          <button className="flex flex-col tracking-tight text-center whitespace-nowrap">
            <img
              alt="loading..."
              loading="lazy"
              src="/images/avatar.jpg"
              className="self-center aspect-[0.86] rounded-[1000px] w-[38px]"
            />
            <div>Settings</div>
          </button>
        </Link>
        <Link to={`/Dashboard/${userId}`}>
          <button className="p-2.5 my-auto text-xl font-black text-white bg-black rounded-xl border border-black border-solid">
            Back to Dashboard
          </button>
        </Link>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}

export default Progression;
