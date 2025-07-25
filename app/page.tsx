import Auth from "@/components/Auth";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import Highlight from "@/components/Highlight";
import Info from "@/components/Info";
import Navbar from "@/components/Navbar";
import React from "react";

export default function page() {
  return (
    <div>
      <Navbar />
      <div className="m-auto max-w-[1980px]">
        <Carousel />
        <Info />
        <Highlight />
        <Footer />
      </div>
    </div>
  );
}
