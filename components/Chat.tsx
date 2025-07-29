"use client";

import { useEffect, useRef, useState } from "react";

const SERVER_URI = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Сайн байна уу! Танд хэрхэн туслах вэ?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const newMessages = [...messages, { role: "user", content: trimmedInput }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${SERVER_URI}/api/chatMessage/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedInput }),
      });

      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();

      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Алдаа гарлаа. Дахин оролдоно уу." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-100">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`w-fit p-3 rounded-xl shadow-sm ${
              msg.role === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-300 text-black self-start mr-auto"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="text-gray-500 text-sm">Хариу илгээж байна...</div>
        )}
      </div>

      <div className="flex items-center p-4 border-t bg-white">
        <input
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Асуух зүйлээ бичнэ үү..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-blue-300"
          onClick={sendMessage}
          disabled={loading}
        >
          Илгээх
        </button>
      </div>
    </div>
  );
}
