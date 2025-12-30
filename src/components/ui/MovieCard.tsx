import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type MovieCardProps = {
  image: string
  title: string
  date: string
}

export function MovieCard({ image, title, date }: MovieCardProps) {
  return (
    <Card className="w-64 overflow-hidden">
      <img
        src={image}
        alt={title}
  className="w-full h-48 object-contain bg-black rounded-t-lg"
      />

      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">{date}</p>
      </CardContent>
    </Card>
  )
}
export default MovieCard;