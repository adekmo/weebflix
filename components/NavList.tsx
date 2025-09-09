"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  key: string;
  label: string;
  icon?: string;
};

type NavListProps = {
  type: "category" | "genre" | "producer";
  items?: NavItem[]; // static items (category, producer)
  fetchUrl?: string; // only for genre (dynamic)
};

const NavList = ({ type, items, fetchUrl }: NavListProps) => {
    const pathname = usePathname();
    const active = pathname.split("/")[2];
    const [data, setData] = useState<NavItem[]>([]);
    const [loading, setLoading] = useState(type === "genre");


    useEffect(() => {
        if (type === "genre") {
            if (!fetchUrl) return;

        async function fetchData() {
            try {
                const res = await fetch(fetchUrl as string);
                const json = await res.json();
                const genres = json.genres || [];
                setData(
                genres.map((g: string) => ({
                    key: g.toLowerCase().replace(/\s+/g, "-"),
                    label: g,
                }))
                );
            } catch (err) {
                console.error("Failed to fetch genres", err);
            } finally {
                setLoading(false);
            }
            }
            fetchData();
        } else if (items) {
            setData(items);
        }
        }, [type, fetchUrl, items]);

     if (loading) return <p>Loading {type}...</p>;
  return (
    <div
      className={`flex ${
        type === "genre" ? "overflow-x-auto scrollbar-thin" : "flex-wrap"
      } gap-3 mb-6`}
    >
      {data.map((item) => (
        <Link
          key={item.key}
          href={`/${type}/${item.key}`}
          className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-lg border shadow-sm transition ${
            active === item.key
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white hover:bg-gray-100 border-gray-300"
          }`}
        >
          {item.icon && <span>{item.icon}</span>}
          <span className="font-medium">{item.label}</span>
        </Link>
      ))}
    </div>
  )
}

export default NavList