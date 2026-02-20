// MovieCarousel.tsx
import { useEffect, useState, useRef, useCallback } from "react";
import { Play, Info } from "lucide-react";

interface MovieCarouselProps {
  apiKey: string;
}

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date: string;
}

interface TMDBTrendingResponse {
  results: TMDBMovie[];
}

const DEFAULT_HERO = {
  title: "The Rip",
  overview:
    "Trust frays when a team of Miami cops discovers millions in cash inside a run-down stash house, calling everyone and everything into question.",
};

const MovieCarousel = ({ apiKey }: MovieCarouselProps) => {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const timerRef = useRef<number | null>(null);

  const fetchMovies = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`,
      );

      if (!res.ok) throw new Error("TMDB request failed");

      const data: TMDBTrendingResponse = await res.json();

      if (data.results && data.results.length > 0) {
        setMovies(data.results.slice(0, 5));
        setCurrentIndex(0);
      }
    } catch (err) {
      console.error("Failed to fetch trending movies", err);
      setMovies([]);
    }
  }, [apiKey]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    if (movies.length <= 1 || isPaused || isDragging) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    // i%5=rem ensures the index wraps around when it reaches the end
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [movies.length, isPaused, isDragging]);

  const currentMovie = movies[currentIndex] || null;
  const backdropUrl = currentMovie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`
    : "https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg";

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsPaused(true);
    setIsDragging(true);
    startX.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    // deltaX can be used later for drag preview
  };

  const handlePointerUp = (e: React.PointerEvent | PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaX = e.clientX - startX.current;

    if (Math.abs(deltaX) > 80) {
      if (deltaX > 0) {
        setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
      } else {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
      }
    }

    setTimeout(() => setIsPaused(false), 8000);
  };

  const handleClick = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  return (
    <div
      className="relative h-[60vh] sm:h-[70vh] md:h-[75vh] w-full overflow-hidden select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleClick}
    >
      {/* Backdrop */}
      <div
        key={currentIndex}
        className="absolute inset-0 bg-cover bg-center scale-[1.05] transition-all duration-1000 ease-out opacity-100"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      />

      {/* Overlays radial vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent/20 opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/50 via-transparent to-transparent opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_104%,transparent_40%,black_80%)] opacity-80 pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-end pb-10 sm:pb-14 md:pb-20 px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-3xl space-y-3 md:space-y-4 animate-fade-in">
          {" "}
          {/* Metadata row temp */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-1.5 py-0.5 text-xs sm:text-sm font-bold bg-neutral-200/20 border border-emerald-800/50 rounded">
              16+
            </span>
            <span className="text-sm sm:text-base text-gray-300">
              Action • Adventure • Sci-Fi
            </span>
          </div>
          <h1
            className={`
              text-3xl sm:text-5xl md:text-6xl lg:text-7xl
              font-black text-white leading-tight
              drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]
              max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%]
              line-clamp-2
            `}
          >
            {currentMovie ? currentMovie.title : DEFAULT_HERO.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-100/90 leading-relaxed drop-shadow-md line-clamp-4 md:line-clamp-none max-w-prose">
            {currentMovie ? currentMovie.overview : DEFAULT_HERO.overview}
          </p>
          <div className="flex flex-wrap gap-4 pt-1 md:pt-2">
            <button className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-650 active:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg shadow-lg shadow-emerald-900/40 transition-all duration-300 hover:scale-105 hover:shadow-emerald-600/50 ring-1 ring-emerald-400/40 hover:ring-emerald-400/70">
              <Play className="w-5 sm:w-6 h-5 sm:h-6 fill-white" />
              Watch Trailer
            </button>
            <button className="flex items-center gap-2.5 bg-neutral-900/75 hover:bg-neutral-800/85 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border border-emerald-700/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-emerald-900/30">
              <Info className="w-5 sm:w-6 h-5 sm:h-6" />
              More Details
            </button>
          </div>
        </div>
      </div>

      {/* Dots indicator */}
      {movies.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
          {movies.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 8000);
              }}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "bg-emerald-400 w-8 shadow-emerald-500/50 shadow-md"
                  : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieCarousel;
