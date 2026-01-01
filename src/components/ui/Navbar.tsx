import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Home, Library, Star } from "lucide-react";

type NavItemProps = {
  icon: React.ElementType
  label: string
  href: string
  active?: boolean
}

type NavbarProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const NavItem = ({ icon: Icon, label, href, active }: NavItemProps) => {
  return (
    <a
      href={href}
      className={`
        group relative flex items-center gap-2
        text-sm font-medium
        transition-colors
        ${active ? "text-green-500" : "text-neutral-300 hover:text-green-400"}
      `}
    >
      <Icon
        className={`
          h-5 w-5 transition-colors
          ${active ? "text-green-500" : "text-neutral-400 group-hover:text-green-400"}
        `}
      />

      {label}

      {/* underline */}
      <span
        className={`
          absolute -bottom-5.25 left-0 h-0.5 w-full
          bg-green-500
          transition-transform duration-300
          origin-center
          ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
        `}
      />
    </a>
  );
};

const Navbar = ({searchQuery,setSearchQuery}: NavbarProps) => {
  return (
    <div className="sticky top-0 z-20 flex h-16 items-center bg-black/90 px-8 shadow-md">
      {/* Site Logo */} 
      <div className="flex items-center">
        <h1 className="text-3xl font-bold tracking-tighter">
          <span className="text-emerald-300 drop-shadow-lg">Film</span>
          <span className="text-gray-100">Flex</span>
        </h1>
      </div>
      {/* Search */}
      <div className="ml-10 relative w-full max-w-md group">
        <Input
          className="w-full
          pr-10
          rounded-full
          border border-neutral-700
          bg-neutral-900
          
          text-sm
          text-white
          placeholder:opacity-90
          focus:placeholder:opacity-60
          placeholder:transition-opacity

          focus-visible:ring-0
          focus-visible:border-green-600
          transition-all duration-300"
          value={searchQuery}        
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="Search movies..."
        />
        <Search
          className="
          absolute right-3 top-1/2 -translate-y-1/2
          h-5 w-6
          text-neutral-400
          transition-colors
          group-focus-within:text-green-500"
        />
      </div>

      <div className="flex-1" />

      {/* Nav Links + Avatar */}
      <div className="flex items-center gap-8">
        <NavItem icon={Home} label="Home" href="/" active />
        <NavItem icon={Library} label="Library" href="/library" />
        <NavItem icon={Star} label="Reviews" href="/reviews" />

        <Avatar className="ml-2 size-9 ring-2 ring-green-500/60 hover:ring-green-400 transition-all duration-300">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>PF</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
