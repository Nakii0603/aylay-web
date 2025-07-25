import React from "react";

const aimags = [
  {
    name: "Хэнтий аймаг",
    image: "/image/henti.png",
    rating: "5.0(35)",
  },
  {
    name: "Дундговь аймаг",
    image: "/image/dundgovi.png",
    rating: "5.0(35)",
  },
  {
    name: "Сүхбаатар аймаг",
    image: "/image/suh.png",
    rating: "5.0(35)",
  },
  {
    name: "Завхан аймаг",
    image: "/image/zawhan.png",
    rating: "5.0(35)",
  },
  {
    name: "Увс аймаг",
    image: "/image/uws.png",
    rating: "5.0(35)",
  },
  {
    name: "Хөвсгөл аймаг",
    image: "/image/huwsgul.png",
    rating: "5.0(35)",
  },
];

export default function Highlight() {
  return (
    <div className="flex flex-col items-center justify-center px-4 mb-8">
      <p className="text-[32px] md:text-[48px] mt-4 text-center font-semibold text-[#013632]">
        ОНЦЛОГ АЙМГУУД
      </p>

      {/* Responsive grid: 1 (mobile), 2 (tablet), 3 (desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 w-full max-w-[1200px]">
        {aimags.map((aimag, index) => (
          <div
            key={index}
            className="flex gap-4 items-center p-4 rounded-2xl bg-white"
            style={{ boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)" }}
          >
            <img
              className="w-[120px] h-[128px] md:w-[160px] md:h-[168px] object-cover"
              src={aimag.image}
              alt={aimag.name}
            />
            <div className="flex flex-col gap-1">
              <p className="text-base md:text-lg font-medium">{aimag.name}</p>
              <div className="flex items-center gap-1"> 
                <img src="/logo/star.png" className="w-[15px]" alt="" />
                <p className="text-sm text-gray-600">{aimag.rating}</p>
              </div>
              <div className="py-2 px-4 mt-1 bg-[#013632] text-white font-semibold rounded-[4px] cursor-pointer text-center w-fit">
                орж үзэх
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
