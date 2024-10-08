"use client";
import React, { useEffect } from "react";
import { SearchBar } from "./components/SearchBar";
import { MovieCard } from "./components/MovieCard";
import useFetchMovies from "./hooks/useFetchMovies";

const HomePage = () => {
  const { movies, searchMovies, loading, error, loadMoreMovies, hasMore } =
    useFetchMovies();

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500
      ) {
        loadMoreMovies();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreMovies]);

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

      {!hasMore && <p className="text-center mt-4">Plus de films à charger</p>}
    </div>
  );
};

export default HomePage;
