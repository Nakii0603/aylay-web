"use client";
import { useState } from "react";
import { tours } from "@/Data";

interface Params {
  slug: string;
}

interface Props {
  params: Params;
}

export default function TourDetailsPage() {
  // Uncomment and use the tour data if available
  // const tour = tours.find((t) => t.slug === params.slug);

  // State to manage the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = ["/img3.jpg", "/img4.jpg", "/img5.jpg"];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="bg-[#f5e1cd] min-h-screen text-[#6b3e1d]">
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: "url(/img4.jpg)" }}
      >
        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-4xl font-bold">
            Байгалийн үзэсгэлэнт газруудын аялал (Говийн бүсээр) – 7 хоног
          </h1>
          <div className="mt-4 flex gap-4">
            <button className="bg-[#a5602d] px-4 py-2 rounded text-white">
              4 DAYS
            </button>
            <button className="bg-[#a5602d] px-4 py-2 rounded text-white">
              FROM $1000
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="mb-8">
          7 хоногийн турш говийн байгалийн бүх төрлийн ландшафт: хад, уул, мөсөн
          хавцал, элс, тал Майхантай эсвэл гэр буудал хосолсон байгальд ойрхон
          байрлах аялал Шөнийн тэнгэр, зэрлэг ан амьтан, элсэн шуурганд аялж
          үзэх ховор туршлага.
        </p>

        <h2 className="text-2xl font-bold mb-4">Highlights</h2>
        <ul className="list-disc list-inside space-y-2 mb-8">
          <li>Хадан тогтоц, агуй, хадны сүг зураг, майхантай буудаллах</li>
          <li>Уул хаданд авиралт, түүхэн агуй, зэрлэг ан амьтан үзэх</li>
          <li> Мөсөн хавцал дундуур алхах, Говийн гурван сайхан уулс</li>
          <li>Улаан хөрст хадан цохио, динозаврын чулуужсан яс</li>
          <li>180 км үргэлжлэх элсэн манхан, тэмээ унах, наран мандах харах</li>
          <li>Элсэн хээр, говийн энергийн төв</li>
          <li> Буцах замдаа говийн тал нутгаар аялал, зураг авалт</li>
        </ul>

        {/* Image Carousel */}
        <div className="relative mb-4">
          <div className="overflow-hidden">
            <img
              src={images[currentImageIndex]}
              alt="Tour Image"
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </div>
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#a5602d] p-2 rounded-full text-white"
            onClick={prevImage}
          >
            &#10094;
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#a5602d] p-2 rounded-full text-white"
            onClick={nextImage}
          >
            &#10095;
          </button>
        </div>

        <button className="bg-[#a5602d] px-6 py-3 text-white font-semibold rounded md:mt-0 hover:bg-[#8b4a1e] transition">
          BOOK NOW
        </button>
      </div>
    </div>
  );
}
