import React from 'react';
import { Link } from 'react-router-dom';

const UserHeader = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-600">SK Rentals</h1>
      <nav>
        <Link to="/" className="text-indigo-700 font-semibold hover:underline mx-2">Home</Link>
        <Link to="/about" className="text-indigo-700 font-semibold hover:underline mx-2">About</Link>
        <Link to="/uservehiclelist" className="text-indigo-700 font-semibold hover:underline mx-2">Vehicles</Link>
      </nav>
    </header>
  );
};

export default UserHeader;
