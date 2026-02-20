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

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function fetchMovies(query: string): Promise<Movie[]> {
  const url = query
    ? `${BACKEND_URL}/api/movies/search?query=${encodeURIComponent(query)}`
    : `${BACKEND_URL}/api/movies/popular`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch movies");

  return res.json();
}

const HeroSection = ({ query }: HeroSectionProps) => {
  const {
    data: movies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movies", query],
    queryFn: () => fetchMovies(query),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* ─────────────────────────────── */}
      {/* PART 1: The Hero Area */}
      {/* ─────────────────────────────── */}
      <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <MovieCarousel />
        </div>

        {/* Subtle Bottom Blend: It's at the very bottom 
            to ensure the video doesn't end in a "hard line" before the grid starts.
        */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
      </div>

      <div className="relative z-10 -mt-20">
        {/* BACKGROUND ACCENTS */}
        {/* 1. Base Vertical */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-neutral-950 pointer-events-none" />

        {/* 2. Bottom Green*/}
        <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-emerald-500/10 blur-[150px] rounded-[100%] translate-y-1/2 pointer-events-none" />

        {/* 3. Right Cyan/Blue */}
        <div className="absolute top-0 right-0 h-full w-[40%] bg-cyan-500/10 blur-[120px] rounded-l-full translate-x-1/4 pointer-events-none" />

        {/* MAIN CONTENT */}
        <div className="relative z-20 py-12 px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20">
          <div className="mb-10 md:mb-16">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight tracking-tighter">
              {query ? "Search Results for" : "Discover"}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 drop-shadow-2xl">
                {query || "Popular Movies"}
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-xl text-gray-400 max-w-2xl font-light">
              {query
                ? `Exploring cinematic matches for "${query}"`
                : "Curating the most acclaimed and trending titles across the globe."}
            </p>
          </div>

          <div className="relative z-30">
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
                {[...Array(14)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-2/3 bg-neutral-900/40 border border-white/5 rounded-2xl animate-pulse"
                    style={{ animationDelay: `${i * 80}ms` }}
                  />
                ))}
              </div>
            ) : isError ? (
              <div className="text-center py-20 bg-black/20 rounded-3xl border border-red-500/10 backdrop-blur-sm">
                <p className="text-red-400 text-xl font-semibold italic">
                  Cinematic connection failed.
                </p>
                <p className="text-gray-400 mt-2">
                  Check your signal and try again.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
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
      </div>
    </section>
  );
};

export default HeroSection;
