import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-20 flex h-16 items-center bg-[#1a1a1a] px-6">
      {/* Logo */}
      <div className="text-green-400 font-bold text-2xl tracking-wide">
        Film<span className="text-green-400">Flex</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Nav Links + Avatar */}
      <div className="flex items-center gap-8">
        <a
          href="/"
          className="text-gray-300 hover:text-green-400 transition-colors"
        >
          Home
        </a>

        <a
          href="/library"
          className="text-gray-300 hover:text-green-400 transition-colors"
        >
          Library
        </a>

        <a
          href="/reviews"
          className="text-gray-300 hover:text-green-400 transition-colors"
        >
          Reviews
        </a>

        <Avatar className="ml-2">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
