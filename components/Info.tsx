
import React from "react";

export default function Info() {
  return (
    <div className="flex flex-col items-center justify-centen">
      <div className="flex justify-evenly flex-wrap gap-4 mt-5 p-3 items-center w-[90%]">
        <div className="text-white bg-[#013632] px-8 py-6 max-w-[450px] rounded-[10px]">
          <h1 className="text-[36px] p-2 max-md:text-[24px] font-semibold">
            Товч танилцуулга
          </h1>
          <p className="text-[18px] max-md:text-[14px] font-semibold">
            “Аялая” бол Монголын хамгийн үзэсгэлэнт байгалийг аялагчдад
            танилцуулах, аяллын хөтөлбөрүүдийг нэг дороос санал болгох аялал
            жуулчлалын цахим платформ юм. Бид танд:
          </p>
        </div>
        <div className="flex flex-col ml-5 gap-6 max-sm:gap-0">
          <li className="text-[24px] max-md:text-[16px] text-[#013632] font-medium">
            Тусгайлан бэлтгэсэн аяллын багц, хөтөлбөрүүд
          </li>
          <li className="text-[24px] max-md:text-[16px] text-[#013632] font-medium">
            Аялах газруудын нарийвчилсан мэдээлэл, зураг
          </li>
          <li className="text-[24px] max-md:text-[16px] text-[#013632] font-medium">
            Захиалга болон төлбөрийн онлайн систем
          </li>
          <li className="text-[24px] max-md:text-[16px] text-[#013632] font-medium">
            Аяллын зөвлөгөө, блог, хэрэглэгчийн сэтгэгдэл
          </li>
        </div>
      </div>
    </div>
  );
}
