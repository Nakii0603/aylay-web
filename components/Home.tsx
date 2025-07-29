// app/page.tsx or components/Home.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { aimags, allSurveys } from "@/Data";

const TERMS_KEY = "aylay_terms_accepted";

const images = [
  "/images/caroseal1.png",
  "/images/caroseal2.png",
  "/images/caroseal3.png",
];

// Mock data (replace with real imports)

export default function Home() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisibleTerms, setModalVisibleTerms] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(TERMS_KEY);
    if (!accepted) {
      setModalVisibleTerms(true);
    }
  }, []);

  const handleAgree = () => {
    localStorage.setItem(TERMS_KEY, "true");
    setModalVisibleTerms(false);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      let next = (currentIndex + 1) % images.length;
      setCurrentIndex(next);
      scrollRef.current?.scrollTo({
        left: next * window.innerWidth * 0.9,
        behavior: "smooth",
      });
    }, 3000);
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <main className="bg-[#eafff3] min-h-screen py-4">
      {/* Carousel */}
      <div className="overflow-hidden px-2">
        <div
          className="flex gap-2 transition-all"
          ref={scrollRef}
          style={{ width: `${images.length * 90}vw` }}
        >
          {images.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`carousel-${i}`}
              width={900}
              height={300}
              className="rounded-lg object-cover h-[300px] w-[90vw]"
            />
          ))}
        </div>
      </div>

      {/* Survey Horizontal Scroll */}
      <div className="overflow-x-auto px-2 mt-4 mb-6">
        <div className="flex gap-3 h-[150px]">
          {allSurveys.map((item, index) => (
            <button
              key={item.id}
              className="relative rounded-xl overflow-hidden shadow-md border border-[#00B686] min-w-[100px] w-[30vw] max-w-[150px]"
              onClick={() =>
                router.push(`/SurveyInfo?id=${item.id}&name=${item.section}`)
              }
            >
              <Image
                src={item.source}
                alt={item.section}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <span className="bg-white text-[#00B686] text-xs font-medium rounded-full px-2 py-1">
                  {item.section}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Aimags List */}
      <div className="px-4 space-y-4">
        {aimags.map((item) => (
          <button
            key={item.id}
            className="flex items-center bg-white p-4 rounded-lg shadow-md w-full"
            onClick={() =>
              router.push(`/${item.id}?name=${item.name}&area=${item.area}`)
            }
          >
            <Image
              src={item.source}
              alt={item.name}
              width={40}
              height={40}
              className="mr-4"
            />
            <div className="flex-1 text-left">
              <p className="font-semibold text-black">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.area}</p>
            </div>
            <p className="text-lg font-bold text-black">
              +{item.naturalSites?.length || 0}
            </p>
          </button>
        ))}
      </div>

      {/* Modal */}
      {modalVisibleTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="bg-white p-6 rounded-t-xl w-full max-h-[70%] overflow-y-auto">
            <h2 className="text-lg font-bold mb-3">
              Aylay Апп – Үйлчилгээний нөхцөл
            </h2>
            <p className="text-sm text-gray-700 whitespace-pre-line mb-4">
              {/* Shortened terms for display — full content can be loaded from markdown or DB */}
              Сүүлд шинэчилсэн: 2025.07.25{"\n\n"}
              Aylay апп ашигласнаар та энэхүү нөхцлийг зөвшөөрч байна.{"\n"}
              ...
            </p>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
              />
              <label className="ml-2">Би зөвшөөрч байна</label>
            </div>

            <button
              onClick={handleAgree}
              disabled={!agreed}
              className={`w-full py-2 text-white font-bold rounded-lg ${
                agreed ? "bg-[#00B686]" : "bg-gray-400"
              }`}
            >
              Үргэлжлүүлэх
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
