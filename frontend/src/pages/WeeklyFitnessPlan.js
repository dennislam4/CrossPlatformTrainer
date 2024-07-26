import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const WeeklyFitnessPlan = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  const { userId } = useParams();

  useEffect(() => {
    if (!userId) return; // Exit if userId is not present

    // handle request cancellation
    const controller = new AbortController();
    const { signal } = controller;

    // Fetch Weekly workout list by the signed-in user's ID
    fetch(`/fitnessplan/${userId}`, { signal })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.dir(data);
        setWorkouts(data);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error encountering data fetch:", error);
          setError("Error encountering data fetch. Please try again.");
        }
      });

    return () => controller.abort();
  }, [userId]); // Add userId to the dependency array to keep fetch from happening constantly

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col justify-center px-9 py-20 mx-auto w-full text-xl bg-lime-200 border border-black border-solid max-w-[800px]">
      <div className="flex flex-col px-3 pt-9 pb-20 mt-10 w-full bg-white">
        <div className="self-center text-5xl italic font-black text-black mb-10">
          Weekly Fitness Plan
        </div>
        <div className="mb-8">
          <ul className="list-disc pl-5">
            {workouts.workout_1_id && (
              <li>Daily Workout 1 ID: {workouts.workout_1_id}</li>
            )}
            {workouts.workout_2_id && (
              <li>Daily Workout 2 ID: {workouts.workout_2_id}</li>
            )}
            {workouts.workout_3_id && (
              <li>Daily Workout 3 ID: {workouts.workout_3_id}</li>
            )}
            {workouts.workout_4_id && (
              <li>Daily Workout 4 ID: {workouts.workout_4_id}</li>
            )}
            {workouts.workout_5_id && (
              <li>Daily Workout 5 ID: {workouts.workout_5_id}</li>
            )}
            {workouts.workout_6_id && (
              <li>Daily Workout 6 ID: {workouts.workout_6_id}</li>
            )}
            {workouts.workout_7_id && (
              <li>Daily Workout 7 ID: {workouts.workout_7_id}</li>
            )}
          </ul>
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default WeeklyFitnessPlan;
