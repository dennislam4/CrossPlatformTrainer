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
      .then(async (data) => {
        // Fetch detailed workout information for each workout ID
        const workoutDetails = await Promise.all(
          data.workouts.map((workoutId, index) => {
            const day = daysOfWeek[index];
            return fetch(`/daily-workouts/${workoutId}/${day}`).then((res) =>
              res.json()
            );
          })
        );
        setWorkouts(workoutDetails);
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
  }, [userId, daysOfWeek]); // Add userId to the dependency array to keep fetch from happening constantly

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
          {workouts && workouts.length > 0 ? (
            workouts.map((workout, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  {daysOfWeek[index]}
                </h2>
                <DailyWorkoutList userId={userId} day={daysOfWeek[index]} />
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
    </div>
  );
};

export default WeeklyFitnessPlan;
