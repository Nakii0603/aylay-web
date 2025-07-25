"use client";
import React, { useEffect, useRef } from "react";

const images = ["/logo/bg.png", "/logo/bg.png"];

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
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[1980px]">
      <div className="">
        <div
          ref={containerRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory "
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
      </div>
    </div>
  );
}
