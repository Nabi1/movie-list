import { useState, useEffect } from "react";
import axios from "axios";

const useFetchMovieCast = (id: string | undefined) => {
  const [cast, setCast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMovieCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=1645a51e3552af467fa874335328bec9`
        );
        setCast(response.data.cast.slice(0, 5));
        setError(null);
      } catch (error) {
        setError("Error while fetching the cast");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieCast();
  }, [id]);

  return { cast, loading, error };
};

export default useFetchMovieCast;
