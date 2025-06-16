import Link from "next/link";
export const tours = [
  {
    img: "/img1.jpg",
    title: "Говийн Уулс ба Элсэн Манхан",
    days: "6 хоног",
    price: "$800",
    slug: "goviin-uuls",
    description:
      "Энэ аялал нь Говь нутгийн онцлог уулс болон алдартай Хонгорын элсийг хамарна.",
  },
  {
    img: "/img2.jpg",
    title: "Энерги, Тал хээр ба Цагаан элс",
    days: "4 хоног",
    price: "$500",
    slug: "tsagaan-els",
    description:
      "Монголын төв хэсгийн тал хээр, сэтгэл татам Цагаан элсийг үзэх аялал.",
  },
  {
    img: "/img6.jpg",
    title: "Энерги, Тал хээр ба Цагаан элс",
    days: "4 хоног",
    price: "$500",
    slug: "hongor-els",
    description:
      "Монголын төв хэсгийн тал хээр, сэтгэл татам Цагаан элсийг үзэх аялал.",
  },
];
export default function Cards() {
  return (
    <div className="flex flex-wrap justify-around gap-8">
      {tours.map((card) => (
        <Link href={`/tours/${card.slug}`} key={card.slug}>
          <div className="max-w-[400px] bg-white shadow-lg rounded-[12px] overflow-hidden hover:scale-105 transition-transform">
            <img
              src={card.img}
              className="h-[280px] w-full object-cover"
              alt={card.title}
            />
            <div className="p-4">
              <p className="text-xl font-semibold">{card.title}</p>
              <p className="text-gray-600">{card.days}</p>
              <p className="text-gray-800 font-medium">{card.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
