import * as React from "react";

function Nav() {
  return (
    <div className="flex flex-col justify-center px-9 py-20 mx-auto w-full text-2xl font-black text-white bg-lime-200 border border-black border-solid max-w-[480px]">
      <div className="flex flex-col px-10 py-10 mt-6 bg-white">
        <div className="self-center text-3xl italic text-center text-black">
          Home
        </div>
        <div className="self-center mt-5 text-3xl italic text-center text-black">
          Page
        </div>
        <div className="p-2.5 mt-14 italic bg-black border border-black border-solid shadow-sm">
          &nbsp; &nbsp;Workout Plan
        </div>
        <div className="p-2.5 mt-3 italic bg-black border border-black border-solid shadow-sm">
          &nbsp; Workout Cards
        </div>
        <div className="p-2.5 mt-3 italic whitespace-nowrap bg-black border border-black border-solid shadow-sm">
          Progress
        </div>
        <div className="py-2.5 pr-2.5 pl-2.5 mt-3.5 italic bg-black border border-black border-solid shadow-sm">
          &nbsp; &nbsp; &nbsp; &nbsp; Settings
        </div>
        <div className="p-2.5 mt-3.5 italic whitespace-nowrap bg-black border border-black border-solid shadow-sm">
          Logout
        </div>
        <img
          loading="lazy"
          src="/images/arm.jpg"
          className="self-center mt-20 max-w-full aspect-[1.61] w-[154px]"
        />
      </div>
    </div>
  );
}

export default Nav;