// App.js
import React from 'react';
import './App.css'; 

function App() {
  return (
    <div className="flex flex-col items-center px-14 py-20 mx-auto w-full text-5xl font-black bg-lime-200 max-w-[480px]">
      <img
        loading="lazy"
        src='images/flex.jpg'
        className="self-stretch mt-12 w-full aspect-[1.3]"
        alt="Fitness"
      />
      <div className="mt-24 italic bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        FITNESS
      </div>
      <div className="mt-14 italic font-medium bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        <span className="italic font-black">APP</span>
      </div>
      <button
        className="flex justify-center items-center p-2.5 mt-20 max-w-full text-2xl italic text-white whitespace-nowrap bg-black rounded-3xl border border-black border-solid shadow-sm w-[260px]"
      >
        Login
      </button>
      <button
        className="flex justify-center items-center p-2.5 mt-11 max-w-full text-2xl italic text-white bg-black rounded-3xl border border-black border-solid shadow-sm w-[260px]"
      >
        Create Profile
      </button>
    </div>
  );
}

export default App;

