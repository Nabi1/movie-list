import { useState, useEffect } from "react";
import axios from "axios";

const API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;

const useFetchMovieDetails = (id: string | undefined) => {
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );
        setMovie(response.data);
        setError(null);
      } catch (error) {
        setError("Error while fetching movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return { movie, loading, error };
};

export default useFetchMovieDetails;
