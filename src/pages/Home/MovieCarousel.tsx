export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date: string;
}

import { useEffect, useState } from "react";

const MovieCarousel = () => {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);

  // Fetch movies on component mount
  const fetchCarouselMovies = async (): Promise<TMDBMovie[]> => {
    try {
      const res = await fetch("YOUR_TMDB_API_ENDPOINT");
      const data = await res.json();
      return data.results; // assuming TMDB API returns { results: TMDBMovie[] }
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchCarouselMovies().then(setMovies);
  }, []);

  return (
    <div className="relative h-[70vh] m-0">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            movies[0]?.backdrop_path
              ? `url(https://image.tmdb.org/t/p/w1280${movies[0].backdrop_path})`
              : `url(https://image.tmdb.org/t/p/w1280/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg)`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  );
};

export default MovieCarousel;
