import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="relative p-2">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1600&auto=format&fit=crop"
            alt="Popular anime banner"
            className="h-[46vh] w-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="container flex h-[46vh] flex-col justify-end pb-8">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs uppercase tracking-widest text-white/70">Featured</p>
            <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              Explore the World of <span className="text-gradient">Weebflix</span>
            </h1>
            <p className="mt-3 text-white/80">
              Stream and discover anime by category, genre, producer, or A-Z. Clean, fast, and built for exploration.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild variant="neon">
                <Link href="/genre">Browse Genres</Link>
              </Button>
              <Button asChild variant="neon">
                <Link href="/category">Explore Categories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Hero