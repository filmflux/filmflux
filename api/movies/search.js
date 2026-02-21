const TMDB_KEY = process.env.TMDB_API_KEY;

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    if (!TMDB_KEY) {
        return res.status(500).json({ error: "TMDB_API_KEY not configured" });
    }

    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
    }

    try {
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

        res.status(200).json(movies);
    } catch (err) {
        console.error("Search error:", err);
        res.status(500).json({ error: "Failed to search movies" });
    }
}
