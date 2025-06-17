"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ClientNav() {
  const pathname = usePathname();

  const hideBottomNav = pathname?.startsWith("/") ?? false;

  if (hideBottomNav) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2 z-50 md:hidden">
      <Link href="/dashboard" className="flex flex-col items-center text-sm">
        <span>🏠</span>
        <span>Нүүр</span>
      </Link>
      <Link href="/trip" className="flex flex-col items-center text-sm">
        <span>🧳</span>
        <span>Аяллууд</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center text-sm">
        <span>👤</span>
        <span>Би</span>
      </Link>
    </nav>
  );
}
