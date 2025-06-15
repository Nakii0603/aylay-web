"use client";
import React, { useEffect, useRef } from "react";

const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg"];

export default function Carousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        currentIndex.current = (currentIndex.current + 1) % images.length;

        containerRef.current.scrollTo({
          left: containerRef.current.offsetWidth * currentIndex.current,
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative m-auto overflow-hidden">
      <p className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold">
        Explore the 4 Aimags of the Gobi
      </p>
      <div
        ref={containerRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory w-full "
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-[100vh] object-cover flex-shrink-0 snap-center"
          />
        ))}
      </div>
    </div>
  );
}
