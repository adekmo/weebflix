import Link from "next/link";

interface AnimeCardProps {
  id: string;
  title: string;
  image: string;
}

const AnimeCard = ({ id, title, image }: AnimeCardProps) => {
  return (
    <Link href={`/anime/${id}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
        <img src={image} alt={title} className="w-full h-64 object-cover" />
        <div className="p-3">
          <h3 className="text-lg font-semibold truncate">{title}</h3>
        </div>
      </div>
    </Link>
  )
}

export default AnimeCard