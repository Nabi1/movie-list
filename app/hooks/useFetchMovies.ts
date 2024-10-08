import { useState, useEffect } from "react";
import axios from "axios";

const useSearchMovies = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const searchMovies = async (query: string) => {
    if (!query) return;

    setLoading(true);
    setError(null);
    setIsSearching(true);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=1645a51e3552af467fa874335328bec9`
      );
      setMovies(response.data.results);
    } catch (err) {
      setError("Error while fetching movies.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=1645a51e3552af467fa874335328bec9`
      );
      setMovies(response.data.results);
    } catch (err) {
      setError("Error while fetching trending movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isSearching) {
      fetchTrendingMovies();
    }
  }, [isSearching]);

  return { movies, searchMovies, loading, error };
};

export default useSearchMovies;
