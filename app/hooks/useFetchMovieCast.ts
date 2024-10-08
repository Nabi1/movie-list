import { useState, useEffect } from "react";
import axios from "axios";

const API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;

type CastMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

const useFetchMovieCast = (id: string | undefined) => {
  const [cast, setCast] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMovieCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
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
