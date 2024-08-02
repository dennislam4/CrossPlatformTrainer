import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ handleLogout }) => {
    return (
        <div className="w-full bg-lime-200 text-black flex justify-around items-center border-t border-black border-solid h-16 fixed bottom-0">
            <Link to="/Dashboard" className="block px-4 py-2 italic font-bold text-black bg-white border border-black border-solid rounded hover:bg-violet-300">
                Dashboard
            </Link>
            <Link to="/fitnessplan/:userId" className="block px-4 py-2 italic font-bold text-black bg-white border border-black border-solid rounded hover:bg-violet-300">
                Fitness Plan
            </Link>
            <Link to="/daily-workouts/:userId/:day" className="block px-4 py-2 italic font-bold text-black bg-white border border-black border-solid rounded hover:bg-violet-300">
                Daily Workouts
            </Link>
            <Link to="/Progression" className="block px-4 py-2 italic font-bold text-black bg-white border border-black border-solid rounded hover:bg-violet-300">
                Progression
            </Link>
            <Link to="/userprofile/:userId" className="block px-4 py-2 italic font-bold text-black bg-white border border-black border-solid rounded hover:bg-violet-300">
                User Profile
            </Link>
            <Link onClick={handleLogout} className="block px-4 py-2 italic font-bold text-black bg-white border border-black border-solid rounded hover:bg-violet--300">
                Logout
            </Link>
        </div>
    );
};

export default Sidebar;
