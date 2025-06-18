"use client";

import ClientNav from "@/components/ClientNav";
import { useParams } from "next/navigation";
import { useState } from "react";

interface Friend {
  name: string;
  paid: boolean;
  joined: boolean;
}

export default function TripDetailPage() {
  const { id } = useParams();

  const [friends] = useState<Friend[]>([
    { name: "Батаа", paid: true, joined: true },
    { name: "Сараа", paid: true, joined: true },
    { name: "Мөнхөө", paid: true, joined: true },
    { name: "Нараа", paid: false, joined: false },
  ]);

  const paymentPerFriend = 500_000;
  const numberOfFriends = friends.length;

  // Нийт төлсөн мөнгө
  const totalCollected =
    friends.filter((friend) => friend.paid).length * paymentPerFriend;

  // Хүүгийн тооцоо (жилийн 5%, 30 хоног)
  const interestRateAnnual = 0.05;
  const days = 30;
  const dailyRate = interestRateAnnual / 365;

  const calculateInterest = (amount: number) => {
    return amount * Math.pow(1 + dailyRate, days);
  };

  const totalWithInterest = calculateInterest(totalCollected);

  // Торгууль бодох: төлсөн ч яваагүй - 50К, төлөөгүй & яваагүй - 25К
  const getPenalty = (friend: Friend) => {
    if (!friend.joined && friend.paid) return 50_000;
    if (!friend.joined && !friend.paid) return 25_0000;
    return 0;
  };

  const totalPenalties = friends.reduce(
    (sum, friend) => sum + getPenalty(friend),
    0
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4">
          🧭 Аяллын дэлгэрэнгүй (ID: {id})
        </h1>

        <ul className="space-y-2 mb-6">
          {friends.map((friend, index) => (
            <li
              key={index}
              className="flex justify-between bg-gray-100 p-3 rounded border"
            >
              <span className="font-semibold">{friend.name}</span>
              <span>
                {friend.paid ? "💰 Төлсөн" : "❌ Төлөөгүй"} |{" "}
                {friend.joined ? "✅ Ирсэн" : "🚫 Яваагүй"} | Торгууль:{" "}
                <span className="font-mono">
                  {getPenalty(friend).toLocaleString()}₮
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className="text-sm space-y-2">
          <p>
            👥 <strong>Нийт найзуудын тоо:</strong> {numberOfFriends}
          </p>
          <p>
            💵 <strong>Нэг хүний төлөх дүн:</strong>{" "}
            {paymentPerFriend.toLocaleString()}₮
          </p>
          <p>
            💰 <strong>Нийт цугласан мөнгө:</strong>{" "}
            {totalCollected.toLocaleString()}₮
          </p>
          <p>
            📈 <strong>Хүүтэй дүн (30 хоног):</strong>{" "}
            {totalWithInterest.toFixed(0).toLocaleString()}₮
          </p>
          <p>
            ⚠️ <strong>Нийт торгууль:</strong> {totalPenalties.toLocaleString()}
            ₮
          </p>
        </div>
      </div>
      <ClientNav />
    </div>
  );
}
