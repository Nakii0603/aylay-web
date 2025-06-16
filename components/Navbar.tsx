"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false); // close menu on navigation
  };

  return (
    <nav className="fixed top-0 left-0 w-full px-4 bg-[#f9bf8c8d] flex justify-between shadow-md z-50 py-4 items-center">
      {/* Logo */}
      <div
        className="text-[32px] font-bold cursor-pointer"
        onClick={() => handleNavigation("/")}
      >
        Aylay
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex justify-around items-center w-[30%] list-none p-0 m-0">
        {[
          // { label: "Нүүр", path: "/" }, // Home
          { label: "Бидний тухай", path: "/about" }, // About
          { label: "Аялал", path: "/tours" }, // Tours
          { label: "Газрын зураг", path: "/map" }, // Map
        ].map(({ label, path }) => (
          <li key={label} className="mx-4">
            <button
              onClick={() => handleNavigation(path)}
              className="text-lg font-medium text-gray-800 cursor-pointer hover:text-white transition-colors bg-transparent border-none"
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      {/* Burger Icon */}
      <div
        className="md:hidden cursor-pointer z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <div
          className={`w-6 h-0.5 bg-gray-800 mb-1 transition-transform ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></div>
        <div
          className={`w-6 h-0.5 bg-gray-800 mb-1 transition-opacity ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></div>
        <div
          className={`w-6 h-0.5 bg-gray-800 transition-transform ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-[80px] right-0 w-full bg-[#f9bf8c8d] flex flex-col items-center md:hidden list-none p-4 m-0 shadow-md">
          {[
            { label: "Нүүр", path: "/" },
            { label: "Тухай", path: "/about" },
            { label: "Аялал", path: "/tours" },
            { label: "Газрын зураг", path: "/map" },
          ].map(({ label, path }) => (
            <li key={label} className="my-2 w-full text-center">
              <button
                onClick={() => handleNavigation(path)}
                className="text-lg font-medium text-gray-800 cursor-pointer hover:text-white transition-colors bg-transparent border-none w-full"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
