import React from "react";
import Link from "next/link";

type MovieCardProps = {
  movie: { id: number; title: string; poster_path: string };
};

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <article className="cursor-pointer p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <Link href={`/search/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h3 className="text-lg font-bold">{movie.title}</h3>
      </Link>
    </article>
  );
};
