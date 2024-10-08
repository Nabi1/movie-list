import React from "react";

import { MovieCard } from "./MovieCard";

type MovieListProps = {
  movies: {
    id: number;
    title: string;
    poster_path: string;
  }[];
};

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
