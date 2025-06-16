import React from "react";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full px-4 bg-[#f9bf8c8d] bg-opacity-50 flex justify-between shadow-md z-50 py-4">
      <div className="text-[32px]">Aylay</div>
      <div className="flex justify-around items-center w-[50%]">
        <p className="text-lg font-medium text-gray-800 cursor-pointer hover:text-white transition-colors">
          Home
        </p>
        <p className="text-lg font-medium text-gray-800 cursor-pointer hover:text-white transition-colors">
          About
        </p>
        <p className="text-lg font-medium text-gray-800 cursor-pointer hover:text-white transition-colors">
          Tours
        </p>
        <p className="text-lg font-medium text-gray-800 cursor-pointer hover:text-white transition-colors">
          Contact
        </p>
        <p className="text-lg font-medium text-gray-800 cursor-pointer hover:text-white transition-colors">
          Blog
        </p>
      </div>
    </div>
  );
}
