import React, { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";

const DailyWorkoutList = ({ userId, day }) => {
  const [workoutCards, setWorkoutCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId || !day) return;

    const controller = new AbortController();
    const { signal } = controller;

    fetch(`/daily-workouts/${userId}/${day}`, { signal })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((data) => {
        setWorkoutCards(data.workout_cards || []);
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

  if (!workoutCards.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center px-9 py-20 mx-auto w-full text-xl bg-lime-200 border border-black border-solid max-w-[800px]">
      <div className="flex flex-col px-3 pt-9 pb-20 mt-10 w-full bg-white">
        <div className="self-center text-5xl italic font-black text-black mb-10">
          Daily Workout List
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{day}</h2>
          {workoutCards.map((workout_card) => (
            <WorkoutCard
              key={workout_card._id}
              exercise_name={workout_card.exercise_name}
              weight={workout_card.weight}
              weight_unit={workout_card.weight_unit}
              reps={workout_card.reps}
              sets={workout_card.sets}
              time={workout_card.time}
              intensity={workout_card.intensity}
              _id={workout_card._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyWorkoutList;
