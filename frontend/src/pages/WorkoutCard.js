import * as React from "react";
import { Link } from 'react-router-dom';

function MyComponent() {
  return (
    <div className="flex flex-col justify-center px-9 py-20 mx-auto w-full bg-lime-200 border border-black border-solid max-w-[480px]">
      <div className="flex flex-col pt-3.5 pb-12 pl-5 mt-20 w-full bg-white rounded-[30px]">
        <div className="flex px-px text-4xl font-bold text-black">
          <div className="grow my-auto italic">Workout Card</div>
          <img
            loading="lazy"
            src= "/images/bench.jpg"
            className="shrink-0 aspect-[1.1] w-[95px]"
          />
        </div>
        <div className="flex flex-col px-6 pt-12 pb-3 mt-4 w-full bg-white rounded-none border border-solid shadow-sm border-neutral-200">
          <div className="text-base italic font-black leading-6 text-black">
            Unit of Measure
          </div>
          <div className="flex gap-5 justify-end py-4 mt-5 whitespace-nowrap border-t border-neutral-200">
            <div className="self-start text-base font-medium leading-6 text-black">
              Weight
            </div>
            <input
              type="text"
              placeholder="Enter weight"
              className="text-xl italic text-zinc-600 border border-neutral-200 rounded-md p-2"
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
            />
          </div>
          <div className="flex gap-5 justify-end py-4 whitespace-nowrap border-t border-neutral-200">
            <div className="text-base font-medium leading-6 text-black">
              Difficulty
            </div>
            <input
              type="text"
              placeholder="Enter difficulty"
              className="text-xl italic text-zinc-600 border border-neutral-200 rounded-md p-2"
            />
          </div>
          <button className="self-end px-3 py-2 mt-2.5 text-base italic font-black leading-6 text-white whitespace-nowrap bg-black rounded-lg">
            Save
          </button>
          <Link to="/Nav">
          <button className="self-start px-4 py-px mt-2.5 ml-5 text-base italic font-black leading-6 text-white whitespace-nowrap bg-black rounded-lg">
          Exit
        </button>
        </Link>
        </div>
      </div>
    </div>
  );
}

export default MyComponent;
