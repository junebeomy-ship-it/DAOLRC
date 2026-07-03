"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";

export default function TabNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto">
      {CATEGORIES.map((category) => {
        const href = `/${category.slug}`;
        const isActive = pathname === href;
        return (
          <Link
            key={category.slug}
            href={href}
            className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "border-neutral-900 text-neutral-900"
                : "border-transparent text-neutral-500 hover:text-neutral-800"
            }`}
          >
            {category.label}
          </Link>
        );
      })}
    </nav>
  );
}
