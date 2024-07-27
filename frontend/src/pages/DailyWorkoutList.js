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
          <h2 className="text-2xl font-semibold mb-4">
            {workout.name}: {workout.force}
          </h2>
          <ul className="list-disc pl-5">
            {workout.workout_cards &&
              workout.workout_cards.map((workout_card, index) => (
                <li key={index}>
                  Workout Card {index + 1}: {workout_card.exercise_name}
                </li>
              ))}
          </ul>
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default DailyWorkoutList;
