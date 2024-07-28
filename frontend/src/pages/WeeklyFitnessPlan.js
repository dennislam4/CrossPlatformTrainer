import React, { useEffect, useState, useMemo } from "react";
import DailyWorkoutList from "./DailyWorkoutList";
import { useParams } from "react-router-dom";

const WeeklyFitnessPlan = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const daysOfWeek = useMemo(
    () => [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    []
  );

  useEffect(() => {
    if (!userId) return; // Exit if userId is not present

    const controller = new AbortController();
    const { signal } = controller;

    fetch(`/fitnessplan/${userId}`, { signal })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log("Data received from API:", data); // Log the raw data
        setWorkouts(data.workouts || []);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error fetching data:", error);
          setError("Error fetching data. Please try again.");
        }
      });

    return () => controller.abort();
  }, [userId]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col px-3 pt-9 pb-20 mt-10 w-full bg-white">
      <div className="self-center text-5xl italic font-black text-black mb-10">
        Weekly Fitness Plan
      </div>
      <div className="mb-8">
        {workouts && workouts.length > 0 ? (
          daysOfWeek.map((day, index) => (
            <div key={index} className="mb-8">
              <DailyWorkoutList userId={userId} day={day} />
            </div>
          ))
        ) : (
          <div className="text-center text-xl text-gray-500">
            No fitness plans available.
          </div>
        )}
      </div>

      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default WeeklyFitnessPlan;
