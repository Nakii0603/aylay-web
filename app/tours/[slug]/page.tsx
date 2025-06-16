"use client";
import { useState } from "react";
import { tours } from "@/data"; 

interface Params {
  slug: string;
}

interface Props {
  params: Params;
}

export default function TourDetailsPage({ params }: Props) {
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
        style={{ backgroundImage: `url('/gobi-sand-dunes.jpg')` }}
      >
        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-4xl font-bold">KHONGOR SAND DUNES</h1>
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
          Touring in the Omnogovi aimag of Mongolia’s Gobi Desert: towering
          heights up to 100 miles. Its golden sands and vibrant colors shift
          with the winds, providing an unforgettable experience.
        </p>

        <h2 className="text-2xl font-bold mb-4">Highlights</h2>
        <ul className="list-disc list-inside space-y-2 mb-8">
          <li>Explore the vast Khongor Sand Dunes</li>
          <li>Experience a camel ride across the desert</li>
          <li>Visit a traditional nomadic family</li>
          <li>Enjoy panoramic views from the Singing Dune</li>
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
