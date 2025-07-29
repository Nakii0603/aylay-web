"use client"; // client component бол заавал энэ мөрийг нэмнэ

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, use } from "react"; // use-г импортлоно
import { aimags } from "@/app/Data";

export default function AimagDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params); // энд promise-г задлана
  const router = useRouter();
  const aimagId = Number(unwrappedParams.id);
  const aimag = aimags.find((a) => a.id === aimagId);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!aimag) return <div>Аймаг олдсонгүй</div>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      {/* Header image */}
      {aimag.image ? (
        <Image
          src={aimag.image}
          alt={aimag.name}
          width={800}
          height={400}
          style={{ objectFit: "cover", width: "100%", height: "auto" }}
        />
      ) : (
        <div
          style={{
            height: 200,
            backgroundColor: "#ddd",
            textAlign: "center",
            paddingTop: 80,
          }}
        >
          Зураг байхгүй
        </div>
      )}

      {/* Title + Coat */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginTop: 20,
        }}
      >
        <h1>{aimag.name}</h1>
        <Image src="/icons/coat.png" alt="Coat" width={30} height={30} />
      </div>

      {/* Description */}
      <section style={{ marginTop: 20 }}>
        <h2>Товч танилцуулга</h2>
        <p style={{ lineHeight: 1.6 }}>{aimag.description}</p>
      </section>

      {/* Stats */}
      <section
        style={{ display: "flex", flexWrap: "wrap", gap: 15, marginTop: 20 }}
      >
        <StatBox
          label="Хүн амын тоо"
          value={aimag.population?.toLocaleString() || "?"}
        />
        <StatBox label="Сумын тоо" value={aimag.sum.toString()} />
        <StatBox label="Нийт талбай" value={aimag.area} />
        <StatBox label="Онцлог" value={aimag.features} />
      </section>

      {/* Natural sites */}
      <h2 style={{ marginTop: 30 }}>Үзэсгэлэнт газрууд</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {aimag.naturalSites && aimag.naturalSites.length > 0 ? (
          aimag.naturalSites.map((site, index) => (
            <div
              key={index}
              style={{
                width: "calc(50% - 10px)",
                backgroundColor: "#f9f9f9",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              }}
            >
              <Image
                src={site.image}
                alt={site.name}
                width={400}
                height={200}
                style={{ objectFit: "cover", width: "100%", height: "auto" }}
              />
              <div style={{ padding: 10 }}>
                <h3>{site.name}</h3>
                <p style={{ color: "#555", fontSize: 14, lineHeight: 1.4 }}>
                  {expandedIndex === index
                    ? site.description
                    : truncate(site.description, 80)}
                </p>
                {site.description.length > 80 && (
                  <button
                    onClick={() =>
                      setExpandedIndex(expandedIndex === index ? null : index)
                    }
                    style={{
                      background: "none",
                      border: "none",
                      color: "#0070f3",
                      cursor: "pointer",
                      padding: 0,
                      fontSize: 14,
                    }}
                  >
                    {expandedIndex === index ? "Хураах" : "Дэлгэрэнгүй унших"}
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p style={{ fontStyle: "italic" }}>Үзэсгэлэнт газар алга.</p>
        )}
      </div>

      {/* Back button */}
      <button
        onClick={() => router.back()}
        style={{
          marginTop: 30,
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        ← Буцах
      </button>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        flexBasis: "47%",
        backgroundColor: "#f5f5f5",
        padding: 10,
        borderRadius: 10,
      }}
    >
      <p style={{ fontSize: 13, color: "#888", margin: 0 }}>{label}</p>
      <p style={{ fontWeight: "600", fontSize: 16, margin: 0, marginTop: 4 }}>
        {value}
      </p>
    </div>
  );
}

function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
