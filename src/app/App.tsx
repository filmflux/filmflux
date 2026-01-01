import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/pages/Home/HeroSection";
import { useState } from "react";

const App = () => {
const [searchQuery, setSearchQuery] = useState("");
  return (
    <div>
      <Navbar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      <HeroSection query={searchQuery} />
    </div>
  );
};

export default App;
