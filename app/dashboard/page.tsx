"use client";
import ClientNav from "@/components/ClientNav";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const trips = [
    {
      id: "1",
      title: "Говь руу аялал",
      date: "2025-07-01",
      img: "/govi.jpg",
    },
    {
      id: "2",
      title: "Хөвсгөл нуур аялал",
      date: "2025-08-10",
      img: "/huwsgul.jpeg",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">🌍 Аяллын сан</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {trips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => router.push(`/trip/${trip.id}`)}
            className="cursor-pointer p-4 bg-white shadow rounded hover:bg-gray-200 transition"
          >
            <img src={trip.img} alt="" />
            <h2 className="text-lg font-semibold">{trip.title}</h2>
            <p className="text-sm text-gray-600">📅 {trip.date}</p>
          </div>
        ))}
      </div>
      <ClientNav />
    </div>
  );
}
