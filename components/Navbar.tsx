"use client"
import React from "react";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const router = useRouter();

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
          Login or signup
        </p>
      </div>
    </div>
  );
}
