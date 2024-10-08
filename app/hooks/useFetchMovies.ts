import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

type Movie = {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

const useFetchMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeQuery, setActiveQuery] = useState("");

  const fetchTrendingMovies = useCallback(async (page: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/trending/movie/week`, {
        params: { page },
      });

      setMovies((prevMovies) =>
        page === 1
          ? response.data.results
          : [...prevMovies, ...response.data.results]
      );

      setHasMore(response.data.results.length > 0);
    } catch (err) {
      console.error(err);
      setError("Error while fetching trending movies.");
    } finally {
      setLoading(false);
    }
  }, []);

  const searchMovies = useCallback(
    async (query: string, page: number = 1) => {
      setActiveQuery(query);

      if (!query.trim()) {
        setPage(1);
        return fetchTrendingMovies(1);
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(`/search/movie`, {
          params: { query, page },
        });

        setMovies((prevMovies) =>
          page === 1
            ? response.data.results
            : [...prevMovies, ...response.data.results]
        );

        setHasMore(response.data.results.length > 0);
      } catch (err) {
        console.error(err);
        setError("Error while fetching movies.");
      } finally {
        setLoading(false);
      }
    },
    [fetchTrendingMovies]
  );

  const loadMoreMovies = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (activeQuery) {
      searchMovies(activeQuery, page);
    } else {
      fetchTrendingMovies(page);
    }
  }, [page, activeQuery, searchMovies, fetchTrendingMovies]);

  return { movies, searchMovies, loading, error, loadMoreMovies, hasMore };
};

export default useFetchMovies;
