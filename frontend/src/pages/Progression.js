import * as React from "react";
import { Link, useParams } from "react-router-dom";

function Progression() {
  const { userId } = useParams();

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
          <div className="flex-auto pl-36 text-xl text-zinc-600">feet</div>
        </div>
        <div className="flex gap-5 py-4 whitespace-nowrap border-t border-neutral-200">
          <div className="self-start text-base font-medium text-black">
            Weight
          </div>
          <div className="flex-auto pl-36 text-xl text-zinc-600">pounds</div>
        </div>
        <div className="flex gap-5 py-4 whitespace-nowrap border-t border-neutral-200">
          <div className="my-auto text-base font-medium text-black">BMI</div>
          <div className="flex-auto pl-48 -ml-px text-xl text-zinc-600">%</div>
        </div>
        <div className="flex gap-5 py-4 border-t border-neutral-200">
          <div className="flex-auto my-auto text-base font-medium text-black">
            Current Workout
          </div>
          <div className="flex-auto text-xl text-zinc-600">Chest</div>
        </div>
        <div className="flex gap-5 py-4 mb-1.5 border-t border-neutral-200">
          <div className="flex-auto text-base font-medium text-black">
            Resting Heartrate
          </div>
          <div className="flex-auto text-xl text-zinc-600">BPM</div>
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
    </div>
  );
}

export default Progression;
