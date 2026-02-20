import { useEffect, useState, useRef, useCallback } from "react";
import { Play, Info } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  next,
  prev,
  setIndex,
  pause,
  resume,
} from "@/store/slices/carouselSlice";

export interface Movie {
  id: number;
  title: string;
  overview?: string;
  poster: string;
  backdrop?: string;
  releaseDate: string;
}

const DEFAULT_HERO = {
  title: "The Rip",
  overview:
    "Trust frays when a team of Miami cops discovers millions in cash inside a run-down stash house, calling everyone and everything into question.",
  backdrop:
    "https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MovieCarousel = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const timerRef = useRef<number | null>(null);

  const dispatch = useDispatch();
  const { currentIndex, isPaused } = useSelector(
    (state: RootState) => state.carousel,
  );

  const fetchMovies = useCallback(async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/movies/trending`);
      if (!res.ok) throw new Error("Backend request failed");

      const data: Movie[] = await res.json();
      setMovies(data.slice(0, 5));
      dispatch(setIndex(0));
    } catch (err) {
      console.error("Failed to fetch trending movies", err);
      setMovies([]);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    if (movies.length <= 1 || isPaused || isDragging) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      dispatch(next(movies.length));
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [movies.length, isPaused, isDragging, dispatch]);

  const currentMovie = movies[currentIndex] || DEFAULT_HERO;
  const backdropUrl =
    currentMovie.backdrop || currentMovie.poster || DEFAULT_HERO.backdrop;

  const handlePointerDown = (e: React.PointerEvent) => {
    dispatch(pause());
    setIsDragging(true);
    startX.current = e.clientX;
  };

  const handlePointerMove = (_e: React.PointerEvent) => {
    if (!isDragging) return;
  }; //unused Prefixing with _ tells TypeScript: “I know this parameter exists, I don’t need it.”

  const handlePointerUp = (e: React.PointerEvent | PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaX = e.clientX - startX.current;
    if (Math.abs(deltaX) > 80) {
      if (deltaX > 0) dispatch(prev(movies.length));
      else dispatch(next(movies.length));
    }

    setTimeout(() => dispatch(resume()), 8000);
  };

  const handleClick = () => {
    dispatch(pause());
    setTimeout(() => dispatch(resume()), 8000);
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
      <div
        key={currentIndex}
        className="absolute inset-0 bg-cover bg-center scale-[1.05] transition-all duration-1000 ease-out opacity-100"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/75 to-transparent/20 opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-t from-emerald-950/50 via-transparent to-transparent opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_104%,transparent_40%,black_80%)] opacity-80 pointer-events-none" />

      <div className="absolute inset-0 z-10 flex items-end pb-10 sm:pb-14 md:pb-20 px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-3xl space-y-3 md:space-y-4 animate-fade-in">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight line-clamp-2">
            {currentMovie.title}
          </h1>
          {currentMovie.overview && (
            <p className="text-sm sm:text-base md:text-lg text-gray-100/90 leading-relaxed drop-shadow-md line-clamp-4 md:line-clamp-none max-w-prose">
              {currentMovie.overview}
            </p>
          )}
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

      {movies.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
          {movies.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                dispatch(setIndex(idx));
                dispatch(pause());
                setTimeout(() => dispatch(resume()), 8000);
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
