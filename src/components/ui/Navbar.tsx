import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-20 flex h-16 items-center bg-black px-6 justify-between">
      <div className="flex items-center">
        <span className="text-white font-bold text-xl">FilmFlex</span>
      </div>
      {/* Nav */}
      <div className="flex items-center space-x-6">
        <a href="/" className="text-gray-300 hover:text-white">
          Home
        </a>
        <a href="/about" className="text-gray-300 hover:text-white">
          Library
        </a>
        <a href="/contact" className="text-gray-300 hover:text-white">
          Reviews
        </a>
      </div>
         <div className="flex min-h-svh flex-col items-center justify-center">
        <Button variant="hex1" size="default">Search</Button>
      </div>
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
