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
    <div>
      <nav className="w-full flex flex-col items-center ">
        <div className="bg-[#013632] w-full flex justify-center">
          <div className="max-w-[1980px] w-full flex justify-end items-center">
            <div className="flex items-center gap-6 max-sm:gap-3 h-[50px] max-sm:h-[35px] mr-8 max-md:mr-2">
              <img
                onClick={fb}
                className=" cursor-pointer w-[16px] h-[26px] max-sm:h-[18px] max-sm:w-[11px]"
                src="/logo/fb.png"
                alt=""
              />
              <img
                className="w-[26px] cursor-pointer h-[26px] max-sm:h-[18px] max-sm:w-[18px]"
                src="/logo/ig.png"
                alt=""
              />
              <img
                className=" h-[30px] max-md:hidden"
                src="/logo/line.png"
                alt=""
              />
              <img
                className=" w-[26px] cursor-pointer h-[26px] max-sm:h-[18px] max-sm:w-[18px]"
                src="/logo/phone.png"
                alt=""
              />
              <p className="text-white max-md:hidden cursor-pointer font-semibold">
                Холбоо барих
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center w-full max-w-[1980px] p-4 max-md:p-2">
          <div className="flex items-center gap-4 text-[#013632]">
            <div
              className="text-[32px] font-bold gap-4 flex cursor-pointer"
              onClick={() => handleNavigation("/")}
            >
              <img
                className="w-[67px] h-[52px] max-md:w-[40px] max-md:h-[35] "
                src="/logo/image1.png"
                alt=""
              />
              <p className=" max-md:text-[24px]">Aylay</p>
            </div>

            <ul className="hidden md:flex justify-around items- w-[30%] list-none p-0 m-0">
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
            className="md:hidden cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div
              className={`w-6 h-0.5 bg-gray-800 mb-1 transition-transform `}
            ></div>
            <div
              className={`w-6 h-0.5 bg-gray-800 mb-1 transition-opacity `}
            ></div>
            <div
              className={`w-6 h-0.5 bg-gray-800 transition-transform }`}
            ></div>
          </div>
          <div className="py-2 px-5 bg-[#EEC949] font-semibold cursor-pointer max-md:hidden border-1 border-[#EFAB2C] text-[#023632] rounded-[8px] ">
            Нэвтрэх
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="absolute inset-0 bg-[#013632] h-full z-10 p-6">
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-2xl font-bold"
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="mt-8">
            {[
              { label: "Нүүр", path: "/" },
              { label: "Тухай", path: "/" },
              { label: "Аялал", path: "/" },
              { label: "Газрын зураг", path: "" },
              { label: "Нэвтрэх", path: "#" },
            ].map(({ label, path }) => (
              <li key={label} className="my-4 w-full">
                <button
                  onClick={() => handleNavigation(path)}
                  className="text-[24px] font-medium text-white cursor-pointer"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
