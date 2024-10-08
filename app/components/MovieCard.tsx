import React from "react";
import Link from "next/link";
import Image from "next/image";

type MovieCardProps = {
  movie: { id: number; title: string; poster_path: string };
};

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <article className="cursor-pointer p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <Link href={`/search/${movie.id}`}>
        <div className="relative w-full h-64 mb-4">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <h3 className="text-lg font-bold">{movie.title}</h3>
      </Link>
    </article>
  );
};
