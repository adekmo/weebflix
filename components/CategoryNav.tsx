"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { key: "tv", label: "TV Series", icon: "📺" },
  { key: "movie", label: "Movies", icon: "🎬" },
  { key: "ova", label: "OVA", icon: "📀" },
  { key: "ona", label: "ONA", icon: "💻" },
  { key: "special", label: "Specials", icon: "⭐" },
];
const CategoryNav = () => {
    const pathname = usePathname();
    const active = pathname.split("/")[2];
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {categories.map((cat) => (
        <Link
          key={cat.key}
          href={`/category/${cat.key}`}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border shadow-sm transition ${
            active === cat.key
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white hover:bg-gray-100 border-gray-300"
          }`}
        >
          <span>{cat.icon}</span>
          <span className="font-medium">{cat.label}</span>
        </Link>
      ))}
    </div>
  )
}

export default CategoryNav