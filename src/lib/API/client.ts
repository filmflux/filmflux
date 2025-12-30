const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

export async function getPopularMovies() {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
  )

  if (!res.ok) {
    throw new Error("Failed to fetch movies")
  }

  const data = await res.json()

  return data.results.map((movie: any) => ({
    title: movie.title,
    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    releaseDate: movie.release_date,
  }))
}
