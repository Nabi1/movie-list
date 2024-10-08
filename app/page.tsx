"use client";
import React from "react";

import { SearchBar } from "./components/SearchBar";
import { MovieCard } from "./components/MovieCard";
import useFetchMovies from "./hooks/useFetchMovies";

const HomePage = () => {
  const { movies, searchMovies, loading, error } = useFetchMovies();

  return (
    <div className="p-4">
      <SearchBar onSearch={searchMovies} />

      {loading && <p>Chargement des films...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
