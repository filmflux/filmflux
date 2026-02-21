const TMDB_KEY = process.env.TMDB_API_KEY;

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    if (!TMDB_KEY) {
        return res.status(500).json({ error: "TMDB_API_KEY not configured" });
    }

    try {
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

        res.status(200).json(movies);
    } catch (err) {
        console.error("Trending movies error:", err);
        res.status(500).json({ error: "Failed to fetch trending movies" });
    }
}
