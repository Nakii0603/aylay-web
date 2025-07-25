"use client";
import React, { useEffect, useRef, useState } from "react";

const images = ["/image/cover1.jpg", "/image/cover2.jpg", "/image/cover3.jpg"];

export default function Carousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (currentIndex + 1) % images.length;
      scrollToIndex(newIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Scroll to a specific index
  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.offsetWidth * index;
      containerRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
      setCurrentIndex(index);
    }
  };

  return (
    <div className="w-full max-w-[1980px] mx-auto">
      <div>
        <div
          ref={containerRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory"
          onScroll={() => {
            if (containerRef.current) {
              const index = Math.round(
                containerRef.current.scrollLeft /
                  containerRef.current.offsetWidth
              );
              setCurrentIndex(index);
            }
          }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto object-cover flex-shrink-0 snap-center"
            />
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-blue-600" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
