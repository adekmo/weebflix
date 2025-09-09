"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const producers = [
  { key: "toei-animation", label: "Toei Animation", icon: "🐉" },
  { key: "madhouse", label: "Madhouse", icon: "🏠" },
  { key: "mappa", label: "MAPPA", icon: "🔥" },
  { key: "kyoto-animation", label: "Kyoto Animation", icon: "🌸" },
  { key: "a-1-pictures", label: "A-1 Pictures", icon: "🎨" },
  { key: "bones", label: "Bones", icon: "💀" },
];

const ProducerNav = () => {

    const pathname = usePathname();
    const active = pathname.split("/")[2];
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {producers.map((p) => (
        <Link
          key={p.key}
          href={`/producer/${p.key}`}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border shadow-sm transition ${
            active === p.key
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white hover:bg-gray-100 border-gray-300"
          }`}
        >
          <span>{p.icon}</span>
          <span className="font-medium">{p.label}</span>
        </Link>
      ))}
    </div>
  )
}

export default ProducerNav