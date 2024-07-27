import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DailyWorkoutList = () => {
  const { userId, day } = useParams(); // Extract userId and day from URL
  const [workout, setWorkout] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId || !day) {
      return;
    }

    // Handle request cancellation
    const controller = new AbortController();
    const { signal } = controller;

    // Build the URL with route parameters
    const url = `/daily-workouts/${userId}/${day}`;

    // Fetch daily workout filtered by userId and by day
    fetch(url, { signal })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((data) => {
        setWorkout(data);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setError("Error fetching data. Please try again.");
        }
      });

    return () => controller.abort();
  }, [userId, day]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!workout) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center px-9 py-20 mx-auto w-full text-xl bg-lime-200 border border-black border-solid max-w-[800px]">
      <div className="flex flex-col px-3 pt-9 pb-20 mt-10 w-full bg-white">
        <div className="self-center text-5xl italic font-black text-black mb-10">
          Daily Workout List
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {workout.name}
            {workout.force && `: ${workout.force}`}
          </h2>
          {workout.workout_cards && workout.workout_cards.length > 0 ? (
            workout.workout_cards.map((workout_card, index) => (
              <div key={index}>
                {/* Add workout card details here */}
                <div>{workout_card.exercise_name}</div>
              </div>
            ))
          ) : (
            <div>No workout cards available for this day.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyWorkoutList;
