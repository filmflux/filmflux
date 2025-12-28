{/* This holds:
Background image
Movie title
Description
CTA buttons (Watch Trailer, Details) */}

import post1 from "@/assets/post1.png"

const HeroSection = () => {
  return (
        <div className="inset-0">
          <img
        src={post1}
        alt="Dune Part Two"
        className="h-100 w-1000 object-cover"
      />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      </div>

);}

export default HeroSection;