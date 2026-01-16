import { useQuery } from "@tanstack/react-query";
import { MovieCard } from "@/components/MovieCard";
import MovieCarousel from "@/pages/Home/MovieCarousel";

type Movie = {
  id: number;
  title: string;
  poster: string;
  releaseDate: string;
};

type HeroSectionProps = {
  query: string;
};

const TMDB_API = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

async function fetchMovies(query: string): Promise<Movie[]> {
  const url = query
    ? `${BASE_URL}/search/movie?api_key=${TMDB_API}&query=${query}`
    : `${BASE_URL}/movie/popular?api_key=${TMDB_API}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch movies");

  const data = await res.json();

  return data.results.slice(0, 14).map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : "",
    releaseDate: movie.release_date,
  }));
}

const HeroSection = ({ query }: HeroSectionProps) => {
  const {
    data: movies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movies", query],
    queryFn: () => fetchMovies(query),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Enhanced Background Layers */}
      <div className="absolute inset-0 bg-linear-to-b from-emerald-950 via-black to-black opacity-90" />
      {/* Deep gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-tr from-emerald-900/20 via-transparent to-purple-900/20" />
      {/* subtle noise texture */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23noise)' opacity='0.8'/%3E%3C/svg%3E")`,
        }}
      />
      <MovieCarousel />

      {/* Content Container */}
      <div className="relative z-10 py-2 px-6 md:px-12">
        {/* Hero Header */}
        <div className="max-w-7xl mx-auto mb-4">
          <h1 className="text-4xl md:text-4xl lg:text-4xl font-bold text-white leading-tight">
            {query ? "Search Results for" : "Discover"}{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300 drop-shadow-2xl">
              {query || "Popular Movies"}
            </span>
          </h1>
          <p className="mt-0 text-lg text-gray-300 max-w-2xl">
            {query
              ? `Explore movies matching "${query}"`
              : "Browse the most popular and trending movies right now."}
          </p>
        </div>

        {/* Movie Grid */}
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6">
              {[...Array(14)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-2/3 bg-linear-to-t from-neutral-900 to-neutral-800 rounded-xl animate-pulse shadow-2xl"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          ) : isError ? (
            <p className="text-red-400">Failed to load movies.</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  image={movie.poster}
                  date={movie.releaseDate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
