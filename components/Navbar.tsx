"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };
  const fb = () => {
    window.open(
      "https://www.facebook.com/profile.php?id=61577086606977#",
      "_blank"
    );
  };

  return (
    <nav className="w-full flex flex-col items-center ">
      <div className="bg-[#013632] w-full flex justify-center">
        <div className="max-w-[1980px] w-full flex justify-end items-center">
          <div className="flex items-center gap-6 h-[50px] mr-8">
            <img
              onClick={fb}
              className=" cursor-pointer w-[16px] h-[26px]"
              src="/logo/fb.png"
              alt=""
            />
            <img
              className="w-[26px] cursor-pointer h-[26px]"
              src="/logo/ig.png"
              alt=""
            />
            <img className=" h-[30px]" src="/logo/line.png" alt="" />
            <img
              className=" w-[26px] cursor-pointer h-[26px]"
              src="/logo/phone.png"
              alt=""
            />
            <p className="text-white cursor-pointer font-semibold">
              Холбоо барих
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center w-full max-w-[1980px] px-4 py-4">
        <div className="flex items-center gap-4 text-[#013632]">
          <div
            className="text-[32px] font-bold gap-4 flex cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            <img className="w-[67px] h-[52px]" src="/logo/image1.png" alt="" />
            <p className=" ">Aylay</p>
          </div>

          <ul className="hidden md:flex justify-around items-center w-[30%] list-none p-0 m-0">
            {[
              { label: "Нүүр", path: "/" },
              { label: "Мэдээ", path: "#" },
              { label: "Үйлчилгээ", path: "#" },
              { label: "Аялал", path: "#" },
              { label: "Боломжууд", path: "#" },
            ].map(({ label, path }) => (
              <li key={label} className="mx-4">
                <button
                  onClick={() => handleNavigation(path)}
                  className="text-lg font-semibold cursor-pointer text-[#013632] transition-colors bg-transparent border-none hover:underline"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
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
        <div className="py-2 px-5 bg-[#EEC949] font-semibold cursor-pointer max-md:hidden border-1 border-[#EFAB2C] text-[#023632] rounded-[8px] ">
          Нэвтрэх
        </div>
      </div>
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
                className="text-lg font-medium text-[#013632] cursor-pointer hover:text-[#023632] transition-colors bg-transparent border-none w-full"
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
