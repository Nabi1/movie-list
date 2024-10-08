"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import useFetchMovieDetails from "../../hooks/useFetchMovieDetails";
import useFetchMovieCast from "../../hooks/useFetchMovieCast";

export default function MovieDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const {
    movie,
    loading: loadingMovie,
    error: errorMovie,
  } = useFetchMovieDetails(params.id);
  const {
    cast,
    loading: loadingCast,
    error: errorCast,
  } = useFetchMovieCast(params.id);

  if (loadingMovie || loadingCast) {
    return <p>Chargement...</p>;
  }

  if (errorMovie || errorCast) {
    return <p>Erreur : {errorMovie || errorCast}</p>;
  }

  if (!movie) {
    return <p>Film non trouvé</p>;
  }

  return (
    <div className="p-4 max-w-lg mx-auto my-10">
      <Link href="/">&larr; Retour à la recherche</Link>

      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={500}
        height={750}
        className="w-full h-auto rounded-lg my-5"
      />
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <p className="text-gray-700 mb-5">{movie.overview}</p>

      {cast.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-3">Casting</h2>
          <ul className="list-disc pl-5">
            {cast.map((actor) => (
              <li key={actor.cast_id}>
                <strong>{actor.name}</strong> as <em>{actor.character}</em>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
