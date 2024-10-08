import { useState, useEffect } from "react";
import axios from "axios";

const useFetchMovieDetails = (id: string | undefined) => {
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=1645a51e3552af467fa874335328bec9`
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
