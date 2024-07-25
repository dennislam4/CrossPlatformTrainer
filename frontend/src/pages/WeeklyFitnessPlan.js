import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const WeeklyFitnessPlan = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("user_id");

  useEffect(() => {
    if (!userId) return; // Exit if userId is not present

    // handle request cancellation
    const controller = new AbortController();
    const { signal } = controller;

    // Fetch daily workouts filtered by the signed-in user's ID
    fetch(`/daily-workouts?user_id=${userId}`, { signal })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => setWorkouts(data))
      .catch((error) => {
        if (error.name === "AbortError") {
          // Handle fetch abort (optional)
          console.log("Fetch aborted");
        } else {
          console.error("Error encountering data fetch:", error);
          setError("Error encountering data fetch. Please try again.");
        }
      });

    // Cleanup function to abort the fetch request on component unmount
    return () => controller.abort();
  }, [userId]); // Add userId to the dependency array

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col justify-center px-9 py-20 mx-auto w-full text-xl bg-lime-200 border border-black border-solid max-w-[800px]">
      <div className="flex flex-col px-3 pt-9 pb-20 mt-10 w-full bg-white">
        <div className="self-center text-5xl italic font-black text-black mb-10">
          Weekly Fitness Plan
        </div>
        {workouts.map((workout, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{workout.name}</h2>
            <ul className="list-disc pl-5">
              {workout.workout_card_1_id && (
                <li>Workout Card 1 ID: {workout.workout_card_1_id}</li>
              )}
              {workout.workout_card_2_id && (
                <li>Workout Card 2 ID: {workout.workout_card_2_id}</li>
              )}
              {workout.workout_card_3_id && (
                <li>Workout Card 3 ID: {workout.workout_card_3_id}</li>
              )}
              {workout.workout_card_4_id && (
                <li>Workout Card 4 ID: {workout.workout_card_4_id}</li>
              )}
              {workout.workout_card_5_id && (
                <li>Workout Card 5 ID: {workout.workout_card_5_id}</li>
              )}
            </ul>
          </div>
        ))}
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default WeeklyFitnessPlan;
