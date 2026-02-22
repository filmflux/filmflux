import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, Home, Library, Star, Menu, X } from "lucide-react";

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
};

type NavbarProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};


const NavItem = ({ icon: Icon, label, href, active }: NavItemProps) => {
  return (
    <a
      href={href}
      className={
        `
        group relative flex items-center gap-2
        text-sm font-medium transition-colors
        ${active ? "text-emerald-400" : "text-gray-300 hover:text-emerald-300"}
      `
      }
    >
      <Icon
        className={
          `
          h-5 w-5 transition-colors
          ${active ? "text-emerald-400" : "text-gray-400 group-hover:text-emerald-300"}
        `
        }
      />
      {label}

      <span
        className={
          `
          absolute -bottom-1.25 left-0 h-0.5 w-full
          bg-emerald-400 rounded-full
          transition-transform duration-300 origin-center
          ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
        `
        }
      />
    </a>
  );
};

const Navbar = ({ searchQuery, setSearchQuery }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div
      className="
    fixed top-0 left-0 right-0 z-50
    flex h-16 items-center
    bg-linear-to-b from-black/60 via-black/1 to-transparent
    backdrop-blur-none backdrop-saturate-100
    px-6 sm:px-8 md:px-10 lg:px-12
    transition-all duration-300
  "
    >
      <button
  className="md:hidden mr-4 text-white"
  onClick={() => setIsMenuOpen(prev => !prev)}
>
  {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
</button>
      {/* Logo */}
      <div className="flex items-center shrink-0">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-emerald-300">Film</span>
          <span className="text-white">Flux</span>
        </h1>
      </div>

      {/* Search */}
      <div className="ml-8 md:ml-7 relative w-90 max-w-md lg:max-w-lg group">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies..."
          autoFocus
          className="
            w-full pl-4 pr-10 py-2
            bg-black/40 border border-white/1
            text-white placeholder:text-gray-400/80
            rounded-full text-sm
            focus:bg-black/70 focus:border-emerald-500/60
            focus:outline-none focus:ring-1 focus:ring-emerald-500/30
            transition-all duration-300 backdrop-blur-md 
          "
        />
        <Search
          className="
            absolute right-3.5 top-1/2 -translate-y-1/2
            h-5 w-5 text-gray-400/80
            group-focus-within:text-emerald-400 transition-colors
          "
        />
      </div>

      <div className="flex-1" />

      {/* Nav Links + Avatar */}
<div className="hidden md:flex items-center gap-7 md:gap-10">
          <NavItem icon={Home} label={"Home\u2002"} href="/" active />
        <NavItem icon={Library} label={"Library\u2002"} href="/library" />
        <NavItem icon={Star} label={"Review\u2002"} href="/reviews" />

        <Avatar className="size-9 ring-1 ring-emerald-500/30 hover:ring-emerald-400/60 transition-all duration-300">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="bg-emerald-950/70 text-emerald-200">
            PF
          </AvatarFallback>
        </Avatar>
      </div>
      {isMenuOpen && (
  <div className="md:hidden fixed top-16 left-0 w-3/4 max-w-xs bg-black p-6 space-y-6 z-40">
    <NavItem icon={Home} label="Home" href="/" active />
    <NavItem icon={Library} label="Library" href="/library" />
    <NavItem icon={Star} label="Reviews" href="/reviews" />
  </div>
)}
    </div>
    
  );
};

export default Navbar;
