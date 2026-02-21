# <img src="./frontend/src/components/ui/logo.svg" height="90" alt="FilmFlux Logo">
<p align="left">
  <strong><font size="4">A movie discovery app built with React and powered by the TMDB API.</font></strong><br>
  Browse trending and popular films, search for your favorites, and explore cinema.
</p>

## 🌐 Live Preview

Check out the live preview of FilmFlux (Vercel Serverless branch):

[Live Preview](https://filmflux-a168xwqep-kamizs-projects.vercel.app/)

<!-- screenshot -->
<img width="1903" height="798" alt="Screenshot_2" src="https://github.com/user-attachments/assets/56bc9f02-0ef8-43c8-9317-ddb64e3b6938" />

<img width="1897" height="965" alt="Screenshot_1" src="https://github.com/user-attachments/assets/b45a7da2-30b9-4646-8bda-d529414a1615" />


---

## ✨ Features

- 🔥 **Trending Carousel** — Auto-rotating hero section showcasing trending movies with backdrop images, swipe/drag support, and smooth transitions
- 🎞️ **Popular Movies Grid** — Responsive card grid displaying popular titles with poster art and hover effects
- 🔍 **Live Search** — Instantly search the TMDB database with real-time results
- 🌙 **Cinematic UI** — Dark theme with emerald accents, glassmorphism, and micro-animations
- ⚡ **Optimized Data Fetching** — React Query with caching, retry logic, and loading skeletons

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, shadcn/ui |
| **State Management** | Redux Toolkit, React Query (TanStack) |
| **Backend** | Node.js, Express |
| **API** | [TMDB (The Movie Database)](https://www.themoviedb.org/) |
| **Tooling** | ESLint, Prettier, SWC |

---

## 📁 Project Structure

```
filmflux/
├── backend/
│   ├── server.js          # Express API proxy for TMDB
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/           # Root App component
│   │   ├── components/    # Reusable UI components (Navbar, MovieCard)
│   │   │   └── ui/        # shadcn/ui primitives
│   │   ├── pages/Home/    # Hero section & movie carousel
│   │   ├── store/         # Redux store & slices
│   │   ├── lib/           # Utility functions
│   │   └── main.tsx       # App entry point
│   ├── tsconfig.json
│   └── vite.config.ts
└── package.json            # Workspace root
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- A free [TMDB API Key](https://www.themoviedb.org/settings/api)

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/filmflux.git
cd filmflux

# Install all dependencies (frontend + backend)
npm install
```

### Environment Setup

Create a `.env` file inside the `backend/` folder:

```env
TMDB_API_KEY=your_tmdb_api_key_here
PORT=3001
```

Create a `.env` file inside the `frontend/` folder (or set in your shell):

```env
VITE_BACKEND_URL=http://localhost:3001
```

### Run the App

```bash
# Start the backend
npm start

# Start the frontend (in a separate terminal)
npm run dev
```

The frontend runs on port `http://localhost:5173` 
the backend runs on port `http://localhost:3001`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/movies/trending` | Top 5 trending movies (weekly) |
| `GET` | `/api/movies/popular` | Top 14 popular movies |
| `GET` | `/api/movies/search?query=...` | Search movies by title |

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---
