import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-[#013632] text-white px-8 py-12 overflow-hidden">
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-5 sca pointer-events-none"
        src="/image/aylaybg.png"
        alt="background"
      />
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h3 className="text-lg font-bold mb-4">Aylay.mn</h3>
          <ul className="space-y-2">
            <li>
              <a href="" className="underline">
                Бидний тухай
              </a>
            </li>
            <li>
              <a href="" className="underline">
                Веб үйлчилгээ
              </a>
            </li>
            <li>
              <a href="" className="underline">
                Үйлчилгээний нөхцөл
              </a>
            </li>
            <li>
              <a href="" className="underline">
                Нууцлалын бодлого
              </a>
            </li>
            <li>
              <a href="" className="underline">
                Бүтээгдэхүүн үйлчилгээ
              </a>
            </li>
            <li>
              <a href="" className="underline">
                Сэтгэгдлүүд
              </a>
            </li>
            <li>
              <a href="" className="underline">
                Аюулгүй ажиллагаа заавар, гарын авлага
              </a>
            </li>
          </ul>
        </div>

        {/* Тусламж Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Тусламж</h3>
          <ul className="space-y-2">
            <li>
              <a href="" className="underline">
                Аялал хэрхэн захиалах вэ?
              </a>
            </li>
            <li>
              <a href="" className="underline">
                Аяллын лизинг хэрхэн авах вэ?
              </a>
            </li>
            <li>
              <a href="" className="underline">
                Байгууллагын тусгай хуудас
              </a>
            </li>
            <li>
              <a href="" className="underline">
                Зочид буудлын тусгай хуудас
              </a>
            </li>
            <li>
              <a href="" className="underline">
                Байгууллага хамт олны аялал
              </a>
            </li>
          </ul>
        </div>

        {/* Миний булан Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Миний булан</h3>
          <ul className="space-y-2">
            <li>
              <a href="" className="underline">
                Нэвтрэх
              </a>
            </li>
            <li>
              <a href="" className="underline">
                Шинээр бүртгүүлэх
              </a>
            </li>
            <li>
              <a href="" className="underline">
                Хүслийн аялал
              </a>
            </li>
          </ul>
        </div>

        {/* Хаяг + Холбоо барих */}
        <div>
          <h3 className="text-lg font-bold mb-4">Хаяг</h3>
          <p className="mb-2">
            Улаанбаатар хот, Чингэлтэй дүүрэг, 24-р хороо
            <br />
            BLYE төвийн баруун талд байрлах Моффис 2 давхарт
          </p>
          <h4 className="text-lg font-bold mt-6 mb-2">Холбоо барих</h4>
          <ul className="space-y-2">
            <li>
              IG: Aylay.mn <span className="inline-block ml-2">📷</span>
            </li>
            <li>
              FB: Aylay.mn <span className="inline-block ml-2">📘</span>
            </li>
            <li>
              Утас: 99112233 <span className="inline-block ml-2">📞</span>
            </li>
            <li>И-мэйл: a@Aylay.mn</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
