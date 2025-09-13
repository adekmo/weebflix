import Link from 'next/link'
import React from 'react'

const QuickNav = () => {
  return (
    <section className="container -mt-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { to: "/category", label: "Category", emoji: "🗂️" },
            { to: "/genre", label: "Genre", emoji: "🏷️" },
            { to: "/producer", label: "Producer", emoji: "🏭" },
            { to: "/azlist", label: "A-Z List", emoji: "🔤" },
          ].map((n) => (
            <Link
              key={n.to}
              href={n.to}
              className="group flex items-center justify-between rounded-xl border bg-card p-4 transition hover:bg-accent"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{n.emoji}</span>
                <span className="font-semibold">{n.label}</span>
              </div>
              <span className="text-muted-foreground group-hover:translate-x-1 transition">→</span>
            </Link>
          ))}
        </div>
      </section>
  )
}

export default QuickNav