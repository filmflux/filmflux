import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type MovieCardProps = {
  image?: string;
  title: string;
  date?: string;
};

export function MovieCard({ image, title, date }: MovieCardProps) {
  return (
    <Card className="w-64 overflow-hidden text-white bg-neutral-900 shadow-lg border-green-900">
      {/* Image or placeholder */}
      {image ? (
        <div className="relative w-full h-48 bg-black overflow-hidden">
          <img
            src={image}
            className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-40"
          />
          <img
            src={image}
            className="relative z-10 w-full h-full object-contain"
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-neutral-800 flex items-center justify-center text-sm text-neutral-400">
          No Poster
        </div>
      )}

      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">{date || "unknown"}</p>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
