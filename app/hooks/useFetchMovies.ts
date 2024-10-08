import { useState, useEffect } from "react";
import axios from "axios";

const API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;

const useSearchMovies = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  const searchMovies = async (query: string) => {
    if (!query) return;

    setLoading(true);
    setError(null);
    setIsSearching(true);

    try {
      const response = await axiosInstance.get(`/search/movie`, {
        params: { query },
      });
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
      const response = await axiosInstance.get(`/trending/movie/week`);
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
