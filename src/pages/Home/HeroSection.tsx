import { useEffect, useState } from "react";
import { MovieCard } from "@/components/ui/MovieCard";
// import { getPopularMovies } from "@/lib/api"

type Movie = {
  title: string;
  poster: string;
  releaseDate: string;
};

const TMDB_API = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function HeroSection() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/popular?api_key=${TMDB_API}`,
        );

        const data = await res.json();

        setMovies(
          data.results.map((movie: any) => ({
            title: movie.title,
            poster: movie.poster_path
              ? `${IMAGE_BASE}${movie.poster_path}`
              : "",
            releaseDate: movie.release_date,
          })),
        );
      } catch (err) {
        console.error("Failed to fetch movies", err);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="bg-linear-to-b from-black/70 to-black py-5">
      <div className="p-6 grid grid-cols-4 gap-4 ">
        {movies.map((movie) => (
          <MovieCard
            key={movie.title}
            title={movie.title}
            image={movie.poster}
            date={movie.releaseDate}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
