import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function WorkoutCard({
  exercise_name,
  weight,
  weight_unit,
  reps,
  sets,
  time,
  intensity,
  _id,
}) {
  const [workoutCard, setWorkoutCard] = useState({
    exercise_name,
    weight,
    weight_unit,
    reps,
    sets,
    time,
    intensity,
  });
  useEffect(() => {
    const fetchWorkoutCardData = async () => {
      try {
        const response = await fetch(`/workoutcards/${_id}`);
        if (response.ok) {
          const data = await response.json();
          setWorkoutCard(data);
        } else {
          const errorMsg = await response.json();
          console.error(errorMsg);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (_id) {
      fetchWorkoutCardData(_id);
    }
  }, [_id]);

  // Handle the form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkoutCard({
      ...workoutCard,
      [name]: value,
    });
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/updateworkoutcards/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workoutCard),
      });
      if (response.ok) {
        const updatedWorkoutCard = await response.json();
        setWorkoutCard(updatedWorkoutCard);
      } else {
        const errorMsg = await response.json();
        console.error(errorMsg);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form>
      <div className="flex flex-col pt-3.5 pb-12 pl-5 mt-20 w-full bg-white rounded-[30px]">
        <div className="flex px-px text-4xl font-bold text-black">
          <div className="grow my-auto italic">Workout Card</div>

          <img
            alt="Loading..."
            loading="lazy"
            src="/images/bench.jpg"
            className="shrink-0 aspect-[1.1] w-[95px]"
          />
        </div>
        <div>{workoutCard.exercise_name}</div>
        <div className="flex flex-col px-6 pt-12 pb-3 mt-4 w-full bg-white rounded-none border border-solid shadow-sm border-neutral-200">
          <div className="flex gap-5 justify-end py-4 mt-5 whitespace-nowrap border-t border-neutral-200">
            <div className="self-start text-base font-medium leading-6 text-black">
              Unit of Measure
            </div>
            <input
              type="text"
              placeholder="Enter weight"
              className="text-xl italic text-zinc-600 border border-neutral-200 rounded-md p-2"
              value={workoutCard.weight_unit}
              onChange={handleChange}
              name="weight_unit"
            />
          </div>
          <div className="flex gap-5 justify-end py-4 mt-5 whitespace-nowrap border-t border-neutral-200">
            <div className="self-start text-base font-medium leading-6 text-black">
              Weight
            </div>
            <input
              type="text"
              placeholder="Enter weight"
              className="text-xl italic text-zinc-600 border border-neutral-200 rounded-md p-2"
              value={workoutCard.weight}
              onChange={handleChange}
              name="weight"
            />
          </div>
          <div className="flex gap-5 justify-end py-4 whitespace-nowrap border-t border-neutral-200">
            <div className="self-start text-base font-medium leading-6 text-black">
              Reps
            </div>
            <input
              type="text"
              placeholder="Enter reps"
              className="text-xl italic text-zinc-600 border border-neutral-200 rounded-md p-2"
              value={workoutCard.reps}
              onChange={handleChange}
              name="reps"
            />
          </div>
          <div className="flex gap-5 justify-end py-4 whitespace-nowrap border-t border-neutral-200">
            <div className="my-auto text-base font-medium leading-6 text-black">
              Time
            </div>
            <input
              type="text"
              placeholder="Enter time"
              className="text-xl italic text-zinc-600 border border-neutral-200 rounded-md p-2"
              value={workoutCard.time}
              name="time"
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-5 justify-end py-4 whitespace-nowrap border-t border-neutral-200">
            <div className="text-base font-medium leading-6 text-black">
              Difficulty
            </div>
            <input
              type="text"
              name="intensity"
              placeholder="Enter difficulty"
              className="text-xl italic text-zinc-600 border border-neutral-200 rounded-md p-2"
              value={workoutCard.intensity}
              onChange={handleChange}
            />
          </div>
          <button
            className="self-end px-3 py-2 mt-2.5 text-base italic font-black leading-6 text-white whitespace-nowrap bg-black rounded-lg"
            onClick={handleSubmit}
          >
            Save
          </button>
          <Link to="/Nav">
            <button className="self-start px-4 py-px mt-2.5 ml-5 text-base italic font-black leading-6 text-white whitespace-nowrap bg-black rounded-lg">
              Exit
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
}

export default WorkoutCard;
