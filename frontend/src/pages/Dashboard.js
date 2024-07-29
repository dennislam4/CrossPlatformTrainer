import * as React from "react";
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="flex flex-col justify-center px-9 py-20 mx-auto w-full text-2xl font-black text-white bg-lime-200 border border-black border-solid max-w-[480px]">
      <div className="flex flex-col px-10 py-10 mt-6 bg-white">

      <div className="self-center text-3xl italic text-center text-black">
          Home
        </div>
        <div className="self-center mt-5 text-3xl italic text-center text-black">
          Page
        </div>
        <button className="w-full p-2.5 mt-14 italic bg-black text-white border border-black border-solid shadow-sm">
          Fitness Plan
        </button>
        <Link to="/WorkoutCard">
        <button className="w-full p-2.5 mt-3 italic bg-black text-white border border-black border-solid shadow-sm">
          Workout Card
        </button>
        </Link>
        <Link to="/Progression">
        <button className="w-full p-2.5 mt-3 italic whitespace-nowrap bg-black text-white border border-black border-solid shadow-sm">
          Progression
        </button>
        </Link>
        <Link to="/UserProfile">
        <button className="w-full py-2.5 pr-2.5 pl-2.5 mt-3.5 italic bg-black text-white border border-black border-solid shadow-sm">
          Settings
        </button>
        </Link>
        <Link to="/">
        <button className="w-full p-2.5 mt-3.5 italic whitespace-nowrap bg-black text-white border border-black border-solid shadow-sm">
          Logout
        </button>
        </Link>
        <img
          loading="lazy"
          src="/images/arm.jpg"
          className="self-center mt-20 max-w-full aspect-[1.61] w-[154px]"
        />
      </div>
    </div>
  );
}

export default Dashboard;
