import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type MovieCardProps = {
  image?: string
  title: string
  date?: string
}

export function MovieCard({ image, title, date }: MovieCardProps) {
  return (
    <Card className="w-64 overflow-hidden">
      {/* Image or placeholder */}
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-contain bg-black"
        />
      ) : (
        <div className="w-full h-48 bg-neutral-800 flex items-center justify-center text-sm text-neutral-400">
          No Poster
        </div>
      )}

      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          {date || "Release date unknown"}
        </p>
      </CardContent>
    </Card>
  )
}

export default MovieCard
