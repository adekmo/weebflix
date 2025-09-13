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
  type: "category" | "genre" | "producer" | "azlist";
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
      className={`flex flex-wrap gap-3 mb-6`}
    >
      {data.map((item) => (
        <Link
          key={item.key}
          href={`/${type}/${item.key}`}
          className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-lg border shadow-sm transition ${
            active === item.key
              ? "bg-[hsl(var(--neon))] text-[hsl(var(--neon-foreground))] shadow-[0_0_0_1px_rgba(6,182,212,0.55)_inset,0_0_12px_rgba(6,182,212,0.35),0_0_28px_rgba(6,182,212,0.25)] hover:shadow-[0_0_0_1px_rgba(6,182,212,0.7)_inset,0_0_16px_rgba(6,182,212,0.5),0_0_40px_rgba(6,182,212,0.35)] hover:bg-[hsl(var(--neon))]/90"
              : "bg-card text-primary hover:bg-[hsl(var(--neon))] border-[hsl(var(--neon))]/90"
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