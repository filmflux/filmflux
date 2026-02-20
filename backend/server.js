import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const TMDB_KEY = process.env.TMDB_API_KEY;

if (!TMDB_KEY) throw new Error("TMDB_KEY missing in .env");

app.use(cors());
app.use(express.json());

// Debugging middleware - logs all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Trending movies
app.get("/api/movies/trending", async (req, res) => {
  try {
    console.log("Fetching trending movies...");
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_KEY}`
    );
    if (!response.ok) throw new Error("TMDB request failed");
    const data = await response.json();

    const movies = data.results.slice(0, 5).map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",
      backdrop: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : "",
      releaseDate: movie.release_date,
    }));

    console.log(`Returning ${movies.length} trending movies`);
    res.json(movies);
  } catch (err) {
    console.error("Trending movies error:", err);
    res.status(500).json({ error: "Failed to fetch trending movies" });
  }
});

// Popular movies
app.get("/api/movies/popular", async (req, res) => {
  try {
    console.log("Fetching popular movies...");
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}`
    );
    if (!response.ok) throw new Error("TMDB request failed");
    const data = await response.json();

    const movies = data.results.slice(0, 14).map((movie) => ({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",
      releaseDate: movie.release_date,
    }));

    console.log(`Returning ${movies.length} popular movies`);
    res.json(movies);
  } catch (err) {
    console.error("Popular movies error:", err);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});

// Search movies
app.get("/api/movies/search", async (req, res) => {
  try {
    const { query } = req.query;
    console.log(`Searching for: "${query}"`);
    
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error("TMDB request failed");
    const data = await response.json();

    const movies = data.results.slice(0, 14).map((movie) => ({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",
      releaseDate: movie.release_date,
    }));

    console.log(`Returning ${movies.length} search results`);
    res.json(movies);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Failed to search movies" });
  }
});

// 404 handler for unmatched routes
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log("Available routes:");
  console.log(`  GET http://localhost:${PORT}/api/movies/trending`);
  console.log(`  GET http://localhost:${PORT}/api/movies/popular`);
  console.log(`  GET http://localhost:${PORT}/api/movies/search?query=...`);
});