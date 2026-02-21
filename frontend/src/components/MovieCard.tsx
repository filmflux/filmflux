import { Card } from "@/components/ui/card";

type MovieCardProps = {
  image?: string;
  title: string;
  date?: string;
};

export function MovieCard({ image, title, date }: MovieCardProps) {
  return (
    <Card className="group w-full h-full overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-green-500/70 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-500/10 hover:scale-110 hover:z-10 rounded-lg p-0">
      {/* Image container with hover feedback */}
      {image ? (
        <div className="relative w-full aspect-2/3 bg-black overflow-hidden">
          <img
            src={image}
            alt={title}
            className="relative z-10 w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          />
          {/* Green overlay on hover */}
          <div className="absolute inset-0 bg-linear-to-t from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
        </div>
      ) : (
        // Fallback UI when poster is missing
        <div className="w-full aspect-2/3 bg-neutral-800 flex items-center justify-center text-sm text-neutral-500">
          No Poster
        </div>
      )}

      {/* Title and Date */}
      <div className="px-3 pb-1 pt-0 align-top">
        <h3
          className={`font-semibold text-white truncate leading-tight group-hover:text-emerald-400 transition-colors duration-300`}
          title={title}
        >
          {title}
        </h3>
        <p className="text-xs  text-neutral-500 mt-0.5">{date || "Unknown"}</p>
      </div>
    </Card>
  );
}

