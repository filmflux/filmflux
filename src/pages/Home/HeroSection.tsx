import { MovieCard } from "@/components/ui/MovieCard";

// import all JPEGs from assets/posters folder
const posterModules = import.meta.glob('/src/assets/posters/*.jpeg', { eager: true });
const posters = Object.values(posterModules).map((module: any) => module.default);

type Movie = {
  id: string
  title: string
  poster: string
  releaseDate: string
}

const HeroSection = () => {
  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {posters.map((poster, index) => (
        <MovieCard
          key={index}
          image={poster}        // dynamically assigned poster
          title={`Movie ${index + 1}`}
          date="12 July 2025"
        />
      ))}
    </div>
  );
};

export default HeroSection;
