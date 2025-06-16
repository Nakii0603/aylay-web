// app/tours/page.tsx
import Link from "next/link";
import { tours } from "@/data"; 

export default function ToursPage() {
  return (
    <div className="flex max-w-[1440px] mt-[40px] flex-wrap justify-around gap-8 mx-auto">
      {tours.map((tour) => (
        <Link href={`/tours/${tour.slug}`} key={tour.slug}>
          <div className="cursor-pointer max-w-[400px] transition-transform transform hover:scale-105 hover:shadow-2xl shadow-lg rounded-[12px] overflow-hidden bg-white">
            <img
              src={tour.img}
              alt={tour.title}
              className="h-[280px] rounded-tl-[12px] rounded-tr-[12px] w-full object-cover"
            />
            <div className="p-4">
              <p className="text-[24px] font-semibold">{tour.title}</p>
              <p className="text-gray-600">{tour.days}</p>
              <p className="text-gray-800 font-medium">{tour.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
