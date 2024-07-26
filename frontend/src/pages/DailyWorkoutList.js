import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DailyWorkoutList = () => {
  const [workout, setWorkout] = useState([]);
  const [error, setError] = useState(null);

  const { userId, day } = useParams();

  useEffect(() => {
    if (!userId) return; // Exit if userId is not present

    // Handle request cancellation
    const controller = new AbortController();
    const { signal } = controller;

    // Build the URL with route parameters
    const url = `/daily-workouts/${userId}/${day}`;

    // Fetch daily workouts filtered by userId and optionally by day
    fetch(url, { signal })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => setWorkout(data))
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
  }, [userId, day]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col justify-center px-9 py-20 mx-auto w-full text-xl bg-lime-200 border border-black border-solid max-w-[800px]">
      <div className="flex flex-col px-3 pt-9 pb-20 mt-10 w-full bg-white">
        <div className="self-center text-5xl italic font-black text-black mb-10">
          Daily Workout List
        </div>
        <div className="mb-8">
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
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default DailyWorkoutList;
