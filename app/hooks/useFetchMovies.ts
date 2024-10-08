import { useState, useEffect } from "react";
import axios from "axios";

const API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;

const useFetchMovies = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  const searchMovies = async (query: string, page: number = 1) => {
    if (!query) return;

    setLoading(true);
    setError(null);
    setIsSearching(true);

    try {
      const response = await axiosInstance.get(`/search/movie`, {
        params: { query, page },
      });

      if (page === 1) {
        setMovies(response.data.results);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      }

      setHasMore(response.data.results.length > 0);
    } catch (err) {
      setError("Error while fetching movies.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingMovies = async (page: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/trending/movie/week`, {
        params: { page },
      });

      if (page === 1) {
        setMovies(response.data.results);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      }

      setHasMore(response.data.results.length > 0);
    } catch (err) {
      setError("Error while fetching trending movies.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreMovies = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (isSearching) {
      searchMovies("", page);
    } else {
      fetchTrendingMovies(page);
    }
  }, [page, isSearching]);

  return { movies, searchMovies, loading, error, loadMoreMovies, hasMore };
};

export default useFetchMovies;
